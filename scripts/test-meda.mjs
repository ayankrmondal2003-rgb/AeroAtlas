import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { DEFINITIONS, number, parseLMST, csvRows, buildSeries } from './build_meda.mjs';
import { validateCatalog, validateSol, intervalLabel, displayValue, missingReason, createMedaClient } from '../src/lib/meda.js';

const row=(time,value,extra={})=>({SCLK:String(time+1000),LMST:`00070M00:${String(Math.floor(time/60)).padStart(2,'0')}:${String(time%60).padStart(2,'0')}`,LTST:'0069 23:47:00',PRESSURE:String(value),...extra});
test('blank, invalid, sentinel and zero remain distinct',()=>{for(const v of ['',null,'NaN','Infinity','999999999','9999999999'])assert.equal(number(v),null);assert.equal(number('0'),0);});
test('archive LMST parsing and sol rollover preserve numeric order',()=>{assert.deepEqual(parseLMST('00070M00:00:00.878'),{sol:70,seconds:.878});const a=parseLMST('00070M23:59:59.999'),b=parseLMST('00071M00:00:00.000');assert(b.sol*86400+b.seconds>a.sol*86400+a.seconds);assert.throws(()=>parseLMST('00070M24:00:00'));assert.equal(intervalLabel(287),'23:55–24:00 LMST');});
test('CSV schema drift fails rather than shifts fields',()=>{assert.equal(csvRows('SCLK,LMST\r\n1,00070M00:00:00\r\n').rows.length,1);assert.throws(()=>csvRows('a,b\n1,2,3'));assert.throws(()=>csvRows('a,a\n1,2'));});
test('mean, range, actual sample and gap coverage are honest',()=>{const s=buildSeries([row(0,750),row(1,752),row(150,754)],DEFINITIONS.find(d=>d.id==='pressure'),70);const b=s.bins[0];assert.equal(b.mean,752);assert.equal(b.min,750);assert.equal(b.max,754);assert.equal(b.coverageSeconds,1);assert.equal(b.sample.sclk,1150);assert.equal(b.sample.value,754);assert.equal(b.sample.uncertainty,null);assert.equal(s.bins[1].sample,null);});
test('sampling coverage is split across five-minute boundaries',()=>{const s=buildSeries([row(299,750),row(300,752)],DEFINITIONS.find(d=>d.id==='pressure'),70);assert.equal(s.bins[0].coverageSeconds,1);assert.equal(s.bins[1].coverageSeconds,0);});
test('wind excludes motion and invalid sentinels, not single-boom data',()=>{const def=DEFINITIONS.find(d=>d.id==='wind');const rows=[row(0,0,{HORIZONTAL_WIND_SPEED:'999999999',ROVER_STILL:'1'}),row(1,0,{HORIZONTAL_WIND_SPEED:'3',ROVER_STILL:'0'}),row(2,0,{HORIZONTAL_WIND_SPEED:'0',ROVER_STILL:'1',BOTH_BOOMS_USED_FOR_RETRIEVAL:'0'})];const s=buildSeries(rows,def,70);assert.equal(s.qa.accepted,1);assert.equal(s.bins[0].excluded,2);assert.equal(s.bins[0].sample.value,0);assert.equal(s.bins[0].sample.bothBoomsUsed,0);});
test('missing derived data stays missing; clocks are validated',()=>{const s=buildSeries([row(0,'')],DEFINITIONS.find(d=>d.id==='pressure'),70);assert.equal(s.bins[0].mean,null);assert.equal(missingReason(s.bins[0]),'No valid value in source');assert.throws(()=>buildSeries([row(1,750),row(0,751)],DEFINITIONS[5],70));assert.throws(()=>buildSeries([row(0,750)],DEFINITIONS[5],71));});
test('sensor conversion and missing states do not invent values',()=>{assert.equal(displayValue('temperature1',205.48),'-67.67 °C');assert.equal(displayValue('wind',0),'0.00 m/s');assert.equal(displayValue('pressure',null),'Unavailable');});
test('generated datasets pass schema, provenance, checksums and counts',async()=>{
  const base=new URL('../public/data/meda/',import.meta.url),catalog=validateCatalog(JSON.parse(await readFile(new URL('catalog.json',base),'utf8')));
  for(const entry of catalog.sols){const text=await readFile(new URL(entry.file,base),'utf8');assert.equal(createHash('sha256').update(text).digest('hex'),entry.sha256);const d=validateSol(JSON.parse(text),entry.sol,catalog.datasetVersion);
    for(const source of d.sources){assert.match(source.sha256,/^[a-f0-9]{64}$/);assert.match(source.pdsMd5,/^[a-f0-9]{32}$/);assert(source.rows>0);}
    for(const s of d.series){assert.equal(s.bins.reduce((n,b)=>n+b.count+b.missing+b.excluded,0),s.qa.inputRows);assert(s.qa.accepted>0);for(const b of s.bins)if(b.sample){assert.notEqual(b.sample.value,999999999);assert.notEqual(b.sample.value,9999999999);}}
  }
});
test('failed fetch can retry; cached catalog avoids duplicate requests',async()=>{let calls=0;const fake={schemaVersion:1,datasetVersion:'v1',sols:[{sol:70,file:'sol-0070.json',sha256:'a'.repeat(64),utcStart:'2021-05-01T00:00:00Z',utcEnd:'2021-05-02T00:00:00Z'}]};const c=createMedaClient(f=>f,async()=>{calls++;if(calls===1)return {ok:false,status:503};return {ok:true,text:async()=>JSON.stringify(fake)};});await assert.rejects(c.catalog(),/503/);assert.deepEqual(await c.catalog(),fake);await c.catalog();assert.equal(calls,2);});
test('invalid dataset/catalog rejected',()=>{assert.throws(()=>validateCatalog({}));assert.throws(()=>validateSol({},70,'v1'));});
test('modified JSON fails source checksum before rendering',async()=>{const c=createMedaClient(f=>f,async()=>({ok:true,text:async()=>'{}'}));await assert.rejects(c.sol({sol:70,file:'sol-0070.json',sha256:'a'.repeat(64)},'v1'),/checksum mismatch/);});
