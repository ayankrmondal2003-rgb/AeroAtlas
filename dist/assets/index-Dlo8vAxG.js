(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){let e=document.getElementById(`loader`),t=document.getElementById(`loader-video`);t.muted=!0,t.playsInline=!0,t.controls=!1;let n=()=>{t.pause(),t.removeAttribute(`src`),t.load()};try{t.play()?.catch(()=>{})}catch{}return{finish(){e.classList.add(`done`),e.inert=!0,n()},fail(){n(),document.getElementById(`loader-log`).hidden=!1}}}var t=Math.PI/180,n=69.184,r={lat:18.4447,lon:77.4508},i=Date.UTC(2021,1,18,20,55,0);function a(e){return Math.sin(e*t)}function o(e,t){return(e%t+t)%t}function s(e=Date.now()){let r=e/864e5+2440587.5+n/86400-2451545,i=o(19.3871+.52402073*r,360),s=o(270.3871+.524038496*r,360),c=[[.0071,2.2353,49.409],[.0057,2.7543,168.173],[.0039,1.1177,191.837],[.0037,15.7866,21.736],[.0021,2.1354,15.704],[.002,2.4694,95.528],[.0018,32.8493,49.095]].reduce((e,[n,i,a])=>e+n*Math.cos((.985626*r/i+a)*t),0),l=(10.691+3e-7*r)*a(i)+.623*a(2*i)+.05*a(3*i)+.005*a(4*i)+5e-4*a(5*i)+c,u=o(s+l,360),d=2.861*a(2*u)-.071*a(4*u)+.002*a(6*u)-l,f=(r-4.5)/1.0274912517+44796-9626e-7,p=o(24*f,24);return{ms:e,msd:f,mtc:p,Ls:u,eot:d,decl:Math.asin(.42565*a(u))/t+.25*a(u),subsolarLonEast:o(-(p*15+d+180),360)}}function c(e,t){let n=o(e.mtc+t/15,24);return{lmst:n,ltst:o(n+e.eot/15,24)}}function l(e=Date.now()){let t=e=>s(e).msd+r.lon/360;return Math.floor(t(e))-Math.floor(t(i))}function u(e,n,r){let i=(n-12)*15*t,a=e*t,s=r*t,c=Math.sin(a)*Math.sin(s)+Math.cos(a)*Math.cos(s)*Math.cos(i),l=Math.asin(c),u=Math.atan2(-Math.sin(i),Math.tan(s)*Math.cos(a)-Math.sin(a)*Math.cos(i));return{elevation:l/t,azimuth:o(u/t,360)}}function d(e,n){let r=-Math.tan(e*t)*Math.tan(n*t);if(r<=-1)return{rise:0,set:24};if(r>=1)return{rise:12,set:12};let i=Math.acos(r)/t/15;return{rise:12-i,set:12+i}}function f(e){let t=Math.floor(e),n=Math.floor((e-t)*60);return`${String(t).padStart(2,`0`)}:${String(n).padStart(2,`0`)}`}function p(e){return e<90?`N. Spring`:e<180?`N. Summer`:e<270?`N. Autumn`:`N. Winter`}var m={earth:[1.00000261,.01671123,-1531e-8,100.46457166,102.93768193,0,562e-8,-4392e-8,-.01294668,35999.37244981,.32327364,0],mars:[1.52371034,.0933941,1.84969142,-4.55343205,-23.94362959,49.55953891,1847e-8,7882e-8,-.00813131,19140.30268499,.44441088,-.29257343]};function h(e,n){let[r,i,a,s,c,l,u,d,f,p,m,h]=e,g=r+u*n,_=i+d*n,v=(a+f*n)*t,y=s+p*n,b=c+m*n,x=(l+h*n)*t,S=b*t-x,C=o(y-b+180,360)-180;C*=t;let w=C+_*Math.sin(C);for(let e=0;e<8;e++)w-=(w-_*Math.sin(w)-C)/(1-_*Math.cos(w));let T=g*(Math.cos(w)-_),E=g*Math.sqrt(1-_*_)*Math.sin(w),D=Math.cos(S),O=Math.sin(S),k=Math.cos(x),A=Math.sin(x),j=Math.cos(v),ee=Math.sin(v);return[(D*k-O*A*j)*T+(-O*k-D*A*j)*E,(D*A+O*k*j)*T+(-O*A+D*k*j)*E,O*ee*T+D*ee*E]}function g(e=Date.now()){let t=(e/864e5+2440587.5+n/86400-2451545)/36525,r=h(m.earth,t),i=h(m.mars,t),a=Math.hypot(i[0]-r[0],i[1]-r[1],i[2]-r[2]),o=a*149597870.7;return{au:a,km:o,seconds:o/299792.458}}var _=[`Discovery`,`Observation`,`Mistake`,`Safety Incident`,`General`],v=e=>e&&[`Recording`,`Paused`].includes(e.status);function y(e,t=0){return{timestamp:e,sol:l(e),lmst:f(c(s(e),r.lon).lmst),elapsed:t}}var b=e=>typeof e==`number`&&Number.isFinite(e),x=e=>(e?.segments||[]).flatMap(e=>e.points);function S(e){let t=e.telemetry?.[0],n=e.telemetry?.at(-1),r=t&&n&&e.telemetry.every(e=>e.epoch===t.epoch&&e.capacity===t.capacity)&&b(t.oxygen)&&b(n.oxygen)&&t.oxygen>=n.oxygen;return{distance:e.distance||0,duration:e.elapsed||0,movementDuration:e.movementDuration||0,oxygenConsumed:r?t.oxygen-n.oxygen:null,oxygenRemaining:b(n?.oxygen)?n.oxygen:null,averageW:e.powerSeconds>0?e.energyJ/e.powerSeconds:null,energyJ:e.powerSeconds>0?e.energyJ:null,powerSeconds:e.powerSeconds||0,notes:e.entries.length}}var C=class{constructor({id:e=()=>crypto.randomUUID(),changed:t=()=>{}}={}){this.id=e,this.changed=t,this.mission=null,this.last=null}start(e,t,n,r){if(v(this.mission)||this.mission?.status===`Interrupted`&&!this.mission.finalized)throw Error(`Finalize the existing mission first.`);return this.mission={schemaVersion:1,id:this.id(),status:`Recording`,start:y(e),end:null,clockMs:e,elapsed:0,distance:0,movementDuration:0,energyJ:0,powerSeconds:0,segments:[],entries:[],telemetry:[],terrain:structuredClone(n),planned:structuredClone(r||[])},this.last=null,this.latest=null,this.breakNext=!0,t&&this.ingest(t,0),this.changed(),this.mission}ingest(e,t){let n=this.mission;if(!v(n))return;if(t=b(t)&&t>=0?t:0,n.clockMs+=t*1e3,e&&b(e.x)&&b(e.z)&&(this.latest=e),n.status===`Paused`){this.last=null,this.breakNext=!0;return}if(n.elapsed+=t,!e||!b(e.x)||!b(e.z)){this.last=null,this.breakNext=!0;return}let r=y(n.clockMs,n.elapsed),i={...e,...r},a=this.last,o=a?Math.hypot(e.x-a.x,e.z-a.z)*1e3:0,s=this.breakNext||!a||a.epoch!==e.epoch||a.mode!==e.mode||o>t*15+2;if(s)this.flush(),n.segments.push({reason:a?`source change / discontinuity`:`start / resume`,points:[i]});else{n.distance+=o,o>.001&&(n.movementDuration+=t);let r=n.segments.at(-1).points.at(-1);(Math.hypot(i.x-r.x,i.z-r.z)*1e3>=1||i.elapsed-r.elapsed>=2&&o>.001)&&n.segments.at(-1).points.push(i),b(e.watts)&&e.watts>=0&&t>0&&(n.energyJ+=e.watts*t,n.powerSeconds+=t)}let c=n.telemetry.at(-1);(!c||s||r.elapsed-c.elapsed>=2)&&n.telemetry.push({...r,oxygen:e.oxygen,watts:e.watts,capacity:e.capacity,epoch:e.epoch,mode:e.mode}),this.last=i,this.breakNext=!1}flush(){let e=this.mission,t=this.last;if(!e||!t)return;let n=e.segments.at(-1)?.points,r=n?.at(-1);r&&(r.x!==t.x||r.z!==t.z)&&n.push({...t});let i=e.telemetry.at(-1);(!i||i.timestamp!==t.timestamp)&&e.telemetry.push({...t})}pause(){this.mission?.status===`Recording`&&(this.flush(),this.mission.status=`Paused`,this.last=null,this.breakNext=!0,this.changed())}resume(){this.mission?.status===`Paused`&&(this.mission.status=`Recording`,this.last=null,this.breakNext=!0,this.changed())}end(e=!1){this.mission&&(v(this.mission)||this.mission.status===`Interrupted`)&&(this.flush(),this.mission.status=e?`Interrupted`:`Completed`,this.mission.end=y(this.mission.clockMs,this.mission.elapsed),this.mission.finalized=!0,this.mission.summary=S(this.mission),this.changed())}note(e,t,n){let r=this.mission;if(!v(r))throw Error(`Notes require an active recording (recording or paused).`);if(!_.includes(e)||!t.trim())throw Error(`Choose a category and enter a note.`);let i=n&&r.entries.find(e=>e.id===n);if(n&&!i)throw Error(`Entry not found.`);i?(i.category=e,i.text=t.trim(),i.edited=y(r.clockMs,r.elapsed)):r.entries.push({id:this.id(),missionId:r.id,category:e,text:t.trim(),...y(r.clockMs,r.elapsed),position:this.latest?{x:this.latest.x,z:this.latest.z,lat:this.latest.lat,lon:this.latest.lon}:null}),this.changed()}deleteNote(e){if(!v(this.mission))throw Error(`Only active mission notes can be changed.`);this.mission.entries=this.mission.entries.filter(t=>t.id!==e),this.changed()}},w=class{constructor(e=globalThis.indexedDB){this.factory=e,this.db=null}open(){return this.db?Promise.resolve(this.db):new Promise((e,t)=>{if(!this.factory)return t(Error(`IndexedDB is unavailable. Records are only in memory.`));let n=this.factory.open(`aeroatlas-eva-journal`,1),r=!1;n.onupgradeneeded=()=>{n.result.objectStoreNames.contains(`missions`)||n.result.createObjectStore(`missions`,{keyPath:`id`})},n.onblocked=()=>{r=!0,t(Error(`Storage upgrade blocked. Close other AeroAtlas tabs and retry.`))},n.onerror=()=>t(n.error||Error(`Cannot open mission storage.`)),n.onsuccess=()=>{if(r){n.result.close();return}this.db=n.result,this.db.onversionchange=()=>{this.db.close(),this.db=null},e(this.db)}})}async transaction(e,t){let n=await this.open();return new Promise((r,i)=>{let a=n.transaction(`missions`,e),o;a.oncomplete=()=>r(o),a.onabort=a.onerror=()=>i(a.error||Error(`Mission transaction failed; changes remain in memory.`));try{let e=t(a.objectStore(`missions`));e.onsuccess=()=>{o=e.result}}catch(e){try{a.abort()}catch{}i(e)}})}save(e){let t=structuredClone(e);return this.transaction(`readwrite`,e=>e.put(t))}list(){return this.transaction(`readonly`,e=>e.getAll())}},T=1e3,E=1001,D=1002,O=1003,k=1004,A=1005,j=1006,ee=1007,te=1008,ne=1009,M=1010,re=1011,ie=1012,ae=1013,oe=1014,se=1015,N=1016,ce=1017,le=1018,ue=1020,de=35902,fe=35899,pe=1021,me=1022,he=1023,ge=1026,_e=1027,ve=1028,ye=1029,be=1030,xe=1031,Se=1033,Ce=33776,we=33777,Te=33778,Ee=33779,De=35840,Oe=35841,ke=35842,Ae=35843,je=36196,Me=37492,Ne=37496,Pe=37488,P=37489,Fe=37490,Ie=37491,Le=37808,F=37809,Re=37810,I=37811,L=37812,ze=37813,Be=37814,Ve=37815,He=37816,Ue=37817,We=37818,Ge=37819,Ke=37820,qe=37821,Je=36492,Ye=36494,Xe=36495,Ze=36283,Qe=36284,$e=36285,et=36286,tt=2300,nt=2301,rt=2302,it=2303,at=2400,ot=2401,st=2402,ct=3200,lt=`srgb`,ut=`srgb-linear`,dt=`linear`,ft=`srgb`,pt=7680,mt=35044,ht=2e3;function gt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function _t(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function vt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function yt(){let e=vt(`canvas`);return e.style.display=`block`,e}var bt={};function xt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function St(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function R(...e){e=St(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function z(...e){e=St(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Ct(...e){let t=e.join(` `);t in bt||(bt[t]=!0,R(...e))}function wt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Tt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Et=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Dt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Ot=1234567,kt=Math.PI/180,At=180/Math.PI;function jt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Dt[e&255]+Dt[e>>8&255]+Dt[e>>16&255]+Dt[e>>24&255]+`-`+Dt[t&255]+Dt[t>>8&255]+`-`+Dt[t>>16&15|64]+Dt[t>>24&255]+`-`+Dt[n&63|128]+Dt[n>>8&255]+`-`+Dt[n>>16&255]+Dt[n>>24&255]+Dt[r&255]+Dt[r>>8&255]+Dt[r>>16&255]+Dt[r>>24&255]).toLowerCase()}function B(e,t,n){return Math.max(t,Math.min(n,e))}function Mt(e,t){return(e%t+t)%t}function Nt(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function Pt(e,t,n){return e===t?0:(n-e)/(t-e)}function Ft(e,t,n){return(1-n)*e+n*t}function It(e,t,n,r){return Ft(e,t,1-Math.exp(-n*r))}function Lt(e,t=1){return t-Math.abs(Mt(e,t*2)-t)}function Rt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function zt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function Bt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Vt(e,t){return e+Math.random()*(t-e)}function Ht(e){return e*(.5-Math.random())}function Ut(e){e!==void 0&&(Ot=e);let t=Ot+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Wt(e){return e*kt}function Gt(e){return e*At}function Kt(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function qt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Jt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Yt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:R(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Xt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function V(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var H={DEG2RAD:kt,RAD2DEG:At,generateUUID:jt,clamp:B,euclideanModulo:Mt,mapLinear:Nt,inverseLerp:Pt,lerp:Ft,damp:It,pingpong:Lt,smoothstep:Rt,smootherstep:zt,randInt:Bt,randFloat:Vt,randFloatSpread:Ht,seededRandom:Ut,degToRad:Wt,radToDeg:Gt,isPowerOfTwo:Kt,ceilPowerOfTwo:qt,floorPowerOfTwo:Jt,setQuaternionFromProperEuler:Yt,normalize:V,denormalize:Xt},U=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=B(this.x,e.x,t.x),this.y=B(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=B(this.x,e,t),this.y=B(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(B(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(B(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Zt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:R(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(B(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},W=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($t.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($t.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=B(this.x,e.x,t.x),this.y=B(this.y,e.y,t.y),this.z=B(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=B(this.x,e,t),this.y=B(this.y,e,t),this.z=B(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(B(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Qt.copy(this).projectOnVector(e),this.sub(Qt)}reflect(e){return this.sub(Qt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(B(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Qt=new W,$t=new Zt,G=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Ct(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(en.makeScale(e,t)),this}rotate(e){return Ct(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(en.makeRotation(-e)),this}translate(e,t){return Ct(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(en.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},en=new G,tn=new G().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),nn=new G().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function rn(){let e={enabled:!0,workingColorSpace:ut,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=an(e.r),e.g=an(e.g),e.b=an(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=on(e.r),e.g=on(e.g),e.b=on(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?dt:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Ct(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Ct(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[ut]:{primaries:t,whitePoint:r,transfer:dt,toXYZ:tn,fromXYZ:nn,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:lt},outputColorSpaceConfig:{drawingBufferColorSpace:lt}},[lt]:{primaries:t,whitePoint:r,transfer:ft,toXYZ:tn,fromXYZ:nn,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:lt}}}),e}var K=rn();function an(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function on(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var sn,cn=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{sn===void 0&&(sn=vt(`canvas`)),sn.width=e.width,sn.height=e.height;let t=sn.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=sn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=vt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=an(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(an(t[e]/255)*255):t[e]=an(t[e]);return{data:t,width:e.width,height:e.height}}return R(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},ln=0,un=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ln++}),this.uuid=jt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(dn(r[t].image)):e.push(dn(r[t]))}else e=dn(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function dn(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?cn.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(R(`Texture: Unable to serialize Texture.`),{})}var fn=0,pn=new W,mn=class e extends Et{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=E,i=E,a=j,o=te,s=he,c=ne,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fn++}),this.uuid=jt(),this.name=``,this.source=new un(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new U(0,0),this.repeat=new U(1,1),this.center=new U(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new G,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(pn).x}get height(){return this.source.getSize(pn).y}get depth(){return this.source.getSize(pn).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){R(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){R(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case T:e.x-=Math.floor(e.x);break;case E:e.x=e.x<0?0:1;break;case D:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case T:e.y-=Math.floor(e.y);break;case E:e.y=e.y<0?0:1;break;case D:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};mn.DEFAULT_IMAGE=null,mn.DEFAULT_MAPPING=300,mn.DEFAULT_ANISOTROPY=1;var q=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=B(this.x,e.x,t.x),this.y=B(this.y,e.y,t.y),this.z=B(this.z,e.z,t.z),this.w=B(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=B(this.x,e,t),this.y=B(this.y,e,t),this.z=B(this.z,e,t),this.w=B(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(B(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},hn=class extends Et{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:j,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new q(0,0,e,t),this.scissorTest=!1,this.viewport=new q(0,0,e,t),this.textures=[];let r=new mn({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:j,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new un(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},gn=class extends hn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},_n=class extends mn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=O,this.minFilter=O,this.wrapR=E,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},vn=class extends mn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=O,this.minFilter=O,this.wrapR=E,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},yn=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/bn.setFromMatrixColumn(e,0).length(),i=1/bn.setFromMatrixColumn(e,1).length(),a=1/bn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Sn,e,Cn)}lookAt(e,t,n){let r=this.elements;return En.subVectors(e,t),En.lengthSq()===0&&(En.z=1),En.normalize(),wn.crossVectors(n,En),wn.lengthSq()===0&&(Math.abs(n.z)===1?En.x+=1e-4:En.z+=1e-4,En.normalize(),wn.crossVectors(n,En)),wn.normalize(),Tn.crossVectors(En,wn),r[0]=wn.x,r[4]=Tn.x,r[8]=En.x,r[1]=wn.y,r[5]=Tn.y,r[9]=En.y,r[2]=wn.z,r[6]=Tn.z,r[10]=En.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],te=r[3],ne=r[7],M=r[11],re=r[15];return i[0]=a*x+o*T+s*k+c*te,i[4]=a*S+o*E+s*A+c*ne,i[8]=a*C+o*D+s*j+c*M,i[12]=a*w+o*O+s*ee+c*re,i[1]=l*x+u*T+d*k+f*te,i[5]=l*S+u*E+d*A+f*ne,i[9]=l*C+u*D+d*j+f*M,i[13]=l*w+u*O+d*ee+f*re,i[2]=p*x+m*T+h*k+g*te,i[6]=p*S+m*E+h*A+g*ne,i[10]=p*C+m*D+h*j+g*M,i[14]=p*w+m*O+h*ee+g*re,i[3]=_*x+v*T+y*k+b*te,i[7]=_*S+v*E+y*A+b*ne,i[11]=_*C+v*D+y*j+b*M,i[15]=_*w+v*O+y*ee+b*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=bn.set(r[0],r[1],r[2]).length(),o=bn.set(r[4],r[5],r[6]).length(),s=bn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),xn.copy(this);let c=1/a,l=1/o,u=1/s;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=l,xn.elements[5]*=l,xn.elements[6]*=l,xn.elements[8]*=u,xn.elements[9]*=u,xn.elements[10]*=u,t.setFromRotationMatrix(xn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=ht,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=ht,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},bn=new W,xn=new yn,Sn=new W(0,0,0),Cn=new W(1,1,1),wn=new W,Tn=new W,En=new W,Dn=new yn,On=new Zt,kn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(B(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-B(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(B(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-B(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(B(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-B(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:R(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Dn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Dn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return On.setFromEuler(this),this.setFromQuaternion(On,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};kn.DEFAULT_ORDER=`XYZ`;var An=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},jn=0,Mn=new W,Nn=new Zt,Pn=new yn,Fn=new W,In=new W,Ln=new W,Rn=new Zt,zn=new W(1,0,0),Bn=new W(0,1,0),Vn=new W(0,0,1),Hn={type:`added`},Un={type:`removed`},Wn={type:`childadded`,child:null},Gn={type:`childremoved`,child:null},Kn=class e extends Et{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jn++}),this.uuid=jt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new W,n=new kn,r=new Zt,i=new W(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new yn},normalMatrix:{value:new G}}),this.matrix=new yn,this.matrixWorld=new yn,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new An,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Nn.setFromAxisAngle(e,t),this.quaternion.multiply(Nn),this}rotateOnWorldAxis(e,t){return Nn.setFromAxisAngle(e,t),this.quaternion.premultiply(Nn),this}rotateX(e){return this.rotateOnAxis(zn,e)}rotateY(e){return this.rotateOnAxis(Bn,e)}rotateZ(e){return this.rotateOnAxis(Vn,e)}translateOnAxis(e,t){return Mn.copy(e).applyQuaternion(this.quaternion),this.position.add(Mn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zn,e)}translateY(e){return this.translateOnAxis(Bn,e)}translateZ(e){return this.translateOnAxis(Vn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Fn.copy(e):Fn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),In.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(In,Fn,this.up):Pn.lookAt(Fn,In,this.up),this.quaternion.setFromRotationMatrix(Pn),r&&(Pn.extractRotation(r.matrixWorld),Nn.setFromRotationMatrix(Pn),this.quaternion.premultiply(Nn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(z(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Hn),Wn.child=e,this.dispatchEvent(Wn),Wn.child=null):z(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Un),Gn.child=e,this.dispatchEvent(Gn),Gn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Hn),Wn.child=e,this.dispatchEvent(Wn),Wn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(In,e,Ln),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(In,Rn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Kn.DEFAULT_UP=new W(0,1,0),Kn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Kn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var qn=class extends Kn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Jn={type:`move`},Yn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Jn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new qn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Xn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},Qn={h:0,s:0,l:0};function $n(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var J=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=lt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,K.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=K.workingColorSpace){return this.r=e,this.g=t,this.b=n,K.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=K.workingColorSpace){if(e=Mt(e,1),t=B(t,0,1),n=B(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=$n(i,r,e+1/3),this.g=$n(i,r,e),this.b=$n(i,r,e-1/3)}return K.colorSpaceToWorking(this,r),this}setStyle(e,t=lt){function n(t){t!==void 0&&parseFloat(t)<1&&R(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:R(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);R(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=lt){let n=Xn[e.toLowerCase()];return n===void 0?R(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=an(e.r),this.g=an(e.g),this.b=an(e.b),this}copyLinearToSRGB(e){return this.r=on(e.r),this.g=on(e.g),this.b=on(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=lt){return K.workingToColorSpace(er.copy(this),e),Math.round(B(er.r*255,0,255))*65536+Math.round(B(er.g*255,0,255))*256+Math.round(B(er.b*255,0,255))}getHexString(e=lt){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=K.workingColorSpace){K.workingToColorSpace(er.copy(this),t);let n=er.r,r=er.g,i=er.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=K.workingColorSpace){return K.workingToColorSpace(er.copy(this),t),e.r=er.r,e.g=er.g,e.b=er.b,e}getStyle(e=lt){K.workingToColorSpace(er.copy(this),e);let t=er.r,n=er.g,r=er.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Zn),this.setHSL(Zn.h+e,Zn.s+t,Zn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Zn),e.getHSL(Qn);let n=Ft(Zn.h,Qn.h,t),r=Ft(Zn.s,Qn.s,t),i=Ft(Zn.l,Qn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},er=new J;J.NAMES=Xn;var tr=class extends Kn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},nr=new W,rr=new W,ir=new W,ar=new W,or=new W,sr=new W,cr=new W,lr=new W,ur=new W,dr=new W,fr=new q,pr=new q,mr=new q,hr=class e{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),nr.subVectors(e,t),r.cross(nr);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){nr.subVectors(r,t),rr.subVectors(n,t),ir.subVectors(e,t);let a=nr.dot(nr),o=nr.dot(rr),s=nr.dot(ir),c=rr.dot(rr),l=rr.dot(ir),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,ar)!==null&&ar.x>=0&&ar.y>=0&&ar.x+ar.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,ar)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,ar.x),s.addScaledVector(a,ar.y),s.addScaledVector(o,ar.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return fr.setScalar(0),pr.setScalar(0),mr.setScalar(0),fr.fromBufferAttribute(e,t),pr.fromBufferAttribute(e,n),mr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(fr,i.x),a.addScaledVector(pr,i.y),a.addScaledVector(mr,i.z),a}static isFrontFacing(e,t,n,r){return nr.subVectors(n,t),rr.subVectors(e,t),nr.cross(rr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return nr.subVectors(this.c,this.b),rr.subVectors(this.a,this.b),nr.cross(rr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;or.subVectors(r,n),sr.subVectors(i,n),lr.subVectors(e,n);let s=or.dot(lr),c=sr.dot(lr);if(s<=0&&c<=0)return t.copy(n);ur.subVectors(e,r);let l=or.dot(ur),u=sr.dot(ur);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(or,a);dr.subVectors(e,i);let f=or.dot(dr),p=sr.dot(dr);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(sr,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return cr.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(cr,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(or,a).addScaledVector(sr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},gr=class{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(vr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(vr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=vr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,vr):vr.fromBufferAttribute(r,t),vr.applyMatrix4(e.matrixWorld),this.expandByPoint(vr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),yr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),yr.copy(e.boundingBox)),yr.applyMatrix4(e.matrixWorld),this.union(yr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vr),vr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Er),Dr.subVectors(this.max,Er),br.subVectors(e.a,Er),xr.subVectors(e.b,Er),Sr.subVectors(e.c,Er),Cr.subVectors(xr,br),wr.subVectors(Sr,xr),Tr.subVectors(br,Sr);let t=[0,-Cr.z,Cr.y,0,-wr.z,wr.y,0,-Tr.z,Tr.y,Cr.z,0,-Cr.x,wr.z,0,-wr.x,Tr.z,0,-Tr.x,-Cr.y,Cr.x,0,-wr.y,wr.x,0,-Tr.y,Tr.x,0];return!Ar(t,br,xr,Sr,Dr)||(t=[1,0,0,0,1,0,0,0,1],!Ar(t,br,xr,Sr,Dr))?!1:(Or.crossVectors(Cr,wr),t=[Or.x,Or.y,Or.z],Ar(t,br,xr,Sr,Dr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_r[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_r[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_r[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_r[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_r[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_r[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_r[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_r[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_r),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},_r=[new W,new W,new W,new W,new W,new W,new W,new W],vr=new W,yr=new gr,br=new W,xr=new W,Sr=new W,Cr=new W,wr=new W,Tr=new W,Er=new W,Dr=new W,Or=new W,kr=new W;function Ar(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){kr.fromArray(e,a);let o=i.x*Math.abs(kr.x)+i.y*Math.abs(kr.y)+i.z*Math.abs(kr.z),s=t.dot(kr),c=n.dot(kr),l=r.dot(kr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var jr=Mr();function Mr(){let e=new ArrayBuffer(4),t=new Float32Array(e),n=new Uint32Array(e),r=new Uint32Array(512),i=new Uint32Array(512);for(let e=0;e<256;++e){let t=e-127;t<-27?(r[e]=0,r[e|256]=32768,i[e]=24,i[e|256]=24):t<-14?(r[e]=1024>>-t-14,r[e|256]=1024>>-t-14|32768,i[e]=-t-1,i[e|256]=-t-1):t<=15?(r[e]=t+15<<10,r[e|256]=t+15<<10|32768,i[e]=13,i[e|256]=13):t<128?(r[e]=31744,r[e|256]=64512,i[e]=24,i[e|256]=24):(r[e]=31744,r[e|256]=64512,i[e]=13,i[e|256]=13)}let a=new Uint32Array(2048),o=new Uint32Array(64),s=new Uint32Array(64);for(let e=1;e<1024;++e){let t=e<<13,n=0;for(;!(t&8388608);)t<<=1,n-=8388608;t&=-8388609,n+=947912704,a[e]=t|n}for(let e=1024;e<2048;++e)a[e]=939524096+(e-1024<<13);for(let e=1;e<31;++e)o[e]=e<<23;o[31]=1199570944,o[32]=2147483648;for(let e=33;e<63;++e)o[e]=2147483648+(e-32<<23);o[63]=3347054592;for(let e=1;e<64;++e)e!==32&&(s[e]=1024);return{floatView:t,uint32View:n,baseTable:r,shiftTable:i,mantissaTable:a,exponentTable:o,offsetTable:s}}function Nr(e){Math.abs(e)>65504&&R(`DataUtils.toHalfFloat(): Value out of range.`),e=B(e,-65504,65504),jr.floatView[0]=e;let t=jr.uint32View[0],n=t>>23&511;return jr.baseTable[n]+((t&8388607)>>jr.shiftTable[n])}function Pr(e){let t=e>>10;return jr.uint32View[0]=jr.mantissaTable[jr.offsetTable[t]+(e&1023)]+jr.exponentTable[t],jr.floatView[0]}var Fr=class{static toHalfFloat(e){return Nr(e)}static fromHalfFloat(e){return Pr(e)}},Ir=new W,Lr=new U,Rr=0,zr=class extends Et{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Rr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=mt,this.updateRanges=[],this.gpuType=se,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Lr.fromBufferAttribute(this,t),Lr.applyMatrix3(e),this.setXY(t,Lr.x,Lr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ir.fromBufferAttribute(this,t),Ir.applyMatrix3(e),this.setXYZ(t,Ir.x,Ir.y,Ir.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ir.fromBufferAttribute(this,t),Ir.applyMatrix4(e),this.setXYZ(t,Ir.x,Ir.y,Ir.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ir.fromBufferAttribute(this,t),Ir.applyNormalMatrix(e),this.setXYZ(t,Ir.x,Ir.y,Ir.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ir.fromBufferAttribute(this,t),Ir.transformDirection(e),this.setXYZ(t,Ir.x,Ir.y,Ir.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Xt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=V(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Xt(t,this.array)),t}setX(e,t){return this.normalized&&(t=V(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Xt(t,this.array)),t}setY(e,t){return this.normalized&&(t=V(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Xt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=V(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Xt(t,this.array)),t}setW(e,t){return this.normalized&&(t=V(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=V(t,this.array),n=V(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=V(t,this.array),n=V(n,this.array),r=V(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=V(t,this.array),n=V(n,this.array),r=V(r,this.array),i=V(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Br=class extends zr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Vr=class extends zr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Y=class extends zr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Hr=new gr,Ur=new W,Wr=new W,Gr=class{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Hr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ur.subVectors(e,this.center);let t=Ur.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Ur,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ur.copy(e.center).add(Wr)),this.expandByPoint(Ur.copy(e.center).sub(Wr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Kr=0,qr=new yn,Jr=new Kn,Yr=new W,Xr=new gr,Zr=new gr,Qr=new W,$r=class e extends Et{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kr++}),this.uuid=jt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(gt(e)?Vr:Br)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new G().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qr.makeRotationFromQuaternion(e),this.applyMatrix4(qr),this}rotateX(e){return qr.makeRotationX(e),this.applyMatrix4(qr),this}rotateY(e){return qr.makeRotationY(e),this.applyMatrix4(qr),this}rotateZ(e){return qr.makeRotationZ(e),this.applyMatrix4(qr),this}translate(e,t,n){return qr.makeTranslation(e,t,n),this.applyMatrix4(qr),this}scale(e,t,n){return qr.makeScale(e,t,n),this.applyMatrix4(qr),this}lookAt(e){return Jr.lookAt(e),Jr.updateMatrix(),this.applyMatrix4(Jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yr).negate(),this.translate(Yr.x,Yr.y,Yr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Y(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&R(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){z(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Xr.setFromBufferAttribute(n),this.morphTargetsRelative?(Qr.addVectors(this.boundingBox.min,Xr.min),this.boundingBox.expandByPoint(Qr),Qr.addVectors(this.boundingBox.max,Xr.max),this.boundingBox.expandByPoint(Qr)):(this.boundingBox.expandByPoint(Xr.min),this.boundingBox.expandByPoint(Xr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&z(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){z(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new W,1/0);return}if(e){let n=this.boundingSphere.center;if(Xr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Zr.setFromBufferAttribute(n),this.morphTargetsRelative?(Qr.addVectors(Xr.min,Zr.min),Xr.expandByPoint(Qr),Qr.addVectors(Xr.max,Zr.max),Xr.expandByPoint(Qr)):(Xr.expandByPoint(Zr.min),Xr.expandByPoint(Zr.max))}Xr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Qr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Qr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Qr.fromBufferAttribute(a,t),o&&(Yr.fromBufferAttribute(e,t),Qr.add(Yr)),r=Math.max(r,n.distanceToSquared(Qr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&z(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){z(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new zr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new W,s[e]=new W;let c=new W,l=new W,u=new W,d=new U,f=new U,p=new U,m=new W,h=new W;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new W,y=new W,b=new W,x=new W;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new zr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new W,i=new W,a=new W,o=new W,s=new W,c=new W,l=new W,u=new W;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Qr.fromBufferAttribute(e,t),Qr.normalize(),e.setXYZ(t,Qr.x,Qr.y,Qr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new zr(a,r,i)}if(this.index===null)return R(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},ei=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=mt,this.updateRanges=[],this.version=0,this.uuid=jt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},ti=new W,ni=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ti.fromBufferAttribute(this,t),ti.applyMatrix4(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ti.fromBufferAttribute(this,t),ti.applyNormalMatrix(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ti.fromBufferAttribute(this,t),ti.transformDirection(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Xt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=V(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=V(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=V(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=V(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=V(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Xt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Xt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Xt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Xt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=V(t,this.array),n=V(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=V(t,this.array),n=V(n,this.array),r=V(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=V(t,this.array),n=V(n,this.array),r=V(r,this.array),i=V(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){xt(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new zr(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){xt(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ri=new W,ii=new W,ai=new G,oi=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=ri.subVectors(n,t).cross(ii.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(ri),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||ai.getNormalMatrix(e),r=this.coplanarPoint(ri).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},si=0,ci=class extends Et{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:si++}),this.uuid=jt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new J(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pt,this.stencilZFail=pt,this.stencilZPass=pt,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){R(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){R(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new J().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new oi().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new U().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new U().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},li=class extends ci{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new J(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ui,di=new W,fi=new W,pi=new W,mi=new U,hi=new U,gi=new yn,_i=new W,vi=new W,yi=new W,bi=new U,xi=new U,Si=new U,Ci=class extends Kn{constructor(e=new li){if(super(),this.isSprite=!0,this.type=`Sprite`,ui===void 0){ui=new $r;let e=new ei(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);ui.setIndex([0,1,2,0,2,3]),ui.setAttribute(`position`,new ni(e,3,0,!1)),ui.setAttribute(`uv`,new ni(e,2,3,!1))}this.geometry=ui,this.material=e,this.center=new U(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&z(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),fi.setFromMatrixScale(this.matrixWorld),gi.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),pi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&fi.multiplyScalar(-pi.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;wi(_i.set(-.5,-.5,0),pi,a,fi,r,i),wi(vi.set(.5,-.5,0),pi,a,fi,r,i),wi(yi.set(.5,.5,0),pi,a,fi,r,i),bi.set(0,0),xi.set(1,0),Si.set(1,1);let o=e.ray.intersectTriangle(_i,vi,yi,!1,di);if(o===null&&(wi(vi.set(-.5,.5,0),pi,a,fi,r,i),xi.set(0,1),o=e.ray.intersectTriangle(_i,yi,vi,!1,di),o===null))return;let s=e.ray.origin.distanceTo(di);s<e.near||s>e.far||t.push({distance:s,point:di.clone(),uv:hr.getInterpolation(di,_i,vi,yi,bi,xi,Si,new U),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function wi(e,t,n,r,i,a){mi.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?hi.copy(mi):(hi.x=a*mi.x-i*mi.y,hi.y=i*mi.x+a*mi.y),e.copy(t),e.x+=hi.x,e.y+=hi.y,e.applyMatrix4(gi)}var Ti=new W,Ei=new W,Di=new W,Oi=new W,ki=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ti)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ti.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ti.copy(this.origin).addScaledVector(this.direction,t),Ti.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ei.copy(e).add(t).multiplyScalar(.5),Di.copy(t).sub(e).normalize(),Oi.copy(this.origin).sub(Ei);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Di),o=Oi.dot(this.direction),s=-Oi.dot(Di),c=Oi.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Ei).addScaledVector(Di,d),f}intersectSphere(e,t){if(e.radius<0)return null;Ti.subVectors(e.center,this.origin);let n=Ti.dot(this.direction),r=Ti.dot(Ti)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Ti)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,ee,te;if(y>=b&&y>=x?(w=s,D=u,A=p,te=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,ee=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,ee=_)):b>=x?(w=c,D=d,A=m,te=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,ee=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,ee=v)):(w=l,D=f,A=h,te=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,ee=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,ee=g)),w===0)return null;let ne=S/w,M=C/w,re=1/w,ie=T-ne*D,ae=E-M*D,oe=O-ne*A,se=k-M*A,N=j-ne*te,ce=ee-M*te,le=N*se-ce*oe,ue=ie*ce-ae*N,de=oe*ae-se*ie;if(r){if(le<0||ue<0||de<0)return null}else if((le<0||ue<0||de<0)&&(le>0||ue>0||de>0))return null;let fe=le+ue+de;if(fe===0)return null;let pe=re*(le*D+ue*A+de*te);return(fe>0?pe<0:pe>0)?null:this.at(pe/fe,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ai=class extends ci{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ji=new yn,Mi=new ki,Ni=new Gr,Pi=new W,Fi=new W,Ii=new W,Li=new W,Ri=new W,zi=new W,Bi=new W,Vi=new W,Hi=class extends Kn{constructor(e=new $r,t=new Ai){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){zi.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Ri.fromBufferAttribute(s,e),a?zi.addScaledVector(Ri,r):zi.addScaledVector(Ri.sub(t),r))}t.add(zi)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ni.copy(n.boundingSphere),Ni.applyMatrix4(i),Mi.copy(e.ray).recast(e.near),!(Ni.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(Ni,Pi)===null||Mi.origin.distanceToSquared(Pi)>(e.far-e.near)**2))&&(ji.copy(i).invert(),Mi.copy(e.ray).applyMatrix4(ji),(n.boundingBox===null||Mi.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Mi)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Wi(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Wi(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Wi(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Wi(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Ui(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Vi.copy(s),Vi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Vi);return l<n.near||l>n.far?null:{distance:l,point:Vi.clone(),object:e}}function Wi(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Fi),e.getVertexPosition(c,Ii),e.getVertexPosition(l,Li);let u=Ui(e,t,n,r,Fi,Ii,Li,Bi);if(u){let e=new W;hr.getBarycoord(Bi,Fi,Ii,Li,e),i&&(u.uv=hr.getInterpolatedAttribute(i,s,c,l,e,new U)),a&&(u.uv1=hr.getInterpolatedAttribute(a,s,c,l,e,new U)),o&&(u.normal=hr.getInterpolatedAttribute(o,s,c,l,e,new W),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new W,materialIndex:0};hr.getNormal(Fi,Ii,Li,t.normal),u.face=t,u.barycoord=e}return u}var Gi=class extends mn{constructor(e=null,t=1,n=1,r,i,a,o,s,c=O,l=O,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ki=new Gr,qi=new U(.5,.5),Ji=new W,Yi=class{constructor(e=new oi,t=new oi,n=new oi,r=new oi,i=new oi,a=new oi){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ht,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ki)}intersectsSprite(e){return Ki.center.set(0,0,0),Ki.radius=.7071067811865476+qi.distanceTo(e.center),Ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ki)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Ji.x=r.normal.x>0?e.max.x:e.min.x,Ji.y=r.normal.y>0?e.max.y:e.min.y,Ji.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ji)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Xi=class extends ci{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new J(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Zi=new W,Qi=new W,$i=new yn,ea=new ki,ta=new Gr,na=new W,ra=new W,ia=class extends Kn{constructor(e=new $r,t=new Xi){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Zi.fromBufferAttribute(t,e-1),Qi.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Zi.distanceTo(Qi);e.setAttribute(`lineDistance`,new Y(n,1))}else R(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ta.copy(n.boundingSphere),ta.applyMatrix4(r),ta.radius+=i,e.ray.intersectsSphere(ta)===!1)return;$i.copy(r).invert(),ea.copy(e.ray).applyMatrix4($i);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=aa(this,e,ea,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=aa(this,e,ea,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=aa(this,e,ea,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=aa(this,e,ea,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function aa(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Zi.fromBufferAttribute(s,i),Qi.fromBufferAttribute(s,a),n.distanceSqToSegment(Zi,Qi,na,ra)>r)return;na.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(na);if(!(c<t.near||c>t.far))return{distance:c,point:ra.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var oa=new W,sa=new W,ca=class extends ia{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)oa.fromBufferAttribute(t,e),sa.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+oa.distanceTo(sa);e.setAttribute(`lineDistance`,new Y(n,1))}else R(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},la=class extends ia{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type=`LineLoop`}},ua=class extends ci{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new J(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},da=new yn,fa=new ki,pa=new Gr,ma=new W,ha=class extends Kn{constructor(e=new $r,t=new ua){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pa.copy(n.boundingSphere),pa.applyMatrix4(r),pa.radius+=i,e.ray.intersectsSphere(pa)===!1)return;da.copy(r).invert(),fa.copy(e.ray).applyMatrix4(da);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);ma.fromBufferAttribute(l,n),ga(ma,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)ma.fromBufferAttribute(l,a),ga(ma,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ga(e,t,n,r,i,a,o){let s=fa.distanceSqToPoint(e);if(s<n){let n=new W;fa.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var _a=class extends mn{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},va=class extends mn{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ya=class extends mn{constructor(e,t,n=oe,r,i,a,o=O,s=O,c,l=ge,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new un(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ba=class extends ya{constructor(e,t=oe,n=301,r,i,a=O,o=O,s,c=ge){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},xa=class extends mn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Sa=class e extends $r{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Y(c,3)),this.setAttribute(`normal`,new Y(l,3)),this.setAttribute(`uv`,new Y(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new W;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ca=class e extends $r{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Y(i,3)),this.setAttribute(`normal`,new Y(i.slice(),3)),this.setAttribute(`uv`,new Y(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new W,r=new W,i=new W;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new W;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new W;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new W,t=new W,n=new W,r=new W,o=new U,s=new U,c=new U;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},wa=class e extends Ca{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ta=class e extends $r{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Y(p,3)),this.setAttribute(`normal`,new Y(m,3)),this.setAttribute(`uv`,new Y(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Ea=class e extends $r{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new W,d=new W,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Y(p,3)),this.setAttribute(`normal`,new Y(m,3)),this.setAttribute(`uv`,new Y(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Da=class extends $r{constructor(e=null){if(super(),this.type=`WireframeGeometry`,this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new W,i=new W;if(e.index!==null){let a=e.attributes.position,o=e.index,s=e.groups;s.length===0&&(s=[{start:0,count:o.count,materialIndex:0}]);for(let e=0,c=s.length;e<c;++e){let c=s[e],l=c.start,u=c.count;for(let e=l,s=l+u;e<s;e+=3)for(let s=0;s<3;s++){let c=o.getX(e+s),l=o.getX(e+(s+1)%3);r.fromBufferAttribute(a,c),i.fromBufferAttribute(a,l),Oa(r,i,n)===!0&&(t.push(r.x,r.y,r.z),t.push(i.x,i.y,i.z))}}}else{let a=e.attributes.position;for(let e=0,o=a.count/3;e<o;e++)for(let o=0;o<3;o++){let s=3*e+o,c=3*e+(o+1)%3;r.fromBufferAttribute(a,s),i.fromBufferAttribute(a,c),Oa(r,i,n)===!0&&(t.push(r.x,r.y,r.z),t.push(i.x,i.y,i.z))}}this.setAttribute(`position`,new Y(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Oa(e,t,n){let r=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;return n.has(r)===!0||n.has(i)===!0?!1:(n.add(r),n.add(i),!0)}function ka(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(ja(i))i.isRenderTargetTexture?(R(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(ja(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Aa(e){let t={};for(let n=0;n<e.length;n++){let r=ka(e[n]);for(let e in r)t[e]=r[e]}return t}function ja(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Ma(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Na(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:K.workingColorSpace}var Pa={clone:ka,merge:Aa},Fa=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ia=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,La=class extends ci{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fa,this.fragmentShader=Ia,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ka(e.uniforms),this.uniformsGroups=Ma(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new J().setHex(r.value);break;case`v2`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new q().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new yn().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ra=class extends La{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},za=class extends ci{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new J(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new J(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ba=class extends ci{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=ct,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Va=class extends ci{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ha(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Ua(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Wa=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Ga=class extends Wa{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:at,endingEnd:at}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case ot:i=e,o=2*t-n;break;case st:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case ot:a=e,s=2*n-t;break;case st:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ka=class extends Wa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},qa=class extends Wa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ja=class extends Wa{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Za(n,t,g,y,r);i[p]=Ya(x,o,_,b,m)}return i}};function Ya(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Xa(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Za(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Ya(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Xa(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Qa=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Ha(t,this.TimeBufferType),this.values=Ha(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ha(e.times,Array),values:Ha(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Ua(e.settings)&&(n.settings={inTangents:Ha(e.settings.inTangents,Array),outTangents:Ha(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ka(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ga(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ja(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case tt:t=this.InterpolantFactoryMethodDiscrete;break;case nt:t=this.InterpolantFactoryMethodLinear;break;case rt:t=this.InterpolantFactoryMethodSmooth;break;case it:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return R(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tt;case this.InterpolantFactoryMethodLinear:return nt;case this.InterpolantFactoryMethodSmooth:return rt;case this.InterpolantFactoryMethodBezier:return it}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Ua(this.settings)&&($a(this.settings.inTangents,e),$a(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(z(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(z(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){z(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){z(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&_t(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){z(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===rt,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Ua(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function $a(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Qa.prototype.ValueTypeName=``,Qa.prototype.TimeBufferType=Float32Array,Qa.prototype.ValueBufferType=Float32Array,Qa.prototype.DefaultInterpolation=nt;var eo=class extends Qa{constructor(e,t,n){super(e,t,n)}};eo.prototype.ValueTypeName=`bool`,eo.prototype.ValueBufferType=Array,eo.prototype.DefaultInterpolation=tt,eo.prototype.InterpolantFactoryMethodLinear=void 0,eo.prototype.InterpolantFactoryMethodSmooth=void 0;var to=class extends Qa{constructor(e,t,n,r){super(e,t,n,r)}};to.prototype.ValueTypeName=`color`;var no=class extends Qa{constructor(e,t,n,r){super(e,t,n,r)}};no.prototype.ValueTypeName=`number`;var ro=class extends Wa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Zt.slerpFlat(i,0,a,c-o,a,c,s);return i}},io=class extends Qa{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new ro(this.times,this.values,this.getValueSize(),e)}};io.prototype.ValueTypeName=`quaternion`,io.prototype.InterpolantFactoryMethodSmooth=void 0;var ao=class extends Qa{constructor(e,t,n){super(e,t,n)}};ao.prototype.ValueTypeName=`string`,ao.prototype.ValueBufferType=Array,ao.prototype.DefaultInterpolation=tt,ao.prototype.InterpolantFactoryMethodLinear=void 0,ao.prototype.InterpolantFactoryMethodSmooth=void 0;var oo=class extends Qa{constructor(e,t,n,r){super(e,t,n,r)}};oo.prototype.ValueTypeName=`vector`;var so={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(co(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!co(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function co(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var lo=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},uo=class{constructor(e){this.manager=e===void 0?lo:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};uo.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var fo=new WeakMap,po=class extends uo{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=so.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=fo.get(a);e===void 0&&(e=[],fo.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=vt(`img`);function s(){l(),t&&t(this);let n=fo.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}fo.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),so.remove(`image:${e}`);let n=fo.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}fo.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),so.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},mo=class extends uo{constructor(e){super(e)}load(e,t,n,r){let i=new mn,a=new po(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},ho=class extends Kn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new J(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},go=new yn,_o=new W,vo=new W,yo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new U(512,512),this.mapType=ne,this.map=null,this.mapPass=null,this.matrix=new yn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yi,this._frameExtents=new U(1,1),this._viewportCount=1,this._viewports=[new q(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;_o.setFromMatrixPosition(e.matrixWorld),t.position.copy(_o),vo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(vo),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){go.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(go,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(go)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},bo=new W,xo=new Zt,So=new W,Co=class extends Kn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new yn,this.projectionMatrix=new yn,this.projectionMatrixInverse=new yn,this.coordinateSystem=ht,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(bo,xo,So),So.x===1&&So.y===1&&So.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bo,xo,So.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(bo,xo,So),So.x===1&&So.y===1&&So.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bo,xo,So.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},wo=new W,To=new U,Eo=new U,Do=class extends Co{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=At*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(kt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return At*2*Math.atan(Math.tan(kt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){wo.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(wo.x,wo.y).multiplyScalar(-e/wo.z),wo.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(wo.x,wo.y).multiplyScalar(-e/wo.z)}getViewSize(e,t){return this.getViewBounds(e,To,Eo),t.subVectors(Eo,To)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(kt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Oo=class extends Co{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ko=class extends yo{constructor(){super(new Oo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ao=class extends ho{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Kn.DEFAULT_UP),this.updateMatrix(),this.target=new Kn,this.shadow=new ko}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},jo=class extends ho{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},Mo=class extends $r{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},No=new WeakMap,Po=class extends uo{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>`u`&&R(`ImageBitmapLoader: createImageBitmap() not supported.`),typeof fetch>`u`&&R(`ImageBitmapLoader: fetch() not supported.`),this.options={premultiplyAlpha:`none`},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=so.get(`image-bitmap:${e}`);if(a!==void 0){if(i.manager.itemStart(e),a.then){a.then(n=>{No.has(a)===!0?(r&&r(No.get(a)),i.manager.itemError(e),i.manager.itemEnd(e)):(t&&t(n),i.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin===`anonymous`?`same-origin`:`include`,o.headers=this.requestHeader,o.signal=typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let s=fetch(e,o).then(function(e){return e.blob()}).then(function(e){return createImageBitmap(e,Object.assign({},i.options,{colorSpaceConversion:`none`}))}).then(function(n){return so.add(`image-bitmap:${e}`,n),t&&t(n),i.manager.itemEnd(e),n}).catch(function(t){r&&r(t),No.set(s,t),so.remove(`image-bitmap:${e}`),i.manager.itemError(e),i.manager.itemEnd(e)});so.add(`image-bitmap:${e}`,s),i.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Fo=-90,Io=1,Lo=class extends Kn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Do(Fo,Io,e,t);r.layers=this.layers,this.add(r);let i=new Do(Fo,Io,e,t);i.layers=this.layers,this.add(i);let a=new Do(Fo,Io,e,t);a.layers=this.layers,this.add(a);let o=new Do(Fo,Io,e,t);o.layers=this.layers,this.add(o);let s=new Do(Fo,Io,e,t);s.layers=this.layers,this.add(s);let c=new Do(Fo,Io,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ro=class extends Do{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},zo=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Bo.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Bo(){this._document.hidden===!1&&this.reset()}var Vo=`\\[\\]\\.:\\/`,Ho=RegExp(`[\\[\\]\\.:\\/]`,`g`),Uo=`[^\\[\\]\\.:\\/]`,Wo=`[^`+Vo.replace(`\\.`,``)+`]`,Go=`((?:WC+[\\/:])*)`.replace(`WC`,Uo),Ko=`(WCOD+)?`.replace(`WCOD`,Wo),qo=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Uo),Jo=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Uo),Yo=RegExp(`^`+Go+Ko+qo+Jo+`$`),Xo=[`material`,`materials`,`bones`,`map`],Zo=class{constructor(e,t,n){let r=n||Qo.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Qo=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Ho,``)}static parseTrackName(e){let t=Yo.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Xo.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){R(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){z(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){z(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){z(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){z(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){z(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){z(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){z(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;z(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){z(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){z(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Qo.Composite=Zo,Qo.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Qo.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Qo.prototype.GetterByBindingType=[Qo.prototype._getValue_direct,Qo.prototype._getValue_array,Qo.prototype._getValue_arrayElement,Qo.prototype._getValue_toArray],Qo.prototype.SetterByBindingTypeAndVersioning=[[Qo.prototype._setValue_direct,Qo.prototype._setValue_direct_setNeedsUpdate,Qo.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Qo.prototype._setValue_array,Qo.prototype._setValue_array_setNeedsUpdate,Qo.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Qo.prototype._setValue_arrayElement,Qo.prototype._setValue_arrayElement_setNeedsUpdate,Qo.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Qo.prototype._setValue_fromArray,Qo.prototype._setValue_fromArray_setNeedsUpdate,Qo.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var $o=class extends ei{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}},es=new yn,ts=class{constructor(e,t,n=0,r=1/0){this.ray=new ki(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new An,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):z(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return es.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(es),this}intersectObject(e,t=!0,n=[]){return rs(e,this,n,t),n.sort(ns),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)rs(e[r],this,n,t);return n.sort(ns),n}};function ns(e,t){return e.distance-t.distance}function rs(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)rs(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});var is=new W,as=new W,os=new W,ss=new W,cs=new W,ls=new W,us=new W,ds=class{constructor(e=new W,t=new W){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){is.subVectors(e,this.start),as.subVectors(this.end,this.start);let n=as.dot(as);if(n===0)return 0;let r=as.dot(is)/n;return t&&(r=B(r,0,1)),r}closestPointToPoint(e,t,n){let r=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(r).add(this.start)}distanceSqToLine3(e,t=ls,n=us){let r=1e-8*1e-8,i,a,o=this.start,s=e.start,c=this.end,l=e.end;os.subVectors(c,o),ss.subVectors(l,s),cs.subVectors(o,s);let u=os.dot(os),d=ss.dot(ss),f=ss.dot(cs);if(u<=r&&d<=r)return t.copy(o),n.copy(s),t.sub(n),t.dot(t);if(u<=r)i=0,a=f/d,a=B(a,0,1);else{let e=os.dot(cs);if(d<=r)a=0,i=B(-e/u,0,1);else{let t=os.dot(ss),n=u*d-t*t;i=n===0?0:B((t*f-e*d)/n,0,1),a=(t*i+f)/d,a<0?(a=0,i=B(-e/u,0,1)):a>1&&(a=1,i=B((t-e)/u,0,1))}}return t.copy(o).addScaledVector(os,i),n.copy(s).addScaledVector(ss,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};function fs(e,t,n,r){let i=ps(r);switch(n){case pe:return e*t;case ve:return e*t/i.components*i.byteLength;case ye:return e*t/i.components*i.byteLength;case be:return e*t*2/i.components*i.byteLength;case xe:return e*t*2/i.components*i.byteLength;case me:return e*t*3/i.components*i.byteLength;case he:return e*t*4/i.components*i.byteLength;case Se:return e*t*4/i.components*i.byteLength;case Ce:case we:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Te:case Ee:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Oe:case Ae:return Math.max(e,16)*Math.max(t,8)/4;case De:case ke:return Math.max(e,8)*Math.max(t,8)/2;case je:case Me:case Pe:case P:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ne:case Fe:case Ie:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Le:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case F:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Re:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case I:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case L:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case ze:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Be:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Ve:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case He:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Ue:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case We:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Ge:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ke:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case qe:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Je:case Ye:case Xe:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ze:case Qe:return Math.ceil(e/4)*Math.ceil(t/4)*8;case $e:case et:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function ps(e){switch(e){case ne:case M:return{byteLength:1,components:1};case ie:case re:case N:return{byteLength:2,components:1};case ce:case le:return{byteLength:2,components:4};case oe:case ae:case se:return{byteLength:4,components:1};case de:case fe:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?R(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function ms(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function hs(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var X={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Z={common:{diffuse:{value:new J(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new G}},envmap:{envMap:{value:null},envMapRotation:{value:new G},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new G}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new G}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new G},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new G},normalScale:{value:new U(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new G},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new G}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new G}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new G}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new J(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new J(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0},uvTransform:{value:new G}},sprite:{diffuse:{value:new J(16777215)},opacity:{value:1},center:{value:new U(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}}},gs={basic:{uniforms:Aa([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:X.meshbasic_vert,fragmentShader:X.meshbasic_frag},lambert:{uniforms:Aa([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new J(0)},envMapIntensity:{value:1}}]),vertexShader:X.meshlambert_vert,fragmentShader:X.meshlambert_frag},phong:{uniforms:Aa([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new J(0)},specular:{value:new J(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:X.meshphong_vert,fragmentShader:X.meshphong_frag},standard:{uniforms:Aa([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new J(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag},toon:{uniforms:Aa([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new J(0)}}]),vertexShader:X.meshtoon_vert,fragmentShader:X.meshtoon_frag},matcap:{uniforms:Aa([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:X.meshmatcap_vert,fragmentShader:X.meshmatcap_frag},points:{uniforms:Aa([Z.points,Z.fog]),vertexShader:X.points_vert,fragmentShader:X.points_frag},dashed:{uniforms:Aa([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:X.linedashed_vert,fragmentShader:X.linedashed_frag},depth:{uniforms:Aa([Z.common,Z.displacementmap]),vertexShader:X.depth_vert,fragmentShader:X.depth_frag},normal:{uniforms:Aa([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:X.meshnormal_vert,fragmentShader:X.meshnormal_frag},sprite:{uniforms:Aa([Z.sprite,Z.fog]),vertexShader:X.sprite_vert,fragmentShader:X.sprite_frag},background:{uniforms:{uvTransform:{value:new G},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:X.background_vert,fragmentShader:X.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new G}},vertexShader:X.backgroundCube_vert,fragmentShader:X.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:X.cube_vert,fragmentShader:X.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:X.equirect_vert,fragmentShader:X.equirect_frag},distance:{uniforms:Aa([Z.common,Z.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:X.distance_vert,fragmentShader:X.distance_frag},shadow:{uniforms:Aa([Z.lights,Z.fog,{color:{value:new J(0)},opacity:{value:1}}]),vertexShader:X.shadow_vert,fragmentShader:X.shadow_frag}};gs.physical={uniforms:Aa([gs.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new G},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new G},clearcoatNormalScale:{value:new U(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new G},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new G},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new G},sheen:{value:0},sheenColor:{value:new J(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new G},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new G},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new G},transmissionSamplerSize:{value:new U},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new G},attenuationDistance:{value:0},attenuationColor:{value:new J(0)},specularColor:{value:new J(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new G},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new G},anisotropyVector:{value:new U},anisotropyMap:{value:null},anisotropyMapTransform:{value:new G}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag};var _s={r:0,b:0,g:0},vs=new yn,ys=new G;ys.set(-1,0,0,0,1,0,0,0,1);function bs(e,t,n,r,i,a){let o=new J(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Hi(new Sa(1,1,1),new La({name:`BackgroundCubeMaterial`,uniforms:ka(gs.backgroundCube.uniforms),vertexShader:gs.backgroundCube.vertexShader,fragmentShader:gs.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(vs.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ys),l.material.toneMapped=K.getTransfer(i.colorSpace)!==ft,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Hi(new Ta(2,2),new La({name:`BackgroundMaterial`,uniforms:ka(gs.background.uniforms),vertexShader:gs.background.vertexShader,fragmentShader:gs.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=K.getTransfer(i.colorSpace)!==ft,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(_s,Na(e)),n.buffers.color.setClear(_s.r,_s.g,_s.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function xs(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Ss(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Cs(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(R(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&R(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function ws(e){let t=this,n=null,r=0,i=!1,a=!1,o=new oi,s=new G,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Ts=4,Es=6,Ds=20,Os=256,ks=new Oo,As=new J,js=null,Ms=0,Ns=0,Ps=!1,Fs=new W,Is=new W,Ls=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Fs}=i;js=this._renderer.getRenderTarget(),Ms=this._renderer.getActiveCubeFace(),Ns=this._renderer.getActiveMipmapLevel(),Ps=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ws(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Us(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(js,Ms,Ns),this._renderer.xr.enabled=Ps,e.scissorTest=!1,Bs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),js=this._renderer.getRenderTarget(),Ms=this._renderer.getActiveCubeFace(),Ns=this._renderer.getActiveMipmapLevel(),Ps=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:j,minFilter:j,generateMipmaps:!1,type:N,format:he,colorSpace:ut,depthBuffer:!1},r=zs(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zs(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Rs(r)),this._blurMaterial=Hs(r,e,t),this._ggxMaterial=Vs(r,e,t)}return r}_compileMaterial(e){let t=new Hi(new $r,e);this._renderer.compile(t,ks)}_sceneToCubeUV(e,t,n,r,i){let a=new Do(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(As),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Hi(new Sa,new Ai({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(As),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Bs(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ws()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Us());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Bs(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,ks)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Ts?n-d+Ts:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Bs(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,ks),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Bs(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,ks)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Bs(t,3*l*(r>this._lodMax-Ts?r-this._lodMax+Ts:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,ks)}};function Rs(e){let t=[],n=[],r=e,i=e-Ts+1+Es;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Is.set(1,r,n):e===1?Is.set(-n,1,-r):e===2?Is.set(-n,r,1):e===3?Is.set(-1,r,-n):e===4?Is.set(-n,-1,r):Is.set(n,r,-1),Is.toArray(l,(e*6+t)*3)}}let u=new $r;u.setAttribute(`position`,new zr(c,3)),u.setAttribute(`outputDirection`,new zr(l,3)),n.push(new Hi(u,null)),r>Ts&&r--}return{lodMeshes:n,sizeLods:t}}function zs(e,t,n){let r=new gn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Bs(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Vs(e,t,n){return new La({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Os,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Gs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Hs(e,t,n){return new La({name:`SphericalGaussianBlur`,defines:{SAMPLES:Ds,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Gs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Us(){return new La({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Gs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ws(){return new La({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Gs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Gs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ks=class extends gn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new _a(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Sa(5,5,5),i=new La({name:`CubemapFromEquirect`,uniforms:ka(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Hi(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=j),new Lo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function qs(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Ks(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Ls(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Ls(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Js(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ct(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Ys(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Vr:Br)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Xs(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Zs(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:z(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Qs(e,t,n){let r=new WeakMap,i=new q;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new _n(h,p,m,u);g.type=se,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new U(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function $s(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var ec={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function tc(e,t,n,r,i,a){let o=new gn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new $r;l.setAttribute(`position`,new Y([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new Y([0,2,0,0,2,0],2));let u=new Ra({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Hi(l,u),f=new Oo(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new gn(t,n,{type:N,depthBuffer:!1,stencilBuffer:!1}),c=new gn(t,n,{type:N,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},K.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=ec[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var nc=new mn,rc=new ya(1,1),ic=new _n,ac=new vn,oc=new _a,sc=[],cc=[],lc=new Float32Array(16),uc=new Float32Array(9),dc=new Float32Array(4);function fc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=sc[i];if(a===void 0&&(a=new Float32Array(i),sc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function pc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function mc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function hc(e,t){let n=cc[t];n===void 0&&(n=new Int32Array(t),cc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function gc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function _c(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(pc(n,t))return;e.uniform2fv(this.addr,t),mc(n,t)}}function vc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(pc(n,t))return;e.uniform3fv(this.addr,t),mc(n,t)}}function yc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(pc(n,t))return;e.uniform4fv(this.addr,t),mc(n,t)}}function bc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(pc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),mc(n,t)}else{if(pc(n,r))return;dc.set(r),e.uniformMatrix2fv(this.addr,!1,dc),mc(n,r)}}function xc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(pc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),mc(n,t)}else{if(pc(n,r))return;uc.set(r),e.uniformMatrix3fv(this.addr,!1,uc),mc(n,r)}}function Sc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(pc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),mc(n,t)}else{if(pc(n,r))return;lc.set(r),e.uniformMatrix4fv(this.addr,!1,lc),mc(n,r)}}function Cc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function wc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(pc(n,t))return;e.uniform2iv(this.addr,t),mc(n,t)}}function Tc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(pc(n,t))return;e.uniform3iv(this.addr,t),mc(n,t)}}function Ec(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(pc(n,t))return;e.uniform4iv(this.addr,t),mc(n,t)}}function Dc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Oc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(pc(n,t))return;e.uniform2uiv(this.addr,t),mc(n,t)}}function kc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(pc(n,t))return;e.uniform3uiv(this.addr,t),mc(n,t)}}function Ac(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(pc(n,t))return;e.uniform4uiv(this.addr,t),mc(n,t)}}function jc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(rc.compareFunction=n.isReversedDepthBuffer()?518:515,a=rc):a=nc,n.setTexture2D(t||a,i)}function Mc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||ac,i)}function Nc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||oc,i)}function Pc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||ic,i)}function Fc(e){switch(e){case 5126:return gc;case 35664:return _c;case 35665:return vc;case 35666:return yc;case 35674:return bc;case 35675:return xc;case 35676:return Sc;case 5124:case 35670:return Cc;case 35667:case 35671:return wc;case 35668:case 35672:return Tc;case 35669:case 35673:return Ec;case 5125:return Dc;case 36294:return Oc;case 36295:return kc;case 36296:return Ac;case 35678:case 36198:case 36298:case 36306:case 35682:return jc;case 35679:case 36299:case 36307:return Mc;case 35680:case 36300:case 36308:case 36293:return Nc;case 36289:case 36303:case 36311:case 36292:return Pc}}function Ic(e,t){e.uniform1fv(this.addr,t)}function Lc(e,t){let n=fc(t,this.size,2);e.uniform2fv(this.addr,n)}function Rc(e,t){let n=fc(t,this.size,3);e.uniform3fv(this.addr,n)}function zc(e,t){let n=fc(t,this.size,4);e.uniform4fv(this.addr,n)}function Bc(e,t){let n=fc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Vc(e,t){let n=fc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Hc(e,t){let n=fc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Uc(e,t){e.uniform1iv(this.addr,t)}function Wc(e,t){e.uniform2iv(this.addr,t)}function Gc(e,t){e.uniform3iv(this.addr,t)}function Kc(e,t){e.uniform4iv(this.addr,t)}function qc(e,t){e.uniform1uiv(this.addr,t)}function Jc(e,t){e.uniform2uiv(this.addr,t)}function Yc(e,t){e.uniform3uiv(this.addr,t)}function Xc(e,t){e.uniform4uiv(this.addr,t)}function Zc(e,t,n){let r=this.cache,i=t.length,a=hc(n,i);pc(r,a)||(e.uniform1iv(this.addr,a),mc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?rc:nc;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Qc(e,t,n){let r=this.cache,i=t.length,a=hc(n,i);pc(r,a)||(e.uniform1iv(this.addr,a),mc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||ac,a[e])}function $c(e,t,n){let r=this.cache,i=t.length,a=hc(n,i);pc(r,a)||(e.uniform1iv(this.addr,a),mc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||oc,a[e])}function el(e,t,n){let r=this.cache,i=t.length,a=hc(n,i);pc(r,a)||(e.uniform1iv(this.addr,a),mc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||ic,a[e])}function tl(e){switch(e){case 5126:return Ic;case 35664:return Lc;case 35665:return Rc;case 35666:return zc;case 35674:return Bc;case 35675:return Vc;case 35676:return Hc;case 5124:case 35670:return Uc;case 35667:case 35671:return Wc;case 35668:case 35672:return Gc;case 35669:case 35673:return Kc;case 5125:return qc;case 36294:return Jc;case 36295:return Yc;case 36296:return Xc;case 35678:case 36198:case 36298:case 36306:case 35682:return Zc;case 35679:case 36299:case 36307:return Qc;case 35680:case 36300:case 36308:case 36293:return $c;case 36289:case 36303:case 36311:case 36292:return el}}var nl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Fc(t.type)}},rl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tl(t.type)}},il=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},al=/(\w+)(\])?(\[|\.)?/g;function ol(e,t){e.seq.push(t),e.map[t.id]=t}function sl(e,t,n){let r=e.name,i=r.length;for(al.lastIndex=0;;){let a=al.exec(r),o=al.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){ol(n,l===void 0?new nl(s,e,t):new rl(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new il(s),ol(n,e)),n=e}}}var cl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);sl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function ll(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var ul=37297,dl=0;function fl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var pl=new G;function ml(e){K._getMatrix(pl,K.workingColorSpace,e);let t=`mat3( ${pl.elements.map(e=>e.toFixed(4))} )`;switch(K.getTransfer(e)){case dt:return[t,`LinearTransferOETF`];case ft:return[t,`sRGBTransferOETF`];default:return R(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function hl(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+fl(e.getShaderSource(t),r)}return i}function gl(e,t){let n=ml(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var _l={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function vl(e,t){let n=_l[t];return n===void 0?(R(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var yl=new W;function bl(){return K.getLuminanceCoefficients(yl),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${yl.x.toFixed(4)}, ${yl.y.toFixed(4)}, ${yl.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function xl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(wl).join(`
`)}function Sl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Cl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function wl(e){return e!==``}function Tl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function El(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Dl=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ol(e){return e.replace(Dl,Al)}var kl=new Map;function Al(e,t){let n=X[t];if(n===void 0){let e=kl.get(t);if(e!==void 0)n=X[e],R(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Ol(n)}var jl=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ml(e){return e.replace(jl,Nl)}function Nl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Pl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Fl={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Il(e){return Fl[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Ll={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Rl(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Ll[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var zl={302:`ENVMAP_MODE_REFRACTION`};function Bl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:zl[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Vl={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Hl(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Vl[e.combine]||`ENVMAP_BLENDING_NONE`}function Ul(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Wl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Il(n),l=Rl(n),u=Bl(n),d=Hl(n),f=Ul(n),p=xl(n),m=Sl(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(wl).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(wl).join(`
`),_.length>0&&(_+=`
`)):(g=[Pl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(wl).join(`
`),_=[Pl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:X.tonemapping_pars_fragment,n.toneMapping===0?``:vl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,X.colorspace_pars_fragment,gl(`linearToOutputTexel`,n.outputColorSpace),bl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(wl).join(`
`)),o=Ol(o),o=Tl(o,n),o=El(o,n),s=Ol(s),s=Tl(s,n),s=El(s,n),o=Ml(o),s=Ml(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=ll(i,i.VERTEX_SHADER,y),S=ll(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=hl(i,x,`vertex`),n=hl(i,S,`fragment`);z(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):R(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new cl(i,h),T=Cl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,ul)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=dl++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Gl=0,Kl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ql(e),t.set(e,n)),n}},ql=class{constructor(e){this.id=Gl++,this.code=e,this.usedTimes=0}};function Jl(e){return e===1030||e===37490||e===36285}function Yl(e,t,n,r,i,a){let o=new An,s=new Kl,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&R(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=gs[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),ee=e.state.buffers.depth.getReversed(),te=h.isInstancedMesh===!0,ne=h.isBatchedMesh===!0,M=!!i.map,re=!!i.matcap,ie=!!x,ae=!!i.aoMap,oe=!!i.lightMap,se=!!i.bumpMap&&i.wireframe===!1,N=!!i.normalMap,ce=!!i.displacementMap,le=!!i.emissiveMap,ue=!!i.metalnessMap,de=!!i.roughnessMap,fe=i.anisotropy>0,pe=i.clearcoat>0,me=i.dispersion>0,he=i.retroreflectivity>0,ge=i.iridescence>0,_e=i.sheen>0,ve=i.transmission>0,ye=fe&&!!i.anisotropyMap,be=pe&&!!i.clearcoatMap,xe=pe&&!!i.clearcoatNormalMap,Se=pe&&!!i.clearcoatRoughnessMap,Ce=ge&&!!i.iridescenceMap,we=ge&&!!i.iridescenceThicknessMap,Te=_e&&!!i.sheenColorMap,Ee=_e&&!!i.sheenRoughnessMap,De=!!i.specularMap,Oe=!!i.specularColorMap,ke=!!i.specularIntensityMap,Ae=ve&&!!i.transmissionMap,je=ve&&!!i.thicknessMap,Me=!!i.gradientMap,Ne=!!i.alphaMap,Pe=i.alphaTest>0,P=!!i.alphaHash,Fe=!!i.extensions,Ie=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ie=e.toneMapping);let Le={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ne,batchingColor:ne&&h._colorsTexture!==null,instancing:te,instancingColor:te&&h.instanceColor!==null,instancingMorph:te&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:K.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:M,matcap:re,envMap:ie,envMapMode:ie&&x.mapping,envMapCubeUVHeight:S,aoMap:ae,lightMap:oe,bumpMap:se,normalMap:N,displacementMap:ce,emissiveMap:le,normalMapObjectSpace:N&&i.normalMapType===1,normalMapTangentSpace:N&&i.normalMapType===0,packedNormalMap:N&&i.normalMapType===0&&Jl(i.normalMap.format),metalnessMap:ue,roughnessMap:de,anisotropy:fe,anisotropyMap:ye,clearcoat:pe,clearcoatMap:be,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,dispersion:me,retroreflection:he,iridescence:ge,iridescenceMap:Ce,iridescenceThicknessMap:we,sheen:_e,sheenColorMap:Te,sheenRoughnessMap:Ee,specularMap:De,specularColorMap:Oe,specularIntensityMap:ke,transmission:ve,transmissionMap:Ae,thicknessMap:je,gradientMap:Me,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ne,alphaTest:Pe,alphaHash:P,combine:i.combine,mapUv:M&&m(i.map.channel),aoMapUv:ae&&m(i.aoMap.channel),lightMapUv:oe&&m(i.lightMap.channel),bumpMapUv:se&&m(i.bumpMap.channel),normalMapUv:N&&m(i.normalMap.channel),displacementMapUv:ce&&m(i.displacementMap.channel),emissiveMapUv:le&&m(i.emissiveMap.channel),metalnessMapUv:ue&&m(i.metalnessMap.channel),roughnessMapUv:de&&m(i.roughnessMap.channel),anisotropyMapUv:ye&&m(i.anisotropyMap.channel),clearcoatMapUv:be&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:xe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:we&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(i.sheenRoughnessMap.channel),specularMapUv:De&&m(i.specularMap.channel),specularColorMapUv:Oe&&m(i.specularColorMap.channel),specularIntensityMapUv:ke&&m(i.specularIntensityMap.channel),transmissionMapUv:Ae&&m(i.transmissionMap.channel),thicknessMapUv:je&&m(i.thicknessMap.channel),alphaMapUv:Ne&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(N||fe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(M||Ne),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&N===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ee,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ie,decodeVideoTexture:M&&i.map.isVideoTexture===!0&&K.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:le&&i.emissiveMap.isVideoTexture===!0&&K.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Fe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Fe&&i.extensions.multiDraw===!0||ne)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=gs[t];n=Pa.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Wl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Xl(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Zl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ql(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function $l(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Zl),r.length>1&&r.sort(t||Ql),i.length>1&&i.sort(t||Ql)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function eu(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new $l,e.set(t,[i])):n>=r.length?(i=new $l,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function tu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new W,color:new J};break;case`SpotLight`:n={position:new W,direction:new W,color:new J,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new W,color:new J,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new W,skyColor:new J,groundColor:new J};break;case`RectAreaLight`:n={color:new J,position:new W,halfWidth:new W,halfHeight:new W}}return e[t.id]=n,n}}}function nu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var ru=0;function iu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function au(e){let t=new tu,n=nu(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new W);let i=new W,a=new yn,o=new yn;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(iu);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=ru++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function ou(e){let t=new au(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function su(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new ou(e),t.set(n,[a])):r>=i.length?(a=new ou(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var cu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,uu=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],du=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],fu=new yn,pu=new W,mu=new W;function hu(e,t,n){let r=new Yi,i=new U,a=new U,o=new q,s=new Ba,c=new Va,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new La({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new U},radius:{value:4}},vertexShader:cu,fragmentShader:lu}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new $r;m.setAttribute(`position`,new zr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Hi(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(R(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){R(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){R(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new gn(i.x,i.y,{format:be,type:N,minFilter:j,magFilter:j,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new ya(i.x,i.y,se),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=ge,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=O,d.map.depthTexture.magFilter=O}else l.isPointLight?(d.map=new Ks(i.x),d.map.depthTexture=new ba(i.x,oe)):(d.map=new gn(i.x,i.y),d.map.depthTexture=new ya(i.x,i.y,oe)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=ge,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=j,d.map.depthTexture.magFilter=j):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=O,d.map.depthTexture.magFilter=O);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),pu.setFromMatrixPosition(l.matrixWorld),e.position.copy(pu),mu.copy(e.position),mu.add(uu[t]),e.up.copy(du[t]),e.lookAt(mu),e.updateMatrixWorld(),n.makeTranslation(-pu.x,-pu.y,-pu.z),fu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(fu,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new gn(i.x,i.y,{format:be,type:N}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function gu(e,t){function n(){let t=!1,n=new q,r=null,i=new q(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ue(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Tt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ue(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),te=!1,ne=0,M=e.getParameter(e.VERSION);M.indexOf(`WebGL`)===-1?M.indexOf(`OpenGL ES`)!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(M)[1]),te=ne>=2):(ne=parseFloat(/^WebGL (\d)/.exec(M)[1]),te=ne>=1);let re=null,ie={},ae=e.getParameter(e.SCISSOR_BOX),oe=e.getParameter(e.VIEWPORT),se=new q().fromArray(ae),N=new q().fromArray(oe);function ce(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let le={};le[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ue(e.DEPTH_TEST),o.setFunc(3),ye(!1),be(1),ue(e.CULL_FACE),_e(0);function ue(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function de(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function fe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function pe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function me(t){return h!==t&&(e.useProgram(t),h=t,!0)}let he={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};he[103]=e.MIN,he[104]=e.MAX;let ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function _e(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(de(e.BLEND),g=!1);return}if(g===!1&&(ue(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:z(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:z(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:z(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:z(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(he[n],he[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ge[r],ge[i],ge[o],ge[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ve(t,n){t.side===2?de(e.CULL_FACE):ue(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ye(r),t.blending===1&&t.transparent===!1?_e(0):_e(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Se(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ue(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function ye(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function be(t){t===0?de(e.CULL_FACE):(ue(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function xe(t){t!==k&&(te&&e.lineWidth(t),k=t)}function Se(t,n,r){t?(ue(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):de(e.POLYGON_OFFSET_FILL)}function Ce(t){t?ue(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function we(t){t===void 0&&(t=e.TEXTURE0+ee-1),re!==t&&(e.activeTexture(t),re=t)}function Te(t,n,r){r===void 0&&(r=re===null?e.TEXTURE0+ee-1:re);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(re!==r&&(e.activeTexture(r),re=r),e.bindTexture(t,n||le[t]),i.type=t,i.texture=n)}function Ee(){let t=ie[re];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function De(){try{e.compressedTexImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Oe(){try{e.compressedTexImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function ke(){try{e.texSubImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ae(){try{e.texSubImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Me(){try{e.compressedTexSubImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ne(){try{e.texStorage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Pe(){try{e.texStorage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function P(){try{e.texImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Fe(){try{e.texImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ie(t){return d[t]===void 0?e.getParameter(t):d[t]}function Le(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function F(t){se.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),se.copy(t))}function Re(t){N.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),N.copy(t))}function I(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function L(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function ze(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},re=null,ie={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,se.set(0,0,e.canvas.width,e.canvas.height),N.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ue,disable:de,bindFramebuffer:fe,drawBuffers:pe,useProgram:me,setBlending:_e,setMaterial:ve,setFlipSided:ye,setCullFace:be,setLineWidth:xe,setPolygonOffset:Se,setScissorTest:Ce,activeTexture:we,bindTexture:Te,unbindTexture:Ee,compressedTexImage2D:De,compressedTexImage3D:Oe,texImage2D:P,texImage3D:Fe,pixelStorei:Le,getParameter:Ie,updateUBOMapping:I,uniformBlockBinding:L,texStorage2D:Ne,texStorage3D:Pe,texSubImage2D:ke,texSubImage3D:Ae,compressedTexSubImage2D:je,compressedTexSubImage3D:Me,scissor:F,viewport:Re,reset:ze}}function _u(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new U,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):vt(`canvas`)}function g(e,t,n){let r=1,i=Ie(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),R(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&R(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];R(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||R(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?dt:K.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,R(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),ne(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),re(t)}function ne(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&M(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function M(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function re(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let ie=0;function ae(){ie=0}function oe(){return ie}function se(e){ie=e}function N(){let e=ie;return e>=i.maxTextures&&R(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),ie+=1,e}function ce(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function le(t,i){let a=r.get(t);if(t.isVideoTexture&&P(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)R(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)R(`WebGLRenderer: Texture marked for update but image is incomplete`);else{xe(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function ue(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){xe(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function de(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){xe(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function fe(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){Se(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let pe={[T]:e.REPEAT,[E]:e.CLAMP_TO_EDGE,[D]:e.MIRRORED_REPEAT},me={[O]:e.NEAREST,[k]:e.NEAREST_MIPMAP_NEAREST,[A]:e.NEAREST_MIPMAP_LINEAR,[j]:e.LINEAR,[ee]:e.LINEAR_MIPMAP_NEAREST,[te]:e.LINEAR_MIPMAP_LINEAR},he={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ge(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&R(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,pe[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,pe[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,pe[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,me[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,me[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,he[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ve(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=ce(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&M(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ye(e,t,n){return Math.floor(Math.floor(e/n)/t)}function be(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ye(n.start,r.width,4),c=ye(t.start,r.width,4);n.start<=i+1&&a===c&&ye(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function xe(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ve(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=K.getPrimaries(K.workingColorSpace),r=o.colorSpace===``?null:K.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Fe(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);ge(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===_e,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&be(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=fs(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=fs(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Ie(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Ie(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Se(t,o,s){if(o.image.length!==6)return;let c=ve(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=K.getPrimaries(K.workingColorSpace),r=o.colorSpace===``?null:K.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Fe(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);ge(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Ie(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Ce(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Pe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Ne(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function we(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Pe(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);Pe(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Te(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),ge(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else le(i.depthTexture,0);let u=l.__webglTexture,d=Ne(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Pe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Pe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ee(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Te(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?Te(i.__webglFramebuffer[0],t,0):Te(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),we(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),we(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function De(t,n,i){let a=r.get(t);n!==void 0&&Ce(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Ee(t)}function Oe(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Pe(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ne(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),we(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ge(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Ce(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Ce(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),ge(c,a),Ce(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ge(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Ce(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Ce(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&Ee(t)}function ke(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let Ae=[],je=[];function Me(t){if(t.samples>0){if(Pe(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Ae.length=0,je.length=0,Ae.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(Ae.push(l),je.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,je)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ae))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ne(e){return Math.min(i.maxSamples,e.samples)}function Pe(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function P(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Fe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(K.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&R(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):z(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ie(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=ae,this.getTextureUnits=oe,this.setTextureUnits=se,this.setTexture2D=le,this.setTexture2DArray=ue,this.setTexture3D=de,this.setTextureCube=fe,this.rebindTextures=De,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=ke,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=Pe,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function vu(e,t){function n(n,r=``){let i,a=K.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var yu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,xu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new xa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new La({vertexShader:yu,fragmentShader:bu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Hi(new Ta(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Su=class extends Et{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new xu,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new U,C=null,w=null,T=new Do;T.viewport=new q;let E=new Do;E.viewport=new q;let D=[T,E],O=new Ro,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Yn,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Yn,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Yn,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,te);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,le.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&R(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&R(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,te),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?_e:ge,a=_.stencil?ue:oe);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new gn(d.textureWidth,d.textureHeight,{format:he,type:ne,depthTexture:new ya(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new gn(f.framebufferWidth,f.framebufferHeight,{format:he,type:ne,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),le.setContext(r),le.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function te(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let M=new W,re=new W;function ie(e,t,n){M.setFromMatrixPosition(t.matrixWorld),re.setFromMatrixPosition(n.matrixWorld);let r=M.distanceTo(re),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ae(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;ae(O,i);for(let e=0;e<a.length;e++)ae(a[e],i);a.length===2?ie(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),se(e,O,i)};function se(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=At*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let N=null;function ce(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Do,o.layers.enable(n),o.viewport=new q,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new xa,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}N&&N(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let le=new ms;le.setAnimationLoop(ce),this.setAnimationLoop=function(e){N=e},this.dispose=function(){}}},Cu=new yn,wu=new G;wu.set(-1,0,0,0,1,0,0,0,1);function Tu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Na(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Cu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(wu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Eu(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return z(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?R(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):R(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Du=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ou=null;function ku(){return Ou===null&&(Ou=new Gi(Du,16,16,be,N),Ou.name=`DFG_LUT`,Ou.minFilter=j,Ou.magFilter=j,Ou.wrapS=E,Ou.wrapT=E,Ou.generateMipmaps=!1,Ou.needsUpdate=!0),Ou}var Au=class{constructor(e={}){let{canvas:t=yt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=ne}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Se,xe,ye]),g=new Set([ne,oe,ie,ue,ce,le]),_=new Uint32Array(4),v=new Int32Array(4),y=new W,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=lt;let j=0,ee=0,M=null,re=-1,ae=null,se=new q,de=new q,fe=null,pe=new J(0),me=0,he=t.width,ge=t.height,_e=1,ve=null,be=null,Ce=new q(0,0,he,ge),we=new q(0,0,he,ge),Te=!1,Ee=new Yi,De=!1,Oe=!1,ke=new yn,Ae=new W,je=new q,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ne=!1;function Pe(){return M===null?_e:1}let P=n;function Fe(e,n){return t.getContext(e,n)}let Ie,Le,F,Re,I,L,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,it,!1),t.addEventListener(`webglcontextrestored`,at,!1),t.addEventListener(`webglcontextcreationerror`,ot,!1),P===null){let t=`webgl2`;if(P=Fe(t,e),P===null)throw Fe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}nt()}catch(e){throw t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,ot,!1),z(`WebGLRenderer: `+e.message),e}function nt(){Ie=new Js(P),Ie.init(),$e=new vu(P,Ie),Le=new Cs(P,Ie,e,$e),F=new gu(P,Ie),Le.reversedDepthBuffer&&d&&F.buffers.depth.setReversed(!0),O=P.createFramebuffer(),k=P.createFramebuffer(),A=P.createFramebuffer(),Re=new Zs(P),I=new Xl,L=new _u(P,Ie,F,I,Le,$e,Re),ze=new qs(T),Be=new hs(P),et=new xs(P,Be),Ve=new Ys(P,Be,Re,et),He=new $s(P,Ve,Be,et,Re),Xe=new Qs(P,Le,L),qe=new ws(I),Ue=new Yl(T,ze,Ie,Le,et,qe),We=new Tu(T,I),Ge=new eu,Ke=new su(Ie),Ye=new bs(T,ze,F,He,p,s),Je=new hu(T,He,Le),tt=new Eu(P,Re,Le,F),Ze=new Ss(P,Ie,Re),Qe=new Xs(P,Ie,Re),Re.programs=Ue.programs,T.capabilities=Le,T.extensions=Ie,T.properties=I,T.renderLists=Ge,T.shadowMap=Je,T.state=F,T.info=Re}m!==1009&&(w=new tc(m,t.width,t.height,o,r,i));let rt=new Su(T,P);this.xr=rt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return _e},this.setPixelRatio=function(e){e!==void 0&&(_e=e,this.setSize(he,ge,!1))},this.getSize=function(e){return e.set(he,ge)},this.setSize=function(e,n,r=!0){if(rt.isPresenting){R(`WebGLRenderer: Can't change size while VR device is presenting.`);return}he=e,ge=n,t.width=Math.floor(e*_e),t.height=Math.floor(n*_e),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(he*_e,ge*_e).floor()},this.setDrawingBufferSize=function(e,n,r){he=e,ge=n,_e=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){z(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){R(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(se)},this.getViewport=function(e){return e.copy(Ce)},this.setViewport=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),F.viewport(se.copy(Ce).multiplyScalar(_e).round())},this.getScissor=function(e){return e.copy(we)},this.setScissor=function(e,t,n,r){e.isVector4?we.set(e.x,e.y,e.z,e.w):we.set(e,t,n,r),F.scissor(de.copy(we).multiplyScalar(_e).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(e){F.setScissorTest(Te=e)},this.setOpaqueSort=function(e){ve=e},this.setTransparentSort=function(e){be=e},this.getClearColor=function(e){return e.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=h.has(t)}if(e){let e=M.texture.type,t=g.has(e),n=Ye.getClearColor(),r=Ye.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,P.clearBufferuiv(P.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,P.clearBufferiv(P.COLOR,0,v))}else r|=P.COLOR_BUFFER_BIT}t&&(r|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&P.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,ot,!1),Ye.dispose(),Ge.dispose(),Ke.dispose(),I.dispose(),ze.dispose(),He.dispose(),et.dispose(),tt.dispose(),Ue.dispose(),rt.dispose(),rt.removeEventListener(`sessionstart`,mt),rt.removeEventListener(`sessionend`,gt),_t.stop()};function it(e){e.preventDefault(),xt(`WebGLRenderer: Context Lost.`),E=!0}function at(){xt(`WebGLRenderer: Context Restored.`),E=!1;let e=Re.autoReset,t=Je.enabled,n=Je.autoUpdate,r=Je.needsUpdate,i=Je.type;nt(),Re.autoReset=e,Je.enabled=t,Je.autoUpdate=n,Je.needsUpdate=r,Je.type=i}function ot(e){z(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function st(e){let t=e.target;t.removeEventListener(`dispose`,st),ct(t)}function ct(e){ut(e),I.remove(e)}function ut(e){let t=I.get(e).programs;t!==void 0&&(t.forEach(function(e){Ue.releaseProgram(e)}),e.isShaderMaterial&&Ue.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Me);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=At(e,t,n,r,i);F.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ve.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;et.setup(i,r,s,n,c);let h,g=Ze;if(c!==null&&(h=Be.get(c),g=Qe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(F.setLineWidth(r.wireframeLinewidth*Pe()),g.setMode(P.LINES)):g.setMode(P.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),F.setLineWidth(e*Pe()),i.isLineSegments?g.setMode(P.LINES):i.isLineLoop?g.setMode(P.LINE_LOOP):g.setMode(P.LINE_STRIP)}else i.isPoints?g.setMode(P.POINTS):i.isSprite&&g.setMode(P.TRIANGLES);if(i.isBatchedMesh){if(Ie.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Be.get(c).bytesPerElement:1,o=I.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(P,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function dt(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),De===!0&&qe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Et(e,t,r),e.side=0,e.needsUpdate=!0,Et(e,t,r),e.side=2):Et(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Ke.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),Oe=this.localClippingEnabled,De=qe.init(this.clippingPlanes,Oe),De===!0&&qe.setGlobalState(this.clippingPlanes,t),D!==null&&Je.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];dt(o,n,t,e),r.add(o)}else dt(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=I.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Ie.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ft=null;function pt(e){ft&&ft(e)}function mt(){_t.stop()}function gt(){_t.start()}let _t=new ms;_t.setAnimationLoop(pt),typeof self<`u`&&_t.setContext(self),this.setAnimationLoop=function(e){ft=e,rt.setAnimationLoop(e),e===null?_t.stop():_t.start()},rt.addEventListener(`sessionstart`,mt),rt.addEventListener(`sessionend`,gt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){z(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=rt.enabled===!0&&rt.isPresenting===!0,r=w!==null&&(M===null||n)&&w.begin(T,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(t),t=rt.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,M),x=Ke.get(e,C.length),x.init(t),x.state.textureUnits=L.getTextureUnits(),C.push(x),ke.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Ee.setFromProjectionMatrix(ke,ht,t.reversedDepth),Oe=this.localClippingEnabled,De=qe.init(this.clippingPlanes,Oe),b=Ge.get(e,S.length),b.init(),S.push(b),rt.enabled===!0&&rt.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&vt(e,t,-1/0,T.sortObjects)}vt(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(ve,be),Ne=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,Ne&&Ye.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),De===!0&&qe.beginShadows();let i=x.state.shadowsArray;if(Je.render(i,e,t),De===!0&&qe.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];St(n,r,e,a)}Ne&&Ye.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];bt(b,e,n,n.viewport)}}else r.length>0&&St(n,r,e,t),Ne&&Ye.render(e),bt(b,e,t)}M!==null&&ee===0&&(L.updateMultisampleRenderTarget(M),L.updateRenderTargetMipmap(M)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),et.resetDefaultState(),re=-1,ae=null,C.pop(),C.length>0?(x=C[C.length-1],L.setTextureUnits(x.state.textureUnits),De===!0&&qe.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function vt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Ee)){r&&je.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ke);let i=He.update(e),a=e.material;a.visible&&b.push(e,i,a,n,je.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Ee))){let i=He.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),je.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),je.copy(e.boundingSphere.center)),je.applyMatrix4(e.matrixWorld).applyMatrix4(ke)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,je.z,s,t)}}else a.visible&&b.push(e,i,a,n,je.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)vt(i[e],t,n,r)}function bt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),De===!0&&qe.setGlobalState(T.clippingPlanes,n),r&&F.viewport(se.copy(r)),i.length>0&&Ct(i,t,n),a.length>0&&Ct(a,t,n),o.length>0&&Ct(o,t,n),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function St(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Ie.has(`EXT_color_buffer_half_float`)||Ie.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new gn(1,1,{generateMipmaps:!0,type:e?N:ne,minFilter:te,samples:Math.max(4,Le.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:K.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||se;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(pe),me=T.getClearAlpha(),me<1&&T.setClearColor(16777215,.5),T.clear(),Ne&&Ye.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),De===!0&&qe.setGlobalState(T.clippingPlanes,r),Ct(e,n,r),L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a),Ie.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Tt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(pe,me),d!==void 0&&(r.viewport=d),T.toneMapping=u}function Ct(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Tt(o,t,n,s,l,c)}}function Tt(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function Et(e,t,n){t.isScene!==!0&&(t=Me);let r=I.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ue.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ue.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ze.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,st),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Ot(e,s),d}else s.uniforms=Ue.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ue.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=qe.uniform),Ot(e,s),r.needsLights=B(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Dt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=cl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Ot(e,t){let n=I.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function kt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function At(e,t,n,r,i){t.isScene!==!0&&(t=Me),L.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?T.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:K.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ze.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=I.get(r),y=x.state.lights;if(De===!0&&(Oe===!0||e!==ae)){let t=e===ae&&r.id===re;qe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==qe.numPlanes||v.numIntersection!==qe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=Et(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(F.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==re&&(re=r.id,w=!0),v.needsLights){let e=kt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||ae!==e){F.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(P,`projectionMatrix`,e.projectionMatrix),O.setValue(P,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(P,Ae.setFromMatrixPosition(e.matrixWorld)),Le.logarithmicDepthBuffer&&O.setValue(P,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(P,`isOrthographic`,e.isOrthographicCamera===!0),ae!==e&&(ae=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(P,`sunShadowMap`,y.state.sunShadowMap,L),y.state.directionalShadowMap.length>0&&O.setValue(P,`directionalShadowMap`,y.state.directionalShadowMap,L),y.state.spotShadowMap.length>0&&O.setValue(P,`spotShadowMap`,y.state.spotShadowMap,L),y.state.pointShadowMap.length>0&&O.setValue(P,`pointShadowMap`,y.state.pointShadowMap,L)),i.isSkinnedMesh){O.setOptional(P,i,`bindMatrix`),O.setOptional(P,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(P,`boneTexture`,e.boneTexture,L))}i.isBatchedMesh&&(O.setOptional(P,i,`batchingTexture`),O.setValue(P,`batchingTexture`,i._matricesTexture,L),O.setOptional(P,i,`batchingIdTexture`),O.setValue(P,`batchingIdTexture`,i._indirectTexture,L),O.setOptional(P,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(P,`batchingColorTexture`,i._colorsTexture,L));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Xe.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(P,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=ku()),w){if(O.setValue(P,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&jt(k,E),a&&r.fog===!0&&We.refreshFogUniforms(k,a),We.refreshMaterialUniforms(k,r,_e,ge,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}cl.upload(P,Dt(v),k,L)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(cl.upload(P,Dt(v),k,L),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(P,`center`,i.center),O.setValue(P,`modelViewMatrix`,i.modelViewMatrix),O.setValue(P,`normalMatrix`,i.normalMatrix),O.setValue(P,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];tt.update(n,S),tt.bind(n,S)}}return S}function jt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function B(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=I.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),I.get(e.texture).__webglTexture=t,I.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=I.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,j=t,ee=n;let r=null,i=!1,a=!1;if(e){let o=I.get(e);if(o.__useDefaultFramebuffer!==void 0){F.bindFramebuffer(P.FRAMEBUFFER,o.__webglFramebuffer),se.copy(e.viewport),de.copy(e.scissor),fe=e.scissorTest,F.viewport(se),F.scissor(de),F.setScissorTest(fe),re=-1;return}if(o.__webglFramebuffer===void 0)L.setupRenderTarget(e);else if(o.__hasExternalTextures)L.rebindTextures(e,I.get(e.texture).__webglTexture,I.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&I.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);L.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=I.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&L.useMultisampledRTT(e)===!1?I.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,se.copy(e.viewport),de.copy(e.scissor),fe=e.scissorTest}else se.copy(Ce).multiplyScalar(_e).floor(),de.copy(we).multiplyScalar(_e).floor(),fe=Te;if(n!==0&&(r=O),F.bindFramebuffer(P.FRAMEBUFFER,r)&&F.drawBuffers(e,r),F.viewport(se),F.scissor(de),F.setScissorTest(fe),i){let r=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=I.get(e.textures[t]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,t.__webglTexture,n)}re=-1};function Mt(e){let t=I.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Le.textureFormatReadable(e.format),t.__typeReadable=Le.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){F.bindFramebuffer(P.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let u=Mt(o);if(u.__formatReadable===!1){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&P.readPixels(t,n,r,i,$e.convert(c),$e.convert(l),a)}finally{let e=M===null?null:I.get(M).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){F.bindFramebuffer(P.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let d=Mt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.bufferData(P.PIXEL_PACK_BUFFER,a.byteLength,P.STREAM_READ),P.readPixels(t,n,r,i,$e.convert(l),$e.convert(u),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let p=M===null?null:I.get(M).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,p);let m=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await wt(P,m,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,a),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(f),P.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;L.setTexture2D(e,0),P.copyTexSubImage2D(P.TEXTURE_2D,n,0,0,o,s,i,a),F.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=$e.convert(t.format),_=$e.convert(t.type),v;t.isData3DTexture?(L.setTexture3D(t,0),v=P.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(L.setTexture2DArray(t,0),v=P.TEXTURE_2D_ARRAY):(L.setTexture2D(t,0),v=P.TEXTURE_2D),F.activeTexture(P.TEXTURE0),F.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(P.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(P.UNPACK_ROW_LENGTH),b=F.getParameter(P.UNPACK_IMAGE_HEIGHT),x=F.getParameter(P.UNPACK_SKIP_PIXELS),S=F.getParameter(P.UNPACK_SKIP_ROWS),C=F.getParameter(P.UNPACK_SKIP_IMAGES);F.pixelStorei(P.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(P.UNPACK_SKIP_PIXELS,l),F.pixelStorei(P.UNPACK_SKIP_ROWS,u),F.pixelStorei(P.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=I.get(e),r=I.get(t),h=I.get(n.__renderTarget),g=I.get(r.__renderTarget);F.bindFramebuffer(P.READ_FRAMEBUFFER,h.__webglFramebuffer),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(e).__webglTexture,i,d+n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(t).__webglTexture,a,m+n)),P.blitFramebuffer(l,u,o,s,f,p,o,s,P.DEPTH_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||I.has(e)){let n=I.get(e),r=I.get(t);F.bindFramebuffer(P.READ_FRAMEBUFFER,k),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,n.__webglTexture,i),T?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,r.__webglTexture,a),i===0?T?P.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):P.copyTexSubImage2D(v,a,f,p,l,u,o,s):P.blitFramebuffer(l,u,o,s,f,p,o,s,P.COLOR_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?P.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(P.UNPACK_ROW_LENGTH,y),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(P.UNPACK_SKIP_PIXELS,x),F.pixelStorei(P.UNPACK_SKIP_ROWS,S),F.pixelStorei(P.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&P.generateMipmap(v),F.unbindTexture()},this.initRenderTarget=function(e){I.get(e).__webglFramebuffer===void 0&&L.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?L.setTextureCube(e,0):e.isData3DTexture?L.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?L.setTexture2DArray(e,0):L.setTexture2D(e,0),F.unbindTexture()},this.resetState=function(){j=0,ee=0,M=null,F.reset(),et.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return ht}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=K._getDrawingBufferColorSpace(e),t.unpackColorSpace=K._getUnpackColorSpace()}},ju=new gr,Mu=new W,Nu=class extends Mo{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new Y([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new Y([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new $o(t,6,1);return this.setAttribute(`instanceStart`,new ni(n,3,0)),this.setAttribute(`instanceEnd`,new ni(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new $o(t,6,1);return this.setAttribute(`instanceColorStart`,new ni(n,3,0)),this.setAttribute(`instanceColorEnd`,new ni(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Da(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gr);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),ju.setFromBufferAttribute(t),this.boundingBox.union(ju))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gr),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)Mu.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(Mu)),Mu.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(Mu));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}};Z.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new U},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},gs.line={uniforms:Pa.merge([Z.common,Z.fog,Z.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var Pu=class extends La{constructor(e){super({type:`LineMaterial`,uniforms:Pa.clone(gs.line.uniforms),vertexShader:gs.line.vertexShader,fragmentShader:gs.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return`WORLD_UNITS`in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return`USE_DASH`in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return`USE_ALPHA_TO_COVERAGE`in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE=``:delete this.defines.USE_ALPHA_TO_COVERAGE)}},Fu=new q,Iu=new W,Lu=new W,Ru=new q,zu=new q,Bu=new q,Vu=new W,Hu=new yn,Uu=new ds,Wu=new W,Gu=new gr,Ku=new Gr,qu=new q,Ju,Yu;function Xu(e,t,n){return qu.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),qu.multiplyScalar(1/qu.w),qu.x=Yu/n.width,qu.y=Yu/n.height,qu.applyMatrix4(e.projectionMatrixInverse),qu.multiplyScalar(1/qu.w),Math.abs(Math.max(qu.x,qu.y))}function Zu(e,t){let n=e.matrixWorld,r=e.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,o=Math.min(r.instanceCount,i.count);for(let r=0,s=o;r<s;r++){Uu.start.fromBufferAttribute(i,r),Uu.end.fromBufferAttribute(a,r),Uu.applyMatrix4(n);let o=new W,s=new W;Ju.distanceSqToSegment(Uu.start,Uu.end,s,o),s.distanceTo(o)<Yu*.5&&t.push({point:s,pointOnLine:o,distance:Ju.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,uv1:null})}}function Qu(e,t,n){let r=t.projectionMatrix,i=e.material.resolution,a=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,c=o.attributes.instanceEnd,l=Math.min(o.instanceCount,s.count),u=-t.near;Ju.at(1,Bu),Bu.w=1,Bu.applyMatrix4(t.matrixWorldInverse),Bu.applyMatrix4(r),Bu.multiplyScalar(1/Bu.w),Bu.x*=i.x/2,Bu.y*=i.y/2,Bu.z=0,Vu.copy(Bu),Hu.multiplyMatrices(t.matrixWorldInverse,a);for(let t=0,o=l;t<o;t++){if(Ru.fromBufferAttribute(s,t),zu.fromBufferAttribute(c,t),Ru.w=1,zu.w=1,Ru.applyMatrix4(Hu),zu.applyMatrix4(Hu),Ru.z>u&&zu.z>u)continue;if(Ru.z>u){let e=Ru.z-zu.z,t=(Ru.z-u)/e;Ru.lerp(zu,t)}else if(zu.z>u){let e=zu.z-Ru.z,t=(zu.z-u)/e;zu.lerp(Ru,t)}Ru.applyMatrix4(r),zu.applyMatrix4(r),Ru.multiplyScalar(1/Ru.w),zu.multiplyScalar(1/zu.w),Ru.x*=i.x/2,Ru.y*=i.y/2,zu.x*=i.x/2,zu.y*=i.y/2,Uu.start.copy(Ru),Uu.start.z=0,Uu.end.copy(zu),Uu.end.z=0;let o=Uu.closestPointToPointParameter(Vu,!0);Uu.at(o,Wu);let l=H.lerp(Ru.z,zu.z,o),d=l>=-1&&l<=1,f=Vu.distanceTo(Wu)<Yu*.5;if(d&&f){Uu.start.fromBufferAttribute(s,t),Uu.end.fromBufferAttribute(c,t),Uu.start.applyMatrix4(a),Uu.end.applyMatrix4(a);let r=new W,i=new W;Ju.distanceSqToSegment(Uu.start,Uu.end,i,r),n.push({point:i,pointOnLine:r,distance:Ju.origin.distanceTo(i),object:e,face:null,faceIndex:t,uv:null,uv1:null})}}}var $u=class extends Hi{constructor(e=new Nu,t=new Pu({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)Iu.fromBufferAttribute(t,e),Lu.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+Iu.distanceTo(Lu);let i=new $o(r,2,1);return e.setAttribute(`instanceDistanceStart`,new ni(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new ni(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;if(r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;Ju=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;Yu=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),Ku.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?Yu*.5:Xu(r,Math.max(r.near,Ku.distanceToPoint(Ju.origin)),s.resolution),Ku.radius+=c,Ju.intersectsSphere(Ku)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Gu.copy(o.boundingBox).applyMatrix4(a);let l;l=n?Yu*.5:Xu(r,Math.max(r.near,Gu.distanceToPoint(Ju.origin)),s.resolution),Gu.expandByScalar(l),Ju.intersectsBox(Gu)!==!1&&(n?Zu(this,t):Qu(this,r,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Fu),this.material.uniforms.resolution.value.set(Fu.z,Fu.w))}},ed=class extends Nu{constructor(){super(),this.isLineGeometry=!0,this.type=`LineGeometry`}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setColors(n),this}setFromPoints(e){let t=e.length-1,n=new Float32Array(6*t);for(let r=0;r<t;r++)n[6*r]=e[r].x,n[6*r+1]=e[r].y,n[6*r+2]=e[r].z||0,n[6*r+3]=e[r+1].x,n[6*r+4]=e[r+1].y,n[6*r+5]=e[r+1].z||0;return super.setPositions(n),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}},td=class extends $u{constructor(e=new ed,t=new Pu({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type=`Line2`}},nd=class{constructor(e){this.app=e,this.group=new qn,e.site.scene.add(this.group),this.labels=[],this.lines=[],this.signature=``}clear(){for(let e of[...this.group.children])e.geometry?.dispose(),e.material?.dispose(),this.group.remove(e);this.app.labels.clear(`journal`),this.labels=[],this.lines=[]}show(e,t=null){if(this.clear(),!e)return;this.app.site;let n=(e,t,n=!1)=>{if(e.length<2)return;let r=new Pu({color:t,linewidth:3,depthTest:!1,dashed:n,dashSize:.01,gapSize:.006}),i=new td(new ed,r);i.renderOrder=12,this.group.add(i),this.lines.push({line:i,samples:e})},r=t===null?1/0:t+1;for(let t of e.segments){let e=t.points.slice(0,r);r-=e.length,n(e,16729421)}n(e.planned||[],10345701,!0);let i=x(e),a=t===null?i:i.slice(0,t+1);for(let[e,n]of[[i[0],`START`],[a.at(-1),t===null?`END`:`REPLAY`]]){if(!e)continue;let t=this.app.labels.add(`journal`,{className:`journal-marker`,html:`<div class="dot"></div><div class="lb">${n}</div>`,world:new W,priority:10});this.labels.push({item:t,p:e})}this.update()}update(){let e=this.app,t=e.site;this.group.visible=e.mode===`site`;for(let{line:n,samples:r}of this.lines){n.material.resolution.set(e.w,e.h);let i=`${t.exag}:${t.fpvOn}`;n.userData.heightSig!==i&&(n.geometry.setPositions(r.flatMap(e=>[e.x,t.yAt(e.x,e.z)+t.routeLift()*1.5,e.z])),n.computeLineDistances(),n.userData.heightSig=i)}for(let{item:e,p:n}of this.labels)e.world.set(n.x,t.yAt(n.x,n.z)+t.markerLift(2),n.z);e.labels.setVisible(`journal`,e.mode===`site`),e.mode===`site`&&e.labels.update(`journal`,t.camera,e.w,e.h)}},rd=(e,t=``,n=1)=>Number.isFinite(e)?`${e.toFixed(n)}${t}`:`N/A`,id=e=>e&&Number.isFinite(e.lat)&&Number.isFinite(e.lon)?`${e.lat.toFixed(5)}° N, ${e.lon.toFixed(5)}° E`:`Not recorded`;function ad(e,t){return{u:(e.lon-t.lon[0])/(t.lon[1]-t.lon[0]),v:(t.lat[1]-e.lat)/(t.lat[1]-t.lat[0])}}function od(e,t,n){let r=[];for(let i of String(t).split(`
`)){let t=``;for(let a of i.match(/\S+\s*|\s+/g)||[]){t&&e.measureText(t+a).width>n&&(r.push(t),t=``);for(let i of Array.from(a))t&&e.measureText(t+i).width>n&&(r.push(t),t=``),t+=i}r.push(t)}return r}var Q={bg:`#101317`,panel:`#1c2229`,line:`#4d4541`,text:`#f2e9df`,muted:`#b6b8bd`,gold:`#e7ae88`,cyan:`#9ddce5`,red:`#ff555b`};function sd(e,t,n,r,i=18,a=Q.text,o=400){e.fillStyle=a,e.font=`${o} ${i}px Arial, sans-serif`,e.fillText(String(t),n,r)}function cd(e,t,n,r,i){e.fillStyle=Q.panel,e.fillRect(t,n,r,i),e.strokeStyle=Q.line,e.lineWidth=1,e.strokeRect(t+.5,n+.5,r-1,i-1)}function ld(e){return new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=()=>n(Error(`Terrain asset could not be loaded.`)),r.src=e})}function ud(e,t,n,r,i,a,o){cd(e,r,i,a,o);let s=t.terrain,c=x(t);if(!n||!s?.lon||!s?.lat){sd(e,`TERRAIN IMAGERY UNAVAILABLE`,r+28,i+60,24,Q.gold),sd(e,`The registered local HiRISE image could not be loaded.`,r+28,i+96,18),sd(e,`Recorded coordinates are preserved in this mission.`,r+28,i+128,18,Q.muted);return}let l=c.map(e=>ad(e,s)),u=l.map(e=>e.u*n.width),d=l.map(e=>e.v*n.height),f=u.length?Math.min(...u):0,p=u.length?Math.max(...u):n.width,m=d.length?Math.min(...d):0,h=d.length?Math.max(...d):n.height,g=(f+p)/2,_=(m+h)/2,v=n.width*50/s.sizeM[0],y=Math.min(a/Math.max(v,(p-f)*1.25),o/Math.max(v,(h-m)*1.25)),b=a/y,S=o/y,C=b<=n.width?Math.max(0,Math.min(n.width-b,g-b/2)):(n.width-b)/2,w=S<=n.height?Math.max(0,Math.min(n.height-S,_-S/2)):(n.height-S)/2,T=e=>{let t=ad(e,s);return{x:r+(t.u*n.width-C)*y,y:i+(t.v*n.height-w)*y}};e.save(),e.beginPath(),e.rect(r,i,a,o),e.clip(),e.drawImage(n,r-C*y,i-w*y,n.width*y,n.height*y);let E=(t,n,r,i=[])=>{t.length<2||(e.beginPath(),e.strokeStyle=n,e.lineWidth=r,e.setLineDash(i),t.forEach((t,n)=>{let r=T(t);n?e.lineTo(r.x,r.y):e.moveTo(r.x,r.y)}),e.stroke(),e.setLineDash([]))};E(t.planned||[],Q.cyan,2,[7,5]);for(let e of t.segments)E(e.points,`#361516`,7),E(e.points,Q.red,4);function D(t,n){if(!t)return;let s=T(t);e.fillStyle=Q.text,e.beginPath(),e.arc(s.x,s.y,6,0,Math.PI*2),e.fill();let c=Math.min(r+a-140,Math.max(r+8,s.x+12)),l=Math.min(i+o-34,Math.max(i+8,s.y-28));e.fillStyle=`#101317`,e.fillRect(c-5,l-3,132,26),sd(e,n,c,l+16,16,Q.text,700)}let O=c[0],k=c.at(-1);O&&k&&Math.hypot(O.x-k.x,O.z-k.z)<1e-5?D(O,`START / END`):(D(O,`START`),D(k,`END`)),e.fillStyle=`#101317dd`,e.fillRect(r+12,i+12,390,32),sd(e,`ACTUAL  ━ RED     PLANNED  ┄ CYAN`,r+24,i+34,15),e.fillStyle=`#101317dd`,e.fillRect(r+a-62,i+12,48,66),sd(e,`N`,r+a-47,i+36,19,Q.text,700),sd(e,`↑`,r+a-47,i+65,28);let A=s.sizeM[0]/n.width/y,j=140*A,ee=10**Math.floor(Math.log10(j)),te=Math.floor(j/ee)*ee;e.fillStyle=`#101317dd`,e.fillRect(r+12,i+o-62,200,50),e.strokeStyle=Q.text,e.lineWidth=3,e.beginPath(),e.moveTo(r+24,i+o-25),e.lineTo(r+24+te/A,i+o-25),e.stroke(),sd(e,`${te} m`,r+24,i+o-37,15),e.restore()}async function dd(e,{loadImage:t=ld,makeCanvas:n=()=>document.createElement(`canvas`),earthTime:r=new Date().toISOString()}={}){let i=null;try{i=await t(`./data/${e.terrain?.visible||`s_visible.jpg`}`)}catch{}let a=n().getContext(`2d`);a.font=`18px Arial, sans-serif`;let o=[];for(let t of e.entries){let e=od(a,t.text,438);for(let n=0;n<e.length;n+=15)o.push({entry:t,lines:e.slice(n,n+15),continued:n>0})}o.length||o.push({lines:[`No field notes recorded.`],entry:null});let s=[],c=S(e),l=x(e);for(let t=0;t<o.length;t++){let a=n();a.width=1600,a.height=1e3;let u=a.getContext(`2d`);u.fillStyle=Q.bg,u.fillRect(0,0,1600,1e3),sd(u,`AERO ATLAS`,40,48,28,Q.gold,700),sd(u,`EVA MISSION REPORT`,40,83,22,Q.text,700),sd(u,`JEZERO CRATER  /  ${e.status.toUpperCase()}  /  PAGE ${t+1} OF ${o.length}`,720,48,18,Q.cyan),sd(u,`Mission ${e.id}`,720,80,16,Q.muted),sd(u,`START  Sol ${e.start.sol} · ${e.start.lmst} LMST     END  ${e.end?`Sol ${e.end.sol} · ${e.end.lmst} LMST`:`Not finalized`}`,40,117,17,Q.muted),[[`RECORDED DISTANCE`,rd(c.distance,` m`)],[`RECORDED DURATION`,rd(c.duration/60,` min`)],[`O₂ CONSUMED`,rd(c.oxygenConsumed,` kg`,3)],[`O₂ REMAINING`,rd(c.oxygenRemaining,` kg`,3)],[`MEAN METABOLIC POWER`,rd(c.averageW,` W`)],[`METABOLIC ENERGY`,rd(c.energyJ===null?null:c.energyJ/1e3,` kJ`)],[`FIELD NOTES`,String(c.notes)],[`MOVEMENT TIME`,rd(c.movementDuration/60,` min`)]].forEach(([e,t],n)=>{let r=40+n%4*384,i=142+Math.floor(n/4)*82;cd(u,r,i,372,70),sd(u,e,r+16,i+23,13,Q.gold),sd(u,t,r+16,i+53,25,Q.cyan,600)}),sd(u,`START ${id(l[0])}     END ${id(l.at(-1))}`,40,326,16),ud(u,e,i,40,346,1e3,536),cd(u,1060,346,500,536);let d=o[t],f=d.entry;sd(u,`FIELD JOURNAL`,1082,378,20,Q.gold,700),f&&(sd(u,`${f.category.toUpperCase()}${d.continued?` · CONTINUED`:``}`,1082,414,17,Q.cyan,700),sd(u,`Sol ${f.sol} · ${f.lmst} LMST · +${rd(f.elapsed,` s`)}`,1082,443,16,Q.muted),sd(u,id(f.position),1082,470,15,Q.muted)),d.lines.forEach((e,t)=>sd(u,e,1082,505+t*23,18)),sd(u,`Time-weighted power covers ${rd(c.powerSeconds,` s`)} of recorded simulation. Oxygen comparisons require one unchanged suit session.`,40,911,15,Q.muted),sd(u,`Terrain: NASA/JPL/University of Arizona · MRO HiRISE mosaic and DTM, Jezero landing site (local app dataset).`,40,939,15,Q.muted),sd(u,`Simulated EVA mission — not real astronaut telemetry.`,40,968,17,Q.gold),sd(u,`Earth export time: ${r}`,1030,968,14,Q.muted);let p=await new Promise((e,t)=>{try{a.toBlob(n=>n?e(n):t(Error(`PNG encoding failed.`)),`image/png`)}catch(e){t(Error(`PNG export blocked: ${e.message}`))}});s.push({blob:p,name:`AeroAtlas-EVA-${e.id}-page-${t+1}.png`})}return s}var fd=(e,t,n)=>{let r=document.createElement(e);return t!=null&&(r.textContent=t),n&&(r.className=n),r},pd=class{constructor(e){this.app=e,this.store=new w,this.history=new Map,this.source=null,this.selected=null,this.loaded=!1,this.recorder=new C({changed:()=>{this.dirty=!0,this.refresh(),this.save()}}),this.route=new nd(e),this.urls=[],this.build(),this.load(),this.timer=setInterval(()=>{this.refresh(),v(this.recorder.mission)&&(this.recorder.flush(),this.dirty=!0,this.save()),this.position()},2e3),document.addEventListener(`visibilitychange`,()=>{document.hidden&&v(this.recorder.mission)&&(this.recorder.pause(),this.message.textContent=`Recording paused while the page is hidden. Resume when ready.`)}),window.addEventListener(`pagehide`,()=>{v(this.recorder.mission)&&(this.recorder.flush(),this.dirty=!0,this.save())})}async load(){try{let e=await this.store.list();for(let t of e)v(t)&&(t.status=`Interrupted`,t.finalized=!1),this.history.has(t.id)||this.history.set(t.id,t);let t=[...this.history.values()].filter(e=>e.status===`Interrupted`&&!e.finalized);t.length&&(this.message.textContent=`Recovered ${t.length} unfinished mission(s). Open HISTORY to review and finalize; no movement is reconstructed.`),this.storageError=null,this.loaded=!0}catch(e){this.storageError=e.message,this.loaded=!0}this.refresh()}async save(){if(this.saving||this.storageError||!this.dirty||!this.recorder.mission)return;this.saving=!0,this.dirty=!1;let e=structuredClone(this.recorder.mission);this.history.set(e.id,e),this.refreshStorage();try{await this.store.save(e),this.storageError=null,this.saved=!0}catch(e){this.storageError=e.message,this.dirty=!0,this.saved=!1}this.saving=!1,this.refreshStorage(),this.dirty&&!this.storageError&&this.save()}feed(e,t,n,r,i,a,o){let s=this.app.site.xzToLonLat(e.x,e.z);this.source={x:e.x,z:e.z,...s,epoch:n,mode:r,oxygen:i,capacity:a,watts:o},this.recorder.ingest(this.source,t)}sourceAvailable(){return this.app.mode===`site`&&!this.app.busy&&(this.app.fpv?.active||!!this.app.planner.sim)}start(){if(!this.loaded)throw Error(`History is still loading.`);if([...this.history.values()].some(e=>e.status===`Interrupted`&&!e.finalized))throw Error(`Review and finalize recovered missions in HISTORY first.`);if(!this.sourceAvailable())throw Error(`Enter helmet view or start EV1 playback before recording.`);let e=this.app,t=e.fpv,n=e.planner.sim,r=n?.pos||(t?.active?t.pos:null);if(!r)throw Error(`Wait for the simulated astronaut position.`);let i=n?`sim-${n.journalEpoch}`:`helmet-${t.journalEpoch}`,a={...r,...e.site.xzToLonLat(r.x,r.z),epoch:i,mode:n?e.planner.params.rover?`rover`:`EV1 playback`:`helmet walk`,oxygen:Math.max(0,e.planner.params.o2CapKg-(n?n.state?.o2||0:t.o2Used)),capacity:e.planner.params.o2CapKg,watts:null},o=(e.planner.result?.route||[]).map(t=>({...t,...e.site.xzToLonLat(t.x,t.z)}));this.selected=null,this.replaying=!1,this.recorder.start(e.hud.mt?.ms||Date.now(),a,e.site.meta,o),this.message.textContent=`Recording started.`}build(){this.el=fd(`aside`,null,`eva-journal`),this.el.setAttribute(`aria-label`,`EVA Mission Journal`),this.el.innerHTML=`<button class="btn journal-toggle" aria-expanded="false" aria-controls="journal-content">JOURNAL <span class="journal-rec"></span></button>
      <div id="journal-content" hidden>
      <nav class="journal-tabs" aria-label="Journal sections"><button class="btn" data-tab="record">RECORD</button><button class="btn" data-tab="notes">NOTES</button><button class="btn" data-tab="history">HISTORY</button></nav>
      <div class="journal-message" role="status"></div>
      <section data-pane="record"><h3>SIMULATED EVA</h3><div class="journal-summary"></div><div class="journal-actions"><button class="btn primary" data-action="start">START RECORDING</button><button class="btn" data-action="pause">PAUSE</button><button class="btn" data-action="resume">RESUME</button><button class="btn" data-action="end">END RECORDING</button></div></section>
      <section data-pane="notes" hidden><form class="journal-form"><label>Category<select name="category"></select></label><label>Field note<textarea name="note" rows="4" required placeholder="Record an observation…"></textarea></label><button class="btn primary" type="submit">SAVE ENTRY</button><button class="btn" type="button" data-action="cancel-edit" hidden>CANCEL EDIT</button></form><div class="journal-notes"></div></section>
      <section data-pane="history" hidden><label>Filter by sol<input class="journal-sol" type="number" min="0" placeholder="All sols"></label><label>Saved mission<select class="journal-missions"><option value="">Choose a mission</option></select></label><div class="journal-history-summary"></div><div class="journal-actions"><button class="btn" data-action="recover" hidden>FINALIZE INTERRUPTED</button><button class="btn" data-action="replay">REPLAY ROUTE</button><button class="btn" data-action="live">LIVE ROUTE</button><button class="btn" data-action="export">EXPORT PNG REPORT</button></div><label>Recorded sample<input class="journal-replay" type="range" min="0" value="0" max="0"></label><div class="journal-replay-time"></div><div class="journal-downloads"></div><div class="journal-history-notes"></div></section>
      <div class="journal-storage" role="status"></div><button class="btn" data-action="retry" hidden>RETRY SAVE / STORAGE</button><p class="journal-local">Stored in this browser. Clearing site data can erase mission records. Simulated telemetry only.</p></div>`,document.getElementById(`hud`).append(this.el),this.message=this.el.querySelector(`.journal-message`),this.content=this.el.querySelector(`#journal-content`),this.form=this.el.querySelector(`form`);for(let e of _)this.form.elements.category.append(new Option(e,e));this.el.querySelector(`.journal-toggle`).onclick=()=>{this.content.hidden=!this.content.hidden,this.el.querySelector(`.journal-toggle`).setAttribute(`aria-expanded`,String(!this.content.hidden)),this.position()},this.el.addEventListener(`focusin`,()=>{this.app.keys.clear()}),this.el.addEventListener(`keydown`,e=>{e.stopPropagation(),e.key===`Escape`&&(this.content.hidden=!0,this.el.querySelector(`.journal-toggle`).setAttribute(`aria-expanded`,`false`),this.el.querySelector(`.journal-toggle`).focus())}),this.el.addEventListener(`pointerdown`,e=>e.stopPropagation()),this.el.addEventListener(`click`,e=>{let t=e.target.closest(`[data-tab]`);if(t){for(let e of this.el.querySelectorAll(`[data-pane]`))e.hidden=e.dataset.pane!==t.dataset.tab;for(let e of this.el.querySelectorAll(`[data-tab]`))e.classList.toggle(`on`,e===t);this.position()}let n=e.target.closest(`[data-action]`);n&&this.action(n.dataset.action)}),this.form.onsubmit=e=>{e.preventDefault(),this.saveNote()},this.el.querySelector(`.journal-sol`).oninput=()=>this.renderHistory(),this.el.querySelector(`.journal-missions`).onchange=e=>{this.selected=e.target.value||null,this.replaying=!1,this.renderSelection()},this.el.querySelector(`.journal-replay`).oninput=e=>{this.replaying=!1,this.showSample(+e.target.value)}}async action(e){try{let t=this.recorder,n=this.history.get(this.selected);if(e===`start`&&this.start(),e===`pause`&&t.pause(),e===`resume`){if(!this.sourceAvailable())throw Error(`Enter helmet view or start EV1 playback to resume.`);t.resume()}if(e===`end`&&t.end(),e===`cancel-edit`&&(this.editId=null,this.editingMission=null,this.form.elements.note.value=``,this.el.querySelector(`[data-action="cancel-edit"]`).hidden=!0),e===`retry`&&(this.storageError=null,await this.load(),this.pendingRecovery&&(await this.store.save(this.pendingRecovery),this.history.set(this.pendingRecovery.id,this.pendingRecovery),this.pendingRecovery=null,this.renderSelection()),this.dirty=!!t.mission,await this.save()),e===`recover`&&n&&!n.finalized){if(this.pendingRecovery)throw Error(`Retry the pending save first.`);let e=structuredClone(n);e.finalized=!0,e.end=y(e.clockMs,e.elapsed),e.summary=S(e),this.pendingRecovery=e,this.refreshStorage(),await this.store.save(e),this.history.set(e.id,e),this.pendingRecovery=null,this.storageError=null,this.renderSelection()}if(e===`live`&&(this.selected=null,this.replaying=!1,this.el.querySelector(`.journal-missions`).value=``,this.route.show(t.mission)),e===`replay`&&n){if(t.mission?.status===`Recording`)throw Error(`Pause recording before reviewing a saved route.`);this.replaying=!this.replaying,this.replayIndex=0,this.replayAt=performance.now(),this.showSample(0)}if(e===`export`&&n){this.message.textContent=`Rendering registered terrain report…`;let e=await dd(n),t=this.el.querySelector(`.journal-downloads`);t.replaceChildren();for(let e of this.urls)URL.revokeObjectURL(e);this.urls=[];for(let n of e){let e=URL.createObjectURL(n.blob);this.urls.push(e);let r=fd(`a`,`Download ${n.name}`);r.href=e,r.download=n.name,t.append(r)}this.message.textContent=`${e.length} PNG report page(s) ready below.`}this.refresh(),this.renderNotes()}catch(t){this.message.textContent=t.message,(e===`recover`||e===`retry`)&&(this.storageError=t.message,this.refreshStorage())}}refreshStorage(){this.el.querySelector(`.journal-storage`).textContent=this.storageError?`NOT SAVED: ${this.storageError}`:this.saving?`Saving…`:this.dirty||this.pendingRecovery?`Changes pending save`:this.saved?`Saved locally (transaction complete)`:`Browser-local mission history`,this.el.querySelector(`[data-action="retry"]`).hidden=!this.storageError}refresh(){let e=this.recorder.mission,t=e?S(e):null;this.el.querySelector(`.journal-rec`).textContent=e?.status===`Recording`?`● REC`:``,this.el.querySelector(`.journal-summary`).textContent=e?`${e.status} · ${e.id.slice(0,8)}\nSol ${y(e.clockMs).sol} · ${y(e.clockMs).lmst} LMST\n${rd(e.elapsed,` s`)} · ${rd(t.distance,` m`)} · ${e.entries.length} notes`:`Idle · enter helmet view or run EV1 to record.`;for(let[t,n]of[[`start`,!this.loaded||v(e)||!this.sourceAvailable()],[`pause`,e?.status!==`Recording`],[`resume`,e?.status!==`Paused`],[`end`,!v(e)]])this.el.querySelector(`[data-action="${t}"]`).disabled=n;this.form.querySelector(`[type="submit"]`).disabled=!v(e)&&!this.editingMission,e&&this.history.set(e.id,structuredClone(e)),this.renderHistory(),this.refreshStorage(),this.selected||(this.route.show(e),this.renderNotes())}renderHistory(){let e=this.el.querySelector(`.journal-missions`),t=this.el.querySelector(`.journal-sol`).value,n=[...this.history.values()].filter(e=>t===``||e.start.sol<=+t&&(e.end?.sol??y(e.clockMs).sol)>=+t).sort((e,t)=>t.start.timestamp-e.start.timestamp),r=n.map(e=>`${e.id}:${e.status}:${e.finalized}:${e.entries.length}:${Math.floor(e.elapsed)}`).join(`|`);if(r!==this.historySig){this.historySig=r,e.replaceChildren(new Option(`Choose a mission`,``));for(let t of n)e.append(new Option(`Sol ${t.start.sol} ${t.start.lmst}–${t.end?.lmst||`…`} · ${t.status} · ${rd(t.distance,`m`)} · ${rd(t.elapsed/60,`min`)} · ${t.entries.length} notes · ${t.id.slice(0,8)}`,t.id));e.value=this.selected||``}}renderSelection(){let e=this.history.get(this.selected),t=e?S(e):null;this.el.querySelector(`.journal-history-summary`).textContent=e?`${e.status} · ${e.id.slice(0,8)}\n${rd(t.distance,` m`)} · ${rd(t.duration,` s`)}\nO₂ used ${rd(t.oxygenConsumed,` kg`,3)} · left ${rd(t.oxygenRemaining,` kg`,3)}\nPower ${rd(t.averageW,` W`)} · energy ${rd(t.energyJ===null?null:t.energyJ/1e3,` kJ`)}\n${this.app.mode===`site`?`Red actual / cyan saved plan`:`Enter Marswalk zone to view the 3D route; report remains available.`}`:``,this.el.querySelector(`[data-action="recover"]`).hidden=!(e?.status===`Interrupted`&&!e.finalized);for(let t of[`replay`,`export`])this.el.querySelector(`[data-action="${t}"]`).disabled=!e;let n=this.el.querySelector(`.journal-replay`);n.max=Math.max(0,x(e).length-1),n.value=n.max,n.disabled=!x(e).length,this.route.show(e),this.renderEntries(this.el.querySelector(`.journal-history-notes`),e,!0)}renderNotes(){this.renderEntries(this.el.querySelector(`.journal-notes`),this.recorder.mission,!0)}renderEntries(e,t,n){let r=JSON.stringify(t?.entries||[])+n+(t?.status||``);if(e.dataset.signature!==r){e.dataset.signature=r,e.replaceChildren();for(let r of t?.entries||[]){let i=fd(`article`,null,`journal-entry`);if(i.append(fd(`strong`,`${r.category} · Sol ${r.sol} ${r.lmst}`),fd(`p`,r.text),fd(`small`,id(r.position))),n){let e=fd(`button`,`EDIT`,`btn`);e.onclick=()=>{this.editId=r.id,this.editingMission=v(this.recorder.mission)&&this.recorder.mission.id===t.id?null:t.id,this.form.elements.category.value=r.category,this.form.elements.note.value=r.text,this.el.querySelector(`[data-tab="notes"]`).click(),this.el.querySelector(`[data-action="cancel-edit"]`).hidden=!1,this.form.querySelector(`[type="submit"]`).disabled=!1,this.form.elements.note.focus()};let n=fd(`button`,`DELETE`,`btn`);n.onclick=()=>{if(confirm(`Delete this field note?`)){if(v(this.recorder.mission)&&this.recorder.mission.id===t.id)this.recorder.deleteNote(r.id),this.renderNotes();else{let e=structuredClone(t);e.entries=e.entries.filter(e=>e.id!==r.id),this.saveHistorical(e)}}},i.append(e,n)}e.append(i)}}}showSample(e){let t=this.history.get(this.selected);if(!t)return;this.route.show(t,e);let n=x(t)[e];this.el.querySelector(`.journal-replay`).value=e,this.el.querySelector(`.journal-replay-time`).textContent=n?`REPLAY · Sol ${n.sol} ${n.lmst} · +${rd(n.elapsed,` s`)} · ${n.mode}`:`No position recorded.`}async saveHistorical(e){if(this.pendingRecovery)return this.message.textContent=`Retry the pending save before making another historical edit.`,!1;e.summary=S(e),this.pendingRecovery=e,this.refreshStorage();try{return await this.store.save(e),this.history.set(e.id,e),this.recorder.mission?.id===e.id&&!v(this.recorder.mission)&&(this.recorder.mission=structuredClone(e)),this.pendingRecovery=null,this.storageError=null,this.saved=!0,this.renderSelection(),this.refresh(),!0}catch(e){return this.storageError=e.message,this.message.textContent=`Edit retained in memory; retry saving before leaving.`,this.refreshStorage(),!1}}async saveNote(){try{let e=this.form.elements.category.value,t=this.form.elements.note.value;if(this.editingMission){if(!t.trim()||!_.includes(e))throw Error(`Enter a note and valid category.`);let n=structuredClone(this.history.get(this.editingMission)),r=n.entries.find(e=>e.id===this.editId);if(!r)throw Error(`Entry not found.`);if(r.category=e,r.text=t.trim(),r.edited=y(n.clockMs,n.elapsed),!await this.saveHistorical(n))return}else this.recorder.note(e,t,this.editId);this.editId=null,this.editingMission=null,this.form.elements.note.value=``,this.el.querySelector(`[data-action="cancel-edit"]`).hidden=!0,this.renderNotes(),this.refresh()}catch(e){this.message.textContent=e.message}}frame(e){if(this.route.update(),this.replaying&&e-this.replayAt>=200){this.replayAt=e;let t=x(this.history.get(this.selected)).length;this.replayIndex++,this.replayIndex>=t?this.replaying=!1:this.showSample(this.replayIndex)}(!this.positionAt||e-this.positionAt>250)&&(this.positionAt=e,this.position())}position(){let e=document.getElementById(`h-suit`),t=this.app.fpv?.active;if(this.el.classList.toggle(`journal-helmet`,!!t),t&&e){let t=e.getBoundingClientRect(),n=innerHeight-t.top+8;this.el.style.left=`${t.left}px`,this.el.style.width=`${t.width}px`,this.el.style.bottom=`${n}px`;let r=this.el.querySelector(`.journal-toggle`).getBoundingClientRect().height,i=this.app.h<540?16:this.app.touch?56:84;this.content.style.maxHeight=`${Math.max(16,t.top-r-i)}px`}else this.el.style.left=``,this.el.style.width=``,this.el.style.bottom=``,this.content.style.maxHeight=``}},md=`./`,hd=e=>`${md}data/${e}?v=1b5a34aea2`,gd=[[`g_color`,null,`srgb`,`Viking MDIM 2.1 global colour mosaic · NASA Ames`],[`g_normal`,`g_normal_4k.jpg`,`linear`,`MGS MOLA global topography → relief`],[`g_topo`,`g_topo_4k.jpg`,`srgb`,`MGS MOLA hypsometric scan`],[`g_thermal`,`g_thermal_4k.jpg`,`srgb`,`Mars Odyssey THEMIS night-IR mosaic`],[`g_geology`,`g_geology_4k.jpg`,`srgb`,`USGS geologic map of Mars · SIM 3292`],[`r_color`,`r_color.jpg`,`srgb`,`Isidis / Nili Planum regional colour`],[`r_normal`,`r_normal.jpg`,`linear`,`Regional HRSC + MOLA relief`],[`r_topo`,`r_topo.jpg`,`srgb`,`Regional HRSC + MOLA elevation`],[`r_thermal`,`r_thermal.jpg`,`srgb`,`Regional THEMIS thermal`],[`c_decal`,`c_decal.jpg`,`srgb`,`Jezero orbital decal`],[`c_visible`,`c_visible.jpg`,`srgb`,`MRO CTX 5 m orthomosaic · Jezero (JPL)`],[`c_normal`,`c_normal.jpg`,`linear`,`MRO CTX 20 m stereo DEM · relief`],[`c_slope`,`c_slope.png`,`linear`,`Slope hazard from CTX DEM`],[`c_thermal`,`c_thermal.jpg`,`srgb`,`THEMIS night IR · Jezero`],[`s_visible`,`s_visible.jpg`,`srgb`,`MRO HiRISE 25 cm orthomosaic · landing site`],[`s_normal`,`s_normal.jpg`,`linear`,`MRO HiRISE 1 m DTM · relief`],[`s_slope`,`s_slope.png`,`linear`,`Slope hazard from HiRISE DTM`],[`s_thermal`,`s_thermal.jpg`,`srgb`,`THEMIS night IR · Marswalk zone`]],_d=new Set([`g_normal`,`g_topo`,`g_thermal`,`g_geology`,`r_color`,`r_normal`,`r_topo`,`r_thermal`,`c_decal`,`c_visible`,`c_normal`,`c_slope`,`s_visible`,`s_normal`,`s_slope`]);function vd(){if(typeof createImageBitmap>`u`)return!1;let e=navigator.userAgent,t=/^((?!chrome|android).)*safari/i.test(e),n=e.match(/Version\/(\d+)/);if(t&&(!n||+n[1]<17))return!1;let r=e.match(/Firefox\/(\d+)/);return!(r&&+r[1]<98)}async function yd(e,t,n){let r=await fetch(hd(`manifest.json`)).then(e=>e.json()),i=vd(),a=new Po;a.setOptions({imageOrientation:`flipY`,premultiplyAlpha:`none`,colorSpaceConversion:`none`});let o=new mo,s=e.capabilities.getMaxAnisotropy(),c={},l=gd.length+5,u=0,d=e=>n(++u/l,e),f=async e=>{if(i){let t=new mn(await a.loadAsync(hd(e)));return t.flipY=!1,t.userData.flippedBitmap=!0,t.needsUpdate=!0,t}return o.loadAsync(hd(e))},p=gd.map(([e,n,r,i])=>{let a=e===`g_color`?t.color:t.lite&&_d.has(e)?`lite/${n}`:n;return f(a).then(n=>{n.colorSpace=r===`srgb`?lt:``,n.anisotropy=Math.min(t.name===`low`?4:8,s),n.wrapS=n.wrapT=E,e.startsWith(`g_`)&&(n.wrapS=T),c[e]=n,d(i)})}),[m,h,g,_,v]=await Promise.all([xd(hd(r.global.elev.file)).then(e=>(d(`MOLA elevation grid`),e)),xd(hd(r.crater.file)).then(e=>(d(`Jezero CTX heightfield`),e)),xd(hd(r.site.file)).then(e=>(d(`Landing-site HiRISE heightfield`),e)),fetch(hd(`m20_traverse.json`)).then(e=>e.json()).then(e=>(d(`Perseverance traverse · MMGIS waypoints`),e)).catch(()=>null),r.geology?bd(hd(r.geology.file)).then(e=>(d(`Geologic unit grid · USGS SIM 3292`),e)).catch(()=>null):null,...p]),y=r.global.elev,b=y.offset||0;return{manifest:r,tex:c,traverse:_,heights:{crater:h,site:g},elevAt(e,t){let n=Math.floor((t+180)/360*y.width)%y.width,r=Math.min(y.height-1,Math.max(0,Math.floor((90-e)/180*y.height)));return m[r*y.width+n]-b},unitAt(e,t){let n=r.geology;if(!v||!n)return null;let i=Math.min(n.width-1,Math.floor((t+180)/360*n.width)),a=Math.min(n.height-1,Math.max(0,Math.floor((90-e)/180*n.height)));return n.units[v[a*n.width+i]]||null}}}async function bd(e){let t=await fetch(e).then(e=>e.blob()),n=await createImageBitmap(t,{colorSpaceConversion:`none`,premultiplyAlpha:`none`}),r=document.createElement(`canvas`);r.width=n.width,r.height=n.height;let i=r.getContext(`2d`,{willReadFrequently:!0});i.drawImage(n,0,0);let a=i.getImageData(0,0,r.width,r.height).data,o=new Uint8Array(r.width*r.height);for(let e=0;e<o.length;e++)o[e]=a[e*4];return n.close?.(),o}async function xd(e){let t=await fetch(e).then(e=>e.blob()),n=await createImageBitmap(t,{colorSpaceConversion:`none`,premultiplyAlpha:`none`}),r=document.createElement(`canvas`);r.width=n.width,r.height=n.height;let i=r.getContext(`2d`,{willReadFrequently:!0});i.drawImage(n,0,0);let a=i.getImageData(0,0,r.width,r.height).data,o=new Uint16Array(r.width*r.height);for(let e=0;e<o.length;e++)o[e]=a[e*4]<<8|a[e*4+1];return n.close?.(),o}var Sd=`sol-atlas-donki`,Cd=18e5,wd=36e5,Td=e=>new Date(e).toISOString().slice(0,10);function Ed(e,t=Date.now()){let n=new Map;for(let t of e||[]){let e=(t.impactList||[]).find(e=>e.location===`Mars`);if(!e)continue;let r=(t.cmeInputs||[])[0]||{},i=r.CMEID||t.simulationID,a=Date.parse(t.modelCompletionTime),o=n.get(i);o&&o.run>=a||n.set(i,{id:i,run:a,arrival:Date.parse(e.arrivalTime),glancing:!!e.isGlancingBlow,launched:Date.parse(r.cmeStartTime),speed:r.speed??null,link:t.link||null})}let r=[...n.values()].sort((e,t)=>e.arrival-t.arrival),i=r.filter(e=>e.arrival>t-24*wd&&e.arrival<t+72*wd);return{checked:t,total:r.length,window:i}}function Dd(){try{let e=JSON.parse(sessionStorage.getItem(Sd)||`null`);if(e&&Date.now()-e.at<Cd)return e}catch{}return null}async function Od(e,t=9e3){let n=new AbortController,r=setTimeout(()=>n.abort(),t);try{let t=await fetch(e,{signal:n.signal});if(!t.ok||!(t.headers.get(`content-type`)||``).includes(`json`))throw Error(`HTTP ${t.status}`);return await t.json()}finally{clearTimeout(r)}}async function kd(){let e=Dd();if(e)return{ok:!0,source:e.source,summary:Ed(e.sims)};let t=Date.now(),n=`startDate=${Td(t-720*wd)}&endDate=${Td(t)}`,r=[.../^(localhost|127\.|\[::1\])/.test(location.hostname)?[]:[[`NASA DONKI via Aero Atlas`,`api/space-weather?${n}`]],[`NASA DONKI · api.nasa.gov`,`https://api.nasa.gov/DONKI/WSAEnlilSimulations?${n}&api_key=DEMO_KEY`]],i=`offline`;for(let[e,t]of r)try{let n=await Od(t);if(!Array.isArray(n))throw Error(`unexpected reply`);try{sessionStorage.setItem(Sd,JSON.stringify({at:Date.now(),source:e,sims:n}))}catch{}return{ok:!0,source:e,summary:Ed(n)}}catch(e){i=e.name===`AbortError`?`timed out`:e instanceof TypeError?`offline`:e.message}return{ok:!1,error:i}}var Ad=e=>{let t=new Date(e);return`${t.getUTCDate()} ${t.toLocaleString(`en-GB`,{month:`short`,timeZone:`UTC`})} ${String(t.getUTCHours()).padStart(2,`0`)}:${String(t.getUTCMinutes()).padStart(2,`0`)} UTC`},jd=e=>{let t=new Date(e);return`${t.getUTCDate()} ${t.toLocaleString(`en-GB`,{month:`short`,timeZone:`UTC`})}`};function Md(e,t=Date.now()){if(!e)return{lvl:`wait`,short:`checking…`,long:`Checking NASA DONKI for solar storms heading to Mars…`};if(!e.ok)return{lvl:`off`,short:`not checked`,long:`Not checked (${e.error}). Before egress, check NASA's DONKI space-weather forecasts for CMEs heading to Mars.`};let{window:n,total:r}=e.summary;if(!n.length)return{lvl:`ok`,short:`no CME due`,long:`No CME forecast to reach Mars in the next 3 days. NASA's model forecast ${r} reaching Mars in the last 30 days.`};let i=n.find(e=>e.arrival>=t)||n[n.length-1],a=i.arrival<t,o=Math.round(Math.abs(i.arrival-t)/wd),s=a?`${o} h ago, may still be passing`:o<1?`due now`:`due in ${o} h`;return{lvl:`warn`,short:a?`CME ${o} h ago`:`CME ${s}`,link:i.link,long:`CME forecast to ${a?`have reached`:`reach`} Mars ${Ad(i.arrival)} (${s}${i.glancing?`, glancing blow`:``}), from a ${i.speed?`${Math.round(i.speed)} km/s `:``}CME launched ${jd(i.launched)}.${n.length>1?` ${n.length-1} more around the same days.`:``}`}}var Nd={high:{name:`high`,antialias:!0,maxPR:2,minPR:.75,lite:!1,color:`g_color_8k.jpg`,meshStep:1,sphere:[320,160],stars:7e3,shadowSteps:64,fpsCap:0,overlays:!0},medium:{name:`medium`,antialias:!0,maxPR:1.5,minPR:.7,lite:!1,color:`g_color_4k.jpg`,meshStep:1,sphere:[256,128],stars:5e3,shadowSteps:48,fpsCap:0,overlays:!0},low:{name:`low`,antialias:!1,maxPR:1.25,minPR:.6,lite:!0,color:`g_color_2k.jpg`,meshStep:2,sphere:[160,80],stars:2500,shadowSteps:32,fpsCap:30,overlays:!1}};function Pd(){return matchMedia(`(pointer: coarse)`).matches||navigator.maxTouchPoints>1}function Fd(){let e=new URLSearchParams(location.search).get(`q`);if(Nd[e])return Nd[e];let t=matchMedia(`(pointer: coarse)`).matches,n=Math.min(screen.width,screen.height),r=navigator.deviceMemory||8,i=navigator.hardwareConcurrency||8;return t&&n<820||r<=3?Nd.low:t||r<=4||i<=4?Nd.medium:Nd.high}function Id(e,t){let n=t.capabilities.maxTextureSize;return e.name===`high`&&n<8192?Nd.medium:e.name===`medium`&&n<4096?Nd.low:e}var Ld=class{constructor(e,t){this.tier=e,this.apply=t,this.pr=Math.min(window.devicePixelRatio||1,e.maxPR),this.samples=[],this.goodWindows=0,this.frozen=0}tick(e){if(this.frozen>0){this.frozen--;return}if(e>250||(this.samples.push(e),this.samples.length<40))return;let t=[...this.samples].sort((e,t)=>e-t),n=t[Math.floor(t.length*.6)];this.samples.length=0;let r=this.tier.fpsCap?1e3/this.tier.fpsCap:1e3/60,i=Math.min(window.devicePixelRatio||1,this.tier.maxPR);n>r*1.45&&this.pr>this.tier.minPR?(this.set(Math.max(this.tier.minPR,this.pr-(n>r*2.2?.35:.2))),this.goodWindows=0):n<r*1.12&&this.pr<i?++this.goodWindows>=4&&(this.set(Math.min(i,this.pr+.15)),this.goodWindows=0):this.goodWindows=0}set(e){this.pr=Math.round(e*100)/100,this.frozen=20,this.apply(this.pr)}},Rd=class{constructor(e){this.renderer=e;let t={type:N,samples:0,depthBuffer:!0};this.a=new gn(2,2,t),this.b=new gn(2,2,t),this.mat=new La({uniforms:{tA:{value:this.a.texture},tB:{value:this.b.texture},uT:{value:0},uAspect:{value:1}},vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
        uniform sampler2D tA, tB; uniform float uT, uAspect; varying vec2 vUv;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
          return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
        void main(){
          vec3 a = texture2D(tA, vUv).rgb, b = texture2D(tB, vUv).rgb;
          vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
          float n = noise(p * 9.0) * 0.55 + noise(p * 31.0) * 0.25 + length(p) * 0.35;
          float t = uT * 1.25 - 0.1;
          float m = smoothstep(t - 0.06, t + 0.06, n);
          float edge = smoothstep(0.08, 0.0, abs(n - t)) * (1.0 - uT) * step(0.01, uT);
          vec3 c = mix(b, a, m) + vec3(1.0, 0.55, 0.2) * edge * 0.9;
          gl_FragColor = vec4(c, 1.0);
          #include <colorspace_fragment>
        }`,depthTest:!1,depthWrite:!1}),this.quad=new Hi(new Ta(2,2),this.mat),this.scene=new tr,this.scene.add(this.quad),this.cam=new Oo(-1,1,1,-1,0,1)}setSize(e,t,n){let r=Math.min(n,1);this.a.setSize(Math.round(e*r),Math.round(t*r)),this.b.setSize(Math.round(e*r),Math.round(t*r)),this.mat.uniforms.uAspect.value=e/t}render(e,t,n){let r=this.renderer;r.setRenderTarget(this.a),r.render(e.scene,e.camera),r.setRenderTarget(this.b),r.render(t.scene,t.camera),r.setRenderTarget(null),this.mat.uniforms.uT.value=n,r.render(this.scene,this.cam)}},zd=class{constructor(e){this.c=e,this.g=e.getContext(`2d`),this.parts=Array.from({length:140},()=>this.spawn(Math.random())),this.intensity=0,this.active=!1,this.c.style.display=`none`}spawn(e=0){return{a:Math.random()*Math.PI*2,r:.05+e*.9,v:.4+Math.random()*1.4,w:.5+Math.random()*1.5}}resize(e,t,n){let r=Math.min(n,1.5);this.c.width=Math.round(e*r),this.c.height=Math.round(t*r),this.pr=r}update(e){let t=this.g,n=this.c.width,r=this.c.height;if(this.intensity<.01){this.active&&=(t.clearRect(0,0,n,r),this.c.style.display=`none`,!1);return}this.active||=(this.c.style.display=``,!0),t.clearRect(0,0,n,r);let i=Math.hypot(n,r)*.5;t.lineCap=`round`;for(let a of this.parts){a.r+=a.v*e*(.6+this.intensity*1.6)*a.r,a.r>1.1&&Object.assign(a,this.spawn());let o=.04+a.v*.08*this.intensity,s=n/2+Math.cos(a.a)*a.r*i,c=r/2+Math.sin(a.a)*a.r*i,l=n/2+Math.cos(a.a)*(a.r+o)*i,u=r/2+Math.sin(a.a)*(a.r+o)*i;t.strokeStyle=`rgba(255,${170+a.w*40|0},120,${.35*this.intensity*Math.min(1,a.r*2)})`,t.lineWidth=a.w*this.pr,t.beginPath(),t.moveTo(s,c),t.lineTo(l,u),t.stroke()}}},Bd=class{constructor(e){this.app=e,this.running=!1,this.captions=!0,this.token=0}toggle(){this.running?this.stop(`AUTOPILOT OFF · MANUAL CONTROL`):this.start()}interrupt(){this.running&&this.stop(`AUTOPILOT OFF · MANUAL CONTROL`)}stop(e){if(!this.running)return;this.running=!1,this.token++,document.body.classList.remove(`cine`);let t=this.app;t.crater&&(t.crater.autoOrbit=0),t.site&&(t.site.autoOrbit=0),t.hud.caption(null),this.restore(),e&&t.hud.toast(e);let n=document.getElementById(`btn-cine`);n&&(n.textContent=`▶ AUTOPILOT`)}cap(e,t,n=0){this.captions&&this.running&&this.app.hud.caption(e,t,n)}async step(e){let t=this.token;if(await e,t!==this.token)throw Error(`cancelled`)}snapshot(){let e=this.app,t=e.planner;this.saved={o2:t.params.o2CapKg,follow:t.follow,returnToStart:t.returnToStart,waypoints:t.waypoints.slice(),goal:t.goal,rover:t.params.rover,layers:{crater:{...e.crater.layers},site:{...e.site.layers}},orbitLayer:e.orbit.layer,zones:e.orbit.zones}}restore(){let e=this.app,t=e.planner,n=this.saved;if(n){this.saved=null,e.fpv?.active&&e.fpv.exit(),t.stopSim();for(let t of[`crater`,`site`]){let r=e[t];for(let[e,i]of Object.entries(n.layers[t]))r.layers[e]!==i&&r.toggleLayer(e,i)}e.active?.layers&&e.hud.terrainLegend(e.active),e.orbit.layer!==n.orbitLayer&&e.setOrbitLayer(n.orbitLayer),e.orbit.zones!==n.zones&&(e.orbit.zones=n.zones,e.mode===`orbit`&&e.hud.renderOrbit(e.orbit)),t.params.o2CapKg=n.o2,t.follow=n.follow,t.returnToStart=n.returnToStart,t.waypoints=n.waypoints,t.goal=n.goal,t.params.rover=n.rover,t.userEdit=!1,t.compute()}}async wait(e){let t=this.token;if(await new Promise(t=>setTimeout(t,e*1e3)),t!==this.token)throw Error(`cancelled`)}async until(e,t=20){let n=this.token,r=performance.now();for(;!e()&&performance.now()-r<t*1e3;)if(await new Promise(e=>setTimeout(e,100)),n!==this.token)throw Error(`cancelled`)}async start(){let e=this.app;if(!(this.running||e.mode===`boot`)){this.running=!0,this.snapshot(),e.planner.params.rover=!1,e.resetPlan(`tour`),e.hud.closeSheet(),e.pin?.close(),document.getElementById(`btn-cine`).innerHTML=`■ STOP<span class="full"> AUTOPILOT</span>`,document.body.classList.add(`cine`);try{await this.script(),this.stop()}catch(e){e.message!==`cancelled`&&(console.error(e),this.stop(`AUTOPILOT STOPPED`))}}}async script(){let e=this.app;for(;e.mode!==`orbit`;)await this.step(e.exitUp()),await this.until(()=>!e.busy);let t=e.orbit;t.autoSpin=!0,t.lastUser=t.time+1,t.altTarget=3,e.setOrbitLayer(`visible`),this.cap(`AERO ATLAS`,`Every NASA Mars mission, layered into one map`,4200),await this.wait(4.5),e.setOrbitLayer(`topo`),this.cap(`LAYER · MARS GLOBAL SURVEYOR MOLA`,`Laser-altimeter topography of the whole planet`,3200),await this.wait(3.4),e.setOrbitLayer(`thermal`),this.cap(`LAYER · MARS ODYSSEY THEMIS`,`Night infrared: rock stays warm, dust cools fast`,3200),await this.wait(3.4),e.setOrbitLayer(`geology`),this.cap(`LAYER · USGS GEOLOGIC MAP OF MARS`,`Rock units and their ages: Jezero’s ground is over 3.2 billion years old`,3200),await this.wait(3.4),e.setOrbitLayer(`visible`),t.zones=!0,e.hud.renderOrbit(t),this.cap(`NASA’S PROPOSED HUMAN LANDING ZONES`,`Exploration Zones from NASA’s 2015 workshop · Jezero sits inside one`,3600),await this.wait(3.8),this.cap(`TARGET · JEZERO CRATER`,`18.4° N 77.5° E: an ancient lake with a river delta`,4e3);let n=t.altTarget;await Vd(3.2,e=>{t.altTarget=Math.exp(H.lerp(Math.log(n),Math.log(.42),e)),t.lastUser=t.time-2},this),await this.wait(.6),t.zones=!1,e.hud.renderOrbit(t),this.cap(`DESCENT`,`Orbit to crater, straight down through the data`,3e3),await this.step(e.descendToJezero());let r=e.crater;this.cap(`MRO CONTEXT CAMERA · 5 m / PIXEL`,`On a 20 m stereo elevation model, relief ×2.2`,3600),r.autoOrbit=.035,await this.wait(3.8),e.toggleTerrainLayer(`elev`,!0),e.toggleTerrainLayer(`contour`,!0),this.cap(`ELEVATION + CONTOURS`,`The crater floor sits 2.6 km below the Mars datum`,3200),await this.wait(3.4),e.toggleTerrainLayer(`thermal`,!0),this.cap(`GROUND FIRMNESS · MARS ODYSSEY THEMIS`,`Firm rock stays warm at night. Loose dust and sand cool fast`,3400),await this.wait(3.6),e.toggleTerrainLayer(`slope`,!0),e.toggleTerrainLayer(`contour`,!1),this.cap(`SLOPE HAZARD`,`Green is walkable. Red is a cliff`,3e3),await this.wait(3.2),e.toggleTerrainLayer(`slope`,!1);let i=e.assets.traverse;i&&(this.cap(`PERSEVERANCE · REAL DRIVE PATH`,`${i.totalKm} km over ${i.lastSol.toLocaleString(`en-US`)} sols, from NASA/JPL mission waypoints`,3400),await this.wait(3.6)),r.autoOrbit=0,this.cap(`MARSWALK ZONE`,`Where Perseverance landed and cached 10 sample tubes`,3200),await this.step(e.enterSite());let a=e.site;this.cap(`MRO HiRISE · 25 cm / PIXEL`,`On a 1 m elevation model: boulder-scale hazards`,3400),a.autoOrbit=.03,await this.wait(3.6),e.toggleTerrainLayer(`slope`,!0);let o=e.planner.result;if(o&&!o.failed){let e=o.budget;this.cap(`SAFEST ROUTE · A* ON THE HiRISE DTM`,`${(e.distance/1e3).toFixed(1)} km loop from LZ-A via the Three Forks depot. Stays under ${e.fineMax.toFixed(0)}°; a straight line would hit ${o.direct.maxFine.toFixed(0)}°`,4800)}await this.wait(5),e.toggleTerrainLayer(`slope`,!1),a.autoOrbit=0;let s=e.planner,c=s.params.o2CapKg;this.cap(`WHAT IF THE SUIT CARRIED ONLY 0.20 kg OF O₂?`,`The planner finds the point of no return and calls NO-GO`,4200),s.params.o2CapKg=.2,s.userEdit=!0,s.compute(),await this.wait(4.4);let l=s.result;if(l&&l.o2Out){this.cap(`AND IF THEY WALK ANYWAY?`,`Simulated EVA on the same plan`,0),await this.step(a.flyTo({dist:2.2,el:.8},1.2)),s.follow=!0,s.startSim(Math.max(900,l.o2Out.t/6)),await this.until(()=>s.sim&&s.sim.dead,25),e.hud.caption(null),await this.wait(2.8);let t=s.sim?.deadAt?.lt;t&&this.cap(`EARTH CANNOT HELP IN TIME`,`A mayday takes ${Math.round(t/60)} min to reach Earth. The plan has to be right before egress.`,4200),await this.wait(4.4),s.stopSim()}s.params.o2CapKg=c,s.userEdit=!0,s.compute(),await this.wait(2.6);let u=s.result;if(await this.step(a.flyTo({dist:1.6,el:.62},1.4)),s.follow=!0,s.startSim(900),u&&!u.failed){let e=u.budget;this.cap(`THE WATNEY CHECK`,`${e.o2.toFixed(2)} kg of O₂ used out of ${s.params.o2CapKg.toFixed(2)} kg: ${e.marginPct.toFixed(0)} % left at the airlock`,0)}await this.until(()=>!s.sim,7),s.stopSim(),e.hud.caption(null),await this.step(a.flyTo(a.overview(),2)),s.waypoints=s.waypoints.slice(0,1),s.compute(),this.cap(`PICK A DESTINATION`,`Three Forks sample depot`,2400),await this.wait(2.4);let d=a.cfg.pois.find(e=>e.id===`depot`);e.onPOIClick(a,d),await this.wait(3.2),e.toggleTerrainLayer(`holo`,!0),e.toggleTerrainLayer(`contour`,!0),a.autoOrbit=.05,this.cap(`AERO ATLAS · NASA SPACE APPS 2026`,`Aero Atlas plans the walk. Every sol counts.`,0),await this.wait(6),e.toggleTerrainLayer(`holo`,!1),e.toggleTerrainLayer(`contour`,!1),a.autoOrbit=0,e.hud.caption(null),e.resetPlan(`tour`)}update(){}};function Vd(e,t,n){let r=n.token;return new Promise((i,a)=>{let o=performance.now(),s=()=>{if(r!==n.token){a(Error(`cancelled`));return}let c=Math.min(1,(performance.now()-o)/1e3/e);t(c<.5?2*c*c:1-(-2*c+2)**2/2),c<1?requestAnimationFrame(s):i()};s()})}var Hd=`
varying vec2 vUv;
varying vec3 vObjN;
varying vec3 vWorldPos;
varying vec3 vWorldN;
void main() {
  vUv = uv;
  vObjN = normalize(position);
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vWorldN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Ud=`
precision highp float;
uniform sampler2D uColor, uNormal, uTopo, uThermal, uGeo;
uniform sampler2D rColor, rNormal, rTopo, rThermal;
uniform sampler2D cDecal;
uniform vec4 rB;      // region bounds: lon0 lat0 lon1 lat1
uniform vec4 cB;      // crater bounds
uniform float wVis, wTopo, wTherm, wGeo;
uniform float uDecal, uCDecal;
uniform vec3 uSunObj, uSunWorld;
uniform float uGrid, uTime;
uniform vec3 uTargetObj;
uniform float uTarget;
uniform float uNormalStrength;
// NASA's proposed human Exploration Zones (2015 workshop): unit vectors of the zone centres
uniform vec3 uEZ[EZ_N];
uniform vec3 uEZHome;
uniform float uEZOn, uEZRad;
varying vec2 vUv;
varying vec3 vObjN;
varying vec3 vWorldPos;
varying vec3 vWorldN;

float feather(vec2 p, float f) {
  vec2 e = smoothstep(vec2(0.0), vec2(f), p) * smoothstep(vec2(0.0), vec2(f), 1.0 - p);
  return e.x * e.y;
}
float inside(vec2 p) { return step(0.0, p.x) * step(0.0, p.y) * step(p.x, 1.0) * step(p.y, 1.0); }

void main() {
  float lon = vUv.x * 360.0 - 180.0;
  float lat = vUv.y * 180.0 - 90.0;
  vec3 cVis = texture2D(uColor, vUv).rgb;
  vec3 cTopo = texture2D(uTopo, vUv).rgb;
  vec3 cTh = texture2D(uThermal, vUv).rgb;
  vec3 cGeo = texture2D(uGeo, vUv).rgb;
  vec3 nt = texture2D(uNormal, vUv).xyz * 2.0 - 1.0;

  vec2 ru = vec2((lon - rB.x) / (rB.z - rB.x), (lat - rB.y) / (rB.w - rB.y));
  float rm = inside(ru) * feather(ru, 0.14) * uDecal;
  if (rm > 0.0) {
    cVis = mix(cVis, texture2D(rColor, ru).rgb, rm);
    cTopo = mix(cTopo, texture2D(rTopo, ru).rgb, rm);
    cTh = mix(cTh, texture2D(rThermal, ru).rgb, rm);
    nt = mix(nt, texture2D(rNormal, ru).xyz * 2.0 - 1.0, rm);
  }
  vec2 cu = vec2((lon - cB.x) / (cB.z - cB.x), (lat - cB.y) / (cB.w - cB.y));
  float cm = inside(cu) * feather(cu, 0.08) * uCDecal;
  if (cm > 0.0) {
    vec3 d = texture2D(cDecal, cu).rgb;
    cVis = mix(cVis, d, cm);
  }

  // warm the Viking colour a touch toward what rovers see
  vec3 vis = pow(cVis, vec3(1.05)) * vec3(1.10, 0.97, 0.86);
  vec3 albedo = vis * wVis + cTopo * wTopo + cTh * wTherm + cGeo * wGeo;

  float lr = radians(lon);
  vec3 N = normalize(vObjN);
  vec3 E = normalize(vec3(-sin(lr), 0.0, -cos(lr)));
  vec3 Nn = cross(N, E);
  vec3 n = normalize(E * nt.x * uNormalStrength + Nn * nt.y * uNormalStrength + N * max(nt.z, 0.2));
  float ndl = dot(n, uSunObj);
  float mu = dot(N, uSunObj);
  float day = smoothstep(-0.12, 0.22, mu);
  float diff = max(ndl, 0.0) * day;
  float scan = clamp(wTopo + wTherm + wGeo, 0.0, 1.0);
  float lit = diff * 1.3 + 0.012;
  float instrument = 0.42 + 0.7 * max(dot(n, normalize(N + uSunObj * 0.6)), 0.0);
  vec3 col = albedo * mix(lit, instrument, scan * 0.85);

  // Martian twilight: faint blue at the terminator
  col += vec3(0.10, 0.16, 0.28) * smoothstep(0.12, 0.0, abs(mu)) * 0.25 * wVis;

  vec3 V = normalize(cameraPosition - vWorldPos);
  vec3 WN = normalize(vWorldN);
  float fres = pow(1.0 - max(dot(WN, V), 0.0), 3.0);
  float sunSide = smoothstep(-0.25, 0.5, dot(WN, uSunWorld));
  col += vec3(1.0, 0.56, 0.32) * fres * 0.45 * sunSide;

  // graticule (10 deg)
  vec2 g = vec2(lon, lat) / 10.0;
  vec2 gd = abs(fract(g - 0.5) - 0.5) / max(fwidth(g), 1e-4);
  float line = 1.0 - min(min(gd.x, gd.y), 1.0);
  col = mix(col, vec3(1.0, 0.62, 0.26), line * uGrid * 0.32);

  // Exploration Zones: 100 km radius rings (chord length ~ angle at this size)
  if (uEZOn > 0.001) {
    float px = max(length(fwidth(N)), 1e-6);
    float ring = 0.0, fill = 0.0;
    for (int i = 0; i < EZ_N; i++) {
      float a = distance(N, uEZ[i]);
      if (a < uEZRad * 1.5) {
        ring = max(ring, 1.0 - smoothstep(0.0, 1.6 * px, abs(a - uEZRad)));
        fill = max(fill, 1.0 - step(uEZRad, a));
      }
    }
    float ah = distance(N, uEZHome);
    float home = 1.0 - smoothstep(0.0, 2.6 * px, abs(ah - uEZRad));
    float homeFill = 1.0 - step(uEZRad, ah);
    vec3 ez = vec3(0.37, 0.83, 1.0);
    col = mix(col, ez * 0.9, fill * 0.16 * uEZOn);
    col = mix(col, ez * 1.4, ring * 0.85 * uEZOn);
    col = mix(col, vec3(0.75, 0.95, 1.0) * 1.5, home * uEZOn);
    col += ez * homeFill * 0.06 * uEZOn;
  }

  // target lock rings around Jezero
  if (uTarget > 0.001) {
    float ang = degrees(acos(clamp(dot(N, uTargetObj), -1.0, 1.0)));
    float fw = max(fwidth(ang), 1e-4);
    float r1 = 1.0 - smoothstep(0.0, 1.5 * fw, abs(ang - 0.42));
    float pulse = fract(uTime * 0.45);
    float r2 = (1.0 - smoothstep(0.0, 2.0 * fw, abs(ang - (0.42 + pulse * 1.6)))) * (1.0 - pulse);
    float a = atan(dot(cross(uTargetObj, N), vec3(0.0, 1.0, 0.0)), dot(N - uTargetObj, vec3(0.0, 1.0, 0.0)));
    float dash = step(0.5, fract(a * 6.0 / 3.14159 + uTime * 0.2));
    vec3 rc = vec3(1.0, 0.66, 0.3);
    col = mix(col, rc * 1.6, r1 * uTarget * (0.55 + 0.45 * dash));
    col += rc * r2 * uTarget * 0.8;
  }
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`,Wd=`
varying vec3 vNV;
varying vec3 vWN;
void main() {
  vNV = normalize(normalMatrix * normal);
  vWN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,Gd=`
uniform vec3 uSunWorld;
uniform float uStrength;
varying vec3 vNV;
varying vec3 vWN;
void main() {
  float i = pow(clamp(0.74 + dot(vNV, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 5.0);
  float d = dot(normalize(vWN), uSunWorld);
  float day = smoothstep(-0.35, 0.35, d);
  vec3 dust = vec3(1.0, 0.58, 0.34);
  vec3 blue = vec3(0.42, 0.62, 1.0);
  vec3 c = mix(blue, dust, smoothstep(-0.05, 0.4, d));
  gl_FragColor = vec4(c * i * day * uStrength, i * day);
  #include <colorspace_fragment>
}`,Kd=`
attribute float aSize;
attribute vec3 aColor;
varying vec3 vColor;
uniform float uTime;
uniform float uPixelRatio;
void main() {
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float tw = 0.85 + 0.15 * sin(uTime * (1.0 + fract(position.x * 13.1)) * 2.0 + position.y);
  gl_PointSize = aSize * uPixelRatio * tw;
  gl_Position = projectionMatrix * mv;
}`,qd=`
varying vec3 vColor;
void main() {
  vec2 p = gl_PointCoord - 0.5;
  float d = length(p);
  float a = smoothstep(0.5, 0.0, d);
  a = a * a;
  gl_FragColor = vec4(vColor * a, a);
  #include <colorspace_fragment>
}`,Jd=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,Yd=`
varying vec3 vDir;
float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
float noise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n = mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  return n;
}
float fbm(vec3 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * noise(p); p *= 2.07; a *= 0.5; } return s; }
void main() {
  vec3 d = normalize(vDir);
  vec3 axis = normalize(vec3(0.35, 0.82, -0.45));
  float band = exp(-pow(dot(d, axis) / 0.2, 2.0));
  float n = fbm(d * 3.0) * 0.7 + fbm(d * 9.0) * 0.3;
  float dust = smoothstep(0.35, 0.8, fbm(d * 6.0 + 3.0));
  vec3 c = vec3(0.55, 0.5, 0.62) * band * n * 0.11 * (1.0 - dust * 0.6);
  c += vec3(0.25, 0.12, 0.05) * pow(band, 3.0) * n * 0.05;
  gl_FragColor = vec4(c, 1.0);
  #include <colorspace_fragment>
}`,Xd=3389.5,Zd=Math.PI/180;function Qd(e,t,n=1,r=new W){let i=e*Zd,a=t*Zd;return r.set(Math.cos(i)*Math.cos(a)*n,Math.sin(i)*n,-Math.cos(i)*Math.sin(a)*n)}function $d(e){let t=e.clone().normalize();return{lat:Math.asin(H.clamp(t.y,-1,1))/Zd,lon:Math.atan2(-t.z,t.x)/Zd}}function ef(e){return`${Math.abs(e).toFixed(4)}°${e>=0?`N`:`S`}`}function tf(e){let t=(e+540)%360-180;return`${Math.abs(t).toFixed(4)}°${t>=0?`E`:`W`}`}function nf(e,t=0){return Number(e).toLocaleString(`en-US`,{minimumFractionDigits:t,maximumFractionDigits:t})}function rf(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?1:2)} km`:`${Math.round(e)} m`}function af(e){let t=Math.floor(e/3600),n=Math.round(e%3600/60);return t?`${t}h ${String(n).padStart(2,`0`)}m`:`${n} min`}function of(e,t,n){return e+(((t-e+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI)*n}var sf={inOut:e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,out:e=>1-(1-e)**3,in:e=>e*e*e},cf=(e,t)=>1-Math.exp(-e*t),lf=class{constructor(){this.list=[]}add(e,t,n=sf.inOut){return new Promise(r=>this.list.push({t:0,duration:e,fn:t,easing:n,resolve:r}))}update(e){for(let t of this.list)t.t=Math.min(1,t.t+e/t.duration),t.fn(t.easing(t.t),t.t),t.t>=1&&(t.done=!0);this.list=this.list.filter(e=>(e.done&&e.resolve(),!e.done))}clear(){this.list.forEach(e=>e.resolve()),this.list=[]}get busy(){return this.list.length>0}},uf=[{id:`jezero`,name:`Jezero Crater`,mission:`Perseverance · Ingenuity`,year:2021,lat:18.4447,lon:77.4508,status:`active`,blurb:`45 km crater that once held a lake. River delta, carbonates, 10 sample tubes cached at Three Forks.`},{id:`gale`,name:`Gale Crater`,mission:`Curiosity`,year:2012,lat:-4.5895,lon:137.4417,status:`locked`},{id:`meridiani`,name:`Meridiani Planum`,mission:`Opportunity`,year:2004,lat:-1.9462,lon:-5.5266,status:`locked`},{id:`gusev`,name:`Gusev Crater`,mission:`Spirit`,year:2004,lat:-14.5684,lon:175.4726,status:`locked`},{id:`elysium`,name:`Elysium Planitia`,mission:`InSight`,year:2018,lat:4.502,lon:135.623,status:`locked`},{id:`utopia`,name:`Utopia Planitia`,mission:`Zhurong`,year:2021,lat:25.066,lon:109.925,status:`locked`},{id:`chryse`,name:`Chryse Planitia`,mission:`Viking 1`,year:1976,lat:22.27,lon:-47.95,status:`locked`},{id:`aresvallis`,name:`Ares Vallis`,mission:`Pathfinder`,year:1997,lat:19.13,lon:-33.22,status:`locked`},{id:`phoenix`,name:`Vastitas Borealis`,mission:`Phoenix`,year:2008,lat:68.22,lon:-125.75,status:`locked`},{id:`ares3`,name:`Acidalia Planitia`,mission:`Ares III Hab · The Martian (fiction)`,year:2035,lat:31.2,lon:-28.5,status:`fiction`,blurb:`Where Mark Watney got left behind in Andy Weir’s novel. Not a real site, but we plan for the same problem: get home on the oxygen you carry.`}],df=[{id:`oeb`,name:`Octavia E. Butler Landing`,kind:`landing`,lat:18.4447,lon:77.4508,reason:`Check 5+ years of dust on Perseverance’s landing site`,text:`Perseverance touched down here on 18 Feb 2021. The descent imagery, sky-crane and heat-shield debris were all mapped from orbit by HiRISE.`,source:`NASA/JPL-Caltech`,photo:{file:`photos/oeb.jpg`,camera:`Navcam`,sol:16,date:`7 Mar 2021`,credit:`NASA/JPL-Caltech`}},{id:`depot`,name:`Three Forks Sample Depot`,kind:`science`,lat:18.45283,lon:77.40821,reason:`Collect sealed sample tubes for the trip home`,text:`10 sealed sample tubes laid at the foot of the delta, sols 653–690 (Dec 2022 – Jan 2023), spaced 5–15 m apart in a zig-zag. The backup cache for Mars Sample Return.`,source:`NASA PDS Geosciences Node, Mars 2020 Three Forks Depot bundle (rover position at each tube drop)`,photo:{file:`photos/depot.jpg`,camera:`Mastcam-Z`,sol:690,date:`28 Jan 2023`,credit:`NASA/JPL-Caltech/ASU`,note:`the day the last tube went down, looking at the delta`}},{id:`delta`,name:`Western Fan (delta)`,kind:`geology`,lat:18.505,lon:77.37,approx:!0,text:`Layered river-delta sediments deposited ~3.5 billion years ago where Neretva Vallis emptied into the lake. The prime place to look for preserved biosignatures.`,source:`Mangold et al. 2021, Science`},{id:`neretva`,name:`Neretva Vallis`,kind:`geology`,lat:18.545,lon:77.255,approx:!0,text:`The inlet channel that cut through the western rim and fed the lake.`,source:`MRO CTX mosaic`},{id:`pliva`,name:`Pliva Vallis (outlet)`,kind:`geology`,lat:18.71,lon:78.1,approx:!0,text:`Outlet channel breaching the eastern rim. It shows the lake overflowed, so it was an open-basin lake.`,source:`MRO CTX mosaic`},{id:`belva`,name:`Belva crater`,kind:`geology`,lat:18.485,lon:77.379,approx:!0,text:`~0.9 km impact crater on top of the delta. Its walls expose a natural cross-section through the delta layers.`,source:`MRO HiRISE / CTX`},{id:`rim`,name:`Western crater rim`,kind:`geology`,lat:18.4,lon:77.29,approx:!0,text:`The rim stands roughly 600 m above the floor and exposes the oldest rocks in the area. Perseverance started climbing it in late 2024.`,source:`Mars 2020 CTX DEM (JPL)`}],ff=[{id:`lz`,name:`LZ-A · Crew Landing Zone`,kind:`lz`,lat:18.45,lon:77.485,proposed:!0,reason:`Airlock: EVA starts and ends here`,text:`Our proposed crew landing zone. It sits on flat Máaz lava floor, with a median slope under 3° in the HiRISE DTM, and keeps over 4 km of stand-off so engine plume ejecta cannot reach the sample depot.`,source:`Aero Atlas design (HiRISE DTM analysis)`},df[0],df[1],{id:`seitah`,name:`Séítah`,kind:`geology`,lat:18.43394,lon:77.44302,reason:`Sample olivine-rich igneous bedrock`,photo:{file:`photos/seitah.jpg`,camera:`Navcam`,sol:249,date:`1 Nov 2021`,credit:`NASA/JPL-Caltech`},text:`Ridges of olivine-rich igneous rock broken up by sand ripples. Perseverance parked here on Séítah’s edge for sols 248–278 and cored Coulettes on sol 271, now one of the ten tubes at Three Forks. Tough walking, high science value.`,source:`NASA/JPL-Caltech MMGIS waypoints (rover position); PDS Three Forks Depot bundle (sample IDs)`},{id:`front`,name:`Delta front`,kind:`geology`,lat:18.45887,lon:77.40613,reason:`Log layered lake sediments for biosignatures`,photo:{file:`photos/front.jpg`,camera:`Navcam`,sol:502,date:`19 Jul 2022`,credit:`NASA/JPL-Caltech`,note:`layered rock on the delta front`},text:`The front of the delta: layered sandstone and mudstone laid down in the old lake. Perseverance parked here for sols 477–502 and cored Skyland on sol 495, now one of the ten tubes at Three Forks. The slope layer shows the steep edge to go around.`,source:`NASA/JPL-Caltech MMGIS waypoints (rover position); PDS Three Forks Depot bundle (sample IDs)`}],pf=[ff[0],...df.filter(e=>e.id!==`oeb`)],mf=[`lz`,`oeb`,`depot`,`seitah`],hf=[{id:`tour`,name:`Grand tour`,plan:mf,why:`The three things only this spot has: Perseverance’s landing site, its sample depot and Séítah’s olivine bedrock, in one loop.`},{id:`samples`,name:`Bring the samples home`,plan:[`lz`,`depot`],why:`Three Forks holds 10 sealed tubes Perseverance left as the backup cache for Mars Sample Return (Dec 2022 – Jan 2023). A crew on foot could collect them: the shortest, safest science walk here. Source: NASA/JPL-Caltech.`},{id:`igneous`,name:`Date the crater floor`,plan:[`lz`,`seitah`],why:`Séítah is olivine-rich igneous rock that settled out of a thick body of melt. Samples from it can date the crater floor, and so the lake that came after it (Liu et al. 2022, Science).`},{id:`life`,name:`Look for signs of ancient life`,plan:[`lz`,`front`],why:`The delta front exposes layered lake sediments, the rocks most likely to have preserved signs of past life (Mangold et al. 2021, Science). The scarp is steep, so the route has to find a way around it.`}],gf={A:`Amazonian`,H:`Hesperian`,N:`Noachian`},_f={e:`Early`,m:`Middle`,l:`Late`},vf={h:[`highland`,`highland`],hm:[`highland massif`,`highland`],hu:[`highland undivided`,`highland`],he:[`highland edifice`,`highland`],v:[`volcanic`,`volcanic`],vf:[`volcanic field`,`volcanic`],ve:[`volcanic edifice`,`volcanic`],b:[`basin`,`basin`],l:[`lowland`,`lowland`],a:[`apron`,`apron`],i:[`impact`,`impact`],t:[`transition`,`transition`],tu:[`transition undivided`,`transition`],to:[`transition outflow`,`transition`],p:[`polar`,`polar`],pu:[`polar undivided`,`polar`],pe:[`polar edifice`,`polar`],pc:[`polar cap`,`polar`],pd:[`polar dunes`,`polar`]},yf={highland:`Densely cratered old crust: a mix of impact, sedimentary and volcanic rocks.`,volcanic:`Lava flows and volcanic deposits, most likely basalt.`,basin:`Low-lying plains on the floors of the giant impact basins.`,lowland:`Sediments spread across the northern lowlands, likely mixed with lava.`,apron:`Lobes of material that flowed or slid downslope.`,impact:`Ejecta and rims of large, well-preserved impact craters.`,transition:`Plains, knobs and mesas where the highlands step down to the lowlands.`,polar:`Mostly ice, dust and other fines at the poles.`},bf={HNt:`Knobs, mesas and plains on the highland edge: ancient impact breccias, sediments and volcanic rocks, with aprons of material shed from slopes. Jezero sits in this unit at this map scale.`,mNhm:`High massifs uplifted by a giant impact, here the Isidis basin, about 3.9 billion years ago. The massifs ring Isidis just east of Jezero.`,lHl:`Sediments from floods and rivers spread across the northern lowlands, likely mixed with lava. It covers the floor of Isidis Planitia.`,eHv:`Flood lavas from fissures and vents. Syrtis Major, south-west of Jezero, is built of it.`},xf={eN:null,mN:3.96,lN:3.85,eH:3.56,lH:3.39,eA:3.24,mA:1.03,lA:.274},Sf=[`eN`,`mN`,`lN`,`eH`,`lH`,`eA`,`mA`,`lA`];function Cf(e,t){let n=t.flatMap(t=>e?[e+t]:[`e`+t,`m`+t,`l`+t].filter(e=>e in xf)).map(e=>Sf.indexOf(e)).filter(e=>e>=0).sort((e,t)=>e-t),r=Sf[n[0]],i=Sf[n[n.length-1]],a=xf[r],o=Sf[Sf.indexOf(i)+1],s=o?xf[o]:0;return a==null?s===0?`Noachian to recent`:`more than ${s} billion years old`:s===0?`${a} billion years ago to recent`:`${a}–${s} billion years ago`}function wf(e){let t=/^([eml]?)([AHN]+)([a-z]+)$/.exec(e);if(!t)return{sym:e,name:e,age:``,group:``,text:``};let[,n,r,i]=t,[a,o]=vf[i]||[i,``],s=r.split(``);return{sym:e,name:`${n?_f[n]+` `:``}${s.map(e=>gf[e]).join(` and `)} ${a} unit`,age:Cf(n,s),group:o,text:bf[e]||yf[o]||``}}var Tf=[`HNt`,`mNhm`,`lHl`,`eHv`],Ef=.115,Df=new yn,Of=new ts,kf=new W,Af=new W(1,0,0),jf=7,Mf=[{id:`visible`,key:`1`,name:`Visible colour`,src:`Viking Orbiter · MDIM 2.1 (NASA Ames)`},{id:`topo`,key:`2`,name:`Topography`,src:`MGS · MOLA + ESA Mars Express · HRSC`},{id:`thermal`,key:`3`,name:`Night thermal IR`,src:`Mars Odyssey · THEMIS`},{id:`geology`,key:`4`,name:`Geologic map`,src:`USGS SIM 3292 · Planetary Geologic Mapping`}],Nf=class{constructor(e){this.app=e,this.scene=new tr,this.camera=new Do(40,1,.002,3e3),this.sunWorld=new W(-.66,.3,.69).normalize(),this.tweens=new lf,this.jezero=uf[0],this.jezeroObj=Qd(this.jezero.lat,this.jezero.lon),this.spin=this.spinFor(this.jezero)-1.1,this.spinVel=0,this.pitch=.22,this.pitchVel=0,this.alt=3.4,this.altTarget=3.4,this.lastUser=-10,this.time=0,this.layer=`visible`,this.weights={visible:1,topo:0,thermal:0,geology:0},this.grid=.35,this.zones=!1,this.autoSpin=!0,this.locked=!1,this.pushIn=0,this.mode=`free`,this.pointer=new U(-9,-9)}spinFor(e){let t=Qd(e.lat,e.lon);return-Math.atan2(t.x,t.z)}build(e){let{tex:t,manifest:n}=e,r=this.scene,i=new Hi(new Ea(900,48,24),new La({vertexShader:Jd,fragmentShader:Yd,side:1,depthWrite:!1}));r.add(i),r.add(this.makeStars());let a=new Ci(new li({map:If([[0,`rgba(255,245,230,1)`],[.08,`rgba(255,220,180,.9)`],[.25,`rgba(255,160,90,.25)`],[1,`rgba(255,120,60,0)`]]),blending:2,depthWrite:!1,transparent:!0}));a.position.copy(this.sunWorld).multiplyScalar(800),a.scale.setScalar(120),r.add(a);let o=n.region,s=n.crater;this.uniforms={uColor:{value:t.g_color},uNormal:{value:t.g_normal},uTopo:{value:t.g_topo},uThermal:{value:t.g_thermal},uGeo:{value:t.g_geology},rColor:{value:t.r_color},rNormal:{value:t.r_normal},rTopo:{value:t.r_topo},rThermal:{value:t.r_thermal},cDecal:{value:t.c_decal},rB:{value:new q(o.lon[0],o.lat[0],o.lon[1],o.lat[1])},cB:{value:new q(s.lon[0],s.lat[0],s.lon[1],s.lat[1])},wVis:{value:1},wTopo:{value:0},wTherm:{value:0},wGeo:{value:0},uDecal:{value:0},uCDecal:{value:0},uSunObj:{value:new W},uSunWorld:{value:this.sunWorld},uGrid:{value:this.grid},uTime:{value:0},uTargetObj:{value:Qd(18.4,77.6)},uTarget:{value:0},uNormalStrength:{value:1}};let c=n.zones;this.ezList=c?c.list.map(([e,t,n])=>({name:e,lat:t,lon:n,obj:Qd(t,n)})):[],this.ezHome=this.ezList.find(e=>e.name===`Jezero-Isidis-Syrtis`)||null,Object.assign(this.uniforms,{uEZ:{value:this.ezList.length?this.ezList.map(e=>e.obj):[new W(0,0,9)]},uEZHome:{value:this.ezHome?this.ezHome.obj:new W(0,0,9)},uEZOn:{value:0},uEZRad:{value:(c?.radiusKm??100)/Xd}}),this.planet=new Hi(new Ea(1,...this.app.tier.sphere),new La({vertexShader:Hd,fragmentShader:Ud,uniforms:this.uniforms,defines:{EZ_N:Math.max(1,this.ezList.length)}})),r.add(this.planet),this.atmo=new Hi(new Ea(1.035,128,64),new La({vertexShader:Wd,fragmentShader:Gd,side:1,transparent:!0,blending:2,depthWrite:!1,uniforms:{uSunWorld:{value:this.sunWorld},uStrength:{value:1.25}}})),r.add(this.atmo);let l=new Ao(16773600,2.6);l.position.copy(this.sunWorld),r.add(l,new jo(4210768,.25)),this.moons=[{name:`PHOBOS`,r:2.76,size:.022,period:38,phase:.6,incl:1.1*Zd},{name:`DEIMOS`,r:6.92,size:.014,period:150,phase:2.4,incl:1.8*Zd}].map(e=>{let t=new Hi(Ff(e.size,e.name===`PHOBOS`?1.35:1.15,e.name.length),new za({color:8022621,roughness:1,metalness:0}));r.add(t);let n=[];for(let t=0;t<=256;t++){let r=t/256*Math.PI*2;n.push(new W(Math.cos(r)*e.r,0,Math.sin(r)*e.r))}let i=new la(new $r().setFromPoints(n),new Xi({color:16751164,transparent:!0,opacity:.22}));return i.rotation.x=e.incl,r.add(i),{...e,mesh:t,ring:i}});let u=this.app.labels;this.markers=uf.map(e=>{let t=e.status===`active`?`active`:e.status===`fiction`?`fiction`:`locked`,n=e.status===`active`?`Survey available`:e.status===`fiction`?`Fictional site`:`Locked · phase 2`,r=`<div class="dot"></div><div class="lb">${e.name}<small>${e.mission} · ${e.year}</small></div>
        <div class="card"><b>${e.name}</b>${e.blurb||`${e.mission} landed here in ${e.year}. This survey is locked in the first build; we are opening Jezero first.`}<em>${n} · ${ef(e.lat)} ${tf(e.lon)}</em></div>`,i=u.add(`orbit`,{className:t,html:r,world:new W,onClick:()=>e.status===`active`?this.app.descendToJezero():this.app.hud.toast(e.status===`fiction`?`Fictional site · Ares III never happened (yet)`:`${e.name.toUpperCase()} · SURVEY LOCKED IN PHASE 1`),occlude:t=>this.occluded(t.world)||this.alt<.5&&e.status!==`active`,priority:e.status===`active`?10:e.status===`fiction`?3:1});return i.site=e,i.obj=Qd(e.lat,e.lon,1.002),i});let d=Qd(this.jezero.lat,this.jezero.lon);this.ezLabels=this.ezList.map(e=>{let t=e===this.ezHome,n=Math.round(d.angleTo(e.obj)*Xd),r=t?`<b>${e.name} Exploration Zone</b>Proposed for the first human landings at NASA's 2015 Exploration Zone workshop: a 100 km radius area with science targets and resources a crew could reach. Jezero and our Marswalk site lie inside it, ${n} km from its centre.<em>NASA human landing sites workshop, Oct 2015 · ${ef(e.lat)} ${tf(e.lon)}</em>`:`<b>${e.name}</b>One of the Exploration Zones proposed for the first human landings at NASA's 2015 workshop (100 km radius).<em>NASA human landing sites workshop, Oct 2015 · ${ef(e.lat)} ${tf(e.lon)}</em>`,i=u.add(`orbit`,{className:`ez${t?` ez-home`:``}`,html:`<div class="dot"></div><div class="lb">${e.name}${t?`<small>Human Exploration Zone · Jezero inside</small>`:``}</div><div class="card">${r}</div>`,world:new W,occlude:e=>this.occluded(e.world),priority:t?6:0,onClick:()=>this.app.hud.toast(t?`JEZERO-ISIDIS-SYRTIS · OUR SITE IS INSIDE THIS ZONE`:`${e.name.toUpperCase()} · EXPLORATION ZONE (NASA 2015)`)});return i.obj=Qd(e.lat,e.lon,1.002),i.hiddenByUser=!0,i}),this.moonLabels=this.moons.map(e=>u.add(`orbit`,{className:`locked`,html:`<div class="lb" style="left:8px;top:-7px;font-size:11px;color:var(--text-3)">${e.name}</div>`,world:new W,occlude:e=>this.occluded(e.world,.03)}))}makeStars(){let e=this.app.tier.stars,t=new Float32Array(e*3),n=new Float32Array(e*3),r=new Float32Array(e),i=Pf(7);for(let a=0;a<e;a++){let e=i()*2-1,o=i()*Math.PI*2,s=Math.sqrt(1-e*e);t.set([Math.cos(o)*s*800,e*800,Math.sin(o)*s*800],a*3);let c=i(),l=c<.15?[.7,.8,1]:c<.8?[1,.97,.92]:[1,.82,.62],u=i()**6*.9+.12;n.set(l.map(e=>e*u),a*3),r[a]=1.2+i()**10*5.5}let a=new $r;return a.setAttribute(`position`,new zr(t,3)),a.setAttribute(`aColor`,new zr(n,3)),a.setAttribute(`aSize`,new zr(r,1)),this.starUniforms={uTime:{value:0},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)}},new ha(a,new La({vertexShader:Kd,fragmentShader:qd,uniforms:this.starUniforms,transparent:!0,depthWrite:!1,blending:2}))}occluded(e,t=0){let n=this.camera.position,r=e.clone().sub(n),i=r.length();r.normalize();let a=n.dot(r),o=n.lengthSq()-(1-t)**2,s=a*a-o;if(s<0)return!1;let c=-a-Math.sqrt(s);return c>0&&c<i-.004}setLayer(e){this.layer=e}onWheel(e){if(this.mode===`transit`)return;let t=e.deltaY*(e.deltaMode===1?30:1);if(this.lastUser=this.time,t<0&&this.alt<=Ef*1.02&&this.locked){this.pushIn+=-t,this.pushIn>240&&(this.pushIn=0,this.app.descendToJezero());return}this.pushIn=Math.max(0,this.pushIn-Math.abs(t)*.5),this.altTarget=H.clamp(this.altTarget*Math.exp(t*.0014),Ef,jf)}onDrag(e,t){if(this.mode===`transit`)return;let n=.0042*Math.min(1,this.alt*.6+.08);this.spinVel=e*n*60,this.pitchVel=t*n*60,this.spin+=e*n,this.pitch=H.clamp(this.pitch+t*n,-1.25,1.25),this.lastUser=this.time,this.mode=`free`}onPointerMove(e,t){this.pointer.set(e/this.app.w*2-1,-(t/this.app.h)*2+1)}onClick(){}async flyToJezero(e=Ef){this.mode=`transit`;let t=this.spin,n=this.pitch,r=this.alt,i=this.spinFor(this.cTile()),a=this.cTile().lat*Zd,o=1.2+Math.min(2.2,Math.abs(Math.log(r/e))*.55);await this.tweens.add(o,o=>{this.spin=of(t,i,o),this.pitch=H.lerp(n,a,o),this.alt=Math.exp(H.lerp(Math.log(r),Math.log(e),o))}),this.altTarget=this.alt}cTile(){let e=this.app.assets.manifest.crater;return{lat:(e.lat[0]+e.lat[1])/2,lon:(e.lon[0]+e.lon[1])/2}}async dive(e,t){this.mode=`transit`;let n=this.alt,r=e/Xd;await this.tweens.add(2.6,e=>{this.alt=Math.exp(H.lerp(Math.log(n),Math.log(r),e)),t?.(this.alt*Xd)},sf.inOut)}async climb(e,t){let n=this.cTile();this.mode=`transit`,this.spin=this.spinFor(n),this.pitch=n.lat*Zd;let r=e/Xd;this.alt=r,await this.tweens.add(3,e=>{this.alt=Math.exp(H.lerp(Math.log(r),Math.log(.9),e)),t?.(this.alt*Xd)},sf.out),this.altTarget=this.alt,this.mode=`free`,this.lastUser=this.time}update(e){this.time+=e,this.tweens.update(e);let t=this.time-this.lastUser;if(this.mode!==`transit`){this.alt=H.lerp(this.alt,this.altTarget,cf(e,6)),t>.05&&(this.spin+=this.spinVel*e,this.pitch=H.clamp(this.pitch+this.pitchVel*e,-1.25,1.25),this.spinVel*=Math.exp(-e*3),this.pitchVel*=Math.exp(-e*3));let n=H.smoothstep(1.2,.35,this.alt)*+(t>1.2);if(n>0){let t=this.cTile();this.spin=of(this.spin,this.spinFor(t),cf(e,2.2*n)),this.pitch=H.lerp(this.pitch,t.lat*Zd,cf(e,2.2*n))}else this.autoSpin&&t>2.5&&(this.spin+=e*.035*Math.min(1,(t-2.5)/2))}let n=1+this.alt;this.camera.position.set(0,Math.sin(this.pitch)*n,Math.cos(this.pitch)*n),this.camera.up.set(0,1,0),this.camera.lookAt(0,0,0),this.camera.near=Math.max(5e-4,this.alt*.25),this.camera.updateProjectionMatrix(),this.planet.rotation.y=this.spin,this.planet.updateMatrixWorld(),Df.copy(this.planet.matrixWorld).invert(),this.uniforms.uSunObj.value.copy(this.sunWorld).transformDirection(Df);for(let t of Object.keys(this.weights))this.weights[t]=H.lerp(this.weights[t],+(t===this.layer),cf(e,5));let r=this.uniforms;r.wVis.value=this.weights.visible,r.wTopo.value=this.weights.topo,r.wTherm.value=this.weights.thermal,r.wGeo.value=this.weights.geology,r.uTime.value=this.time,r.uGrid.value=H.lerp(r.uGrid.value,this.grid*H.smoothstep(.08,.6,this.alt),cf(e,4)),r.uDecal.value=H.smoothstep(1.4,.45,this.alt),r.uCDecal.value=H.smoothstep(.32,.14,this.alt),r.uNormalStrength.value=H.lerp(.9,1.6,H.smoothstep(1,.2,this.alt));let i=this.cTile(),a=Qd(i.lat,i.lon).applyMatrix4(this.planet.matrixWorld).normalize(),o=this.camera.position.clone().normalize(),s=Math.acos(H.clamp(a.dot(o),-1,1))/Zd;this.locked=this.alt<.35&&s<3;let c=+(this.alt<1.4);r.uTarget.value=H.lerp(r.uTarget.value,c,cf(e,3)),this.starUniforms.uTime.value=this.time,this.atmo.material.uniforms.uStrength.value=1.1+.5*H.smoothstep(2,.2,this.alt);for(let e of this.moons){let t=e.phase+this.time/e.period*Math.PI*2;e.mesh.position.set(Math.cos(t)*e.r,0,Math.sin(t)*e.r).applyAxisAngle(Af,e.incl),e.mesh.rotation.y=-t;let n=this.alt>.6;e.mesh.visible=n,e.ring.visible=n,e.ring.material.opacity=.22*H.smoothstep(.6,1.5,this.alt)}this.moonLabels.forEach((e,t)=>{e.world.copy(this.moons[t].mesh.position),e.hiddenByUser=this.alt<1});for(let e of this.markers)e.world.copy(e.obj).applyMatrix4(this.planet.matrixWorld);r.uEZOn.value=H.lerp(r.uEZOn.value,+!!this.zones,cf(e,5));for(let e of this.ezLabels)e.world.copy(e.obj).applyMatrix4(this.planet.matrixWorld),e.hiddenByUser=!this.zones}pick(){Of.setFromCamera(this.pointer,this.camera);let e=Of.ray.origin,t=Of.ray.direction,n=e.dot(t),r=e.lengthSq()-1,i=n*n-r;if(i<0)return null;let a=-n-Math.sqrt(i);return a<0?null:(kf.copy(e).addScaledVector(t,a),Df.copy(this.planet.matrixWorld).invert(),$d(kf.applyMatrix4(Df)))}readout(){let e=this.pick(),t=[[`ALT`,`${nf(this.alt*Xd)} km`]];if(e){t.push([`LAT`,ef(e.lat)],[`LON`,tf(e.lon)]);let n=this.app.assets.elevAt(e.lat,e.lon);if(n!=null&&t.push([`ELEV`,`${nf(n)} m`]),this.layer===`geology`){let n=this.app.assets.unitAt(e.lat,e.lon);n&&t.push([`UNIT`,`${n.sym} · ${wf(n.sym).name.replace(/ unit$/,``)}`])}}return t}};function Pf(e){return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Ff(e,t,n){let r=new wa(1,5),i=r.attributes.position,a=Pf(n*977),o=Array.from({length:14},()=>({d:new W(a()*2-1,a()*2-1,a()*2-1).normalize(),r:.25+a()*.35,a:(a()-.6)*.22})),s=new W;for(let n=0;n<i.count;n++){s.fromBufferAttribute(i,n).normalize();let r=1;for(let e of o){let t=s.distanceTo(e.d);t<e.r&&(r+=e.a*(1-(t/e.r)**2))}s.multiplyScalar(r),s.x*=t,i.setXYZ(n,s.x*e,s.y*e*.9,s.z*e)}return r.computeVertexNormals(),r}function If(e){let t=document.createElement(`canvas`);t.width=t.height=256;let n=t.getContext(`2d`),r=n.createRadialGradient(128,128,0,128,128,128);for(let[t,n]of e)r.addColorStop(t,n);n.fillStyle=r,n.fillRect(0,0,256,256);let i=new va(t);return i.colorSpace=lt,i}var Lf=`
attribute float aH;
uniform float uExag, uHmin, uHmax, uH0, uCurv;
varying vec2 vUv;
varying vec3 vWorld;
varying float vElev;
void main() {
  vUv = uv;
  float hm = uHmin + aH * (uHmax - uHmin);
  vElev = hm;
  vec3 p = position;
  p.y = (hm - uH0) / 1000.0 * uExag - (p.x * p.x + p.z * p.z) * uCurv;
  vec4 wp = modelMatrix * vec4(p, 1.0);
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Rf=`
precision highp float;
uniform sampler2D tVis, tNormal, tSlope, tTherm, tShadow;
uniform vec2 uSize;
uniform float uExag, uHmin, uHmax, uH0, uCurv, uTexelKm;
uniform vec3 uSun;
uniform float wVis, wElev, wSlope, wTherm, wContour, wHolo, wGrid;
uniform float uContourMinor, uContourMajor, uGridKm;
uniform vec3 uCursor;     // x, z, on
uniform float uCursorR;
uniform vec4 uBox;        // child zone xz min/max
uniform float uBoxOn;
uniform vec4 uPulse;      // x, z, t, on
uniform float uTime;
uniform float uShadowOn;
uniform vec3 uSlopeLim;   // caution, hazard, no-go (deg)
uniform float uReveal;    // 0..1 radial reveal on entry
uniform float uFpv;       // 0..1 helmet (first-person) view: haze + close-up ground detail
uniform vec3 uFogCol;
uniform float uFogK;
varying vec2 vUv;
varying vec3 vWorld;
varying float vElev;

// value noise for close-up ground grain (HiRISE is 25 cm per pixel; the eye at 1.8 m wants more)
float hash2(vec2 p) { p = mod(p, 289.0); return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash2(i), hash2(i + vec2(1.0, 0.0)), u.x), mix(hash2(i + vec2(0.0, 1.0)), hash2(i + vec2(1.0, 1.0)), u.x), u.y);
}
// scattered pebbles: one per cell, random size and position
float pebbles(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 c = vec2(hash2(i), hash2(i + 17.3)) * 0.7 + 0.15;
  float r = 0.06 + 0.16 * hash2(i + 5.1);
  float d = length(f - c);
  return (1.0 - smoothstep(r * 0.55, r, d)) * step(0.45, hash2(i + 9.7));
}

vec3 elevRamp(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 c0 = vec3(13., 54., 107.) / 255.;
  vec3 c1 = vec3(24., 79., 149.) / 255.;
  vec3 c2 = vec3(42., 120., 214.) / 255.;
  vec3 c3 = vec3(85., 152., 231.) / 255.;
  vec3 c4 = vec3(158., 197., 244.) / 255.;
  vec3 c5 = vec3(238., 246., 255.) / 255.;
  float s = t * 5.0;
  vec3 c;
  if (s < 1.0) c = mix(c0, c1, s);
  else if (s < 2.0) c = mix(c1, c2, s - 1.0);
  else if (s < 3.0) c = mix(c2, c3, s - 2.0);
  else if (s < 4.0) c = mix(c3, c4, s - 3.0);
  else c = mix(c4, c5, s - 4.0);
  return pow(c, vec3(2.2)); // palette is sRGB; shading happens in linear
}

float contour(float e, float iv, float w) {
  float f = e / iv;
  float d = abs(fract(f - 0.5) - 0.5) / max(fwidth(f), 1e-5);
  return 1.0 - smoothstep(0.0, w, d);
}

void main() {
  vec3 nm = texture2D(tNormal, vUv).xyz * 2.0 - 1.0;
  vec3 n = normalize(vec3(nm.x * uExag, max(nm.z, 0.05), -nm.y * uExag));
  vec3 vis = texture2D(tVis, vUv).rgb;
  float slopeDeg = texture2D(tSlope, vUv).r * 255.0 * 0.25;
  vec3 th = texture2D(tTherm, vUv).rgb;
  float t01 = (vElev - uHmin) / (uHmax - uHmin);

  float ndl = max(dot(n, uSun), 0.0);
  // sun visibility is baked into tShadow whenever the sun or relief changes (see ShadowBaker)
  float sh = mix(1.0, texture2D(tShadow, vUv).r, uShadowOn);
  float sunUp = smoothstep(-0.02, 0.06, uSun.y);
  vec3 sky = vec3(0.86, 0.70, 0.55) * (0.14 + 0.10 * n.y);
  vec3 lit = vis * (vec3(1.0, 0.95, 0.88) * ndl * sh * 1.25 * sunUp + sky);

  float hill = 0.5 + 0.5 * ndl * mix(1.0, sh, 0.7);
  vec3 col = lit * wVis;
  col = mix(col, elevRamp(pow(t01, 0.8)) * hill, wElev * 0.88);
  col = mix(col, th * (0.35 + 0.75 * hill), wTherm * 0.9);

  // slope hazard classes (status colours: good / warning / serious / critical)
  vec3 hz = vec3(12., 163., 12.) / 255.;
  #define LIN(c) pow(c, vec3(2.2))
  float hzA = 0.30;
  if (slopeDeg >= uSlopeLim.x) { hz = vec3(250., 178., 25.) / 255.; hzA = 0.62; }
  if (slopeDeg >= uSlopeLim.y) { hz = vec3(236., 131., 90.) / 255.; hzA = 0.78; }
  if (slopeDeg >= uSlopeLim.z) { hz = vec3(208., 59., 59.) / 255.; hzA = 0.9; }
  col = mix(col, LIN(hz) * (0.45 + 0.65 * hill), wSlope * hzA);

  // Elite-style hologram
  float lum = dot(vis, vec3(0.3, 0.59, 0.11));
  vec3 holo = vec3(1.0, 0.52, 0.16) * (0.05 + pow(lum, 1.3) * 0.55 * (0.4 + 0.6 * hill));
  float scan = 0.85 + 0.15 * sin(vWorld.z * 40.0 / max(uGridKm, 0.01) - uTime * 3.0);
  col = mix(col, holo * scan, wHolo);

  float cm = contour(vElev, uContourMinor, 1.0);
  float cM = contour(vElev, uContourMajor, 1.5);
  vec3 cc = mix(vec3(1.0, 0.8, 0.55), vec3(1.0, 0.6, 0.2), wHolo);
  col = mix(col, cc, clamp((cm * 0.32 + cM * 0.8) * wContour, 0.0, 1.0));

  vec2 g = vWorld.xz / uGridKm;
  vec2 gd = abs(fract(g - 0.5) - 0.5) / max(fwidth(g), 1e-5);
  float gl = 1.0 - min(min(gd.x, gd.y), 1.0);
  col = mix(col, vec3(1.0, 0.65, 0.3), gl * wGrid * 0.35);

  // child zone (Marswalk box)
  if (uBoxOn > 0.001) {
    vec2 p = vWorld.xz;
    vec2 c = (uBox.xy + uBox.zw) * 0.5, hs = (uBox.zw - uBox.xy) * 0.5;
    vec2 q = abs(p - c) - hs;
    float sd = max(q.x, q.y);
    float fw = fwidth(sd);
    float edge = 1.0 - smoothstep(0.0, 1.8 * fw, abs(sd));
    float ins = step(sd, 0.0);
    vec2 aq = abs(p - c) / hs;
    float corner = step(0.72, max(aq.x, aq.y)) * step(0.72, min(aq.x, aq.y));
    float dash = step(0.5, fract((p.x + p.y) * 1.2 - uTime * 0.6));
    vec3 bc = vec3(1.0, 0.7, 0.3);
    col = mix(col, bc * 1.4, edge * uBoxOn * mix(0.35 + 0.5 * dash, 1.0, corner));
    col += bc * ins * uBoxOn * 0.06 * (0.6 + 0.4 * sin(uTime * 2.0));
  }

  // cursor reticle
  if (uCursor.z > 0.5) {
    float d = length(vWorld.xz - uCursor.xy);
    float fw = fwidth(d);
    float r1 = 1.0 - smoothstep(0.0, 1.5 * fw, abs(d - uCursorR));
    float r2 = 1.0 - smoothstep(0.0, 1.2 * fw, abs(d - uCursorR * 0.35));
    float a = atan(vWorld.z - uCursor.y, vWorld.x - uCursor.x);
    float ticks = step(0.9, fract(a * 4.0 / 6.28318 + 0.05));
    col = mix(col, vec3(0.37, 0.83, 1.0), clamp(r1 * (0.4 + 0.6 * ticks) + r2 * 0.6, 0.0, 1.0));
  }

  // scan pulse
  if (uPulse.w > 0.5) {
    float d = length(vWorld.xz - uPulse.xy);
    float r = uPulse.z;
    float w = max(r * 0.04, uTexelKm * 2.0);
    float ring = exp(-pow((d - r) / w, 2.0));
    float fade = 1.0 - smoothstep(0.0, 1.0, r / (max(uSize.x, uSize.y) * 0.9));
    col += vec3(1.0, 0.6, 0.25) * ring * fade * 0.9;
  }

  if (uFpv > 0.001) {
    float dist = length(vWorld - cameraPosition); // km
    vec2 pm = vWorld.xz * 1000.0;                 // metres
    float near = 1.0 - smoothstep(0.01, 0.16, dist);
    float grain = vnoise(pm * 3.1) * 0.5 + vnoise(pm * 0.8) * 0.35 + vnoise(pm * 11.0) * 0.15;
    float pb = pebbles(pm * 1.6) + 0.6 * pebbles(pm * 4.3 + 3.0);
    vec3 detail = vec3(0.80 + 0.40 * grain) * (1.0 - 0.38 * pb * (0.6 + 0.4 * sh));
    col *= mix(vec3(1.0), detail, near * uFpv * (1.0 - wHolo) * (1.0 - wElev));
    // aerial perspective: suspended dust (optical depth ~0.5) hazes distant ground toward the sky colour
    float fog = 1.0 - exp(-pow(dist * uFogK, 1.25));
    col = mix(col, uFogCol * (0.25 + 0.75 * sunUp), fog * uFpv);
  }

  // entry reveal + edge fade
  float rd = length(vWorld.xz / (uSize * 0.5));
  float reveal = smoothstep(uReveal * 1.6, uReveal * 1.6 - 0.15, rd);
  col *= mix(0.0, 1.0, reveal);
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`,zf=`
attribute float aH;
attribute float aBase;
uniform float uExag, uHmin, uHmax, uH0, uCurv, uBaseY;
varying float vElev;
varying float vTop;
varying vec3 vWorld;
void main() {
  float hm = uHmin + aH * (uHmax - uHmin);
  vec3 p = position;
  float top = (hm - uH0) / 1000.0 * uExag - (p.x * p.x + p.z * p.z) * uCurv;
  p.y = mix(top, uBaseY, aBase);
  vElev = mix(hm, uH0 + (uBaseY + (p.x * p.x + p.z * p.z) * uCurv) * 1000.0 / uExag, aBase);
  vTop = 1.0 - aBase;
  vec4 wp = modelMatrix * vec4(p, 1.0);
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Bf=`
uniform float uStrata;
uniform float uReveal;
varying float vElev;
varying float vTop;
varying vec3 vWorld;
void main() {
  float band = 0.5 + 0.5 * sin(vElev / uStrata * 6.28318);
  vec3 c = mix(vec3(0.10, 0.055, 0.035), vec3(0.19, 0.10, 0.06), band);
  c *= 0.5 + 0.8 * pow(vTop, 2.0);
  float edge = smoothstep(0.985, 1.0, vTop);
  c += vec3(1.0, 0.6, 0.25) * edge * 0.8;
  gl_FragColor = vec4(c * uReveal, 1.0);
  #include <colorspace_fragment>
}`,Vf=`
uniform float uGrid;
uniform vec2 uSize;
uniform float uReveal;
varying vec3 vWorld;
void main() {
  vec2 g = vWorld.xz / uGrid;
  vec2 gd = abs(fract(g - 0.5) - 0.5) / max(fwidth(g), 1e-5);
  float l = 1.0 - min(min(gd.x, gd.y), 1.0);
  float r = length(vWorld.xz) / length(uSize);
  float fade = smoothstep(1.6, 0.4, r);
  vec3 c = vec3(1.0, 0.55, 0.2) * l * 0.16 * fade;
  gl_FragColor = vec4(c * uReveal, 1.0);
  #include <colorspace_fragment>
}`,Hf=`
varying vec3 vWorld;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Uf=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`,Wf=`
precision highp float;
uniform sampler2D tHeight;
uniform vec2 uSize;
uniform float uExag, uHmin, uHmax, uH0, uCurv, uTexelKm;
uniform vec3 uSun;
varying vec2 vUv;

float terrainY(vec2 xz) {
  vec2 uv = vec2(xz.x / uSize.x + 0.5, 0.5 - xz.y / uSize.y);
  float h01 = texture2D(tHeight, uv).r;
  return ((uHmin + h01 * (uHmax - uHmin)) - uH0) / 1000.0 * uExag - dot(xz, xz) * uCurv;
}

void main() {
  vec2 xz = vec2((vUv.x - 0.5) * uSize.x, (0.5 - vUv.y) * uSize.y);
  float y0 = terrainY(xz);
  float lh = length(uSun.xz);
  float res = 1.0;
  if (uSun.y <= 0.0) res = 0.0;
  else if (lh > 1e-4) {
    vec2 dir = uSun.xz / lh;
    float tanE = uSun.y / lh;
    float d = uTexelKm * 1.2;
    for (int i = 0; i < SHADOW_STEPS; i++) {
      vec2 p = xz + dir * d;
      if (abs(p.x) > uSize.x * 0.5 || abs(p.y) > uSize.y * 0.5) break;
      float ty = terrainY(p);
      float ry = y0 + d * tanE;
      res = min(res, clamp(6.0 * (ry - ty) / d + 0.5, 0.0, 1.0));
      if (res <= 0.0) break;
      d *= SHADOW_GROWTH;
    }
  }
  gl_FragColor = vec4(res, res, res, 1.0);
}`,Gf=`
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww; // always on the far plane
}`,Kf=`
precision highp float;
uniform vec3 uSun;
varying vec3 vDir;
#define LIN(c) pow(c, vec3(2.2))
void main() {
  vec3 d = normalize(vDir);
  float sunUp = smoothstep(-0.12, 0.08, uSun.y);
  float h = max(d.y, 0.0);
  // dusty butterscotch sky: brighter at the horizon, darker brown overhead
  vec3 hor = LIN(vec3(0.80, 0.62, 0.47));
  vec3 zen = LIN(vec3(0.46, 0.33, 0.25));
  vec3 sky = mix(hor, zen, pow(h, 0.55));
  float cosS = max(dot(d, normalize(uSun)), 0.0);
  // fine dust scatters blue light forward: a blue glow hugs the Sun (strongest at sunset)
  float low = 1.0 - smoothstep(0.05, 0.6, uSun.y);
  sky = mix(sky, LIN(vec3(0.50, 0.66, 0.86)), pow(cosS, 14.0) * (0.35 + 0.45 * low));
  sky += LIN(vec3(1.0, 0.93, 0.82)) * pow(cosS, 220.0) * 0.9;
  // the Sun from Mars: about two thirds the size it looks from Earth
  float disk = smoothstep(0.99994, 0.99997, cosS);
  sky = mix(sky, vec3(3.0, 2.9, 2.7), disk);
  // below the horizon line: dusty ground haze (hidden by terrain almost everywhere)
  sky = mix(sky, hor * 0.7, smoothstep(0.0, -0.08, d.y));
  // night: a dark sky
  sky *= mix(0.035, 1.0, sunUp);
  gl_FragColor = vec4(sky, 1.0);
  #include <colorspace_fragment>
}`,qf=`
attribute float aDist;
attribute float aTop;
varying float vDist;
varying float vTop;
void main() {
  vDist = aDist;
  vTop = aTop;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,Jf=`
precision highp float;
uniform vec3 uFogCol;
uniform vec3 uSun;
varying float vDist;
varying float vTop;
#define LIN(c) pow(c, vec3(2.2))
void main() {
  float sunUp = smoothstep(-0.02, 0.08, uSun.y);
  vec3 rock = LIN(vec3(0.52, 0.36, 0.26)) * (0.25 + 0.75 * sunUp);
  vec3 fog = uFogCol * (0.25 + 0.75 * sunUp);
  // farther ridges sit behind more dust
  float haze = 0.5 + 0.42 * smoothstep(4.0, 40.0, vDist);
  vec3 c = mix(rock, fog, mix(1.0, haze, smoothstep(0.55, 1.0, vTop)));
  gl_FragColor = vec4(c, 1.0);
  #include <colorspace_fragment>
}`,Yf=[{id:`visible`,key:`1`,name:`Visible`,srcCrater:`MRO CTX 5 m mosaic (JPL)`,srcSite:`MRO HiRISE 25 cm mosaic`,base:!0},{id:`elev`,key:`2`,name:`Elevation`,srcCrater:`MRO CTX stereo DEM, 20 m`,srcSite:`MRO HiRISE DTM, 1 m`},{id:`slope`,key:`3`,name:`Slope hazard`,srcCrater:`Derived from CTX DEM`,srcSite:`Derived from HiRISE DTM`},{id:`thermal`,key:`4`,name:`Ground firmness`,srcCrater:`Mars Odyssey THEMIS · night IR`,srcSite:`Mars Odyssey THEMIS · night IR`},{id:`contour`,key:`5`,name:`Contours`,srcCrater:`from DEM`,srcSite:`from DTM`},{id:`holo`,key:`6`,name:`Holo mode`,srcCrater:`display style`,srcSite:`display style`},{id:`traverse`,key:`7`,name:`Perseverance traverse`,srcCrater:`NASA/JPL MMGIS · end-of-drive fixes`,srcSite:`NASA/JPL MMGIS · end-of-drive fixes`},{id:`minerals`,key:``,name:`Minerals`,srcCrater:`MRO CRISM · phase 2`,srcSite:`MRO CRISM · phase 2`,locked:!0},{id:`weather`,key:``,name:`Live weather`,srcCrater:`Perseverance MEDA · phase 2`,srcSite:`Perseverance MEDA · phase 2`,locked:!0}],Xf=new W,Zf=new ts,Qf=new U,$f=class{constructor(e,t){this.app=e,this.cfg=t,this.id=t.id,this.scene=new tr,this.scene.background=new J(328967),this.camera=new Do(40,1,.01,4e3),this.tweens=new lf,this.meta=t.meta,this.sizeX=t.meta.sizeM[0]/1e3,this.sizeZ=t.meta.sizeM[1]/1e3,this.exag=t.exag,this.exagTarget=t.exag,this.cam={target:new W,dist:t.overview.dist,el:t.overview.el,az:t.overview.az},this.camGoal=null,this.time=0,this.lastUser=-10,this.pushOut=0,this.pushIn=0,this.layers={visible:!0,elev:!1,slope:!1,thermal:!1,contour:!1,holo:!1,traverse:!!t.traverseOn},this.w={visible:1,elev:0,slope:0,thermal:0,contour:0,holo:0,traverse:+!!t.traverseOn},this.pointer=new U(-9,-9),this.cursor=null,this.mode=`idle`;let n=s();this.decl=n.decl;let r=c(n,t.lon0).ltst;this.ltst=t.ltst??(r>7.5&&r<16.5?r:15.8),this.shadows=!0,this.lat0=t.lat0}lonlatToXZ(e,t){let n=this.meta,r=(t-n.lon[0])/(n.lon[1]-n.lon[0]),i=(n.lat[1]-e)/(n.lat[1]-n.lat[0]);return{x:(r-.5)*this.sizeX,z:(i-.5)*this.sizeZ}}xzToLonLat(e,t){let n=this.meta,r=e/this.sizeX+.5,i=t/this.sizeZ+.5;return{lon:n.lon[0]+r*(n.lon[1]-n.lon[0]),lat:n.lat[1]-i*(n.lat[1]-n.lat[0])}}elevAt(e,t){let{width:n,height:r,min:i,max:a}=this.meta,o=H.clamp(e/this.sizeX+.5,0,1)*(n-1),s=H.clamp(t/this.sizeZ+.5,0,1)*(r-1),c=Math.floor(o),l=Math.floor(s),u=Math.min(n-1,c+1),d=Math.min(r-1,l+1),f=o-c,p=s-l,m=this.cfg.heights,h=m[l*n+c],g=m[l*n+u],_=m[d*n+c],v=m[d*n+u];return i+((h*(1-f)+g*f)*(1-p)+(_*(1-f)+v*f)*p)/65535*(a-i)}yAt(e,t,n=this.exag){return(this.elevAt(e,t)-this.h0)/1e3*n-(e*e+t*t)*this.curv}build(){let{meta:e,tex:t,heights:n}=this.cfg,r=e.width,i=e.height,a=Float32Array.from(n.filter((e,t)=>t%97==0)).sort();this.h0=e.min+a[a.length>>1]/65535*(e.max-e.min),this.curv=1/(2*Xd),this.texelKm=this.sizeX/r;let o=new Float32Array(r*i);for(let e=0;e<o.length;e++)o[e]=n[e]/65535;let s=this.cfg.meshStep||1,c=Math.round((r-1)/s)+1,l=Math.round((i-1)/s)+1,u=s===1?o:ep(o,r,i,c,l),d=new Ta(this.sizeX,this.sizeZ,c-1,l-1);d.rotateX(-Math.PI/2),d.setAttribute(`aH`,new zr(u,1));let f=new Uint16Array(r*i);for(let e=0;e<i;e++){let t=e*r,n=(i-1-e)*r;for(let e=0;e<r;e++)f[n+e]=Fr.toHalfFloat(o[t+e])}let p=new Gi(f,r,i,ve,N);p.minFilter=p.magFilter=j,p.needsUpdate=!0;for(let e of[`visible`,`normal`,`slope`,`thermal`])t[e].generateMipmaps=!0;t.slope.minFilter=j;let m=s>1?.5:1;this.shadowRT=new gn(Math.round(r*m),Math.round(i*m),{format:ve,type:ne,depthBuffer:!1,minFilter:j,magFilter:j,generateMipmaps:!1}),this.bakedSun=new W(0,-1,0),this.bakedExag=-1,this.uniforms={tVis:{value:t.visible},tNormal:{value:t.normal},tSlope:{value:t.slope},tTherm:{value:t.thermal},tShadow:{value:this.shadowRT.texture},uSize:{value:new U(this.sizeX,this.sizeZ)},uExag:{value:this.exag},uHmin:{value:e.min},uHmax:{value:e.max},uH0:{value:this.h0},uCurv:{value:this.curv},uTexelKm:{value:this.texelKm},uSun:{value:new W(.5,.5,.5).normalize()},wVis:{value:1},wElev:{value:0},wSlope:{value:0},wTherm:{value:0},wContour:{value:0},wHolo:{value:0},wGrid:{value:0},uContourMinor:{value:this.cfg.contour[0]},uContourMajor:{value:this.cfg.contour[1]},uGridKm:{value:this.cfg.gridKm},uCursor:{value:new W(0,0,0)},uCursorR:{value:this.sizeX*.012},uBox:{value:new q},uBoxOn:{value:0},uPulse:{value:new q(0,0,0,0)},uTime:{value:0},uShadowOn:{value:1},uSlopeLim:{value:new W(...this.cfg.slopeLim)},uReveal:{value:1},uFpv:{value:0},uFogCol:{value:new J(.8,.62,.47).convertSRGBToLinear()},uFogK:{value:.3}},this.mesh=new Hi(d,new La({vertexShader:Lf,fragmentShader:Rf,uniforms:this.uniforms})),this.mesh.frustumCulled=!1,this.scene.add(this.mesh);let h=this.cfg.shadowSteps||64,g=h>=64?1.075:h>=48?1.1:1.16;this.bakeMat=new La({vertexShader:Uf,fragmentShader:Wf,defines:{SHADOW_STEPS:h,SHADOW_GROWTH:g.toFixed(3)},uniforms:{tHeight:{value:p},uSize:this.uniforms.uSize,uExag:this.uniforms.uExag,uHmin:this.uniforms.uHmin,uHmax:this.uniforms.uHmax,uH0:this.uniforms.uH0,uCurv:this.uniforms.uCurv,uTexelKm:this.uniforms.uTexelKm,uSun:{value:new W}},depthTest:!1,depthWrite:!1}),this.bakeScene=new tr;let _=new Hi(new Ta(2,2),this.bakeMat);_.frustumCulled=!1,this.bakeScene.add(_),this.bakeCam=new Oo(-1,1,1,-1,0,1),this.baseY=(e.min-this.h0)/1e3*this.exag-this.sizeX*.04,this.wallUniforms={uExag:this.uniforms.uExag,uHmin:this.uniforms.uHmin,uHmax:this.uniforms.uHmax,uH0:this.uniforms.uH0,uCurv:this.uniforms.uCurv,uBaseY:{value:this.baseY},uStrata:{value:this.cfg.strata},uReveal:this.uniforms.uReveal};let v=new Hi(this.makeWalls(u,c,l),new La({vertexShader:zf,fragmentShader:Bf,uniforms:this.wallUniforms,side:2}));v.frustumCulled=!1,this.scene.add(v),this.walls=v;let y=new Hi(new Ta(this.sizeX*5,this.sizeZ*5).rotateX(-Math.PI/2),new La({vertexShader:Hf,fragmentShader:Vf,transparent:!1,uniforms:{uGrid:{value:this.cfg.gridKm},uSize:this.uniforms.uSize,uReveal:this.uniforms.uReveal}}));this.floor=y,y.position.y=this.baseY-this.sizeX*.01,this.scene.add(y),this.buildPOIs(),this.buildRouteObjects()}makeWalls(e,t,n){let r=[],i=[],a=[],o=[],s=this.sizeX/2,c=this.sizeZ/2,l=[Array.from({length:t},(e,t)=>[t,0]),Array.from({length:n},(e,n)=>[t-1,n]),Array.from({length:t},(e,r)=>[t-1-r,n-1]),Array.from({length:n},(e,t)=>[0,n-1-t])];for(let u of l){let l=r.length/3;for(let[o,l]of u){let u=-s+o/(t-1)*this.sizeX,d=-c+l/(n-1)*this.sizeZ,f=e[l*t+o];r.push(u,0,d,u,0,d),i.push(f,f),a.push(0,1)}for(let e=0;e<u.length-1;e++){let t=l+e*2;o.push(t,t+1,t+2,t+1,t+3,t+2)}}let u=new $r;return u.setAttribute(`position`,new Y(r,3)),u.setAttribute(`aH`,new Y(i,1)),u.setAttribute(`aBase`,new Y(a,1)),u.setIndex(o),u}buildPOIs(){let e=this.app.labels;this.poiItems=[];let t=[];for(let n of this.cfg.pois){let{x:r,z:i}=this.lonlatToXZ(n.lat,n.lon);if(Math.abs(r)>this.sizeX/2||Math.abs(i)>this.sizeZ/2)continue;let a={lz:`Airlock · proposed`,landing:`Historic site`,science:`Sample depot`,geology:`Science stop`}[n.kind],o=this.id===`site`?a:n.proposed?`Proposed · Aero Atlas`:n.approx?`Approx. position`:ef(n.lat)+` `+tf(n.lon),s=`<div class="dot"></div><div class="lb">${n.name}<small>${o}</small></div>
        <div class="card"><b>${n.name}</b>${n.reason&&this.id===`site`?`<span style="color:var(--data)">${n.reason}.</span> `:``}${n.text}${n.photo&&this.id===`site`?`<img src="${hd(n.photo.file)}" data-photo-poi="${n.id}" title="Click to enlarge" alt="Perseverance ${n.photo.camera} view at ${n.name}" loading="lazy"><em>What you\u2019ll see: Perseverance ${n.photo.camera}, sol ${n.photo.sol}. Raw image, ${n.photo.credit}</em>`:``}<em>Source: ${n.source}</em>${this.id===`site`&&n.id!==`lz`?`<em style="color:var(--data)">Click to add it to the Marswalk</em>`:``}</div>`,c=e.add(this.id,{className:`poi k-${n.kind}`,html:s,world:new W(r,0,i),onClick:()=>this.app.onPOIClick(this,n),occlude:()=>!1,priority:{lz:6,landing:5,science:5,geology:2}[n.kind]??1});c.poi=n,c.xz={x:r,z:i},this.poiItems.push(c),t.push(r,0,i,r,0,i)}let n=new $r;n.setAttribute(`position`,new Y(t,3)),this.stalks=new ca(n,new Xi({color:6280447,transparent:!0,opacity:.55})),this.stalks.frustumCulled=!1,this.scene.add(this.stalks),this.updateStalks()}stalkH(){return this.fpvOn?.004:Math.max(this.cam.dist*.045,this.sizeX*.004)}updateStalks(){let e=this.stalks.geometry.attributes.position,t=this.stalkH();this.poiItems.forEach((n,r)=>{let i=this.yAt(n.xz.x,n.xz.z);e.setY(r*2,i),e.setY(r*2+1,i+t),n.world.set(n.xz.x,i+t,n.xz.z)}),e.needsUpdate=!0}buildRouteObjects(){this.routeMat=new Pu({color:6280447,linewidth:3.2,transparent:!0,opacity:.95,depthTest:!0,worldUnits:!1}),this.routeGlowMat=new Pu({color:6280447,linewidth:11,transparent:!0,opacity:.18,depthTest:!0,worldUnits:!1}),this.routeFlowMat=new Pu({color:16777215,linewidth:2.2,dashed:!0,dashSize:1,gapSize:1,transparent:!0,opacity:.85,worldUnits:!1}),this.directMat=new Pu({color:13646651,linewidth:1.6,dashed:!0,dashSize:1,gapSize:1,transparent:!0,opacity:.7,worldUnits:!1}),this.lostMat=new Pu({color:16726843,linewidth:4.5,dashed:!0,dashSize:1,gapSize:1,transparent:!0,opacity:.95,worldUnits:!1}),this.routeLines=null,this.routeXZ=null}setRoute(e,t=null,n=null){if(this.routeLines&&this.routeLines.forEach(e=>{this.scene.remove(e),e.geometry.dispose()}),this.routeLines=null,this.routeXZ=e,this.directXZ=t,!e||e.length<2)return;let r=(e,t,n)=>{let r=new ed;r.setPositions(this.liftPoints(e,this.routeLift()*n));let i=new td(r,t);return i.computeLineDistances(),i.frustumCulled=!1,i.userData={pts:e,k:n},this.scene.add(i),i};this.routeLines=[r(e,this.routeGlowMat,1),r(e,this.routeMat,1),r(e,this.routeFlowMat,1.2)],t&&this.routeLines.push(r(t,this.directMat,1.4)),n&&(this.routeLines.push(r(n,this.lostMat,1.3)),this.lostMat.dashSize=this.sizeX/240,this.lostMat.gapSize=this.sizeX/400);let i=this.routeLines[2].geometry.attributes.instanceDistanceEnd?.array.at(-1)||this.sizeX;this.routeFlowMat.dashSize=i/160,this.routeFlowMat.gapSize=i/90,this.directMat.dashSize=this.sizeX/200,this.directMat.gapSize=this.sizeX/260}routeLift(){return this.fpvOn?6e-4:this.sizeX*.0012}markerLift(e=1){return this.fpvOn?.0016*e:this.sizeX*.002*e}liftPoints(e,t){let n=new Float32Array(e.length*3);return e.forEach((e,r)=>{n[r*3]=e.x,n[r*3+1]=this.yAt(e.x,e.z)+t,n[r*3+2]=e.z}),n}refreshRouteHeights(){for(let e of[...this.routeLines||[],...this.extraLines||[]])e.geometry.setPositions(this.liftPoints(e.userData.pts,this.routeLift()*e.userData.k)),e.computeLineDistances()}setTraverse(e){if(!e||!e.points)return;let t=this.sizeX/2,n=this.sizeZ/2,r=[];for(let[i,a,o]of e.points){let e=this.lonlatToXZ(o,a);if(Math.abs(e.x)<t&&Math.abs(e.z)<n)r.push({x:e.x,z:e.z,sol:i});else if(r.length)break}if(r.length<2)return;this.travMat=new Pu({color:16765562,linewidth:this.id===`site`?2.6:2.2,transparent:!0,opacity:.9,worldUnits:!1});let i=new ed;i.setPositions(this.liftPoints(r,this.routeLift()*.7));let a=new td(i,this.travMat);a.computeLineDistances(),a.frustumCulled=!1,a.userData={pts:r,k:.7},this.scene.add(a),this.travLine=a,this.extraLines=[a];let o=this.id===`site`?100:250,s=[r[0]],c=o;for(let e of r)e.sol>=c&&(s.push(e),c=(Math.floor(e.sol/o)+1)*o);let l=r.at(-1);s.at(-1)!==l&&s.push(l);let u=e.points.at(-1)[0];this.travItems=s.map((t,n)=>{let r=n===0,i=t===l,a=r?`PERSEVERANCE LANDED · SOL 0<small>18 Feb 2021</small>`:i&&t.sol===u?`SOL ${t.sol} · LAST FIX<small>${e.lastDate||``} · ${e.totalKm} km driven</small>`:i?`SOL ${t.sol}<small>drove out of this zone</small>`:`SOL ${t.sol}`,o=this.app.labels.add(this.id,{className:`trav${r||i?` big`:``}`,html:`<div class="dot"></div><div class="lb">${a}</div>`,world:new W(t.x,0,t.z),priority:r?4:0,occlude:()=>!1});return o.xz=t,o})}applyCamera(){let{target:e,dist:t,el:n,az:r}=this.cam,i=Math.cos(n);this.camera.position.set(e.x+Math.sin(r)*i*t,e.y+Math.sin(n)*t,e.z+Math.cos(r)*i*t),this.camera.up.set(0,1,0),this.camera.lookAt(e),this.camera.near=Math.max(.005,t*.02),this.camera.far=t*30+this.sizeX*10,this.camera.updateProjectionMatrix()}flyTo(e,t=2,n=sf.inOut){let r={target:this.cam.target.clone(),dist:this.cam.dist,el:this.cam.el,az:this.cam.az},i={target:e.target?e.target.clone():r.target.clone(),dist:e.dist??r.dist,el:e.el??r.el,az:e.az??r.az};return this.mode=`fly`,this.tweens.add(t,e=>{this.cam.target.lerpVectors(r.target,i.target,e),this.cam.dist=Math.exp(H.lerp(Math.log(r.dist),Math.log(i.dist),e)),this.cam.el=H.lerp(r.el,i.el,e),this.cam.az=of(r.az,i.az,e)},n).then(()=>{this.mode=`idle`})}topDown(e,t,n){this.cam.target.set(e,this.yAt(e,t),t),this.cam.dist=n,this.cam.el=Math.PI/2-.0015,this.cam.az=0,this.applyCamera()}overview(){let e=this.cfg.overview,t=e.target?this.lonlatToXZ(e.target.lat,e.target.lon):{x:0,z:0};return{target:new W(t.x,this.yAt(t.x,t.z),t.z),dist:e.dist,el:e.el,az:e.az}}pulse(e,t){this.pulseT=0,this.uniforms.uPulse.value.set(e,t,0,1)}onWheel(e){if(this.fpvOn){this.app.fpv.onWheel(e);return}if(this.mode===`fly`||this.mode===`transit`)return;let t=e.deltaY*(e.deltaMode===1?30:1);this.lastUser=this.time;let[n,r]=this.cfg.dist;if(t>0&&this.cam.dist>=r*.98){this.pushOut+=t,this.pushOut>260&&(this.pushOut=0,this.app.exitUp(this));return}if(this.pushOut=0,t<0&&this.canEnterChild&&this.cam.dist<=this.cfg.childEnterDist){this.pushIn+=-t,this.pushIn>260&&(this.pushIn=0,this.app.enterSite());return}this.pushIn=Math.max(0,this.pushIn-20);let i=this.cam.dist,a=H.clamp(i*Math.exp(t*.0013),n,r),o=this.pick();if(o&&t<0){let e=1-a/i;this.cam.target.x+=(o.x-this.cam.target.x)*e,this.cam.target.z+=(o.z-this.cam.target.z)*e}this.cam.dist=a,this.clampTarget()}onDrag(e,t,n,r){if(this.fpvOn){this.app.fpv.onDrag(e,t);return}if(this.mode!==`fly`&&this.mode!==`transit`){if(this.lastUser=this.time,n===2||r){let n=this.cam.dist*.0016,r=Math.cos(this.cam.az),i=Math.sin(this.cam.az);this.cam.target.x+=(-e*r-t*i)*n,this.cam.target.z+=(e*i-t*r)*n,this.clampTarget()}else this.cam.az-=e*.005,this.cam.el=H.clamp(this.cam.el+t*.004,.12,Math.PI/2-.0015)}}onKeyPan(e,t,n){let r=this.cam.dist*.8*n,i=Math.cos(this.cam.az),a=Math.sin(this.cam.az);this.cam.target.x+=(e*i+t*a)*r,this.cam.target.z+=(-e*a+t*i)*r,this.clampTarget(),this.lastUser=this.time}clampTarget(){let e=this.cam.target;e.x=H.clamp(e.x,-this.sizeX/2,this.sizeX/2),e.z=H.clamp(e.z,-this.sizeZ/2,this.sizeZ/2)}onPointerMove(e,t){this.pointer.set(e/this.app.w*2-1,-(t/this.app.h)*2+1)}pick(e=this.pointer){Zf.setFromCamera(e,this.camera);let t=Zf.ray.origin,n=Zf.ray.direction,r=this.sizeX/2,i=this.sizeZ/2,a=this.baseY,o=(this.meta.max-this.h0)/1e3*this.exag+.01,s=0,c=1e6;for(let[e,l,u,d]of[[t.x,n.x,-r,r],[t.y,n.y,a,o],[t.z,n.z,-i,i]]){if(Math.abs(l)<1e-9){if(e<u||e>d)return null;continue}let t=(u-e)/l,n=(d-e)/l;if(t>n&&([t,n]=[n,t]),s=Math.max(s,t),c=Math.min(c,n),s>c)return null}let l=s;for(let e=1;e<=220;e++){let r=s+(c-s)*(e/220);if(Xf.copy(t).addScaledVector(n,r),Xf.y<=this.yAt(Xf.x,Xf.z)){let e=l,i=r;for(let r=0;r<12;r++){let r=(e+i)/2;Xf.copy(t).addScaledVector(n,r),Xf.y<=this.yAt(Xf.x,Xf.z)?i=r:e=r}return Xf.copy(t).addScaledVector(n,i),Xf.clone()}l=r}return null}toggleLayer(e,t){if(!(e in this.layers))return;let n=t??!this.layers[e];if(n&&[`elev`,`slope`,`thermal`].includes(e))for(let e of[`elev`,`slope`,`thermal`])this.layers[e]=!1;this.layers[e]=n}setTime(e){this.ltst=e}sunDir(){let e=u(this.lat0,this.ltst,this.decl),t=e.elevation*Math.PI/180,n=e.azimuth*Math.PI/180;return{vec:new W(Math.sin(n)*Math.cos(t),Math.sin(t),-Math.cos(n)*Math.cos(t)),...e}}update(e){this.time+=e,this.tweens.update(e);let t=this.uniforms;if(t.uTime.value=this.time,Math.abs(this.exag-this.exagTarget)>1e-4&&(this.exag=H.lerp(this.exag,this.exagTarget,cf(e,6)),t.uExag.value=this.exag,this.baseY=(this.meta.min-this.h0)/1e3*this.exag-this.sizeX*.04,this.wallUniforms.uBaseY.value=this.baseY,this.floor.position.y=this.baseY-this.sizeX*.01,this.refreshRouteHeights()),this.mode!==`fly`&&this.mode!==`transit`){let t=this.yAt(this.cam.target.x,this.cam.target.z);this.cam.target.y=H.lerp(this.cam.target.y,t,cf(e,5)),this.autoOrbit&&(this.cam.az+=e*this.autoOrbit)}this.fpvOn?this.app.fpv.applyCamera(e):this.applyCamera(),this.updateStalks();for(let t of Object.keys(this.w))this.w[t]=H.lerp(this.w[t],+!!this.layers[t],cf(e,6));if(t.wVis.value=this.w.visible,t.wElev.value=this.w.elev,t.wSlope.value=this.w.slope,t.wTherm.value=this.w.thermal,t.wContour.value=this.w.contour,t.wHolo.value=this.w.holo,t.wGrid.value=this.w.holo*.8,this.travLine){this.travLine.visible=this.w.traverse>.02,this.travMat.opacity=.9*this.w.traverse;let e=this.markerLift(.6);for(let t of this.travItems)t.hiddenByUser=!this.layers.traverse,t.world.set(t.xz.x,this.yAt(t.xz.x,t.xz.z)+e,t.xz.z)}t.uShadowOn.value=+!!this.shadows;let n=this.sunDir();t.uSun.value.copy(n.vec),this.sun=n,this.shadows&&(n.vec.dot(this.bakedSun)<.999995||Math.abs(this.exag-this.bakedExag)>.001)&&this.bakeShadows(),t.uPulse.value.w>.5&&(this.pulseT+=e,t.uPulse.value.z=this.pulseT*Math.max(this.sizeX,this.sizeZ)*.35,this.pulseT>3&&(t.uPulse.value.w=0));let r=this.mode===`fly`||this.mode===`transit`||this.fpvOn?null:this.pick();if(this.cursor=r,r?(t.uCursor.value.set(r.x,r.z,1),t.uCursorR.value=this.cam.dist*.018):t.uCursor.value.z=0,this.routeMat){Qf.set(this.app.w,this.app.h);for(let e of[this.routeMat,this.routeGlowMat,this.routeFlowMat,this.directMat,this.lostMat,this.travMat])e?.resolution.copy(Qf);this.routeFlowMat.dashOffset-=e*(this.routeFlowMat.dashSize+this.routeFlowMat.gapSize)*.8}}readout(){let e=[],t=this.cursor,n=this.cam.dist;if(e.push([`RANGE`,n>=10?`${nf(n,0)} km`:n>=1?`${n.toFixed(2)} km`:`${nf(n*1e3)} m`]),t){let n=this.xzToLonLat(t.x,t.z),r=this.elevAt(t.x,t.z);e.push([`LAT`,ef(n.lat)],[`LON`,tf(n.lon)],[`ELEV`,`${nf(r)} m`]);let i=this.slopeAt(t.x,t.z);i!=null&&e.push([`SLOPE`,`${i.toFixed(1)}°`])}return e}slopeAt(e,t){if(!this.slopeData)return null;let{w:n,h:r,data:i}=this.slopeData,a=Math.floor(H.clamp(e/this.sizeX+.5,0,.9999)*n);return i[(Math.floor(H.clamp(t/this.sizeZ+.5,0,.9999)*r)*n+a)*4]*.25}bakeShadows(){let e=this.app.renderer;this.bakeMat.uniforms.uSun.value.copy(this.uniforms.uSun.value);let t=e.getRenderTarget();e.setRenderTarget(this.shadowRT),e.render(this.bakeScene,this.bakeCam),e.setRenderTarget(t),this.bakedSun.copy(this.uniforms.uSun.value),this.bakedExag=this.exag}loadSlopeData(){let e=this.cfg.tex.slope,t=e.image,n=document.createElement(`canvas`);n.width=t.width,n.height=t.height;let r=n.getContext(`2d`,{willReadFrequently:!0});e.userData.flippedBitmap&&(r.translate(0,n.height),r.scale(1,-1)),r.drawImage(t,0,0),this.slopeData={w:n.width,h:n.height,data:r.getImageData(0,0,n.width,n.height).data}}};function ep(e,t,n,r,i){let a=new Float32Array(r*i);for(let o=0;o<i;o++){let s=o/(i-1)*(n-1),c=Math.floor(s),l=Math.min(n-1,c+1),u=s-c;for(let n=0;n<r;n++){let i=n/(r-1)*(t-1),s=Math.floor(i),d=Math.min(t-1,s+1),f=i-s,p=e[c*t+s],m=e[c*t+d],h=e[l*t+s],g=e[l*t+d];a[o*r+n]=(p*(1-f)+m*f)*(1-u)+(h*(1-f)+g*f)*u}}return a}var tp={crewKg:75,suitKg:58,kitKg:0,terrain:1.2,suitPenalty:1.35,gRatio:3.71/9.81,vFlat:.9,o2CapKg:.6,reservePct:25,maxSlope:20,stopMin:20,stopW:190,evaMaxH:8,rover:!1,roverMs:1.4,rideW:150},np=Math.PI/180;function rp(e,t=tp){let n=t.vFlat*Math.exp(-3.5*Math.abs(Math.tan(e)+.05))/Math.exp(-3.5*.05);return Math.max(.12,n)}function ip(e,t,n=tp){let r=n.crewKg,i=n.suitKg+(n.kitKg||0),a=n.terrain,o=1.5*r,s=2*(r+i)*(i/r)**2,c=Math.max(t,0),l=Math.max(-t,0)*.3;return o+(s+a*(r+i)*(1.5*e*e+.35*e*(c+l)))*n.gRatio*n.suitPenalty}var ap=.64,op=e=>e/86400*ap,sp=e=>e/20100*.001429;function cp(e,t,n=tp){let r=rp(Math.atan2(t,e),n),i=e/r;return ip(r,t/e*100,n)*i}function lp(e,t,n=tp){let r=0,i=0,a=0,o=0,s=0,c=[{d:0,t:0,o2:0}];for(let t=1;t<e.length;t++){let l=e[t-1],u=e[t],d=u.d-l.d;if(d<=0)continue;let f=u.e-l.e,p=Math.atan2(f,d),m=n.rover?n.roverMs:rp(p,n),h=d/m;r+=h,i+=sp(n.rover?n.rideW:ip(m,f/d*100,n))*h,f>0?a+=f:o-=f,s=Math.max(s,Math.abs(p)/np),c.push({d:u.d,t:r,o2:i})}let l=r,u=t.length*n.stopMin*60,d=t.length*sp(n.stopW)*n.stopMin*60;r+=u,i+=d;let f=n.o2CapKg*n.reservePct/100,p=n.o2CapKg-i,m=p/n.o2CapKg*100;return{distance:e.at(-1)?.d||0,walkT:l,stopT:u,totalT:r,o2:i,remaining:p,marginPct:m,reserveKg:f,gain:a,loss:o,maxSlope:s,timeline:c,avgW:i/r/sp(1)}}function up(e,t,n=tp){let r=[];return e.remaining<e.reserveKg?r.push({lvl:`nogo`,msg:`O₂ reserve breached: ${Math.max(0,e.remaining).toFixed(3)} kg left at the airlock, ${e.reserveKg.toFixed(3)} kg required`}):e.marginPct<n.reservePct+15&&r.push({lvl:`caution`,msg:`Thin O₂ margin: ${e.marginPct.toFixed(0)} % left at return`}),e.totalT/3600>n.evaMaxH&&r.push({lvl:`nogo`,msg:`EVA ${(e.totalT/3600).toFixed(1)} h exceeds the ${n.evaMaxH} h suit rating`}),e.maxSlope>n.maxSlope?r.push({lvl:`nogo`,msg:`Route crosses ${e.maxSlope.toFixed(0)}° ground (limit ${n.maxSlope}°)`}):e.maxSlope>n.maxSlope*.75&&r.push({lvl:`caution`,msg:`Steep sections up to ${e.maxSlope.toFixed(0)}°`}),t&&t.endMarginH<0?r.push({lvl:`nogo`,msg:`EVA ends after sunset`}):t&&t.endMarginH<.75&&r.push({lvl:`caution`,msg:`Less than 45 min of daylight margin`}),{lvl:r.some(e=>e.lvl===`nogo`)?`nogo`:r.length?`caution`:`go`,issues:r}}var dp=class{constructor(){this.k=[],this.v=[]}get size(){return this.k.length}push(e,t){let n=this.k,r=this.v,i=n.length;for(n.push(e),r.push(t);i>0;){let t=i-1>>1;if(n[t]<=e)break;n[i]=n[t],r[i]=r[t],i=t}n[i]=e,r[i]=t}pop(){let e=this.k,t=this.v,n=t[0],r=e.pop(),i=t.pop();if(e.length){let n=0,a=e.length;for(;;){let i=2*n+1;if(i>=a||(i+1<a&&e[i+1]<e[i]&&i++,e[i]>=r))break;e[n]=e[i],t[n]=t[i],n=i}e[n]=r,t[n]=i}return n}},fp=class{constructor(e,t,n,r,i,a=null){Object.assign(this,{elev:e,w:t,h:n,cellX:r,cellY:i,fineSlope:a})}find(e,t,n,r,i=tp){let{w:a,h:o,elev:s,cellX:c,cellY:l,fineSlope:u}=this,d=a*o,f=new Float64Array(d).fill(1/0),p=new Int32Array(d).fill(-1),m=new Uint8Array(d),h=t*a+e,g=r*a+n,_=Math.tan(i.maxSlope*Math.PI/180),v=cp(1,0,i)*.98,y=e=>{let t=e%a,i=e/a|0;return Math.hypot((t-n)*c,(i-r)*l)*v},b=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]],x=new dp;f[h]=0,x.push(y(h),h);let S=0;for(;x.size;){let e=x.pop();if(m[e])continue;if(e===g||(m[e]=1,++S>2e6))break;let t=e%a,n=e/a|0;for(let[r,d]of b){let h=t+r,g=n+d;if(h<0||g<0||h>=a||g>=o)continue;let v=g*a+h;if(m[v])continue;let b=Math.hypot(r*c,d*l),S=s[v]-s[e],C=1;if(Math.abs(S)/b>_&&(C=40),u){let e=u[v];e>i.maxSlope?C=Math.max(C,25):e>i.maxSlope*.7&&(C=Math.max(C,1.6))}let w=f[e]+cp(b,S,i)*C;w<f[v]&&(f[v]=w,p[v]=e,x.push(w+y(v),v))}}if(p[g]===-1&&g!==h)return null;let C=[];for(let e=g;e!==-1;e=p[e])C.push([e%a,e/a|0]);return C.reverse()}},pp=512,mp=class{constructor(e,t,n){this.app=e,this.view=t,this.pois=n,this.params={...tp},this.waypoints=[],this.returnToStart=!0,this.addMode=!1,this.result=null,this.goal=`tour`,this.sim=null,this.follow=!0}init(){let e=this.view,t=e.meta,n=t.width,r=t.height,i=e.cfg.heights,a=pp,o=Math.round(pp*r/n),s=n/a,c=r/o,l=new Float32Array(a*o);for(let e=0;e<o;e++)for(let r=0;r<a;r++){let o=0,u=0;for(let t=Math.floor(e*c);t<Math.floor((e+1)*c);t++)for(let e=Math.floor(r*s);e<Math.floor((r+1)*s);e++)o+=i[t*n+e],u++;l[e*a+r]=t.min+o/u/65535*(t.max-t.min)}let u=e.slopeData,d=new Float32Array(a*o),f=u.w/a,p=u.h/o;for(let e=0;e<o;e++)for(let t=0;t<a;t++){let n=0;for(let r=Math.floor(e*p);r<Math.floor((e+1)*p);r++)for(let e=Math.floor(t*f);e<Math.floor((t+1)*f);e++)n=Math.max(n,u.data[(r*u.w+e)*4]*.25);d[e*a+t]=n}this.gw=a,this.gh=o,this.grid=new fp(l,a,o,e.sizeX*1e3/a,e.sizeZ*1e3/o,d)}cellOf(e,t){let n=this.view;return[H.clamp(Math.floor((e/n.sizeX+.5)*this.gw),0,this.gw-1),H.clamp(Math.floor((t/n.sizeZ+.5)*this.gh),0,this.gh-1)]}cellXZ(e,t){let n=this.view;return{x:((e+.5)/this.gw-.5)*n.sizeX,z:((t+.5)/this.gh-.5)*n.sizeZ}}setPlan(e){this.waypoints=e.map(e=>{let t=this.pois.find(t=>t.id===e),{x:n,z:r}=this.view.lonlatToXZ(t.lat,t.lon);return{name:t.name,x:n,z:r,poi:t}}),this.compute()}addAt(e,t){let n=this.waypoints.length;this.waypoints.push({name:`Stop ${n}`,x:e,z:t}),this.userEdit=!0,this.compute()}addPOI(e){if(this.waypoints.some(t=>t.poi&&t.poi.id===e.id))return!1;let{x:t,z:n}=this.view.lonlatToXZ(e.lat,e.lon);return this.waypoints.push({name:e.name,x:t,z:n,poi:e}),this.userEdit=!0,this.compute(),!0}remove(e){this.waypoints.splice(e,1),this.userEdit=!0,this.compute()}compute(){this.stopSim();let e=this.view,t=this.waypoints;if(t.length<2){this.result=null,this.lastVerdict=null,e.setRoute(null),this.renderMarkers(),this.app.hud.renderPlanner(this);return}let n=[...t];this.returnToStart&&n.push(t[0]);let r=[],i=[],a=!1,o=performance.now();for(let e=0;e<n.length-1;e++){let[t,o]=this.cellOf(n[e].x,n[e].z),[s,c]=this.cellOf(n[e+1].x,n[e+1].z),l=this.grid.find(t,o,s,c,this.params);if(!l){a=!0;break}let u=l.map(([e,t])=>this.cellXZ(e,t));u[0]={x:n[e].x,z:n[e].z},u[u.length-1]={x:n[e+1].x,z:n[e+1].z};let d=hp(hp(u));r.length&&d.shift(),r.push(...d),i.push(r.length-1)}if(this.computeMs=performance.now()-o,a){this.result={failed:!0},this.lastVerdict=`nogo`,e.setRoute(null),this.app.hud.renderPlanner(this);return}let s=gp(r,.004,(t,n)=>e.elevAt(t,n)),c=[],l=0,u=[0];for(let e=1;e<r.length;e++)l+=Math.hypot(r[e].x-r[e-1].x,r[e].z-r[e-1].z)*1e3,u.push(l);i.forEach((e,t)=>{this.returnToStart&&t===i.length-1||c.push(u[e])});let d=lp(s,c,this.params),f=[];for(let e=0;e<n.length-1;e++)f.push({x:n[e].x,z:n[e].z});f.push({x:n.at(-1).x,z:n.at(-1).z});let p=gp(f,.004,(t,n)=>e.elevAt(t,n)),m=0;for(let t of p)m=Math.max(m,e.slopeAt(t.x,t.z)||0);let h=0;for(let t of s)h=Math.max(h,e.slopeAt(t.x,t.z)||0);d.maxSlope=Math.max(d.maxSlope,0),d.fineMax=h;let g=this.sunWindow(d);this.result={route:r,samples:s,stopAtD:c,budget:d,sun:g,direct:{distance:p.at(-1).d,maxFine:m}},this.result.pnr=this.pointOfNoReturn(this.result),this.result.shelter=this.shelterTime(this.result),this.buildEvents(this.result),this.result.o2Out=this.findO2(this.result,this.params.o2CapKg),this.result.reserveAt=this.findO2(this.result,this.params.o2CapKg-d.reserveKg),this.result.verdict=this.judge(this.result);let _=this.result.o2Out,v=_?s.filter((e,t)=>e.d>=_.d&&(t%3==0||t===s.length-1)):null;v&&v.unshift({x:_.x,z:_.z}),e.setRoute(r,f,v&&v.length>1?v:null),this.renderMarkers();let y=this.lastVerdict;this.lastVerdict=this.result.verdict.lvl,this.app.hud.renderPlanner(this),this.userEdit&&this.lastVerdict===`go`&&y!==`go`?(this.app.hud.banner(`MARSWALK READY`,`go`),this.app.sound?.go()):this.userEdit&&this.lastVerdict===`nogo`&&y!==`nogo`&&(this.app.hud.banner(`NO-GO · REPLAN`,`nogo`),this.app.sound?.nogo()),this.userEdit=!1}judge(e){let t=up(e.budget,e.sun,this.params);return e.o2Out&&(t.issues.unshift({lvl:`nogo`,msg:`O₂ runs out at ${(e.o2Out.d/1e3).toFixed(2)} km, ${af(e.o2Out.t)} into the EVA: EV1 would not survive this plan`}),t.lvl=`nogo`),e.pnr&&(t.issues.unshift({lvl:`nogo`,msg:this.params.rover?`Walkback limit at ${(e.pnr.d/1e3).toFixed(2)} km: if the rover breaks down past here, the crew can't walk home with the O₂ reserve`:`Point of no return at ${(e.pnr.d/1e3).toFixed(2)} km: past it, an abort can't reach the airlock with the O₂ reserve`}),t.lvl=`nogo`),t}pointOfNoReturn(e){let t=this.params,n=e.budget,r=this.waypoints[0],i=rp(0,t),a=sp(ip(i,0,t))/i*1.25,o=sp(t.stopW)*t.stopMin*60,s=this.returnToStart&&!t.rover?e.stopAtD.at(-1)??0:n.distance,c=null,l=t.o2CapKg-n.reserveKg;for(let t=0;t<e.samples.length;t++){let i=e.samples[t];if(i.d>s+.5)break;let u=vp(n.timeline,`d`,i.d,`o2`),d=e.stopAtD.filter(e=>e<=i.d+.5).length*o,f=Math.hypot(i.x-r.x,i.z-r.z)*1e3*a,p=u+d+f;if(p>l)return{d:i.d,x:i.x,z:i.z,need:p,limit:l};(!c||p>c.need)&&(c={d:i.d,need:p,limit:l})}return e.abortWorst=c,null}shelterTime(e){let t=this.waypoints[0],n=this.params.rover?this.params.roverMs:rp(0,this.params),r={t:0,d:0};for(let i of e.samples){let e=Math.hypot(i.x-t.x,i.z-t.z)*1e3*1.25/n;e>r.t&&(r={t:e,d:i.d})}return r}sunWindow(e){let t=this.view,n=d(t.lat0,t.decl),r=t.ltst,i=r+e.totalT/3698.9;return{start:r,end:i,sunset:n.set,endMarginH:n.set-i}}refreshSun(){let e=this.result;e&&!e.failed&&(e.sun=this.sunWindow(e.budget),e.verdict=this.judge(e),this.app.hud.renderPlanner(this))}renderMarkers(){let e=this.app.labels;e.clear(`wp`),this.wpItems=this.waypoints.map((t,n)=>{let r=t.poi?``:`<div class="lb wr">${t.name} · science stop</div>`,i=e.add(`wp`,{className:`wpn`,html:`<div class="dot"></div><div class="num">${n+1}</div>${r}`,world:new W(t.x,0,t.z),priority:8});return i.xz=t,i});let t=this.result&&this.result.pnr;if(t){let n=e.add(`wp`,{className:`pnr`,html:this.params.rover?`<div class="dot"></div><div class="lb">WALKBACK LIMIT<small>rover fails here: no walk home</small></div>`:`<div class="dot"></div><div class="lb">POINT OF NO RETURN<small>abort limit with O₂ reserve</small></div>`,world:new W(t.x,0,t.z),priority:9});n.xz={x:t.x,z:t.z},this.wpItems.push(n)}let n=this.result&&this.result.o2Out;if(n){let t=e.add(`wp`,{className:`o2out`,html:`<div class="dot"></div><div class="lb">O₂ RUNS OUT<small>EV1 would not survive past here</small></div>`,world:new W(n.x,0,n.z),priority:9});t.xz={x:n.x,z:n.z},this.wpItems.push(t),this.o2Item=t}else this.o2Item=null;this.evaItem||(this.evaItem=e.add(`eva`,{className:`eva`,html:`<div class="dot"></div><div class="lb">EV1</div>`,world:new W}),this.hoverItem=e.add(`eva`,{className:`eva`,html:`<div class="dot" style="width:8px;height:8px;left:-4px;top:-4px"></div>`,world:new W})),this.evaItem.hiddenByUser=!0,this.hoverItem.hiddenByUser=!0}showHover(e){if(!this.result||e==null){this.hoverItem&&(this.hoverItem.hiddenByUser=!0);return}let t=_p(this.result.samples,e),n=this.view;this.hoverItem.world.set(t.x,n.yAt(t.x,t.z)+n.markerLift(),t.z),this.hoverItem.hiddenByUser=!1}startSim(e=480){this.result&&!this.result.failed&&(this.stopSim(),this.sim={t:0,speed:e,pastPnr:!1,inReserve:!1,dead:!1},this.sim.journalEpoch=this.journalEpoch=(this.journalEpoch||0)+1,this.evaItem.hiddenByUser=!!this.app.fpv?.active,this.setEvaLook(!1),this.app.hud.toast(`EVA SIMULATION · EV1 EGRESS`),this.app.hud.simButton(!0),this.app.sound?.lock(),this.app.fpv?.onSimStart(this))}stopSim(){let e=!!this.sim;this.sim=null,this.evaItem&&(this.evaItem.hiddenByUser=!0,this.setEvaLook(!1)),this.view.autoFollow=null,clearTimeout(this._mayday),e&&(this.app.hud.updateSim(this,null,null),this.app.fpv?.onSimStop(this),this.app.hud.simButton(!1))}setEvaLook(e){let t=this.evaItem;t&&(t.el.classList.toggle(`dead`,e),t.lb.innerHTML=e?`EV1 · O₂ 0.00 kg<small>suit out of oxygen</small>`:`EV1`,t.lbW=null)}buildEvents(e){let t=e.budget,n=this.params,r=n.stopMin*60,i=[],a=0,o=0,s=0,c=t.timeline,l=e=>vp(c,`d`,e,`t`),u=e=>vp(c,`d`,e,`o2`);for(let t of e.stopAtD)i.push({kind:`walk`,t0:a,t1:a+l(t)-l(o),d0:o,d1:t,o0:s,o1:s+u(t)-u(o)}),a=i.at(-1).t1,s=i.at(-1).o1,i.push({kind:`stop`,t0:a,t1:a+r,d0:t,d1:t,o0:s,o1:s+sp(n.stopW)*r}),a=i.at(-1).t1,s=i.at(-1).o1,o=t;let d=t.distance;i.push({kind:`walk`,t0:a,t1:a+l(d)-l(o),d0:o,d1:d,o0:s,o1:s+u(d)-u(o)}),e.events=i}distIn(e,t){if(e.kind!==`walk`)return e.d0;let n=this.result.budget.timeline,r=vp(n,`d`,e.d0,`t`);return vp(n,`t`,r+(vp(n,`d`,e.d1,`t`)-r)*t,`d`)}findO2(e,t){for(let n of e.events){if(n.o1<t)continue;let r=n.o1>n.o0?H.clamp((t-n.o0)/(n.o1-n.o0),0,1):0,i=n.t0+(n.t1-n.t0)*r,a=this.distIn(n,r),o=_p(e.samples,a);return{t:i,d:a,x:o.x,z:o.z,kind:n.kind}}return null}stateAt(e){let t=this.result;t.events||this.buildEvents(t);let n=t.events.find(t=>e<=t.t1)||t.events.at(-1),r=n.t1>n.t0?H.clamp((e-n.t0)/(n.t1-n.t0),0,1):1;return{d:this.distIn(n,r),o2:n.o0+(n.o1-n.o0)*r,kind:n.kind,done:e>=t.events.at(-1).t1}}update(e){if(!this.sim||!this.result)return;let t=this.sim,n=this.result,r=this.app.hud,i=this.app.sound;if(t.dead)return;let a=t.t,o=t.state?.o2||0;t.t+=e*t.speed;let s=!1;n.o2Out&&t.t>=n.o2Out.t&&(t.t=n.o2Out.t,s=!0);let c=this.stateAt(t.t);s&&(c.o2=this.params.o2CapKg);let l=_p(n.samples,c.d),u=this.view,d=u.yAt(l.x,l.z);this.evaItem.world.set(l.x,d+u.markerLift(),l.z),t.pos=l,this.follow&&!this.app.fpv?.active&&(u.cam.target.x+=(l.x-u.cam.target.x)*Math.min(1,e*2.5),u.cam.target.z+=(l.z-u.cam.target.z)*Math.min(1,e*2.5)),t.state=c;let f=Math.max(0,Math.min(t.t,n.events.at(-1).t1)-Math.min(a,n.events.at(-1).t1));if(this.app.journal?.feed(l,f,`sim-${t.journalEpoch}`,this.params.rover?`rover`:`EV1 playback`,Math.max(0,this.params.o2CapKg-c.o2),this.params.o2CapKg,f>0?Math.max(0,c.o2-o)/f/sp(1):null),n.pnr&&!t.pastPnr&&c.d>=n.pnr.d&&(t.pastPnr=!0,r.toast(this.params.rover?`▲ PAST THE WALKBACK LIMIT`:`▲ PAST THE POINT OF NO RETURN`,3400),i?.alarm(1)),n.reserveAt&&!t.inReserve&&t.t>=n.reserveAt.t&&!s&&(t.inReserve=!0,r.toast(`▲ O₂ RESERVE REACHED · SUIT CAUTION`,3400),i?.alarm(2)),r.updateSim(this,t.t,c),s){this.die(l);return}if(c.done){let e=this.returnToStart,t=n.budget.remaining<n.budget.reserveKg;r.toast(e?t?`EV1 BACK AT LZ-A · O₂ RESERVE BREACHED`:`EV1 BACK AT LZ-A · INGRESS`:`EV1 AT ${this.waypoints.at(-1).name.toUpperCase()}`,3400),t||i?.go(),this.sim=null,this.app.fpv?.onSimStop(this,!0),r.simButton(!1),setTimeout(()=>{!this.sim&&this.evaItem&&(this.evaItem.hiddenByUser=!0)},2500),r.updateSim(this,null,null)}}die(e){let t=this.sim,n=this.view,r=this.app.hud;t.dead=!0,t.deadAt={...e,t:t.t,lt:g().seconds,fromLZ:Math.hypot(e.x-this.waypoints[0].x,e.z-this.waypoints[0].z)*1e3},this.setEvaLook(!0),this.o2Item&&(this.o2Item.hiddenByUser=!0),this.evaItem.hiddenByUser=!!this.app.fpv?.active,r.banner(`EV1 LOST · O₂ EXHAUSTED`,`nogo`,4600),r.flash(.55,1400,`red`),this.app.sound?.flatline(),this.app.fpv?.active?this.app.fpv.onDeath(t.deadAt):n.flyTo({target:new W(e.x,n.yAt(e.x,e.z),e.z),dist:.9,el:.78},2.2),r.updateSim(this,t.t,t.state),clearTimeout(this._mayday),this._mayday=setTimeout(()=>{if(this.sim!==t)return;let e=Math.round(t.deadAt.lt/60);r.toast(`MAYDAY SENT · EARTH HEARS IT IN ${e} MIN · TOO LATE`,4200)},3200)}frame(){let e=this.view,t=e.markerLift(1.5);for(let n of this.wpItems||[])n.world.set(n.xz.x,e.yAt(n.xz.x,n.xz.z)+t,n.xz.z)}};function hp(e){if(e.length<3)return e;let t=[e[0]];for(let n=0;n<e.length-1;n++){let r=e[n],i=e[n+1];t.push({x:r.x*.75+i.x*.25,z:r.z*.75+i.z*.25},{x:r.x*.25+i.x*.75,z:r.z*.25+i.z*.75})}return t.push(e.at(-1)),t}function gp(e,t,n){let r=[],i=0;r.push({x:e[0].x,z:e[0].z,d:0,e:n(e[0].x,e[0].z)});for(let a=1;a<e.length;a++){let o=e[a-1],s=e[a],c=Math.hypot(s.x-o.x,s.z-o.z),l=Math.max(1,Math.ceil(c/t));for(let e=1;e<=l;e++){let t=e/l,a=o.x+(s.x-o.x)*t,u=o.z+(s.z-o.z)*t;r.push({x:a,z:u,d:(i+c*t)*1e3,e:n(a,u)})}i+=c}return r}function _p(e,t){let n=0,r=e.length-1;if(t<=0)return e[0];if(t>=e[r].d)return e[r];for(;r-n>1;){let i=n+r>>1;e[i].d<t?n=i:r=i}let i=e[n],a=e[r],o=(t-i.d)/(a.d-i.d||1);return{x:i.x+(a.x-i.x)*o,z:i.z+(a.z-i.z)*o,d:t,e:i.e+(a.e-i.e)*o}}function vp(e,t,n,r){let i=0,a=e.length-1;if(n<=e[0][t])return e[0][r];if(n>=e[a][t])return e[a][r];for(;a-i>1;){let r=i+a>>1;e[r][t]<n?i=r:a=r}let o=e[i],s=e[a],c=(n-o[t])/(s[t]-o[t]||1);return o[r]+(s[r]-o[r])*c}var yp=class{constructor(e){this.app=e,this.item=null,this.count=0}get open(){return!!this.item}drop(e,t){let n=this.app,r=n.site,i=n.planner;this.close();let a=r.xzToLonLat(e,t),o=r.elevAt(e,t),s=r.slopeAt(e,t)??0,c=r.cfg.slopeLim,l=i.waypoints[0],u=l?Math.hypot(e-l.x,t-l.z)*1e3:null,d=s>=i.params.maxSlope?[`nogo`,`✖`,`too steep to walk (limit ${i.params.maxSlope}°)`]:s>=c[1]?[`hazard`,`▲`,`hazard ground`]:s>=c[0]?[`caution`,`▲`,`caution`]:[`ok`,`✔`,`walkable`],f=`${ef(a.lat,4)} ${tf(a.lon,4)}`,p=n.touch,m=`<div class="pinhead"></div>
      <div class="pcard">
        <div class="ph"><b>DROPPED PIN</b><button class="px" data-a="close" aria-label="Close">✕</button></div>
        <div class="pc">${f}</div>
        <div class="pk">
          <span>ELEVATION</span><b>${nf(o)} m</b>
          <span>SLOPE</span><b class="s-${d[0]}">${d[1]} ${s.toFixed(0)}° · ${d[2]}</b>
          ${u==null?``:`<span>FROM LZ-A</span><b>${rf(u)} direct</b>`}
        </div>
        <div class="pb">
          <button class="btn small primary" data-a="route">➜ ROUTE HERE</button>
          <button class="btn small" data-a="add">+ ADD STOP</button>
          ${n.fpv?`<button class="btn small" data-a="walk">◉ STAND HERE</button>`:``}
        </div>
        <div class="pn">${p?`Tap the map again to close`:`Least-energy route from the airlock, solved on the HiRISE DTM`}</div>
      </div>`,h=n.labels.add(`pin`,{className:`pin`,html:m,world:new W(e,r.yAt(e,t),t),priority:20});h.xz={x:e,z:t},h.info={coords:f,e:o,slope:s},h.el.addEventListener(`click`,r=>{let i=r.target.closest(`[data-a]`);if(!i)return;r.stopPropagation();let a=i.dataset.a;a===`close`?this.close():a===`route`?this.routeHere():a===`add`?this.addStop():a===`walk`&&(this.close(),n.fpv.enter(e,t))}),this.item=h,r.pulse(e,t),n.sound?.pin()}name(){return`Pin ${++this.count}`}routeHere(){let e=this.item;if(!e)return;let t=this.app.planner,n=t.waypoints[0];t.waypoints=n?[n]:[],t.waypoints.push({name:this.name(),x:e.xz.x,z:e.xz.z,note:e.info.coords}),t.userEdit=!0,this.close(),t.compute(),this.summary(t)}addStop(){let e=this.item;if(!e)return;let t=this.app.planner;t.waypoints.push({name:this.name(),x:e.xz.x,z:e.xz.z,note:e.info.coords}),t.userEdit=!0,this.close(),t.compute(),this.summary(t)}summary(e){let t=e.result,n=this.app.hud;if(!t)return;if(t.failed){n.toast(`NO SAFE ROUTE · EVERY PATH CROSSES TOO-STEEP GROUND`,3400);return}let r=t.budget,i=Math.floor(r.totalT/3600),a=Math.round(r.totalT%3600/60),o=t.verdict.lvl===`go`?`GO`:t.verdict.lvl===`caution`?`CAUTION`:`NO-GO`;n.toast(`ROUTE · ${(r.distance/1e3).toFixed(2)} KM · ${i?`${i} H `:``}${a} MIN · ${o}`,3600)}close(){this.item&&=(this.app.labels.clear(`pin`),null)}frame(){let e=this.item;if(!e)return;let t=this.app.site;if(e.world.set(e.xz.x,t.yAt(e.xz.x,e.xz.z),e.xz.z),e.screen){let t=e.card||=e.el.querySelector(`.pcard`),n=t.offsetWidth||262,r=Math.max(10-e.screen.x,Math.min(18,this.app.w-10-n-e.screen.x));t.style.left=`${r.toFixed(0)}px`,e.el.classList.toggle(`below`,e.screen.y<(t.offsetHeight||200)+60)}}},bp=class{constructor(e,t,n){let r=document.createElement(`div`);r.className=`joy ${t}`,r.innerHTML=`<div class="joy-base"><div class="joy-knob"></div></div><span class="joy-lb">${n}</span>`,e.appendChild(r),this.el=r,this.base=r.querySelector(`.joy-base`),this.knob=r.querySelector(`.joy-knob`),this.value={x:0,y:0},this.id=null;let i=e=>{if(e.pointerId!==this.id)return;let t=this.base.getBoundingClientRect(),n=t.width/2,r=(e.clientX-(t.left+n))/n,i=(e.clientY-(t.top+n))/n,a=Math.hypot(r,i);a>1&&(r/=a,i/=a),this.value={x:r,y:i},this.knob.style.transform=`translate(${(r*n*.62).toFixed(1)}px, ${(i*n*.62).toFixed(1)}px)`},a=e=>{e.pointerId===this.id&&(this.id=null,this.value={x:0,y:0},this.knob.style.transform=``,r.classList.remove(`on`))};this.base.addEventListener(`pointerdown`,e=>{e.preventDefault(),e.stopPropagation(),this.id=e.pointerId,this.base.setPointerCapture(e.pointerId),r.classList.add(`on`),i(e)}),this.base.addEventListener(`pointermove`,i),this.base.addEventListener(`pointerup`,a),this.base.addEventListener(`pointercancel`,a),this.base.addEventListener(`lostpointercapture`,a)}get magnitude(){return Math.hypot(this.value.x,this.value.y)}reset(){this.id=null,this.value={x:0,y:0},this.knob.style.transform=``,this.el.classList.remove(`on`)}},xp=.0018,Sp=8,Cp=3389500,wp=[1,4,8,16,32],Tp=3698.9,Ep=new W,Dp=class{constructor(e){this.app=e,this.active=!1,this.yaw=0,this.pitch=-.05,this.fov=62,this.pos={x:0,z:0},this.warpIdx=2,this.walkTo=null,this.follow=!1,this.dead=null,this.o2Used=0,this.walked=0,this.hudAt=0}get view(){return this.app.site}get warp(){return wp[this.warpIdx]}build(){if(this.sky)return;let e=this.view;this.sky=new Hi(new Ea(30,48,24),new La({vertexShader:Gf,fragmentShader:Kf,side:1,depthWrite:!1,uniforms:{uSun:e.uniforms.uSun}})),this.sky.frustumCulled=!1,this.sky.renderOrder=-10,this.ring=new Hi(this.horizonGeometry(),new La({vertexShader:qf,fragmentShader:Jf,side:2,uniforms:{uSun:e.uniforms.uSun,uFogCol:e.uniforms.uFogCol}})),this.ring.frustumCulled=!1,this.ring.renderOrder=-5,this.buildHud()}horizonGeometry(){let e=this.app.crater,t=this.view,n=t.xzToLonLat(0,0),r=e.lonlatToXZ(n.lat,n.lon),i=t.h0+2,a=[],o=[],s=[],c=[];this.skyline=new Float32Array(360);for(let t=0;t<=360;t++){let n=t/360*Math.PI*2,l=Math.sin(n),u=-Math.cos(n),d=-.25,f=20;for(let t=2.6;t<=46;t+=.12){let n=r.x+l*t,a=r.z+u*t;if(Math.abs(n)>e.sizeX/2||Math.abs(a)>e.sizeZ/2)break;let o=t*1e3,s=o*o/(2*Cp),c=Math.atan2(e.elevAt(n,a)-i-s,o);c>d&&(d=c,f=t)}t<360&&(this.skyline[t]=d);let p=Sp*Math.tan(d),m=-8*Math.tan(.3);if(a.push(l*Sp,p,u*Sp,l*Sp,m,u*Sp),o.push(f,f),s.push(1,0),t<360){let e=t*2;c.push(e,e+1,e+2,e+1,e+3,e+2)}}let l=new $r;return l.setAttribute(`position`,new Y(a,3)),l.setAttribute(`aDist`,new Y(o,1)),l.setAttribute(`aTop`,new Y(s,1)),l.setIndex(c),l}buildHud(){let e=document.createElement(`div`);e.id=`helmet`,e.className=`helmet`,e.innerHTML=`
      <div class="visor"></div>
      <div class="h-compass"><div class="h-tape" id="h-tape"></div><i class="h-caret"></i><b id="h-hdg">000°</b></div>
      <button class="btn ghost h-exit" id="h-exit">✕ EXIT HELMET VIEW</button>
      <div class="h-cross"></div>
      <div class="h-suit" id="h-suit"></div>
      <div class="h-nav" id="h-nav"></div>
      <div class="h-warp" id="h-warp"><button data-w="-1" aria-label="Slower time warp" title="Slower ( [ )">−</button><span id="h-warp-v">TIME ×8</span><button data-w="1" aria-label="Faster time warp" title="Faster ( ] )">+</button></div>
      <div class="h-note" id="h-note"></div>
      <div class="h-dead" id="h-dead"></div>
      <div class="h-rotate" id="h-rotate"><b>⟲</b><span>Turn your phone sideways.<small>The helmet view has joysticks made for two thumbs.</small></span><div class="btn-row"><button class="btn small" id="h-portrait">STAY IN PORTRAIT</button><button class="btn small" id="h-rot-exit">✕ EXIT HELMET VIEW</button></div></div>`,document.getElementById(`hud`).appendChild(e),this.el=e,e.querySelector(`#h-exit`).onclick=()=>this.exit(),e.querySelector(`#h-warp`).onclick=e=>{let t=e.target.closest(`[data-w]`);t&&this.setWarp(this.warpIdx+ +t.dataset.w)},e.addEventListener(`pointerdown`,e=>{e.target.closest(`button`)&&e.stopPropagation()}),e.querySelector(`#h-portrait`).onclick=()=>document.body.classList.add(`fpv-portrait-ok`),e.querySelector(`#h-rot-exit`).onclick=()=>this.exit(),this.app.touch&&(this.moveStick=new bp(e,`left`,`MOVE`),this.lookStick=new bp(e,`right`,`LOOK`))}async goLandscape(){if(!(!this.app.touch||Math.min(this.app.w,this.app.h)>600||!navigator.userActivation?.isActive))try{!document.fullscreenElement&&document.documentElement.requestFullscreen&&(await document.documentElement.requestFullscreen({navigationUI:`hide`}),this.ownFullscreen=!0),await screen.orientation?.lock?.(`landscape`)}catch{}}leaveLandscape(){try{screen.orientation?.unlock?.()}catch{}this.ownFullscreen&&document.fullscreenElement&&document.exitFullscreen().catch(()=>{}),this.ownFullscreen=!1}enter(e,t,n){let r=this.app,i=this.view;if(!(r.mode!==`site`||r.busy)){if(this.build(),this.goLandscape(),r.pin?.close(),r.planner.addMode=!1,e==null){let n=r.planner.waypoints[0]||{x:0,z:0};e=n.x,t=n.z}if(this.pos={x:e,z:t},n==null){let i=r.planner.waypoints[1];n=i?Math.atan2(i.x-e,-(i.z-t)):-.8}this.yaw=n,this.pitch=-.04,this.walkTo=null,this.dead=null,this.o2Used=0,this.walked=0,this.warned=!1,this.journalEpoch=(this.journalEpoch||0)+1,this.clock=i.ltst,this.prevExag=i.exagTarget,this.active=!0,i.fpvOn=!0,i.exagTarget=1,i.exag=1,i.uniforms.uExag.value=1,i.baseY=(i.meta.min-i.h0)/1e3-i.sizeX*.04,i.wallUniforms.uBaseY.value=i.baseY,i.uniforms.uFpv.value=1,i.walls.visible=!1,i.floor.visible=!1,i.stalks.visible=!1,i.scene.background=null,i.scene.add(this.sky,this.ring),i.directMat.visible=!1,i.refreshRouteHeights(),i.updateStalks(),this.camY=i.yAt(e,t)+xp,document.body.classList.add(`fpv`),this.el.classList.add(`show`),this.el.classList.remove(`dead`),r.hud.closeSheet(),r.hud.toast(`HELMET VIEW · TRUE-SCALE HiRISE TERRAIN`),r.sound?.windLevel(.07),r.sound?.breathing(!0,15),r.sound?.lock(),this.follow=!(!r.planner.sim||r.planner.sim.dead),this.follow&&this.onSimStart(r.planner),r.hud.renderPlanner(r.planner),this.renderWarp()}}exit(){if(!this.active)return;this.app.planner.sim||this.app.journal?.recorder.pause();let e=this.app,t=this.view;this.active=!1,this.follow=!1,t.fpvOn=!1,t.exagTarget=this.prevExag??t.cfg.exag,t.uniforms.uFpv.value=0,t.walls.visible=!0,t.floor.visible=!0,t.stalks.visible=!0,t.scene.background=new J(328967),t.scene.remove(this.sky,this.ring),t.directMat.visible=!0,t.refreshRouteHeights(),t.camera.fov=this.baseFov(),t.camera.updateProjectionMatrix(),t.cam.target.set(this.pos.x,t.yAt(this.pos.x,this.pos.z),this.pos.z),t.cam.az=this.yaw+Math.PI,t.cam.el=.6,t.cam.dist=1.2,t.flyTo({dist:2.4,el:.8},1.4),document.body.classList.remove(`fpv`),this.el.classList.remove(`show`,`dead`),this.moveStick?.reset(),this.lookStick?.reset(),this.leaveLandscape(),e.sound?.windLevel(.035),e.sound?.breathing(!1),e.planner.evaItem&&e.planner.sim&&(e.planner.evaItem.hiddenByUser=!1),e.hud.renderPlanner(e.planner)}baseFov(){let e=this.app,t=e.w/e.h;return t>=1?40:Math.min(78,2*Math.atan(Math.tan(40*Math.PI/360)/t)*180/Math.PI)}onSimStart(e){this.active&&(this.follow=!0,this.dead=null,this.el.classList.remove(`dead`),e.sim.speed=this.warp*5,e.evaItem.hiddenByUser=!0,this.lookOffset=0)}onSimStop(e,t){this.active&&(this.follow=!1,t&&this.app.hud.toast(`EVA COMPLETE · YOU CAN WALK FREELY`,3e3))}onDeath(e){if(!this.active||this.dead)return;this.dead={t:0,info:e},this.walkTo=null,e.x!=null&&(this.pos={x:e.x,z:e.z}),this.o2Used=this.app.planner.params.o2CapKg,this.el.classList.add(`dead`);let t=e.lt??g().seconds,n=Math.round(t/60);document.getElementById(`h-dead`).innerHTML=`<b>O₂ EXHAUSTED</b>
      <span>${rf(e.fromLZ)} from the airlock · a mayday reaches Earth in ${n} min, a reply in ${n*2} min</span>
      <button class="btn primary" id="h-respawn">↻ BACK TO LZ-A</button>`,document.getElementById(`h-respawn`).onclick=()=>{this.app.planner.stopSim();let e=this.app.planner.waypoints[0];this.exit(),this.enter(e?.x,e?.z)},this.app.sound?.breathing(!1)}onDrag(e,t){if(this.dead)return;let n=this.fov/62*.0042;this.follow?this.lookOffset=(this.lookOffset||0)-e*n:this.yaw-=e*n,this.pitch=H.clamp(this.pitch+t*n,-1.2,1.1),this.lastLook=performance.now()}onWheel(e){let t=e.deltaY*(e.deltaMode===1?30:1);this.fov=H.clamp(this.fov*Math.exp(t*.0012),12,80)}onClick(){if(this.dead||this.follow)return;let e=this.view,t=e.pick();t&&(Math.hypot(t.x-this.pos.x,t.z-this.pos.z)<.004||(this.walkTo={x:t.x,z:t.z},e.pulse(t.x,t.z),this.app.sound?.blip()))}setWarp(e){this.warpIdx=H.clamp(e,0,wp.length-1);let t=this.app.planner;this.follow&&t.sim&&(t.sim.speed=this.warp*5),this.renderWarp()}renderWarp(){let e=this.el?.querySelector(`#h-warp`);if(!e)return;let t=`TIME ×${this.follow?this.warp*5:this.warp}`,n=e.querySelector(`#h-warp-v`);n.textContent!==t&&(n.textContent=t);let[r,i]=e.querySelectorAll(`button`);r.disabled=this.warpIdx===0,i.disabled=this.warpIdx===wp.length-1}onKey(e){return e===`[`||e===`-`?(this.setWarp(this.warpIdx-1),!0):e===`]`||e===`=`||e===`+`?(this.setWarp(this.warpIdx+1),!0):!1}update(e){if(!this.active)return;let t=this.o2Used,n=!this.follow&&!this.dead,r=this.app,i=this.view,a=r.planner,o=r.keys,s=0,c=0,l=this.lookStick?.value;if(l&&!this.dead&&Math.hypot(l.x,l.y)>.06){let t=this.fov/62*e,n=l.x*Math.abs(l.x),r=l.y*Math.abs(l.y);this.follow?this.lookOffset=(this.lookOffset||0)+n*2.2*t:this.yaw+=n*2.2*t,this.pitch=H.clamp(this.pitch-r*1.5*t,-1.2,1.1),this.lastLook=performance.now()}if(this.moveStick?.el.classList.toggle(`off`,!!(this.follow||this.dead)),this.dead)this.dead.t+=e;else if(this.follow&&a.sim&&a.sim.pos){let t=a.result,n=a.sim.state,r=a.sim.pos,i=_p(t.samples,Math.min(t.budget.distance,n.d+12)),o=_p(t.samples,Math.max(0,n.d-2)),c=Math.hypot(i.x-o.x,i.z-o.z)>1e-6?Math.atan2(i.x-o.x,-(i.z-o.z)):this.yaw;n.kind===`walk`&&(this.yaw=Op(this.yaw,c,Math.min(1,e*2.2))),performance.now()-(this.lastLook||0)>2500&&(this.lookOffset=(this.lookOffset||0)*Math.max(0,1-e*1.5));let l=Math.hypot(r.x-this.pos.x,r.z-this.pos.z)*1e3;this.pos={x:r.x,z:r.z},s=n.kind===`walk`&&e>0?Math.min(l/e/Math.max(1,a.sim.speed),3):0,this.o2Used=n.o2}else if(!this.follow){let t=(o.has(`w`)||o.has(`arrowup`)?1:0)-(o.has(`s`)||o.has(`arrowdown`)?1:0),n=(o.has(`d`)||o.has(`arrowright`)?1:0)-(o.has(`a`)||o.has(`arrowleft`)?1:0),l=o.has(`shift`)?3:1,u=this.moveStick?.value,d=u?Math.min(1,Math.hypot(u.x,u.y)):0;d>.08&&(t=-u.y,n=u.x,l=d<=.75?d/.75:1+(d-.75)/.25*2);let f=+!!o.has(`e`)-!!o.has(`q`);this.yaw+=f*e*1.2;let p=0,m=0;if(t||n){this.walkTo=null;let e=Math.sin(this.yaw),r=Math.cos(this.yaw);p=e*t+r*n,m=-r*t+e*n}else if(this.walkTo){let t=this.walkTo.x-this.pos.x,n=this.walkTo.z-this.pos.z,r=Math.hypot(t,n);r<.002?this.walkTo=null:(p=t/r,m=n/r,this.yaw=Op(this.yaw,Math.atan2(t,-n),Math.min(1,e*3)))}let h=Math.hypot(p,m);if(h>0){p/=h,m/=h;let t=i.elevAt(this.pos.x,this.pos.z),n=i.elevAt(this.pos.x+p*.002,this.pos.z+m*.002);c=Math.atan2(n-t,2);let r=rp(c),o=r*this.warp*l*e/1e3,u=this.pos.x+p*o,d=this.pos.z+m*o,f=i.slopeAt(u,d)??0,g=i.sizeX/2-.01,_=i.sizeZ/2-.01;f>a.params.maxSlope+8?(this.note(`TOO STEEP TO WALK · `+f.toFixed(0)+`°`),this.walkTo=null):Math.abs(u)>g||Math.abs(d)>_?(this.note(`EDGE OF THE HiRISE ELEVATION MODEL`),this.walkTo=null):(this.pos={x:u,z:d},s=r*l,this.walked+=o*1e3,this.o2Used+=sp(ip(s,Math.tan(c)*100))*e*this.warp)}else this.o2Used+=sp(ip(0,0))*e*this.warp;this.clock+=e*this.warp/Tp,Math.abs(this.clock-i.ltst)>.02&&i.setTime(this.clock);let g=a.params.o2CapKg;if(this.o2Used>=g){this.o2Used=g,r.hud.banner(`O₂ EXHAUSTED`,`nogo`,4200),r.hud.flash(.55,1400,`red`),r.sound?.flatline();let e=a.waypoints[0]||{x:0,z:0};this.onDeath({fromLZ:Math.hypot(this.pos.x-e.x,this.pos.z-e.z)*1e3})}else!this.warned&&this.o2Used>=g*(1-a.params.reservePct/100)&&(this.warned=!0,r.hud.toast(`▲ O₂ RESERVE · HEAD BACK TO THE AIRLOCK`,3600),r.sound?.alarm(2))}if(this.speed=s,this.grade=c,n){let n=e*this.warp,r=Math.max(0,this.o2Used-t);this.app.journal?.feed(this.pos,n,`helmet-${this.journalEpoch}`,`helmet walk`,Math.max(0,a.params.o2CapKg-this.o2Used),a.params.o2CapKg,n>0?r/n/sp(1):null)}let u=a.params.o2CapKg,d=1-this.o2Used/u;r.sound?.breathing(!this.dead,13+s*6+(d<.25?10:0)),this.renderHud()}applyCamera(e){let t=this.view,n=t.camera,r=xp,i=0,a=this.pitch;if(this.dead){let e=Math.min(1,this.dead.t/2.2),t=e*e*(3-2*e);r=xp*(1-.8*t),i=.5*t,a=H.lerp(this.pitch,-.55,t)}let o=t.yAt(this.pos.x,this.pos.z)+r;this.camY=this.camY==null?o:H.lerp(this.camY,o,Math.min(1,e*10));let s=this.speed>.1&&!this.dead?Math.sin(performance.now()/1e3*7.5)*4e-5*Math.min(1,this.speed):0;n.position.set(this.pos.x,this.camY+s,this.pos.z);let c=this.yaw+(this.follow&&this.lookOffset||0);Ep.set(Math.sin(c)*Math.cos(a),Math.sin(a),-Math.cos(c)*Math.cos(a)),n.up.set(0,1,0),n.lookAt(n.position.x+Ep.x,n.position.y+Ep.y,n.position.z+Ep.z),i&&n.rotateZ(i),n.near=4e-4,n.far=40;let l=this.app.w/this.app.h;n.fov=l>=1?this.fov:Math.min(100,2*Math.atan(Math.tan(this.fov*Math.PI/360)*.8/l)*180/Math.PI),n.updateProjectionMatrix(),this.sky.position.copy(n.position),this.ring.position.set(n.position.x,n.position.y,n.position.z),this.heading=(c*180/Math.PI%360+360)%360}note(e){let t=document.getElementById(`h-note`);t&&(t.textContent=e,t.classList.add(`show`),clearTimeout(this._nt),this._nt=setTimeout(()=>t.classList.remove(`show`),1600))}renderHud(){let e=performance.now();if(e-this.hudAt<66)return;this.hudAt=e;let t=this.app,n=this.view,r=t.planner,i=this.heading??0,a=this.fov*(t.w/t.h),o=Math.min(t.w,720)*.9/Math.max(40,a),s=[];for(let e=0;e<360;e+=15){let t=(e-i+540)%360-180;if(Math.abs(t)>60)continue;let n={0:`N`,90:`E`,180:`S`,270:`W`,45:`NE`,135:`SE`,225:`SW`,315:`NW`}[e];s.push(`<i class="${n?`m`:``}" style="left:calc(50% + ${(t*o).toFixed(0)}px)">${n||``}</i>`)}let c=[],l=r.waypoints[0],u=(e,t,n,r,a)=>{let s=(Math.atan2(e-this.pos.x,-(t-this.pos.z))*180/Math.PI-i+540)%360-180,l=Math.hypot(e-this.pos.x,t-this.pos.z)*1e3;if(l<3)return;let u=Math.max(-58,Math.min(58,s))*o;c.push({px:u,cls:r+(Math.abs(s)>58?` off`:``),html:`${n}${a?`<small>${rf(l)}</small>`:``}`})};if(l&&u(l.x,l.z,`LZ`,`tl`,!0),this.follow&&r.sim?.state){let e=r.sim.state,t=r.result.stopAtD.findIndex(t=>t>e.d+1),n=t>=0?r.waypoints[t+1]:null;n&&u(n.x,n.z,String(t+2),`tw`,!0)}else this.walkTo?u(this.walkTo.x,this.walkTo.z,`▼`,`tw`,!0):r.waypoints.slice(1).forEach((e,t)=>u(e.x,e.z,String(t+2),`tw`,t===0));c.sort((e,t)=>e.px-t.px);let d=-1e9,p=0,m=c.map(e=>(p=e.px-d<70?1-p:0,d=e.px,`<em class="${e.cls}" style="left:calc(50% + ${e.px.toFixed(0)}px);top:${18+p*17}px">${e.html}</em>`));document.getElementById(`h-tape`).innerHTML=s.join(``)+m.join(``),document.getElementById(`h-hdg`).textContent=`${String(Math.round(i)%360).padStart(3,`0`)}°`;let h=r.params.o2CapKg,g=Math.max(0,h-this.o2Used),_=g/h*100,v=r.params.reservePct,y=_<=.01?`dead`:_<v?`crit`:_<v+15?`warn`:``,b=this.follow&&r.sim?.state?r.sim.state.kind===`stop`?r.params.stopW:ip(this.speed||.8,0):ip(this.speed,Math.tan(this.grade||0)*100),x=sp(b)*3600*1e3;document.getElementById(`h-suit`).innerHTML=`
      <div class="hk">SUIT · EV1</div>
      <div class="o2 ${y}"><span>O₂</span><b>${g.toFixed(3)}<small> kg</small></b></div>
      <div class="bar ${y}"><i style="width:${_.toFixed(1)}%"></i><u style="left:${v}%"></u></div>
      <div class="row"><span>METABOLIC</span><b>${nf(b)} W</b></div>
      <div class="row"><span>O₂ BURN</span><b>${x.toFixed(0)} g/h</b></div>
      <div class="row"><span>SUIT P</span><b>29.6 kPa</b></div>`;let S=n.elevAt(this.pos.x,this.pos.z),C=n.slopeAt(this.pos.x,this.pos.z)??0,w=n.xzToLonLat(this.pos.x,this.pos.z),T=this.follow&&r.sim?r.result.sun.start+r.sim.t/Tp:this.clock,E=l?Math.hypot(l.x-this.pos.x,l.z-this.pos.z)*1e3:0,D=C>=r.params.maxSlope?`crit`:C>=n.cfg.slopeLim[0]?`warn`:``;document.getElementById(`h-nav`).innerHTML=`
      <div class="hk">NAV · ${f(T)} LTST</div>
      <div class="row"><span>POSITION</span><b>${ef(w.lat)} ${tf(w.lon)}</b></div>
      <div class="row"><span>ELEVATION</span><b>${nf(S)} m</b></div>
      <div class="row"><span>SLOPE</span><b class="${D}">${C.toFixed(0)}°</b></div>
      <div class="row"><span>TO AIRLOCK</span><b>${rf(E)}</b></div>
      <div class="row"><span>SPEED</span><b>${(this.speed||0).toFixed(2)} m/s</b></div>
      <div class="row"><span>SUN</span><b>${n.sun?n.sun.elevation.toFixed(0):`—`}° el</b></div>`,this.renderWarp()}readout(){return[[`HELMET`,this.follow?`riding with EV1`:`free walk`],[`FOV`,`${this.fov.toFixed(0)}°`]]}};function Op(e,t,n){return e+(((t-e+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI)*n}var kp={helmetView:!0,craterPanel:!0},Ap=new W,jp=class{constructor(e){this.root=e,this.groups=new Map}group(e){return this.groups.has(e)||this.groups.set(e,[]),this.groups.get(e)}add(e,{className:t=``,html:n=``,world:r,onClick:i,onEnter:a,onLeave:o,occlude:s,priority:c=0}){let l=document.createElement(`div`);l.className=`mk ${t}`,l.innerHTML=n,i&&l.addEventListener(`click`,e=>{e.stopPropagation(),i(e)}),a&&l.addEventListener(`pointerenter`,a),o&&l.addEventListener(`pointerleave`,o),l.addEventListener(`pointerdown`,e=>e.stopPropagation()),this.root.appendChild(l);let u={el:l,lb:l.querySelector(`.lb`),world:r.clone(),occlude:s,visible:!0,hiddenByUser:!1,priority:c};return this.group(e).push(u),u}clear(e){for(let t of this.group(e))t.el.remove();this.groups.set(e,[])}setVisible(e,t){for(let n of this.group(e))n.el.style.display=t?``:`none`}update(e,t,n,r){let i=[];for(let a of this.group(e)){if(a.el.style.display===`none`)continue;Ap.copy(a.world).project(t);let e=Ap.z>1||Ap.z<-1,o=a.occlude?a.occlude(a):!1,s=e||o||a.hiddenByUser;if(a.el.classList.toggle(`hidden`,s),!s){let e=(Ap.x*.5+.5)*n,t=(-Ap.y*.5+.5)*r;a.el.style.transform=`translate3d(${e.toFixed(1)}px, ${t.toFixed(1)}px, 0)`,a.screen={x:e,y:t},a.card===void 0&&(a.card=a.el.querySelector(`.card`)),a.card&&(a.el.classList.toggle(`flipx`,e>n-300),a.el.classList.toggle(`flipy`,t>r-220)),i.push(a)}}i.sort((e,t)=>t.priority-e.priority);let a=[];for(let e of i){let t=e.lb;if(!t)continue;(e.lbW==null||e.lbW===0)&&(e.lbW=t.offsetWidth);let{x:n,y:r}=e.screen,i=[n-6,r-12,n+14+e.lbW,r+18],o=a.some(e=>i[0]<e[2]&&i[2]>e[0]&&i[1]<e[3]&&i[3]>e[1]);e.el.classList.toggle(`crowd`,o),o||a.push(i)}}},Mp=`http://www.w3.org/2000/svg`;function Np(e,t={},n){let r=document.createElementNS(Mp,e);for(let[e,n]of Object.entries(t))r.setAttribute(e,n);return n&&n.appendChild(r),r}var Pp=[`#0ca30c`,`#fab219`,`#ec835a`,`#d03b3b`];function Fp(e,t,{slopeAt:n,limits:r,onHover:i,pnr:a,pnrLabel:o=`PNR`,o2Out:s}){e.innerHTML=``;let c=Math.max(240,e.clientWidth||280),l={l:44,r:8,t:10,b:26},u=Np(`svg`,{viewBox:`0 0 ${c} 118`,role:`img`,"aria-label":`Elevation profile along the planned route`},e),d=t.samples,f=d.at(-1).d,p=1/0,m=-1/0;for(let e of d)p=Math.min(p,e.e),m=Math.max(m,e.e);let h=Ip(Math.max(10,m-p)/3),g=Math.floor(p/h)*h,_=Math.ceil(m/h)*h,v=e=>l.l+e/f*(c-l.l-l.r),y=e=>l.t+(1-(e-g)/(_-g))*(118-l.t-l.b-6),b=118-l.b-6;for(let e=g;e<=_+1e-6;e+=h){Np(`line`,{x1:l.l,x2:c-l.r,y1:y(e),y2:y(e),stroke:`var(--grid)`,"stroke-width":1},u);let t=Np(`text`,{x:l.l-6,y:y(e)+3.5,"text-anchor":`end`,fill:`var(--text-3)`,"font-size":10,"font-family":`JetBrains Mono`},u);t.textContent=Math.round(e).toLocaleString(`en-US`)}let x=Ip(f/1e3/4);for(let e=0;e<=f/1e3+1e-6;e+=x){let t=Np(`text`,{x:v(e*1e3),y:114,"text-anchor":`middle`,fill:`var(--text-3)`,"font-size":10,"font-family":`JetBrains Mono`},u);t.textContent=`${+e.toFixed(2)} km`}let S=Np(`g`,{},u),C=Math.min(160,d.length);for(let e=0;e<C;e++){let t=e/C*f,i=(e+1)/C*f,a=d[Math.min(d.length-1,Math.round((t+i)/2/f*(d.length-1)))],o=n(a.x,a.z)||0,s=o>=r[2]?3:o>=r[1]?2:+(o>=r[0]);Np(`rect`,{x:v(t),y:b+3,width:Math.max(.5,v(i)-v(t)-.5),height:4,fill:Pp[s]},S)}let w=``;if(d.forEach((e,t)=>{w+=`${t?`L`:`M`}${v(e.d).toFixed(1)},${y(e.e).toFixed(1)}`}),Np(`path`,{d:`${w}L${v(f)},${b}L${v(0)},${b}Z`,fill:`var(--data)`,"fill-opacity":.1},u),Np(`path`,{d:w,fill:`none`,stroke:`var(--data)`,"stroke-width":2,"stroke-linejoin":`round`,"stroke-linecap":`round`},u),t.stopAtD.forEach((e,t)=>{let n=d[Math.round(e/f*(d.length-1))];Np(`circle`,{cx:v(e),cy:y(n.e),r:4,fill:`var(--data)`,stroke:`var(--chart-surface)`,"stroke-width":2},u);let r=Np(`text`,{x:v(e),y:y(n.e)-8,"text-anchor":`middle`,fill:`var(--text-2)`,"font-size":10,"font-family":`JetBrains Mono`},u);r.textContent=String(t+2)}),a){Np(`line`,{x1:v(a.d),x2:v(a.d),y1:l.t,y2:b,stroke:`#d03b3b`,"stroke-width":2},u);let e=Np(`text`,{x:v(a.d)+4,y:l.t+9,fill:`var(--text-2)`,"font-size":10,"font-family":`JetBrains Mono`},u);e.textContent=o}if(s){Np(`rect`,{x:v(s.d),y:l.t,width:Math.max(0,v(f)-v(s.d)),height:b-l.t,fill:`#d03b3b`,"fill-opacity":.14},u),Np(`line`,{x1:v(s.d),x2:v(s.d),y1:l.t,y2:b,stroke:`#ff5a5a`,"stroke-width":2,"stroke-dasharray":`4 3`},u);let e=Np(`text`,{x:v(s.d)+4,y:l.t+21,fill:`#ffb0b0`,"font-size":10,"font-family":`JetBrains Mono`},u);e.textContent=`O₂ 0`}let T=Np(`g`,{visibility:`hidden`},u),E=Np(`line`,{y1:l.t,y2:b,stroke:`#ffffff`,"stroke-width":1.5},T),D=Np(`circle`,{r:4.5,fill:`#ffffff`,stroke:`var(--chart-surface)`,"stroke-width":2},T),O=Np(`line`,{y1:l.t,y2:b,stroke:`var(--text-2)`,"stroke-width":1,visibility:`hidden`},u),k=Np(`circle`,{r:4,fill:`var(--data)`,stroke:`var(--chart-surface)`,"stroke-width":2,visibility:`hidden`},u),A=document.createElement(`div`);A.className=`tip`,e.appendChild(A);let j=Np(`rect`,{x:l.l,y:0,width:c-l.l-l.r,height:118,fill:`transparent`},u);return j.addEventListener(`pointermove`,e=>{let t=u.getBoundingClientRect(),r=(e.clientX-t.left)/t.width*c,a=Math.max(0,Math.min(f,(r-l.l)/(c-l.l-l.r)*f)),o=d[Math.round(a/f*(d.length-1))],s=n(o.x,o.z)||0;O.setAttribute(`x1`,v(a)),O.setAttribute(`x2`,v(a)),O.setAttribute(`visibility`,`visible`),k.setAttribute(`cx`,v(a)),k.setAttribute(`cy`,y(o.e)),k.setAttribute(`visibility`,`visible`),A.style.display=`block`,A.style.left=`${v(a)/c*100}%`,A.replaceChildren();let p=document.createElement(`b`);p.textContent=`${Math.round(o.e).toLocaleString(`en-US`)} m`;let m=document.createElement(`span`);m.textContent=` · ${(a/1e3).toFixed(2)} km · slope ${s.toFixed(0)}°`,A.append(p,m),i?.(a)}),j.addEventListener(`pointerleave`,()=>{O.setAttribute(`visibility`,`hidden`),k.setAttribute(`visibility`,`hidden`),A.style.display=`none`,i?.(null)}),{cursor(e,t=``){if(e==null){T.setAttribute(`visibility`,`hidden`);return}let n=d[Math.round(Math.min(e,f)/f*(d.length-1))],r=t===`dead`||t===`crit`?`#ff5a5a`:t===`warn`?`#fab219`:`#ffffff`;E.setAttribute(`x1`,v(e)),E.setAttribute(`x2`,v(e)),E.setAttribute(`stroke`,r),D.setAttribute(`cx`,v(e)),D.setAttribute(`cy`,y(n.e)),D.setAttribute(`fill`,r),T.setAttribute(`visibility`,`visible`)}}}function Ip(e){let t=10**Math.floor(Math.log10(e)),n=e/t;return(n<1.5?1:n<3.5?2:n<7.5?5:10)*t}var Lp=class{constructor(e){this.hud=e,this.rec=null,this.supported=!!(navigator.mediaDevices&&navigator.mediaDevices.getDisplayMedia&&window.MediaRecorder)}get active(){return!!this.rec}async toggle(){if(this.rec){this.stop();return}if(!this.supported){this.hud.toast(`RECORDING NEEDS A DESKTOP BROWSER`);return}let e;try{e=await navigator.mediaDevices.getDisplayMedia({video:{frameRate:60},audio:!0,preferCurrentTab:!0,selfBrowserSurface:`include`,surfaceSwitching:`exclude`,systemAudio:`include`})}catch{this.hud.toast(`RECORDING CANCELLED`);return}let t=[`video/webm;codecs=vp9,opus`,`video/webm;codecs=vp8,opus`,`video/webm`,`video/mp4`].find(e=>MediaRecorder.isTypeSupported(e))||``,n=new MediaRecorder(e,{mimeType:t,videoBitsPerSecond:12e6}),r=[];n.ondataavailable=e=>{e.data.size&&r.push(e.data)},n.onstop=()=>{e.getTracks().forEach(e=>e.stop());let t=n.mimeType||`video/webm`,i=new Blob(r,{type:t}),a=document.createElement(`a`);a.href=URL.createObjectURL(i),a.download=`aero-atlas-${new Date().toISOString().slice(0,19).replace(/[:T]/g,`-`)}.${t.includes(`mp4`)?`mp4`:`webm`}`,document.body.appendChild(a),a.click(),a.remove(),setTimeout(()=>URL.revokeObjectURL(a.href),1e4),this.hud.toast(`SAVED ${a.download.toUpperCase()}`,3600)},e.getVideoTracks()[0].addEventListener(`ended`,()=>this.stop()),n.start(1e3),this.rec={mr:n,t0:performance.now()},this.tick=setInterval(()=>this.render(),500),this.render(),this.hud.toast(`● RECORDING · PRESS R OR ■ TO STOP`)}stop(){if(!this.rec)return;let{mr:e}=this.rec;this.rec=null,clearInterval(this.tick),e.state!==`inactive`&&e.stop(),this.render()}render(){let e=document.getElementById(`btn-rec`);if(!e)return;if(!this.rec){e.textContent=`● REC`,e.classList.remove(`rec-on`);return}let t=Math.floor((performance.now()-this.rec.t0)/1e3);e.textContent=`■ ${String(Math.floor(t/60)).padStart(2,`0`)}:${String(t%60).padStart(2,`0`)}`,e.classList.add(`rec-on`)}};function Rp(e){return`
    <h2 id="mineral-science-title">MINERAL SCIENCE · JEZERO</h2>
    <p><strong>Reading panel · no map overlay</strong></p>
    <p>Opened from the ${e===`site`?`6 × 6 km Marswalk zone`:`Jezero crater view`}. These research summaries describe Jezero broadly; they do not identify confirmed sampling locations within the displayed terrain.</p>
    <h3>CARBONATES · ORBITAL EVIDENCE</h3>
    <p>CRISM observations identify carbonate-bearing material near Jezero’s inner margin and western delta. Horgan and colleagues proposed that some of it could have formed in the ancient lake; that origin is an interpretation, not a confirmed fact.</p>
    <p>Instrument: MRO CRISM. <a href="https://www.usgs.gov/publications/mineral-diversity-jezero-crater-evidence-possible-lacustrine-carbonates-mars" target="_blank" rel="noopener noreferrer">Horgan et al. (2020), Icarus · USGS publication record</a> · <a href="https://doi.org/10.1016/j.icarus.2019.113526" target="_blank" rel="noopener noreferrer">DOI</a></p>
    <h3>OLIVINE · ROVER EVIDENCE</h3>
    <p>Perseverance studied olivine-rich crater-floor rocks. PIXL measurements, together with rock texture and chemistry, support formation in slowly cooling magma. This is rover evidence, not a CRISM catalogue point.</p>
    <h3>WATER ALTERATION · ROVER EVIDENCE</h3>
    <p>SuperCam observations found evidence that water altered crater-floor minerals. The alteration was not uniform across all the rocks studied.</p>
    <p>Source for both rover summaries: <a href="https://www.nasa.gov/missions/mars-2020-perseverance/perseverance-rover/nasas-perseverance-makes-new-discoveries-in-mars-jezero-crater/" target="_blank" rel="noopener noreferrer">NASA/JPL-Caltech, 25 August 2022 · Perseverance discoveries in Jezero</a>.</p>
    <h3>COORDINATES & COVERAGE</h3>
    <p><strong>Catalogue coordinates are unverified for terrain registration.</strong> Planetocentric versus planetographic latitude has not been established for the two Mars Trek compilations. No transformation has been assumed and no mineral markers are placed in either scene.</p>
    <p>Catalogue records and counts are not published in this panel while their reuse terms remain unresolved. No georeferenced detections are loaded for the Marswalk zone. This is not evidence that minerals are absent there.</p>
    <h3>SCIENTIFIC CONTEXT</h3>
    <p><a href="https://doi.org/10.1029/2012JE004145" target="_blank" rel="noopener noreferrer">Carter et al. (2013) · Hydrous minerals from CRISM and OMEGA</a> and <a href="https://doi.org/10.1146/annurev-earth-060313-055024" target="_blank" rel="noopener noreferrer">Ehlmann & Edwards (2014) · Mineralogy of the Martian surface</a> provide global context, not certified local sampling targets.</p>
    <p>These are original factual summaries with citations. No catalogue dataset, publication imagery or third-party code is included. Research evidence does not establish mineral abundance, accessible resources or biosignatures at a chosen map point.</p>`}function zp(e,t){let n=document.getElementById(`modal`),r=document.getElementById(`modal-body`),i=document.getElementById(`modal-x`),a=new Map([`role`,`aria-modal`,`aria-labelledby`].map(e=>[e,n.getAttribute(e)]));r.innerHTML=Rp(e),n.setAttribute(`role`,`dialog`),n.setAttribute(`aria-modal`,`true`),n.setAttribute(`aria-labelledby`,`mineral-science-title`),n.hidden=!1;let o=()=>{c.disconnect(),window.removeEventListener(`keydown`,s,!0);for(let[e,t]of a)t===null?n.removeAttribute(e):n.setAttribute(e,t);t?.isConnected&&t.focus()},s=e=>{if(e.stopImmediatePropagation(),e.key===`Escape`)e.preventDefault(),n.hidden=!0;else if(e.key===`Tab`){let t=[...n.querySelectorAll(`button, a[href]`)],r=t[0],i=t.at(-1);e.shiftKey&&document.activeElement===r?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),r.focus())}},c=new MutationObserver(()=>{n.hidden&&o()});c.observe(n,{attributes:!0,attributeFilter:[`hidden`]}),window.addEventListener(`keydown`,s,!0),i.focus()}var $=e=>document.getElementById(e),Bp={lock:`<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="7" width="10" height="7"/><path d="M5 7V5a3 3 0 0 1 6 0v2"/></svg>`,target:`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="5"/><path d="M8 0v4M8 12v4M0 8h4M12 8h4"/></svg>`,book:`<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h5a2 2 0 0 1 2 2v9a2 2 0 0 0-2-2H2zM14 3H9"/><path d="M14 3v9H9"/></svg>`,pin:`<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 15s5-5 5-9A5 5 0 0 0 3 6c0 4 5 9 5 9z"/><circle cx="8" cy="6" r="1.6"/></svg>`,ok:`✔`,warn:`▲`,stop:`✖`},Vp={landing:`◆`,science:`●`,geology:`◇`,lz:`▣`},Hp=class{constructor(e){this.app=e,this.left=$(`panel-left`),this.right=$(`panel-right`),this.el=$(`hud`),$(`btn-sources`).onclick=()=>this.showSources(),$(`btn-cine`).onclick=()=>{this.closeSheet(),e.director.toggle()},$(`btn-sound`).onclick=()=>this.soundButton(e.sound.toggle()),this.recorder=new Lp(this),$(`btn-rec`).onclick=()=>this.recorder.toggle(),this.recorder.supported||($(`btn-rec`).hidden=!0),this.soundButton(e.sound.on),$(`btn-info`).onclick=()=>this.toggleSheet(`left`),$(`btn-layers`).onclick=()=>this.toggleSheet(`right`);let t={};try{t=JSON.parse(localStorage.getItem(`sol-atlas-panels`)||`{}`)}catch{}for(let e of[`left`,`right`])this.setPanelHidden(e,!!t[e]),$(`tog-${e}`).onclick=()=>{this.setPanelHidden(e,!document.body.classList.contains(`hide-${e}`));try{localStorage.setItem(`sol-atlas-panels`,JSON.stringify({left:document.body.classList.contains(`hide-left`),right:document.body.classList.contains(`hide-right`)}))}catch{}};$(`modal-x`).onclick=()=>$(`modal`).hidden=!0,document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-photo-poi]`);t&&(e.stopPropagation(),this.openPhoto(t.dataset.photoPoi))},!0),$(`modal`).onclick=e=>{e.target.id===`modal`&&($(`modal`).hidden=!0)},this.tickTelemetry(),setInterval(()=>this.tickTelemetry(),1e3)}tickTelemetry(){let e=Date.now(),t=s(e),n=c(t,r.lon);$(`t-sol`).textContent=nf(l(e)),$(`t-lmst`).textContent=f(n.lmst),$(`t-ls`).textContent=`Ls ${t.Ls.toFixed(0)}°`,$(`t-ls`).title=p(t.Ls);let i=g(e).seconds;$(`t-comms`).textContent=`${Math.floor(i/60)}m ${String(Math.round(i%60)).padStart(2,`0`)}s`,this.mt=t}setCrumbs(e){let t=$(`crumbs`),n=[[`orbit`,`Mars`],[`crater`,`Jezero Crater`],[`site`,`Marswalk Zone`]],r=n.findIndex(t=>t[0]===e);t.innerHTML=``,n.slice(0,r+1).forEach(([e,n],i)=>{if(i){let e=document.createElement(`span`);e.className=`sep`,e.textContent=`›`,t.appendChild(e)}let a=document.createElement(`button`);a.textContent=n,a.className=i===r?`on`:``,a.onclick=()=>this.app.goTo(e),t.appendChild(a)})}readout(e){let t=$(`readout`),n=e.map(([e,t])=>`<span><b>${e}</b>${t}</span>`).join(``);n!==this._ro&&(t.innerHTML=n,this._ro=n)}simButton(e){let t=$(`b-sim`);t&&(t.textContent=e?`■ STOP EVA`:`▶ SIMULATE EVA`,t.classList.toggle(`primary`,e))}soundButton(e){let t=$(`btn-sound`);t.innerHTML=`♪<span class="t"> ${e?`SOUND`:`MUTED`}</span>`,t.classList.toggle(`muted`,!e),t.setAttribute(`aria-pressed`,e?`true`:`false`)}hints(e){let t=$(`hints`);t.innerHTML=e,t.title=t.textContent.replace(/\s+/g,` `).trim()}prompt(e){let t=$(`prompt`);e?(t.innerHTML!==e&&(t.innerHTML=e),t.classList.add(`show`)):t.classList.remove(`show`)}toast(e,t=2600){let n=$(`toast`);n.textContent=e,n.classList.add(`show`),clearTimeout(this._tt),this._tt=setTimeout(()=>n.classList.remove(`show`),t)}caption(e,t,n=4200){let r=$(`caption`),i=e=>{r.classList.toggle(`show`,e),document.body.style.setProperty(`--cap-top`,e?`${Math.ceil(innerHeight-r.getBoundingClientRect().top)}px`:`0px`)};if(clearTimeout(this._ct),!t){i(!1);return}r.innerHTML=`<small>${e}</small>${t}`,i(!0),n&&(this._ct=setTimeout(()=>i(!1),n))}reticle(e){$(`reticle`).classList.toggle(`show`,!!e)}banner(e,t=`go`,n=2600){let r=$(`banner`);r.className=`banner ${t}`,r.innerHTML=`<span>${t===`go`?`✔`:`✖`}</span>${e}`,r.animate([{opacity:0,transform:`translate(-50%,-50%) scale(1.15)`},{opacity:1,transform:`translate(-50%,-50%) scale(1)`,offset:.12},{opacity:1,transform:`translate(-50%,-50%) scale(1)`,offset:.8},{opacity:0,transform:`translate(-50%,-50%) scale(0.98)`}],{duration:n,easing:`ease-out`})}flash(e=.85,t=900,n=``){let r=$(`flash`);r.classList.toggle(`red`,n===`red`),r.animate([{opacity:0},{opacity:e,offset:.35},{opacity:0}],{duration:t,easing:`ease-out`})}clearPanels(){this.left.innerHTML=``,this.right.innerHTML=``,this.closeSheet()}toggleSheet(e){let t=document.body,n=t.classList.contains(`sheet-${e}`);this.closeSheet(),n||(t.classList.add(`sheet-open`,`sheet-${e}`),$(e===`left`?`btn-info`:`btn-layers`).classList.add(`on`))}closeSheet(){document.body.classList.remove(`sheet-open`,`sheet-left`,`sheet-right`),$(`btn-info`).classList.remove(`on`),$(`btn-layers`).classList.remove(`on`)}sheetLabel(e){$(`btn-info`).textContent=e,$(`tog-left`).querySelector(`span`).textContent=e}infoTab(e){$(`btn-info`).hidden=!e,document.body.classList.toggle(`no-info-tab`,!e),!e&&document.body.classList.contains(`sheet-left`)&&this.closeSheet()}setPanelHidden(e,t){document.body.classList.toggle(`hide-${e}`,t);let n=$(`tog-${e}`);n.setAttribute(`aria-expanded`,t?`false`:`true`),n.title=t?`Show this panel`:`Hide this panel`,n.querySelector(`i`).textContent=e===`left`===t?`›`:`‹`}renderOrbit(e){this.setCrumbs(`orbit`),this.sheetLabel(`JEZERO`),this.infoTab(!0),uf[0];let t=uf.map(e=>`
      <button class="row ${e.status===`active`?`active`:e.status===`fiction`?``:`locked`}" data-site="${e.id}">
        <span class="ic">${e.status===`active`?Bp.target:e.status===`fiction`?Bp.book:Bp.lock}</span>
        <span><div class="nm">${e.name}</div><div class="ds">${e.mission}</div></span>
        <span class="rt">${e.status===`active`?`OPEN`:e.status===`fiction`?`FICTION`:`PHASE 2`}</span>
      </button>`).join(``);this.left.innerHTML=`
      <div class="sec">
        <div class="sec-h">Survey target <span class="tag">PHASE 1</span></div>
        <div class="title-xl">JEZERO CRATER</div>
        <div class="sub">Ancient lake + river delta. Perseverance landed here and left 10 sample tubes at Three Forks. Our first Marswalk site.</div>
        <div class="kv">
          <span class="k">Centre</span><span class="v">18.40°N 77.60°E</span>
          <span class="k">Diameter</span><span class="v">≈ 45 km</span>
          <span class="k">Region</span><span class="v">Isidis Planitia rim</span>
          <span class="k">Datasets</span><span class="v">8 layers · 6 missions</span>
          <span class="k">Human EZ</span><span class="v"><a href="#" id="lnk-ez">Jezero-Isidis-Syrtis</a></span>
        </div>
        <div class="btn-row"><button class="btn primary" id="btn-descend">▼ Descend to Jezero</button></div>
      </div>
      <div class="sec">
        <div class="sec-h">Landing sites <span class="tag">${uf.length}</span></div>
        <div class="rows">${t}</div>
      </div>`,$(`btn-descend`).onclick=()=>{this.closeSheet(),this.app.descendToJezero()},$(`lnk-ez`).onclick=t=>{t.preventDefault(),this.closeSheet(),e.zones||this.app.toggleZones()},this.left.querySelectorAll(`[data-site]`).forEach(e=>{e.onclick=()=>{let t=uf.find(t=>t.id===e.dataset.site);this.closeSheet(),t.status===`active`?this.app.descendToJezero():this.app.orbitLookAt(t)}});let n=Mf.map(t=>`
      <div class="layer ${e.layer===t.id?`on`:``}" data-layer="${t.id}">
        <span class="box"></span><span><div class="nm">${t.name}</div><div class="src">${t.src}</div></span><span class="key">${t.key}</span>
      </div>`).join(``);this.right.innerHTML=`
      <div class="sec">
        <div class="sec-h">Orbital data layers</div>
        ${n}
        <div id="orbit-legend"></div>
      </div>
      <div class="sec">
        <div class="sec-h">Display</div>
        <div class="layer ${e.grid>0?`on`:``}" id="tg-grid"><span class="box"></span><span class="nm">Lat / lon grid</span><span class="key">G</span></div>
        <div class="layer ${e.zones?`on`:``}" id="tg-ez"><span class="box"></span><span><div class="nm">Human Exploration Zones</div><div class="src">NASA landing-site workshop, 2015 · 100 km radius</div></span><span class="key">Z</span></div>
        <div class="layer ${e.autoSpin?`on`:``}" id="tg-spin"><span class="box"></span><span class="nm">Planet rotation</span><span class="key">SPACE</span></div>
      </div>
      <div class="sec">
        <div class="sec-h">Mission clock</div>
        <div class="kv" id="orbit-clock"></div>
      </div>`,this.right.querySelectorAll(`[data-layer]`).forEach(e=>{e.onclick=()=>this.app.setOrbitLayer(e.dataset.layer)}),$(`tg-grid`).onclick=()=>{e.grid=e.grid>0?0:.35,this.renderOrbit(e)},$(`tg-spin`).onclick=()=>{e.autoSpin=!e.autoSpin,this.renderOrbit(e)},$(`tg-ez`).onclick=()=>this.app.toggleZones(),this.orbitLegend(e.layer),this.orbitClock(),this.hints(`<kbd>DRAG</kbd> rotate <kbd>SCROLL</kbd> zoom <kbd>1-4</kbd> layers <kbd>Z</kbd> zones <kbd>ENTER</kbd> descend <kbd>C</kbd> autopilot`)}orbitClock(){let e=$(`orbit-clock`);if(!e)return;let t=this.mt,n=c(t,r.lon),i=d(r.lat,t.decl),a=g(),o=Md(this.app.spaceWeather);e.innerHTML=`
      <span class="k">Perseverance sol</span><span class="v">${nf(l())}</span>
      <span class="k">Local true solar time</span><span class="v">${f(n.ltst)}</span>
      <span class="k">Sunrise / sunset</span><span class="v">${f(i.rise)} / ${f(i.set)}</span>
      <span class="k">Solar longitude</span><span class="v">${t.Ls.toFixed(1)}° · ${p(t.Ls)}</span>
      <span class="k">Earth–Mars range</span><span class="v">${nf(a.km/1e6,1)} M km</span>
      <span class="k">One-way signal</span><span class="v">${(a.seconds/60).toFixed(1)} min</span>
      <span class="k">Space weather at Mars</span><span class="v sw-${o.lvl}" title="${o.long}">${o.short}</span>`}spaceWeatherChanged(){this.app.mode===`orbit`?this.orbitClock():this.app.mode===`site`&&this.renderPlanner(this.app.planner)}spaceWeatherBlock(){let e=Md(this.app.spaceWeather),t=e.lvl===`ok`?Bp.ok:e.lvl===`warn`?Bp.warn:`·`,n=this.app.spaceWeather?.ok?`${this.app.spaceWeather.source}, WSA-ENLIL model (NASA GSFC CCMC), live`:`NASA DONKI, WSA-ENLIL model (NASA GSFC CCMC)`;return`<div class="sw sw-${e.lvl}"><div class="sw-h"><span>${t}</span>SPACE WEATHER AT MARS</div><div>${e.long}${e.lvl===`warn`?` Keep the EVA inside the storm-shelter time, or move it.`:``}</div>
      <div class="sw-src">${n}${e.link?` · <a href="${e.link}" target="_blank" rel="noopener">forecast</a>`:``} · advisory, not part of the verdict</div></div>`}orbitLegend(e){let t=$(`orbit-legend`);if(t){if(e===`topo`)t.innerHTML=Up(`Elevation (MOLA; HRSC near Jezero, m)`,`linear-gradient(90deg,#0d366b,#184f95,#2a78d6,#5598e7,#9ec5f4,#eef6ff)`,[`−8,200`,`0`,`+21,200`]);else if(e===`thermal`)t.innerHTML=Up(`Night-time IR brightness (relative)`,`linear-gradient(90deg,#3a1a06,#7a3510,#c05a1c,#ec8a45,#f9c79a,#fff0e0)`,[`cools fast · dust`,`stays warm · rock`]);else if(e===`geology`){let e=Object.values(this.app.assets?.manifest?.geology?.units||{}),n=Tf.map(t=>{let n=e.find(e=>e.sym===t),r=wf(t);return n?`<div title="${r.text}"><i style="background:${n.rgb}"></i><b>${t}</b> ${r.name.replace(/ unit$/,``)} · ${r.age}</div>`:``}).join(``);t.innerHTML=`<div class="legend"><div class="cap">Around Jezero. Jezero sits in <b>HNt</b>, on the rim of the Isidis impact basin: ground more than 3.2 billion years old. ${this.app.touch?`Tap`:`Point at`} any spot to read its unit.</div><div class="geo-units">${n}</div><div class="cap muted" style="margin-top:6px">USGS SIM 3292, Tanaka et al. 2014 (USGS-NASA Planetary Geologic Mapping Program), 1:20 million</div></div>`}else t.innerHTML=`<div class="legend"><div class="cap muted">Viking Orbiter mosaic, colour by NASA Ames. Seasonal frost shows at the poles.</div></div>`}}renderTerrain(e,t){let n=e.id===`site`;this.setCrumbs(e.id),this.sheetLabel(n?`PLANNER`:`CRATER`),this.infoTab(n||kp.craterPanel);let r=Yf.filter(e=>e.id!==`minerals`).map(t=>`
      <div class="layer ${t.locked?`locked`:``} ${e.layers[t.id]?`on`:``}" data-layer="${t.id}" title="${t.locked?`Planned for phase 2`:``}">
        <span class="box">${t.locked,``}</span>
        <span><div class="nm">${t.name}</div><div class="src">${n?t.srcSite:t.srcCrater}</div></span>
        <span class="key">${t.locked?Bp.lock:t.key}</span>
      </div>`).join(``);this.right.innerHTML=`
      <div class="sec">
        <div class="sec-h">Data layers <span class="tag">${n?`HiRISE ZONE`:`CTX CRATER`}</span></div>
        ${r}
        <button class="row" id="btn-mineral-science" aria-haspopup="dialog" aria-controls="modal"><span class="ic">${Bp.book}</span><span><div class="nm">Mineral Science</div><div class="ds">Jezero research · no map overlay</div></span></button>
        <div id="t-legend"></div>
      </div>
      <div class="sec">
        <div class="sec-h">Sun & terrain</div>
        <div class="ctl"><label>Local solar time</label><output id="o-time"></output>
          <input type="range" id="r-time" min="5.5" max="18.5" step="0.05" value="${e.ltst}"></div>
        <div class="kv" id="sun-kv" style="margin-top:4px"></div>
        <div class="ctl"><label>Vertical exaggeration</label><output id="o-exag"></output>
          <input type="range" id="r-exag" min="1" max="6" step="0.1" value="${e.exagTarget}"></div>
        <div class="seg"><button id="b-shadow" class="${e.shadows?`on`:``}">SHADOWS</button><button id="b-now">NOW</button><button id="b-reset">RESET VIEW</button></div>
      </div>${n?`
      <div class="sec">
        <div class="sec-h">Conditions · Jezero <span class="tag">TYPICAL · NOT LIVE</span></div>
        <div class="kv" style="margin-top:0">
          <span class="k">Air temperature</span><span class="v">−80 … −15 °C</span>
          <span class="k">Pressure</span><span class="v">≈ 7 hPa</span>
          <span class="k">Wind</span><span class="v">2–8 m/s, gusty pm</span>
          <span class="k">Dust opacity</span><span class="v">τ ≈ 0.5</span>
          <span class="k">Radiation</span><span class="v">≈ 0.67 mSv/sol</span>
        </div>
        <div class="assump">Typical ranges for this season from published Perseverance MEDA results. Radiation dose from Curiosity RAD at Gale (Hassler et al. 2014). The live MEDA feed is planned for phase 2.</div>
      </div>`:``}`,this.right.querySelectorAll(`[data-layer]`).forEach(e=>{e.onclick=()=>{let t=Yf.find(t=>t.id===e.dataset.layer);if(t.locked){this.toast(`${t.name.toUpperCase()} · ${n?t.srcSite:t.srcCrater}`);return}this.app.toggleTerrainLayer(e.dataset.layer)}}),$(`btn-mineral-science`).onclick=t=>zp(e.id,t.currentTarget);let i=$(`r-time`),a=$(`r-exag`);i.oninput=()=>{e.setTime(+i.value),this.sunInfo(e)},i.onchange=()=>{n&&this.app.planner.refreshSun()},a.oninput=()=>{e.exagTarget=+a.value,$(`o-exag`).textContent=`${(+a.value).toFixed(1)}×`},$(`o-exag`).textContent=`${e.exagTarget.toFixed(1)}×`,$(`b-shadow`).onclick=()=>{e.shadows=!e.shadows,$(`b-shadow`).classList.toggle(`on`,e.shadows)},$(`b-now`).onclick=()=>{let t=c(s(),e.cfg.lon0).ltst;e.setTime(t),i.value=t,this.sunInfo(e),n&&this.app.planner.refreshSun(),e.sun&&e.sun.elevation<0&&this.toast(`IT IS NIGHT AT JEZERO RIGHT NOW`)},$(`b-reset`).onclick=()=>{this.closeSheet(),e.flyTo(e.overview(),1.6)},this.sunInfo(e),this.terrainLegend(e),!n&&kp.craterPanel?this.renderCraterLeft(e):n?t?.():this.left.innerHTML=``,this.hints(n?`<kbd>CLICK</kbd> pin &amp; route${this.app.fpv?` <kbd>F</kbd> helmet`:``} <kbd>DRAG</kbd> orbit <kbd>SCROLL</kbd> zoom <kbd>1-7</kbd> layers <kbd>RMB</kbd> pan <kbd>ESC</kbd> up`:`<kbd>ENTER</kbd> Marswalk zone <kbd>DRAG</kbd> orbit <kbd>SCROLL</kbd> zoom <kbd>1-7</kbd> layers <kbd>RMB</kbd> pan <kbd>ESC</kbd> up`)}sunInfo(e){let t=e.sunDir(),n=d(e.lat0,e.decl);$(`o-time`).textContent=`${f(e.ltst)} LTST`,$(`sun-kv`).innerHTML=`
      <span class="k">Sun elevation</span><span class="v">${t.elevation.toFixed(1)}°</span>
      <span class="k">Sun azimuth</span><span class="v">${t.azimuth.toFixed(0)}°</span>
      <span class="k">Daylight</span><span class="v">${f(n.rise)} – ${f(n.set)}</span>`}terrainLegend(e){let t=$(`t-legend`);if(!t)return;let n=[],r=e.cfg.slopeLim;e.layers.elev&&n.push(Up(`Elevation (m, MOLA datum)`,`linear-gradient(90deg,#0d366b,#184f95,#2a78d6,#5598e7,#9ec5f4,#eef6ff)`,[nf(e.meta.min),nf((e.meta.min+e.meta.max)/2),nf(e.meta.max)])),e.layers.slope&&n.push(`<div class="legend"><div class="cap">Slope · walking hazard</div><div class="hz">
      <div><i style="background:var(--good)"></i>${Bp.ok} &lt;${r[0]}° safe</div>
      <div><i style="background:var(--warning)"></i>${Bp.warn} ${r[0]}–${r[1]}° caution</div>
      <div><i style="background:var(--serious)"></i>${Bp.warn} ${r[1]}–${r[2]}° hazard</div>
      <div><i style="background:var(--critical)"></i>${Bp.stop} &gt;${r[2]}° no-go</div></div></div>`),e.layers.thermal&&n.push(Up(`Ground firmness · THEMIS night IR (thermal-inertia proxy)`,`linear-gradient(90deg,#3a1a06,#7a3510,#c05a1c,#ec8a45,#f9c79a,#fff0e0)`,[`loose dust / sand`,`firm rock`])),e.layers.traverse&&n.push(`<div class="legend"><div class="cap"><i class="trav-key"></i>Perseverance's real drive path: ${nf(this.app.assets?.traverse?.points?.length??0)} end-of-drive fixes, sol 0 to ${this.app.assets?.traverse?.lastSol??`?`} (${this.app.assets?.traverse?.totalKm??`?`} km). NASA/JPL-Caltech MMGIS.</div></div>`),e.layers.contour&&n.push(`<div class="legend"><div class="cap">Contours every ${e.cfg.contour[0]} m · bold every ${e.cfg.contour[1]} m</div></div>`),t.innerHTML=n.join(``),this.right.querySelectorAll(`[data-layer]`).forEach(t=>t.classList.toggle(`on`,!!e.layers[t.dataset.layer]))}renderCraterLeft(e){let t=e.poiItems.map(e=>`
      <button class="row" data-poi="${e.poi.id}"><span class="ic" style="color:var(--data)">${Vp[e.poi.kind]||`●`}</span>
      <span><div class="nm">${e.poi.name}</div><div class="ds">${e.poi.approx?`approx. position`:ef(e.poi.lat)+` `+tf(e.poi.lon)}</div></span></button>`).join(``),n=e.meta;this.left.innerHTML=`
      <div class="sec">
        <div class="sec-h">Crater survey <span class="tag">MRO CTX</span></div>
        <div class="title-xl">JEZERO</div>
        <div class="sub">A lake filled this crater about 3.5 billion years ago. The delta on its western edge is where life is most likely to have been preserved.</div>
        <div class="kv">
          <span class="k">Tile</span><span class="v">${nf(e.sizeX,1)} × ${nf(e.sizeZ,1)} km</span>
          <span class="k">Lowest point</span><span class="v">${nf(n.min)} m</span>
          <span class="k">Highest point</span><span class="v">${nf(n.max)} m</span>
          <span class="k">Relief</span><span class="v">${nf(n.max-n.min)} m</span>
          <span class="k">Imagery / DEM</span><span class="v">5 m / 20 m</span>
        </div>
      </div>
      <div class="sec">
        <div class="sec-h">Marswalk zone <span class="tag">HiRISE 25 cm</span></div>
        <div class="sub" style="margin-top:0">6 × 6 km around Perseverance's landing site, Séítah, the delta front and the Three Forks sample depot, with 1 m elevation data. Plan an EVA on foot here.</div>
        <div class="btn-row"><button class="btn primary" id="btn-zone">▼ Enter Marswalk zone</button></div>
      </div>
      <div class="sec">
        <div class="sec-h">Points of interest</div>
        <div class="rows">${t}</div>
      </div>`,$(`btn-zone`).onclick=()=>{this.closeSheet(),this.app.enterSite()},this.left.querySelectorAll(`[data-poi]`).forEach(t=>{t.onclick=()=>{this.closeSheet(),this.app.onPOIClick(e,e.poiItems.find(e=>e.poi.id===t.dataset.poi).poi)}})}renderPlanner(e){if(this.app.mode!==`site`)return;let t=e.result,n=e.waypoints.map((e,t)=>`
      <div class="wp"><div class="n"><span>${t+1}</span></div>
        <div style="min-width:0"><div class="nm">${e.name}${e.poi?.photo?` <button class="ph-btn" data-photo="${t}" title="Perseverance's photo from this spot">PHOTO</button>`:``}</div><div class="ds" title="${e.poi?.reason||``}">${e.poi?.reason||e.note||(t===0?`EVA start / airlock`:`custom science stop`)}</div></div>
        ${t>0?`<button class="x" data-rm="${t}" title="Remove stop">✕</button>`:`<span></span>`}
      </div>`).join(``),r=``;if(!t)r=`<div class="sub">Click anywhere on the map to drop a pin and route there, or pick a point of interest.</div>`;else if(t.failed)r=`<div class="verdict nogo"><span class="ic">${Bp.stop}</span><div>NO SAFE ROUTE<small>Every path crosses slopes over ${e.params.maxSlope}°. Move the stop or raise the slope limit.</small></div></div>`;else{let n=t.budget,i=t.verdict,a=Math.max(0,Math.min(100,n.o2/e.params.o2CapKg*100)),o=100-e.params.reservePct,s=n.remaining<n.reserveKg?`var(--critical)`:n.marginPct<e.params.reservePct+15?`var(--warning)`:`var(--data)`,c=i.lvl===`go`?Bp.ok:i.lvl===`caution`?Bp.warn:Bp.stop,l=i.lvl===`go`?`MARSWALK READY`:i.lvl===`caution`?`GO WITH CAUTION`:`NO-GO`,u=i.issues.length?i.issues.map(e=>e.msg).join(` · `):`All limits met, ${n.marginPct.toFixed(0)} % O₂ left at ingress`;r=`
        <div class="stats">
          <div class="stat"><div class="k">DISTANCE</div><div class="v">${(n.distance/1e3).toFixed(2)}<small>km</small></div></div>
          <div class="stat"><div class="k">EVA TIME</div><div class="v">${af(n.totalT)}</div></div>
          <div class="stat"><div class="k">MAX GRADE</div><div class="v">${n.maxSlope.toFixed(0)}<small>°</small></div></div>
          <div class="stat"><div class="k">CLIMB</div><div class="v">+${nf(n.gain)}<small>m</small></div></div>
        </div>
        <div class="meter">
          <div class="lbl"><span>O₂ USED</span><b>${n.o2.toFixed(2)} / ${e.params.o2CapKg.toFixed(2)} kg</b></div>
          <div class="track"><div class="fill" id="o2-fill" style="width:${a}%;background:${s}"></div><div class="mark" style="left:${o}%" title="Reserve line"></div></div>
          <div class="lbl" style="margin-top:4px"><span class="muted">avg ${nf(n.avgW)} W metabolic</span><span class="muted">reserve ${e.params.reservePct}%</span></div>
        </div>
        <div class="meter">
          <div class="lbl"><span>DAYLIGHT</span><b>${f(t.sun.start)} → ${f(t.sun.end)} · sunset ${f(t.sun.sunset)}</b></div>
          <div class="track"><div class="fill" style="left:${t.sun.start/24*100}%;width:${Math.max(1,(t.sun.end-t.sun.start)/24*100)}%;background:var(--data)"></div>
          <div class="mark" style="left:${t.sun.sunset/24*100}%"></div></div>
        </div>
        <div class="kv">
          <span class="k">Radiation this EVA</span><span class="v">≈ ${op(n.totalT).toFixed(2)} mSv</span>
          <span class="k">Storm shelter, ${e.params.rover?`drive`:`walk`} back</span><span class="v">≤ ${af(t.shelter.t)}</span>
        </div>
        ${this.spaceWeatherBlock()}
        <div class="assump">Dose at the rate Curiosity's RAD measured on the surface (${ap} mSv/day); NASA's career limit is 600 mSv. Shelter time is the longest ${e.params.rover?`drive`:`walk`} back to the airlock if a solar-storm warning comes in, worst at ${(t.shelter.d/1e3).toFixed(2)} km along the route.</div>
        <div class="verdict ${i.lvl}"><span class="ic">${c}</span><div>${l}<small>${u}</small></div></div>
        ${t.o2Out?`<div class="assump dead-note"><b>✖ O₂ runs out at ${(t.o2Out.d/1e3).toFixed(2)} km</b> (${f(t.sun.start+t.o2Out.t/3698.9)} LTST, ${af(t.o2Out.t)} into the EVA) while ${t.o2Out.kind===`stop`?`working at a stop`:e.params.rover?`driving`:`walking`}. The red dashes are the part of the route EV1 never reaches. Press SIMULATE to see it.</div>`:``}
        <div class="assump">${e.params.rover?t.pnr?`<b style="color:#ff7b7b">Walkback limit</b> at ${(t.pnr.d/1e3).toFixed(2)} km (red marker). If the rover breaks down past it, walking home needs ${t.pnr.need.toFixed(2)} kg of O₂ but only ${t.pnr.limit.toFixed(2)} kg is available above the reserve. Apollo 15–17 drove under the same rule.`:`<b>Walkback rule met</b> (as on Apollo 15–17): if the rover breaks down anywhere on this drive, the crew can walk home and keep the O₂ reserve. Closest call: ${t.abortWorst?`${t.abortWorst.need.toFixed(2)} of ${t.abortWorst.limit.toFixed(2)} kg at ${(t.abortWorst.d/1e3).toFixed(2)} km`:`—`}.`:t.pnr?`<b style="color:#ff7b7b">Point of no return</b> at ${(t.pnr.d/1e3).toFixed(2)} km (red marker). Past it, walking straight back needs ${t.pnr.need.toFixed(2)} kg of O₂ but only ${t.pnr.limit.toFixed(2)} kg is available above the reserve.`:`No point of no return: from any point on the way out, EV1 can walk straight back to the airlock and keep the O₂ reserve.`}</div>
        <div class="sec-h" style="margin:14px 0 2px">Elevation profile <span class="tag">HiRISE 1 m DTM</span></div>
        <div class="profile" id="profile"></div>
        <div class="assump" style="margin-top:6px">Straight-line path: ${(t.direct.distance/1e3).toFixed(2)} km, crossing slopes up to <b>${t.direct.maxFine.toFixed(0)}°</b> (red dashes). The planned route stays under <b>${t.budget.fineMax.toFixed(0)}°</b>.</div>`}this.left.innerHTML=`
      <div class="sec">
        <div class="sec-h">Marswalk planner <span class="tag">EV1 · ${e.params.rover?`ROVER`:`ON FOOT`}</span></div>
        <div class="ctl goal"><label for="p-goal">Mission goal</label><select id="p-goal">${hf.map(t=>`<option value="${t.id}" ${t.id===e.goal?`selected`:``}>${t.name}</option>`).join(``)}</select></div>
        <div class="assump">${(hf.find(t=>t.id===e.goal)||hf[0]).why}</div>
        <div id="wps">${n}</div>
        <div class="btn-row">
          <button class="btn small ${e.addMode?`primary`:``}" id="b-add">${e.addMode?`CLICK MAP…`:`+ ADD STOP`}</button>
          <button class="btn small ${e.sim?`primary`:``}" id="b-sim" ${t&&!t.failed?``:`disabled`}>${e.sim?`■ STOP EVA`:`▶ SIMULATE EVA`}</button>
          <button class="btn small" id="b-plan">RESET</button>
        </div>
        <div class="seg" style="margin-top:8px"><button id="b-foot" class="${e.params.rover?``:`on`}" title="Walk every leg">ON FOOT</button><button id="b-rover" class="${e.params.rover?`on`:``}" title="Drive between stops on an unpressurised rover, within walking distance of home">ROVER + WALKBACK</button></div>
        <div class="seg"><button id="b-ret" class="${e.returnToStart?`on`:``}">RETURN TO LZ</button><button id="b-follow" class="${e.follow?`on`:``}">FOLLOW CAM</button></div>
        ${this.app.fpv?`<button class="btn fpv-btn ${this.app.fpv.active?`on`:``}" id="b-fpv" title="Stand on the terrain at eye height (F)">${this.app.fpv.active?`✕ EXIT HELMET VIEW`:`◉ HELMET VIEW · WALK IT`}</button>`:``}
      </div>
      <div class="sec">
        <div class="sec-h">Watney check · EVA budget</div>
        ${r}
        <div id="sim-status"></div>
      </div>
      <div class="sec">
        <div class="sec-h">Assumptions <span class="tag">EDITABLE</span></div>
        <div class="ctl"><label>Usable suit O₂</label><output>${e.params.o2CapKg.toFixed(2)} kg</output><input type="range" id="p-o2" min="0.2" max="1.2" step="0.05" value="${e.params.o2CapKg}"></div>
        <div class="ctl"><label>Max walking slope</label><output>${e.params.maxSlope}°</output><input type="range" id="p-slope" min="8" max="30" step="1" value="${e.params.maxSlope}"></div>
        <div class="ctl"><label>Science kit carried</label><output>${e.params.kitKg} kg</output><input type="range" id="p-kit" min="0" max="30" step="1" value="${e.params.kitKg}"></div>
        <div class="ctl"><label>Time per stop</label><output>${e.params.stopMin} min</output><input type="range" id="p-stop" min="5" max="60" step="5" value="${e.params.stopMin}"></div>
        <div class="assump">Metabolic model: <b>Pandolf et al. 1977</b> scaled to 0.38 g, with a ${e.params.suitPenalty}× suit penalty. ${e.params.crewKg} kg crew + ${e.params.suitKg} kg suit${e.params.kitKg?` + ${e.params.kitKg} kg science kit`:``}. 1 L O₂ ≈ 20.1 kJ.${e.params.rover?` Rover: ${(e.params.roverMs*3.6).toFixed(0)} km/h, ${e.params.rideW} W seated; walkback at walking pace with a 25 % detour allowance.`:``} Route = A* least-energy path on the HiRISE DTM${t&&t.budget?`, solved in ${e.computeMs.toFixed(0)} ms`:``}.</div>
      </div>`,this.left.querySelectorAll(`[data-rm]`).forEach(t=>{t.onclick=()=>e.remove(+t.dataset.rm)}),this.left.querySelectorAll(`[data-photo]`).forEach(t=>{t.onclick=()=>this.openPhoto(e.waypoints[+t.dataset.photo].poi.id)}),$(`b-add`).onclick=()=>{e.addMode=!e.addMode,this.renderPlanner(e),e.addMode&&this.closeSheet()},$(`b-sim`).onclick=()=>{this.closeSheet(),e.sim?e.stopSim():e.startSim()},$(`b-plan`).onclick=()=>this.app.resetPlan(),$(`p-goal`).onchange=t=>{e.userEdit=!0,this.app.resetPlan(t.target.value)},$(`b-ret`).onclick=()=>{e.returnToStart=!e.returnToStart,e.compute()},$(`b-foot`).onclick=()=>{e.params.rover=!1,e.userEdit=!0,e.compute()},$(`b-rover`).onclick=()=>{e.params.rover=!0,e.userEdit=!0,e.compute()},$(`b-fpv`)&&($(`b-fpv`).onclick=()=>{this.closeSheet(),this.app.fpv.active?this.app.fpv.exit():this.app.fpv.enter()}),$(`b-follow`).onclick=()=>{e.follow=!e.follow,$(`b-follow`).classList.toggle(`on`,e.follow)};let i=(t,n,r=Number)=>{$(t).onchange=t=>{e.params[n]=r(t.target.value),e.compute()},$(t).oninput=e=>{e.target.previousElementSibling.textContent=t===`p-o2`?`${(+e.target.value).toFixed(2)} kg`:t===`p-slope`?`${e.target.value}°`:t===`p-kit`?`${e.target.value} kg`:`${e.target.value} min`}};i(`p-o2`,`o2CapKg`),i(`p-slope`,`maxSlope`),i(`p-stop`,`stopMin`),i(`p-kit`,`kitKg`),this.profileApi=null,t&&!t.failed&&requestAnimationFrame(()=>{e.result===t&&$(`profile`)&&(this.profileApi=Fp($(`profile`),t,{slopeAt:(t,n)=>e.view.slopeAt(t,n),limits:e.view.cfg.slopeLim,onHover:t=>e.showHover(t),pnr:t.pnr,pnrLabel:e.params.rover?`WALKBACK`:`PNR`,o2Out:t.o2Out}))})}updateSim(e,t,n){let r=$(`sim-status`),i=$(`wrist`);if(t==null){r&&(r.innerHTML=``),i.classList.remove(`show`,`warn`,`crit`,`dead`),this.profileApi?.cursor(null);return}let a=e.result,o=a.budget,s=e.sim||{},c=e.params.o2CapKg,l=Math.max(0,c-n.o2),u=a.sun.start+t/3698.9,d=s.dead?`dead`:s.inReserve?`crit`:s.pastPnr?`warn`:``;if(i.classList.toggle(`warn`,d===`warn`),i.classList.toggle(`crit`,d===`crit`),i.classList.toggle(`dead`,d===`dead`),this.profileApi?.cursor(n.d,d),s.dead){let e=s.deadAt,a=e.lt,o=e=>`${Math.floor(e/60)}m ${String(Math.round(e%60)).padStart(2,`0`)}s`;i.innerHTML=`<div class="wh">EV1 · SUIT ALARM <b>${f(u)}</b></div>
        <div class="wn">O₂ 0.00 kg · NO RESPONSE<b>${rf(e.fromLZ)}</b></div>
        <div class="wg"><span>MAYDAY → EARTH<b>+${o(a)}</b><small>one-way light time</small></span><span>EARLIEST REPLY<b>+${o(a*2)}</b><small>round trip</small></span><span>FROM AIRLOCK<b>${rf(e.fromLZ)}</b><small>straight line</small></span></div>`,i.classList.add(`show`),r&&(r.innerHTML=`<div class="verdict nogo"><span class="ic">✖</span><div>EV1 LOST AT ${(n.d/1e3).toFixed(2)} KM<small>The suit ran dry ${af(t)} into the EVA, ${rf(e.fromLZ)} from the airlock. A mayday takes ${o(a)} to reach Earth and a reply ${o(a*2)} to come back. Nobody on Earth can help in time: the plan has to be right before egress.</small></div></div>`);let c=$(`o2-fill`);c&&(c.style.width=`100%`);return}let p=a.stopAtD,m=p.findIndex(e=>e>n.d+1),h=m>=0?e.waypoints[m+1]?.name:e.returnToStart?e.waypoints[0].name:e.waypoints.at(-1).name,g=(m>=0?p[m]:o.distance)-n.d,_=l/(o.o2/(o.totalT/3600)),v=n.kind===`stop`?`WORKING`:e.params.rover?`DRIVING`:`WALKING`,y=d===`crit`?`▲ O₂ RESERVE`:d===`warn`?e.params.rover?`▲ PAST WALKBACK`:`▲ PAST PNR`:v;i.innerHTML=`<div class="wh">EV1 · WRIST <b>${f(u)}</b></div>
      <div class="wn"><span>NEXT ▸ ${h}</span><b>${rf(Math.max(0,g))}</b></div>
      <div class="wg"><span>O₂ <b>${l.toFixed(2)} kg</b><small>≈ ${_.toFixed(1)} h</small></span><span>DUST <b>τ 0.5</b><small>typical</small></span><span class="st">${y}</span></div>`,i.classList.add(`show`),r&&(r.innerHTML=`<div class="meter"><div class="lbl"><span>EV1 · ${n.kind===`stop`?`WORKING AT STOP`:`WALKING`}</span><b>${f(u)} LTST</b></div>
        <div class="track"><div class="fill" style="width:${n.d/o.distance*100}%;background:${d?`var(--critical)`:`var(--data)`}"></div></div>
        <div class="lbl" style="margin-top:4px"><span>${rf(n.d)} of ${rf(o.distance)}</span><b>O₂ ${l.toFixed(2)} kg left</b></div></div>`);let b=$(`o2-fill`);b&&(b.style.width=`${Math.min(100,n.o2/c*100)}%`)}openPhoto(e){let t=ff.filter(e=>e.photo),n=Math.max(0,t.findIndex(t=>t.id===e)),r=$(`lbx`),i=()=>{let e=t[n],r=e.photo;$(`lbx-img`).src=hd(r.file),$(`lbx-img`).alt=`Perseverance ${r.camera} view at ${e.name}`,$(`lbx-cap`).innerHTML=`<b>${e.name}</b> · Perseverance ${r.camera}, sol ${r.sol} (${r.date})${r.note?`, ${r.note}`:``}. Taken at this stop: what the crew will see when they get there. Raw image, ${r.credit}. <span class="n">${n+1} / ${t.length}</span>`};this.photoStep=e=>{n=(n+e+t.length)%t.length,i()},this.closePhoto=()=>{r.hidden=!0},$(`lbx-prev`).onclick=()=>this.photoStep(-1),$(`lbx-next`).onclick=()=>this.photoStep(1),$(`lbx-x`).onclick=this.closePhoto,r.onclick=e=>{e.target===r&&this.closePhoto()},i(),r.hidden=!1,$(`lbx-x`).focus()}showSources(){$(`modal-body`).innerHTML=`
      <h2>DATA SOURCES & CREDITS</h2>
      <p>Everything in Aero Atlas is real mission data, from NASA plus ESA's Mars Express. Nothing is hand-painted. Files were pulled from the public USGS Astrogeology archive (<code>asc-pds-services</code>) and processed by <code>scripts/build_data.py</code>.</p>
      <h3>ORBIT VIEW</h3>
      <table><tr><th>LAYER</th><th>MISSION / INSTRUMENT</th><th>PRODUCT</th></tr>
        <tr><td>Visible colour</td><td>Viking Orbiter 1 & 2</td><td>MDIM 2.1 global mosaic, recoloured by NASA Ames (232 m)</td></tr>
        <tr><td>Topography / relief</td><td>Mars Global Surveyor · MOLA</td><td>MOLA 128/64 ppd merged DEM (463 m)</td></tr>
        <tr><td>Relief around Jezero and Isidis (zoomed in)</td><td>ESA Mars Express · HRSC, with MGS MOLA</td><td>HRSC and MOLA blended DEM v2, 200 m (USGS; HRSC data ESA/DLR/FU Berlin)</td></tr>
        <tr><td>Night thermal IR</td><td>Mars Odyssey · THEMIS</td><td>USGS controlled night-IR mosaic v2 (100 m)</td></tr>
        <tr><td>Human Exploration Zones (Display, Z)</td><td>NASA First Landing Site / Exploration Zone Workshop for Human Missions to Mars (Oct 2015)</td><td>38 proposed zones, 100 km radius; centres compiled by USGS from JMARS (asc-pds-services, pigpen/mars/Human_EZs)</td></tr>
        <tr><td>Geologic map, unit readout</td><td>USGS-NASA Planetary Geologic Mapping Program (mapped on MGS MOLA and Mars Odyssey THEMIS)</td><td>Geologic Map of Mars, USGS SIM 3292 (Tanaka et al. 2014), 1:20,000,000: official colours and coded unit raster</td></tr></table>
      <h3>JEZERO CRATER</h3>
      <table><tr><th>LAYER</th><th>MISSION / INSTRUMENT</th><th>PRODUCT</th></tr>
        <tr><td>Visible</td><td>MRO · CTX</td><td>Mars 2020 Science Investigation CTX orthomosaic, 5 m (JPL; Mangold et al. 2021)</td></tr>
        <tr><td>Elevation, slope, contours</td><td>MRO · CTX stereo</td><td>Mars 2020 Science Investigation CTX DEM, 20 m</td></tr>
        <tr><td>Thermal</td><td>Mars Odyssey · THEMIS</td><td>Night-IR controlled mosaic, 100 m</td></tr></table>
      <h3>MARSWALK ZONE</h3>
      <table><tr><th>LAYER</th><th>MISSION / INSTRUMENT</th><th>PRODUCT</th></tr>
        <tr><td>Visible</td><td>MRO · HiRISE</td><td>Mars 2020 Terrain-Relative-Navigation orthomosaic, 25 cm (USGS)</td></tr>
        <tr><td>Elevation, slope, route</td><td>MRO · HiRISE stereo</td><td>Mars 2020 TRN DTM, 1 m (USGS)</td></tr>
        <tr><td>Thermal</td><td>Mars Odyssey · THEMIS</td><td>Night-IR controlled mosaic, 100 m</td></tr>
        ${this.app.fpv?`<tr><td>Helmet-view skyline</td><td>MRO · CTX stereo</td><td>Computed from the 20 m crater DEM: highest angle per bearing, with Mars curvature</td></tr>`:``}</table>
      <h3>STOP PHOTOS</h3>
      <table><tr><th>STOP</th><th>CAMERA</th><th>IMAGE</th></tr>
        <tr><td>Octavia E. Butler Landing</td><td>Perseverance Navcam</td><td>Sol 16 raw image, NASA/JPL-Caltech</td></tr>
        <tr><td>Three Forks depot</td><td>Perseverance Mastcam-Z</td><td>Sol 690 raw image, NASA/JPL-Caltech/ASU</td></tr>
        <tr><td>Séítah</td><td>Perseverance Navcam</td><td>Sol 249 raw image, NASA/JPL-Caltech</td></tr>
        <tr><td>Delta front</td><td>Perseverance Navcam</td><td>Sol 502 raw image, NASA/JPL-Caltech</td></tr></table>
      <h3>PERSEVERANCE TRAVERSE</h3>
      <table><tr><th>LAYER</th><th>SOURCE</th><th>PRODUCT</th></tr>
        <tr><td>Drive path, sol labels</td><td>NASA/JPL-Caltech · MMGIS "Where is Perseverance?"</td><td>End-of-drive localisations (M20_waypoints), sol 0–${this.app.assets?.traverse?.lastSol??`?`}, from mars.nasa.gov</td></tr></table>
      <h3>LIVE SPACE WEATHER</h3>
      <table><tr><th>CHECK</th><th>SOURCE</th><th>PRODUCT</th></tr>
        <tr><td>CMEs forecast to reach Mars (Watney check, mission clock)</td><td>NASA DONKI, Community Coordinated Modeling Center, NASA Goddard (api.nasa.gov)</td><td>WSA-ENLIL solar-wind simulations, last 30 days: latest forecast per CME with a Mars arrival. ${this.app.spaceWeather?.ok?`Fetched ${new Date(this.app.spaceWeather.summary.checked).toUTCString().slice(5,22)} UTC.`:`Not fetched this session (offline?).`} Advisory: it does not change the verdict</td></tr></table>
      <h3>HOW THIS WAS MADE · AI USE</h3>
      <p>The code, data-processing scripts and documentation were written with an AI coding assistant (Claude Code, by Anthropic) under the team's direction. The team set the goals, tested every version and asked for fixes. All map data above is real NASA mission data; nothing in the maps, and no image, video or sound, was generated by an AI model. The app makes no AI calls while it runs. Full statement: <code>AI_DISCLOSURE.md</code> in the repository.</p>
      <h3>MODELS & REFERENCES</h3>
      <table>
        <tr><td>Mars time</td><td>Mars24 algorithm, Allison & McEwen (2000), NASA GISS. Sol count from Perseverance landing, 18 Feb 2021.</td></tr>
        <tr><td>Signal delay</td><td>JPL approximate planetary positions (Standish), Keplerian elements 1800–2050.</td></tr>
        <tr><td>EVA metabolic cost</td><td>Pandolf, Givoni & Goldman (1977) load-carriage equation, scaled to Mars gravity with a pressure-suit penalty.</td></tr>
        <tr><td>Three Forks depot</td><td>NASA PDS Geosciences Node, Mars 2020 Three Forks Depot bundle: rover position at each of the 10 tube drops (18.453°N, 77.408°E, −2,545 m).</td></tr>
        <tr><td>Colour tint</td><td>CTX / HiRISE greyscale tinted with the Viking colour of the same ground (low-frequency chroma only).</td></tr>
      </table>
      <p class="muted" style="margin-top:16px">Positions marked "approx." were placed by eye on the mosaics. LZ-A is our proposed crew landing zone, not a NASA site. Acidalia / Ares III refers to the novel <i>The Martian</i> (Andy Weir) and is fiction. NASA imagery is not copyrighted; NASA logos are not used.</p>`,$(`modal`).hidden=!1}};function Up(e,t,n){return`<div class="legend"><div class="cap">${e}</div><div class="ramp" style="background:${t}"></div><div class="ticks">${n.map(e=>`<span>${e}</span>`).join(``)}</div></div>`}var Wp=`sol-atlas-sound`,Gp=class{constructor(){let e=!0;try{e=localStorage.getItem(Wp)!==`off`}catch{}this.on=e,this.ctx=null,this.breath=null;let t=()=>{this.ensure(),window.removeEventListener(`pointerdown`,t),window.removeEventListener(`keydown`,t)};window.addEventListener(`pointerdown`,t),window.addEventListener(`keydown`,t)}ensure(){if(this.ctx)return this.ctx.state===`suspended`&&this.ctx.resume(),this.ctx;let e=window.AudioContext||window.webkitAudioContext;if(!e)return null;let t=this.ctx=new e;this.master=t.createGain(),this.master.gain.value=+!!this.on,this.master.connect(t.destination);let n=t.sampleRate*2;this.noise=t.createBuffer(1,n,t.sampleRate);let r=this.noise.getChannelData(0);for(let e=0;e<n;e++)r[e]=Math.random()*2-1;return this.startWind(),t}toggle(e=!this.on){this.on=e;try{localStorage.setItem(Wp,e?`on`:`off`)}catch{}let t=this.ensure();return t&&this.master.gain.setTargetAtTime(+!!e,t.currentTime,.05),e}get live(){return this.on&&this.ctx&&this.ctx.state===`running`}noiseSrc(){let e=this.ctx.createBufferSource();return e.buffer=this.noise,e.loop=!0,e}startWind(){let e=this.ctx,t=this.noiseSrc(),n=e.createBiquadFilter();n.type=`lowpass`,n.frequency.value=380,n.Q.value=.6;let r=e.createGain();r.gain.value=.035;let i=e.createOscillator(),a=e.createGain();i.frequency.value=.07,a.gain.value=.022,i.connect(a).connect(r.gain);let o=e.createOscillator(),s=e.createGain();o.frequency.value=.11,s.gain.value=160,o.connect(s).connect(n.frequency),t.connect(n).connect(r).connect(this.master),t.start(),i.start(),o.start(),this.wind=r}windLevel(e){this.ctx&&this.wind.gain.setTargetAtTime(e,this.ctx.currentTime,.6)}tone(e,t,{type:n=`sine`,vol:r=.08,at:i=0,slide:a=0}={}){if(!this.live)return;let o=this.ctx,s=o.currentTime+i,c=o.createOscillator(),l=o.createGain();c.type=n,c.frequency.setValueAtTime(e,s),a&&c.frequency.exponentialRampToValueAtTime(e*a,s+t),l.gain.setValueAtTime(1e-4,s),l.gain.exponentialRampToValueAtTime(r,s+.01),l.gain.exponentialRampToValueAtTime(1e-4,s+t),c.connect(l).connect(this.master),c.start(s),c.stop(s+t+.05)}blip(){this.tone(1320,.05,{vol:.035})}click(){this.tone(900,.04,{type:`triangle`,vol:.05})}lock(){this.tone(880,.12,{vol:.07}),this.tone(1320,.22,{vol:.07,at:.1})}go(){[660,880,1320].forEach((e,t)=>this.tone(e,.18,{vol:.06,at:t*.09}))}nogo(){this.tone(330,.28,{type:`square`,vol:.04}),this.tone(247,.4,{type:`square`,vol:.04,at:.26})}pin(){this.tone(1760,.07,{vol:.04}),this.tone(2640,.1,{vol:.03,at:.05})}alarm(e=1){let t=e>1?4:2;for(let n=0;n<t;n++)this.tone(e>1?1040:880,.12,{type:`square`,vol:.035,at:n*.28}),this.tone(e>1?780:660,.12,{type:`square`,vol:.035,at:n*.28+.14})}flatline(){if(!this.live)return;let e=this.ctx,t=e.currentTime,n=e.createOscillator(),r=e.createGain();n.frequency.value=988,r.gain.setValueAtTime(1e-4,t),r.gain.exponentialRampToValueAtTime(.05,t+.05),r.gain.setValueAtTime(.05,t+2.6),r.gain.exponentialRampToValueAtTime(1e-4,t+4.2),n.connect(r).connect(this.master),n.start(t),n.stop(t+4.3),this.breathing(!1)}whoosh(e=2.4){if(!this.live)return;let t=this.ctx,n=t.currentTime,r=this.noiseSrc(),i=t.createBiquadFilter();i.type=`bandpass`,i.Q.value=1.4,i.frequency.setValueAtTime(2400,n),i.frequency.exponentialRampToValueAtTime(180,n+e);let a=t.createGain();a.gain.setValueAtTime(1e-4,n),a.gain.exponentialRampToValueAtTime(.12,n+e*.35),a.gain.exponentialRampToValueAtTime(1e-4,n+e),r.connect(i).connect(a).connect(this.master),r.start(n),r.stop(n+e+.1)}breathing(e,t=16){if(!e){this.breath&&=(clearInterval(this.breath.iv),null);return}if(!this.ctx)return;if(this.breath){this.breath.rate=t;return}let n=this.breath={rate:t,next:0};n.iv=setInterval(()=>{if(!this.live||!this.breath)return;let e=this.ctx,t=e.currentTime;if(t<n.next)return;let r=60/n.rate;n.next=t+r;let i=this.noiseSrc(),a=e.createBiquadFilter();a.type=`bandpass`,a.frequency.value=900,a.Q.value=.8;let o=e.createGain(),s=r*.38,c=r*.45;o.gain.setValueAtTime(1e-4,t),o.gain.exponentialRampToValueAtTime(.03,t+s*.6),o.gain.exponentialRampToValueAtTime(8e-4,t+s),o.gain.exponentialRampToValueAtTime(.02,t+s+c*.3),o.gain.exponentialRampToValueAtTime(1e-4,t+s+c),a.frequency.setValueAtTime(1100,t),a.frequency.setValueAtTime(650,t+s),i.connect(a).connect(o).connect(this.master),i.start(t),i.stop(t+r)},120)}},Kp=Math.PI/2-.0015,qp=40,Jp=class{constructor(){this.canvas=document.getElementById(`gl`),this.touch=Pd();let e=Fd();this.renderer=new Au({canvas:this.canvas,antialias:e.antialias,powerPreference:`high-performance`}),this.tier=e=Id(e,this.renderer),document.body.classList.add(`tier-${e.name}`),this.touch&&document.body.classList.add(`touch`),this.governor=new Ld(e,e=>this.setPixelRatio(e)),this.renderer.setPixelRatio(this.governor.pr),this.maxDt=.05,this.lastFrameAt=0,this.readoutAt=0,this.renderer.outputColorSpace=lt,this.labels=new jp(document.getElementById(`labels`)),this.crossfade=new Rd(this.renderer),this.streaks=new zd(document.getElementById(`fx`)),this.director=new Bd(this),this.sound=new Gp,this.hud=new Hp(this),this.mode=`boot`,this.busy=!1,this.fade=null,this.keys=new Set,this.timer=new zo,this.resize();let t=0;window.addEventListener(`resize`,()=>{clearTimeout(t),t=setTimeout(()=>this.resize(),120)})}setPixelRatio(e){this.renderer.setPixelRatio(e),this.resize(),this.orbit&&(this.orbit.starUniforms.uPixelRatio.value=e)}resize(){this.w=window.innerWidth,this.h=window.innerHeight;let e=this.renderer.getPixelRatio();this.renderer.setSize(this.w,this.h,!1),this.crossfade.setSize(this.w,this.h,e),this.streaks.resize(this.w,this.h,e);let t=this.w<=900||this.touch&&this.h<=500;document.body.classList.toggle(`compact`,t),document.body.classList.toggle(`landscape`,t&&this.w>this.h);let n=this.w/this.h,r=n>=1?qp:Math.min(78,2*Math.atan(Math.tan(qp*Math.PI/360)/n)*180/Math.PI);for(let e of[this.orbit,this.crater,this.site])e&&(e.camera.aspect=n,e.camera.fov=r,e.camera.updateProjectionMatrix())}async start(){let e=document.getElementById(`loader-log`),t=document.getElementById(`loader-fill`),n=[];this.assets=await yd(this.renderer,this.tier,(r,i)=>{t.style.width=`${(r*100).toFixed(0)}%`,n.push(`<div><span class="ok">✔</span> ${i}</div>`),e.innerHTML=n.slice(-5).join(``)});let{manifest:r,tex:i,heights:a}=this.assets;this.orbit=new Nf(this),this.orbit.build(this.assets);let o=this.tier;this.crater=new $f(this,{id:`crater`,meta:r.crater,heights:a.crater,tex:{visible:i.c_visible,normal:i.c_normal,slope:i.c_slope,thermal:i.c_thermal},pois:pf,exag:2.2,contour:[50,250],gridKm:5,dist:[2.5,210],strata:140,overview:{dist:118,el:.78,az:.3,target:{lat:18.42,lon:77.62}},lat0:18.44,lon0:77.6,slopeLim:[10,20,30],childEnterDist:11,meshStep:o.meshStep,shadowSteps:o.shadowSteps,traverseOn:!0}),this.crater.build(),this.crater.setTraverse(this.assets.traverse),this.crater.loadSlopeData(),this.site=new $f(this,{id:`site`,meta:r.site,heights:a.site,tex:{visible:i.s_visible,normal:i.s_normal,slope:i.s_slope,thermal:i.s_thermal},pois:ff,exag:1.6,contour:[5,25],gridKm:.5,dist:[.12,13],strata:14,overview:{dist:8.9,el:.86,az:.2},lat0:18.445,lon0:77.462,slopeLim:[10,20,30],ltst:9.25,meshStep:o.meshStep,shadowSteps:o.shadowSteps}),this.site.build(),this.site.setTraverse(this.assets.traverse),this.site.loadSlopeData();let s=r.site,c=this.crater.lonlatToXZ(s.lat[1],s.lon[0]),l=this.crater.lonlatToXZ(s.lat[0],s.lon[1]);this.zone={x0:c.x,z0:c.z,x1:l.x,z1:l.z,cx:(c.x+l.x)/2,cz:(c.z+l.z)/2},this.crater.uniforms.uBox.value.set(c.x,c.z,l.x,l.z),this.crater.uniforms.uBoxOn.value=1,this.zoneLabel=this.labels.add(`crater`,{className:`zone`,world:new W(this.zone.cx,0,this.zone.z0),html:`<div class="lb">▣ MARSWALK ZONE<small>HiRISE 25 cm · click to enter</small></div>`,onClick:()=>this.enterSite(),priority:10}),this.planner=new mp(this,this.site,ff),this.planner.init(),this.planner.setPlan(mf),this.pin=new yp(this),this.fpv=kp.helmetView?new Dp(this):null,this.journal=new pd(this),this.resize();let u=new gn(64,64);for(let e of[this.orbit,this.crater,this.site]){if(e.overview){let t=e.overview();e.cam.target.copy(t.target),e.cam.dist=t.dist,e.cam.el=t.el,e.cam.az=t.az}e.update(.016),this.renderer.setRenderTarget(u),this.renderer.render(e.scene,e.camera)}this.renderer.setRenderTarget(null),u.dispose(),this.crossfade.render(this.orbit,this.crater,.5),this.crossfade.render(this.crater,this.site,.5),this.setActive(this.orbit,`orbit`),this.hud.renderOrbit(this.orbit),this.bindInput(),Yp.finish(),this.hud.caption(`AERO ATLAS`,this.touch?`Pinch to zoom toward Jezero. Drag to spin Mars.`:`Scroll to zoom toward Jezero. Drag to spin Mars.`,5e3),this.renderer.setAnimationLoop(e=>this.frame(e)),this.spaceWeather=null,kd().then(e=>{this.spaceWeather=e,this.hud.spaceWeatherChanged()}),new URLSearchParams(location.search).has(`autopilot`)&&setTimeout(()=>this.director.start(),1200)}setActive(e,t){this.active=e,this.mode=t,this.labels.setVisible(`orbit`,t===`orbit`),this.labels.setVisible(`crater`,t===`crater`);for(let e of[`site`,`wp`,`eva`,`pin`])this.labels.setVisible(e,t===`site`);t!==`site`&&(this.pin?.close(),this.fpv?.active&&this.fpv.exit())}fillDist(e){let t=Math.tan(e.camera.fov*Math.PI/360),n=this.w/this.h;return .96*Math.min(e.sizeZ/(2*t),e.sizeX/(2*t*n))}crossfadeTo(e,t,n=1.1){return new Promise(r=>{this.fade={a:e,b:t,t:0,dur:n,resolve:r}})}async descendToJezero(){if(this.mode!==`orbit`||this.busy)return;this.busy=!0,this.hud.clearPanels(),this.hud.prompt(null),this.hud.reticle(!0),await this.orbit.flyToJezero(.26),this.hud.toast(`TARGET LOCKED · JEZERO CRATER`),this.sound.lock(),this.sound.whoosh(3.2);let e=this.fillDist(this.crater);this.streaksOn=!0,await this.orbit.dive(e,e=>{this.hud.prompt(`<span class="big">ALT ${nf(e)} KM</span>DESCENDING TO SURVEY ALTITUDE`)}),this.crater.topDown(0,0,e),this.crater.mode=`transit`,this.streaksOn=!1,this.hud.reticle(!1),await this.crossfadeTo(this.orbit,this.crater,1.2),this.hud.prompt(null),this.setActive(this.crater,`crater`),this.crater.mode=`idle`,this.crater.pulse(0,0),this.hud.renderTerrain(this.crater),await this.crater.flyTo(this.crater.overview(),3.4),this.busy=!1}async enterSite(){if(this.mode!==`crater`||this.busy)return;this.busy=!0,this.hud.prompt(null);let e=this.crater,t=this.fillDist(this.site);this.hud.reticle(!0),this.sound.whoosh(2.6),await e.flyTo({target:new W(this.zone.cx,e.yAt(this.zone.cx,this.zone.cz),this.zone.cz),dist:t,el:Kp,az:0},2.4),this.site.topDown(0,0,t),this.site.mode=`transit`,this.hud.reticle(!1),await this.crossfadeTo(e,this.site,1.2),this.setActive(this.site,`site`),this.site.mode=`idle`,this.site.pulse(0,0),this.planner.waypoints.length||this.planner.setPlan(mf),this.hud.renderTerrain(this.site,()=>this.hud.renderPlanner(this.planner)),this.hud.toast(`HiRISE · 25 CM PER PIXEL`),await this.site.flyTo(this.site.overview(),2.8),this.busy=!1}async exitUp(e=this.active){if(!this.busy){if(e===this.crater){this.busy=!0,this.hud.clearPanels();let e=this.fillDist(this.crater);await this.crater.flyTo({target:new W(0,this.crater.yAt(0,0),0),dist:e,el:Kp,az:0},2);let t=this.orbit,n=t.cTile();t.spin=t.spinFor(n),t.pitch=n.lat*Math.PI/180,t.alt=e/3389.5,t.mode=`transit`,t.update(0),await this.crossfadeTo(this.crater,t,1),this.setActive(t,`orbit`),this.hud.renderOrbit(t),await t.climb(e,e=>this.hud.prompt(e<1500?`<span class="big">ALT ${nf(e)} KM</span>CLIMBING TO ORBIT`:null)),this.hud.prompt(null),this.busy=!1}else if(e===this.site){if(this.fpv?.active){this.fpv.exit();return}this.busy=!0,this.planner.stopSim(),this.hud.clearPanels();let e=this.fillDist(this.site);await this.site.flyTo({target:new W(0,this.site.yAt(0,0),0),dist:e,el:Kp,az:0},1.8),this.crater.topDown(this.zone.cx,this.zone.cz,e),this.crater.mode=`transit`,await this.crossfadeTo(this.site,this.crater,1),this.setActive(this.crater,`crater`),this.crater.mode=`idle`,this.hud.renderTerrain(this.crater),await this.crater.flyTo({dist:34,el:.82,az:.3},2.2),this.busy=!1}}}async goTo(e){let t=[`orbit`,`crater`,`site`];for(;t.indexOf(this.mode)>t.indexOf(e)&&!this.busy;)await this.exitUp();e===`crater`&&this.mode===`orbit`&&await this.descendToJezero(),e===`site`&&this.mode===`crater`&&await this.enterSite()}orbitLookAt(e){let t=this.orbit,n=t.spin,r=t.spinFor(e),i=t.pitch,a=e.lat*Math.PI/180;t.lastUser=t.time+3,t.tweens.add(1.6,e=>{t.spin=n+(((r-n+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI)*e,t.pitch=i+(a-i)*e}),t.altTarget=Math.max(t.altTarget,1.4),this.hud.toast(`${e.name.toUpperCase()} · ${e.status===`fiction`?`FICTIONAL SITE`:`LOCKED IN PHASE 1`}`)}toggleZones(){let e=this.orbit;e.zones=!e.zones,this.sound.click(),this.mode===`orbit`&&this.hud.renderOrbit(e),this.hud.toast(e.zones?`HUMAN EXPLORATION ZONES · NASA 2015 WORKSHOP`:`EXPLORATION ZONES OFF`)}setOrbitLayer(e){this.orbit.setLayer(e),this.sound.click(),this.hud.renderOrbit(this.orbit)}toggleTerrainLayer(e,t){let n=this.active;n instanceof $f&&(n.toggleLayer(e,t),this.hud.terrainLegend(n),this.sound.click())}onPOIClick(e,t){if(e===this.site&&t.id!==`lz`){if(this.planner.addMode=!1,this.planner.addPOI(t)){this.hud.toast(`STOP ADDED · ${t.name.toUpperCase()}`),this.sound.pin();return}let e=this.planner.waypoints.findIndex(e=>e.poi&&e.poi.id===t.id);e>=0&&this.hud.toast(`ALREADY IN THE PLAN · STOP ${e+1}`)}let{x:n,z:r}=e.lonlatToXZ(t.lat,t.lon);e.pulse(n,r),e.flyTo({target:new W(n,e.yAt(n,r),r),dist:e===this.site?1.1:13,el:.72},1.8)}resetPlan(e=this.planner.goal){let t=hf.find(t=>t.id===e)||hf[0];this.planner.goal=t.id,this.planner.returnToStart=!0,this.planner.setPlan(t.plan)}bindInput(){let e=null,t=null,n=new Map,r=this.canvas,i=()=>{let[e,t]=[...n.values()];return{d:Math.hypot(e.x-t.x,e.y-t.y),cx:(e.x+t.x)/2,cy:(e.y+t.y)/2}};r.addEventListener(`contextmenu`,e=>e.preventDefault()),r.addEventListener(`pointerdown`,a=>{if(n.set(a.pointerId,{x:a.clientX,y:a.clientY}),r.setPointerCapture(a.pointerId),this.director.interrupt(),n.size===2){t=i(),e&&(e.moved=!0);return}e={x:a.clientX,y:a.clientY,lx:a.clientX,ly:a.clientY,b:a.button===2?2:1,moved:!1,touch:a.pointerType===`touch`}}),r.addEventListener(`pointermove`,r=>{if(n.has(r.pointerId)&&n.set(r.pointerId,{x:r.clientX,y:r.clientY}),t&&n.size>=2){let e=i();if(this.active?.onPointerMove(e.cx,e.cy),!this.busy&&!this.fade){let n=Math.log(t.d/Math.max(e.d,1))*720;Math.abs(n)>.5&&this.active.onWheel({deltaY:n,deltaMode:0}),this.active instanceof $f&&this.active.onDrag(e.cx-t.cx,e.cy-t.cy,2,!1)}t=e;return}if(this.active?.onPointerMove(r.clientX,r.clientY),!e)return;let a=r.clientX-e.lx,o=r.clientY-e.ly;e.lx=r.clientX,e.ly=r.clientY,Math.hypot(r.clientX-e.x,r.clientY-e.y)>(e.touch?10:4)&&(e.moved=!0),e.moved&&!this.busy&&this.active.onDrag(a,o,e.b,r.shiftKey)});let a=r=>{if(n.delete(r.pointerId),n.size<2&&(t=null),n.size===1&&e){let t=[...n.values()][0];e.lx=t.x,e.ly=t.y}r.type===`pointerup`&&e&&!e.moved&&n.size===0&&(this.active?.onPointerMove(r.clientX,r.clientY),this.onCanvasClick(r)),n.size===0&&(e=null)};r.addEventListener(`pointerup`,a),r.addEventListener(`pointercancel`,a),document.addEventListener(`gesturestart`,e=>e.preventDefault()),document.addEventListener(`gesturechange`,e=>e.preventDefault()),window.addEventListener(`wheel`,e=>{e.target.closest(`.panel, .modal, .lbx, .eva-journal`)||(e.preventDefault(),this.director.interrupt(),!this.busy&&!this.fade&&this.active?.onWheel(e))},{passive:!1}),window.addEventListener(`keydown`,e=>{if(e.target.closest(`input, textarea, select, .eva-journal, [contenteditable="true"]`))return;let t=document.getElementById(`modal`);if(!t.hidden){e.key===`Escape`&&(t.hidden=!0);return}if(!document.getElementById(`lbx`).hidden){e.key===`Escape`?this.hud.closePhoto():e.key===`ArrowLeft`?this.hud.photoStep(-1):e.key===`ArrowRight`&&this.hud.photoStep(1);return}this.keys.add(e.key.toLowerCase()),this.onKey(e)}),window.addEventListener(`keyup`,e=>this.keys.delete(e.key.toLowerCase()))}onCanvasClick(){if(document.body.classList.contains(`sheet-open`)){this.hud.closeSheet();return}if(!this.busy){if(this.mode===`site`&&this.fpv?.active){this.fpv.onClick();return}if(this.mode===`site`){let e=this.site.pick();this.planner.addMode?e&&(this.planner.addMode=!1,this.planner.addAt(e.x,e.z)):this.pin.open?this.pin.close():e&&this.pin.drop(e.x,e.z)}else if(this.mode===`crater`){let e=this.crater.pick(),t=this.zone;e&&e.x>t.x0&&e.x<t.x1&&e.z>t.z0&&e.z<t.z1&&this.enterSite()}else this.mode===`orbit`&&this.orbit.locked&&this.descendToJezero()}}onKey(e){let t=e.key.toLowerCase();if(t===`c`){this.director.toggle();return}if(t===`escape`&&this.director.running){this.director.interrupt();return}if(t===`h`){document.getElementById(`hud`).classList.toggle(`hidden`),document.getElementById(`labels`).style.opacity=+!document.getElementById(`hud`).classList.contains(`hidden`);return}if(t===`r`&&!e.metaKey&&!e.ctrlKey){this.hud.recorder.toggle();return}if(t===`m`){this.hud.soundButton(this.sound.toggle());return}if(t===`k`){this.director.captions=!this.director.captions,this.hud.toast(`CAPTIONS ${this.director.captions?`ON`:`OFF`}`);return}if(!this.busy){if(t===`escape`&&this.pin?.open){this.pin.close();return}if(this.mode===`site`&&this.fpv?.active){if(t===`escape`||t===`f`){this.fpv.exit();return}if(this.fpv.onKey(t))return}else if(this.mode===`site`&&t===`f`&&this.fpv){this.fpv.enter();return}if(t===`escape`||t===`backspace`){this.exitUp();return}this.mode===`orbit`?([`1`,`2`,`3`,`4`].includes(t)&&this.setOrbitLayer([`visible`,`topo`,`thermal`,`geology`][t-1]),t===`g`&&(this.orbit.grid=this.orbit.grid>0?0:.35,this.hud.renderOrbit(this.orbit)),t===`z`&&this.toggleZones(),t===` `&&(this.orbit.autoSpin=!this.orbit.autoSpin,this.hud.renderOrbit(this.orbit)),t===`enter`&&this.descendToJezero()):(/^[1-7]$/.test(t)&&this.toggleTerrainLayer([`visible`,`elev`,`slope`,`thermal`,`contour`,`holo`,`traverse`][t-1]),t===`enter`&&this.mode===`crater`&&this.enterSite(),t===` `&&this.mode===`site`&&(e.preventDefault(),this.planner.sim?this.planner.stopSim():this.planner.startSim()))}}frame(e=performance.now()){let t=this.tier.fpsCap;if(t&&e-this.lastFrameAt<1e3/t-4)return;this.lastFrameAt&&this.governor.tick(e-this.lastFrameAt),this.lastFrameAt=e,this.timer.update(e);let n=Math.min(this.maxDt,this.timer.getDelta()),r=this.active;if(r===this.site&&this.fpv?.active)this.fpv.update(n);else if(r instanceof $f&&!this.busy){let e=(this.keys.has(`d`)||this.keys.has(`arrowright`)?1:0)-(this.keys.has(`a`)||this.keys.has(`arrowleft`)?1:0),t=(this.keys.has(`s`)||this.keys.has(`arrowdown`)?1:0)-(this.keys.has(`w`)||this.keys.has(`arrowup`)?1:0);(e||t)&&r.onKeyPan(e,t,n)}if(this.fade){let e=this.fade;e.t=Math.min(1,e.t+n/e.dur),e.a.update(n),e.b.update(n),this.crossfade.render(e.a,e.b,e.t),e.t>=1&&(this.fade=null,e.resolve())}else r.update(n),this.renderer.render(r.scene,r.camera);this.mode===`site`&&(this.planner.update(n),this.planner.frame(),this.pin.frame());let i=this.mode===`orbit`?[`orbit`]:this.mode===`crater`?[`crater`]:[`site`,`wp`,`eva`,`pin`];for(let e of i)this.labels.update(e,r.camera,this.w,this.h);this.streaks.intensity+=(+!!this.streaksOn-this.streaks.intensity)*Math.min(1,n*3),this.streaks.update(n),e-this.readoutAt>100&&(this.readoutAt=e,this.hud.readout(this.fpv?.active?this.fpv.readout():r.readout())),this.busy||this.updatePrompts(),this.director.update(n),this.journal?.frame(e)}updatePrompts(){if(this.mode===`orbit`){let e=this.orbit;this.hud.reticle(e.locked),e.locked?this.hud.prompt(`<span class="big">JEZERO CRATER</span>TARGET LOCKED · ${this.touch?`PINCH OR TAP`:`SCROLL OR CLICK`} TO DESCEND<span class="chev">▼</span>`):e.alt<1.2?this.hud.prompt(`ZOOMING TOWARD JEZERO · KEEP ${this.touch?`PINCHING`:`SCROLLING`}`):this.hud.prompt(null)}else if(this.mode===`crater`){let e=this.crater,t=this.zone,n=e.cam.target,r=1.5,i=n.x>t.x0-r&&n.x<t.x1+r&&n.z>t.z0-r&&n.z<t.z1+r;e.canEnterChild=i,this.hud.reticle(!1),i&&e.cam.dist<26?this.hud.prompt(`<span class="big">MARSWALK ZONE</span>${this.touch?`PINCH OR TAP`:`SCROLL OR CLICK`} TO ENTER · HiRISE 25 CM<span class="chev">▼</span>`):this.hud.prompt(null),this.zoneLabel.world.set(t.cx,e.yAt(t.cx,t.z0)+e.stalkH()*.6,t.z0)}else{if(this.hud.reticle(!1),this.fpv?.active){this.hud.prompt(null);return}this.hud.prompt(this.planner.addMode?`${this.touch?`TAP`:`CLICK`} THE MAP TO ADD A STOP`:null)}}},Yp=e();async function Xp(){try{let e=new Jp;window.solAtlas=e,await e.start()}catch(e){console.error(e),Yp.fail(),document.getElementById(`loader-log`).textContent=`Failed to start: ${e.message}`}}Xp();