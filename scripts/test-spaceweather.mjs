import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../netlify/functions/space-weather.mjs';
const storage=new Map();
globalThis.sessionStorage={getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)};
globalThis.location={hostname:'example.com'};
const fresh=()=>import(`../src/lib/spaceweather.js?test=${Math.random()}`);
test('429 stops fallback, shares in-flight requests and caches backoff across clients',async()=>{
 storage.clear();let calls=0;globalThis.fetch=async()=>{calls++;return new Response('{}',{status:429,headers:{'Retry-After':'3600'}});};
 const m=await fresh();const [a,b]=await Promise.all([m.fetchSpaceWeather(),m.fetchSpaceWeather()]);
 assert.equal(calls,1);assert.equal(a.ok,false);assert.equal(a.rateLimited,true);assert.equal(a,b);assert(a.retryAt>Date.now()+3500000);
 await m.fetchSpaceWeather();await (await fresh()).fetchSpaceWeather();assert.equal(calls,1);
 const d=m.describeSpaceWeather(a);assert.equal(d.lvl,'off');assert.match(d.long,/temporarily unavailable/);assert.match(d.long,/rate-limited/);assert.doesNotMatch(d.long,/HTTP|429|No CME/);
});
test('expired failure retries and success is cached',async()=>{
 storage.clear();storage.set('sol-atlas-donki-failure',JSON.stringify({ok:false,retryAt:0}));let calls=0;
 globalThis.fetch=async()=>{calls++;return Response.json([]);};const m=await fresh();assert.equal((await m.fetchSpaceWeather()).ok,true);await m.fetchSpaceWeather();assert.equal(calls,1);
});
test('server preserves rate limit and rejects malformed success',async()=>{
 globalThis.fetch=async()=>new Response('{}',{status:429,headers:{'Retry-After':'120'}});let r=await handler();assert.equal(r.status,429);assert.equal(r.headers.get('retry-after'),'120');
 globalThis.fetch=async()=>Response.json({unexpected:true});r=await handler();assert.equal(r.status,502);
});
