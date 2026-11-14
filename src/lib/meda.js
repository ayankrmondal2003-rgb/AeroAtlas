// Archived observations only. This module never reads or changes the simulation clock.
export const VARIABLES = Object.freeze({temperature1:'K',temperature2:'K',temperature3:'K',temperature4:'K',temperature5:'K',pressure:'Pa',humidity:'% RH over ice',wind:'m/s'});
export function validateCatalog(data){
  if(data?.schemaVersion!==1||typeof data.datasetVersion!=='string'||!Array.isArray(data.sols)||!data.sols.length)throw Error('Unsupported weather catalog');
  const seen=new Set();
  for(const s of data.sols){if(!Number.isInteger(s.sol)||seen.has(s.sol)||s.file!==`sol-${String(s.sol).padStart(4,'0')}.json`||!/^[a-f0-9]{64}$/.test(s.sha256)||!Number.isFinite(Date.parse(s.utcStart))||!Number.isFinite(Date.parse(s.utcEnd)))throw Error('Invalid weather catalog entry');seen.add(s.sol);}
  return data;
}
export function validateSol(data,sol,version){
  if(data?.schemaVersion!==1||data.sol!==sol||data.datasetVersion!==version||data.binSeconds!==300||!Array.isArray(data.sources)||data.sources.length!==4||!Array.isArray(data.series)||data.series.length!==8)throw Error('Invalid weather dataset');
  const seen=new Set();
  for(const s of data.sources)for(const key of ['url','labelUrl'])if(!s[key]?.startsWith('https://atmos.nmsu.edu/PDS/data/PDS4/Mars2020/mars2020_meda/'))throw Error('Invalid weather source');
  for(const s of data.series){
    if(seen.has(s.id)||VARIABLES[s.id]!==s.unit||!Array.isArray(s.bins)||s.bins.length!==288)throw Error('Invalid weather series');seen.add(s.id);
    for(const [i,b]of s.bins.entries()){
      if(b.start!==i*300||b.end!==(i+1)*300||![b.count,b.missing,b.excluded].every(n=>Number.isInteger(n)&&n>=0)||!Number.isFinite(b.coverageSeconds)||b.coverageSeconds<0||b.coverageSeconds>300.001)throw Error('Invalid weather interval');
      if(b.count){if(![b.mean,b.min,b.max,b.sample?.value,b.sample?.sclk,b.sample?.seconds].every(Number.isFinite)||b.min>b.mean+1e-5||b.max<b.mean-1e-5||b.sample.seconds<b.start||b.sample.seconds>=b.end||!b.sample.lmst.startsWith(String(sol).padStart(5,'0')+'M'))throw Error('Invalid observation');}
      else if(b.mean!==null||b.sample!==null)throw Error('Missing observations must be null');
    }
  }
  return data;
}
export function intervalLabel(index){const hm=s=>`${String(Math.floor(s/3600)).padStart(2,'0')}:${String(Math.floor(s%3600/60)).padStart(2,'0')}`;return `${hm(index*300)}–${hm((index+1)*300)} LMST`;}
export function displayValue(id,value){
  if(value===null||!Number.isFinite(value))return 'Unavailable';
  if(id.startsWith('temperature'))return `${(value-273.15).toFixed(2)} °C`;
  return `${value.toFixed(2)} ${VARIABLES[id]}`;
}
export function missingReason(bin){return bin.excluded?'Excluded by quality checks':bin.missing?'No valid value in source':'No observations in this interval';}
export function createMedaClient(resolveURL,fetcher=globalThis.fetch){
  const cache=new Map();
  async function read(file,signal){const r=await fetcher(resolveURL(`meda/${file}`),{signal});if(!r.ok)throw Error(`Weather data unavailable (HTTP ${r.status})`);return r.text();}
  return {
    async catalog(signal){if(cache.has('catalog'))return cache.get('catalog');const data=validateCatalog(JSON.parse(await read('catalog.json',signal)));cache.set('catalog',data);return data;},
    async sol(entry,version,signal){
      const key=version+':'+entry.sol;if(cache.has(key))return cache.get(key);
      const text=await read(entry.file,signal);
      if(globalThis.crypto?.subtle){const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text));const hex=[...new Uint8Array(digest)].map(n=>n.toString(16).padStart(2,'0')).join('');if(hex!==entry.sha256)throw Error('Weather file checksum mismatch');}
      const data=validateSol(JSON.parse(text),entry.sol,version);cache.set(key,data);return data;
    }
  };
}
