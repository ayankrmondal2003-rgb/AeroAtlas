// Reproducible MEDA subset. Node built-ins only; no runtime archive requests.
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const BASE = 'https://atmos.nmsu.edu/PDS/data/PDS4/Mars2020/mars2020_meda/';
export const VERSION = 'meda-70-71-v1';
export const DEFINITIONS = [
  ...[1,2,3,4,5].map(n=>({id:`temperature${n}`,field:`ATS_LOCAL_TEMP${n}`,sensor:'ATS',unit:'K',label:`Air temperature · ATS ${n}`})),
  {id:'pressure',field:'PRESSURE',sensor:'PS',unit:'Pa',label:'Pressure'},
  {id:'humidity',field:'LOCAL_RELATIVE_HUMIDITY',sensor:'RHS',unit:'% RH over ice',label:'Local relative humidity'},
  {id:'wind',field:'HORIZONTAL_WIND_SPEED',sensor:'WS',unit:'m/s',label:'Horizontal wind speed'},
];
const hash = b => createHash('sha256').update(b).digest('hex');
const round = n => Math.round(n*1e6)/1e6;
export function number(value) {
  if(value==null||String(value).trim()==='')return null;
  const n=Number(value);
  return Number.isFinite(n)&&![999999999,9999999999].includes(n)?n:null;
}
export function parseLMST(value) {
  const m=/^(\d{5})M(\d{2}):(\d{2}):(\d{2}(?:\.\d+)?)$/.exec(value);
  if(!m||+m[2]>=24||+m[3]>=60||+m[4]>=60)throw Error(`Invalid LMST: ${value}`);
  return {sol:+m[1],seconds:+m[2]*3600 + +m[3]*60 + +m[4]};
}
export function csvRows(text) {
  // These selected PDS products contain no quoted/multiline fields. Reject schema drift.
  if(text.includes('"'))throw Error('Unexpected quoted CSV; review product schema');
  const lines=text.trimEnd().split(/\r?\n/),header=lines.shift().split(',');
  if(new Set(header).size!==header.length)throw Error('Duplicate CSV header');
  return {header,rows:lines.map((line,i)=>{
    const cells=line.split(',');if(cells.length!==header.length)throw Error(`CSV width at row ${i+2}`);
    return Object.fromEntries(header.map((k,j)=>[k,cells[j]]));
  })};
}
export function buildSeries(rows, def, sol) {
  const bins=Array.from({length:288},(_,i)=>({start:i*300,end:(i+1)*300,count:0,missing:0,excluded:0,coverageSeconds:0,min:null,max:null,mean:null,sample:null}));
  const reasons={}; let previousClock=-Infinity,previousTime=-Infinity,previousValid=null;
  const reject=(reason)=>{reasons[reason]=(reasons[reason]||0)+1;};
  for(const row of rows){
    const t=parseLMST(row.LMST),sclk=number(row.SCLK);
    if(t.sol!==sol||sclk===null||sclk<=previousClock||t.seconds<previousTime)throw Error('Nonmonotonic clock or wrong sol');
    previousClock=sclk;previousTime=t.seconds;
    const bin=bins[Math.floor(t.seconds/300)],raw=row[def.field],v=number(raw);
    let reason=null;
    if(v===null)reason=raw?.trim()?'invalid-sentinel':'missing';
    else if((def.sensor==='ATS'||def.sensor==='PS')&&v<=0)reason='nonpositive-physical-value';
    else if((def.sensor==='RHS'||def.sensor==='WS')&&v<0)reason='negative-outside-useful-range';
    else if(def.sensor==='RHS'&&sol<63)reason='pre-maintenance';
    else if(def.sensor==='WS'&&(sol<36||row.ROVER_STILL!=='1'))reason='wind-quality';
    if(reason){bin[reason==='missing'?'missing':'excluded']++;reject(reason);previousValid=null;continue;}
    if(previousValid&&t.seconds-previousValid.t<=5){
      // Coverage only between adjacent accepted samples; split at bin boundaries.
      const start=previousValid.t,end=t.seconds;
      for(let i=Math.floor(start/300);i<=Math.floor(end/300);i++)bins[i].coverageSeconds+=Math.max(0,Math.min(end,bins[i].end)-Math.max(start,bins[i].start));
    }
    previousValid={t:t.seconds};
    bin.count++;bin.mean=(bin.mean??0)+(v-(bin.mean??0))/bin.count;
    bin.min=bin.min===null?v:Math.min(bin.min,v);bin.max=bin.max===null?v:Math.max(bin.max,v);
    // Preserve a real sample nearest the bin center, not a fabricated simultaneous snapshot.
    if(!bin.sample||Math.abs(t.seconds-bin.start-150)<Math.abs(bin.sample.seconds-bin.start-150)){
      bin.sample={value:v,sclk,lmst:row.LMST,ltst:row.LTST,seconds:t.seconds,
        uncertainty:def.sensor==='PS'?null:number(row[def.field+'_UNCERTAINTY'])};
      if(def.sensor==='RHS')bin.sample.localTemperatureK=number(row.HUMIDITY_LOCAL_TEMP);
      if(def.sensor==='WS'){
        const direction=number(row.WIND_DIRECTION);
        bin.sample.directionDeg=direction!==null&&direction>=0&&direction<=360?direction:null;
        bin.sample.roverStill=1;bin.sample.bothBoomsUsed=number(row.BOTH_BOOMS_USED_FOR_RETRIEVAL);
      }
    }
  }
  for(const b of bins){b.coverageSeconds=round(b.coverageSeconds);if(b.count)b.mean=round(b.mean);}
  return {...def,bins,qa:{inputRows:rows.length,accepted:bins.reduce((n,b)=>n+b.count,0),reasons}};
}
async function request(url, options={}) {
  for(let attempt=0;attempt<3;attempt++){
    try{const r=await fetch(url,{...options,signal:AbortSignal.timeout(60000)});if(!r.ok)throw Error(`HTTP ${r.status}: ${url}`);return r;}
    catch(e){if(attempt===2)throw e;}
  }
}
async function download(url) {
  // Small bounded range transfers avoid the archive's slow long-lived downloads.
  const first=await request(url,{headers:{Range:'bytes=0-262143'}});
  if(first.status!==206)throw Error('Archive must support bounded range transfers');
  const total=Number(first.headers.get('content-range')?.split('/')[1]);
  if(!Number.isSafeInteger(total)||total>20000000)throw Error('Unexpected product size');
  const chunks=[Buffer.from(await first.arrayBuffer())],jobs=[];
  for(let offset=262144;offset<total;offset+=262144)jobs.push(offset);
  let cursor=0;
  await Promise.all(Array.from({length:4},async()=>{
    while(cursor<jobs.length){const offset=jobs[cursor++],end=Math.min(offset+262143,total-1);
      const r=await request(url,{headers:{Range:`bytes=${offset}-${end}`}});
      if(r.status!==206||r.headers.get('content-range')!==`bytes ${offset}-${end}/${total}`)throw Error('Incorrect range response');
      const b=Buffer.from(await r.arrayBuffer());if(b.length!==end-offset+1)throw Error('Truncated product');chunks[offset/262144]=b;
    }
  }));
  const bytes=Buffer.concat(chunks);if(bytes.length!==total)throw Error('Incomplete product');return bytes;
}
const tag=(xml,name)=>{const m=new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`).exec(xml);if(!m)throw Error(`Missing XML ${name}`);return m[1].trim();};
async function product(sol,sensor){
  const level=sensor==='ATS'?'calibrated':'derived',code=sensor==='ATS'?'CAL':'DER';
  const dir=`${BASE}data_${level}_env/sol_0000_0089/sol_${String(sol).padStart(4,'0')}/`;
  const listing=await(await request(dir)).text();
  const files=[...listing.matchAll(/href="([^"]+)"/g)].map(m=>m[1]).filter(f=>f.includes(`_${code}_${sensor}_`)&&f.endsWith('.CSV')).sort();
  const file=files.at(-1);if(!file)throw Error(`Missing ${sensor} sol ${sol}`);
  const pinned={ATS:'P01',PS:'P01',RHS:'P02',WS:'P02'};
  if(!file.endsWith(pinned[sensor]+'.CSV'))throw Error('New PDS product version: review science changes, bump VERSION and update pins before rebuilding');
  const labelUrl=dir+file.replace('.CSV','.xml'),xml=await(await request(labelUrl)).text();
  const bytes=await download(dir+file),{header,rows}=csvRows(bytes.toString('utf8'));
  const table=tag(xml,'Table_Delimited');
  if(rows.length!==+tag(table,'records'))throw Error('PDS table record count mismatch');
  if(bytes.length!==+tag(xml,'file_size'))throw Error('PDS file size mismatch');
  const md5=createHash('md5').update(bytes).digest('hex');
  if(md5!==tag(xml,'md5_checksum'))throw Error('PDS checksum mismatch');
  const defs=DEFINITIONS.filter(d=>d.sensor===sensor);
  for(const d of defs)if(!header.includes(d.field))throw Error('Required field missing');
  const source={sensor,url:dir+file,labelUrl,lidvid:tag(xml,'logical_identifier')+'::'+tag(xml,'version_id'),
    utcStart:tag(xml,'start_date_time'),utcEnd:tag(xml,'stop_date_time'),bytes:bytes.length,sha256:hash(bytes),pdsMd5:md5,labelSha256:hash(xml),rows:rows.length,header};
  console.log(`Validated sol ${sol} ${sensor}: ${rows.length} rows, ${bytes.length} bytes`);
  return {source,series:defs.map(d=>buildSeries(rows,d,sol))};
}
export async function build(){
  const out=new URL('../public/data/meda/',import.meta.url);const datasets=[];
  for(const sol of [70,71]){
    const products=[];for(const sensor of ['ATS','PS','RHS','WS'])products.push(await product(sol,sensor));
    datasets.push({schemaVersion:1,datasetVersion:VERSION,sol,binSeconds:300,aggregation:'Sample arithmetic mean; not a full-sol daily mean. No interpolation.',
      sources:products.map(p=>p.source),series:products.flatMap(p=>p.series)});
  }
  // Validate all products before publishing any generated output.
  await mkdir(out,{recursive:true});
  const sols=[];
  for(const data of datasets){const file=`sol-${String(data.sol).padStart(4,'0')}.json`,bytes=JSON.stringify(data);await writeFile(new URL(file,out),bytes+'\n');sols.push({sol:data.sol,file,sha256:hash(bytes+'\n'),utcStart:data.sources[0].utcStart,utcEnd:data.sources[0].utcEnd});}
  const catalog={schemaVersion:1,datasetVersion:VERSION,generatedAt:new Date().toISOString(),citation:'Rodriguez-Manfredi et al. (2021), The Mars Environmental Dynamics Analyzer, MEDA, NASA PDS',doi:'https://doi.org/10.17189/1522849',sols,
    notes:['Archived rover observations, not live weather or forecasts.','ATS detectors are kept separate. RH is relative to ice at the sensor temperature.','Empty values and 999999999 / 9999999999 sentinels excluded. Wind requires ROVER_STILL=1.','Pressure uncertainty omitted: source label has an inconsistent unit.','No calibrated replacement for missing derived values. No simulated safety calculations use these observations.']};
  await writeFile(new URL('catalog.json',out),JSON.stringify(catalog,null,2)+'\n');
  console.log('Published',sols.map(s=>s.file).join(', '));
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))build().catch(e=>{console.error(e);process.exitCode=1;});
