import { points, summary } from './model.js';

export const fmt = (n, unit = '', digits = 1) => Number.isFinite(n) ? `${n.toFixed(digits)}${unit}` : 'N/A';
export const coordinates = p => p && Number.isFinite(p.lat) && Number.isFinite(p.lon) ? `${p.lat.toFixed(5)}° N, ${p.lon.toFixed(5)}° E` : 'Not recorded';
export function mapUV(p, terrain) {
  return { u: (p.lon - terrain.lon[0]) / (terrain.lon[1] - terrain.lon[0]), v: (terrain.lat[1] - p.lat) / (terrain.lat[1] - terrain.lat[0]) };
}
export function wrapText(ctx, text, width) {
  const lines = [];
  for (const paragraph of String(text).split('\n')) {
    let line = '';
    for (const char of Array.from(paragraph)) {
      if (line && ctx.measureText(line + char).width > width) { lines.push(line); line = ''; }
      line += char;
    }
    lines.push(line);
  }
  return lines;
}
const colors = { bg: '#101317', panel: '#1c2229', line: '#4d4541', text: '#f2e9df', muted: '#b6b8bd', gold: '#e7ae88', cyan: '#9ddce5', red: '#ff555b' };
function text(c, value, x, y, size = 18, color = colors.text, weight = 400) { c.fillStyle = color; c.font = `${weight} ${size}px Arial, sans-serif`; c.fillText(String(value), x, y); }
function card(c, x, y, w, h) { c.fillStyle = colors.panel; c.fillRect(x, y, w, h); c.strokeStyle = colors.line; c.lineWidth = 1; c.strokeRect(x+.5, y+.5, w-1, h-1); }
function image(src) { return new Promise((resolve, reject) => { const im = new Image(); im.onload = () => resolve(im); im.onerror = () => reject(Error('Terrain asset could not be loaded.')); im.src = src; }); }
function drawMap(c, mission, im, x, y, w, h) {
  card(c, x, y, w, h);
  const terrain = mission.terrain, route = points(mission);
  if (!im || !terrain?.lon || !terrain?.lat) {
    text(c, 'TERRAIN IMAGERY UNAVAILABLE', x+28, y+60, 24, colors.gold);
    text(c, 'The registered local HiRISE image could not be loaded.', x+28, y+96, 18);
    text(c, 'Recorded coordinates are preserved in this mission.', x+28, y+128, 18, colors.muted);
    return;
  }
  const uv = route.map(p => mapUV(p, terrain));
  // Pixel crop is uniform: no stretching of the source NASA mosaic.
  const xs = uv.map(p=>p.u*im.width), ys=uv.map(p=>p.v*im.height);
  const minX=xs.length?Math.min(...xs):0, maxX=xs.length?Math.max(...xs):im.width;
  const minY=ys.length?Math.min(...ys):0, maxY=ys.length?Math.max(...ys):im.height;
  const cx=(minX+maxX)/2, cy=(minY+maxY)/2;
  let scale=Math.min(w / Math.max(160,(maxX-minX)*1.25), h / Math.max(160,(maxY-minY)*1.25));
  // Letterbox the image if the requested padded bounds extend outside its coverage.
  const cw=w/scale,ch=h/scale;
  const sx=cw<=im.width?Math.max(0,Math.min(im.width-cw,cx-cw/2)):(im.width-cw)/2;
  const sy=ch<=im.height?Math.max(0,Math.min(im.height-ch,cy-ch/2)):(im.height-ch)/2;
  const project=p=>{const q=mapUV(p,terrain);return {x:x+(q.u*im.width-sx)*scale,y:y+(q.v*im.height-sy)*scale};};
  c.save(); c.beginPath(); c.rect(x,y,w,h); c.clip();
  c.drawImage(im,x-sx*scale,y-sy*scale,im.width*scale,im.height*scale);
  const line=(list,color,width,dash=[])=>{if(list.length<2)return;c.beginPath();c.strokeStyle=color;c.lineWidth=width;c.setLineDash(dash);list.forEach((p,i)=>{const q=project(p);i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y);});c.stroke();c.setLineDash([]);};
  line(mission.planned || [],colors.cyan,2,[7,5]);
  for(const s of mission.segments) { line(s.points,'#361516',7); line(s.points,colors.red,4); }
  function marker(p,label) { if(!p)return;const q=project(p);c.fillStyle=colors.text;c.beginPath();c.arc(q.x,q.y,6,0,Math.PI*2);c.fill();const tx=Math.min(x+w-140,Math.max(x+8,q.x+12));const ty=Math.min(y+h-34,Math.max(y+8,q.y-28));c.fillStyle='#101317';c.fillRect(tx-5,ty-3,132,26);text(c,label,tx,ty+16,16,colors.text,700); }
  const first=route[0],last=route.at(-1);
  if(first && last && Math.hypot(first.x-last.x,first.z-last.z)<.002) marker(first,'START / END');
  else {marker(first,'START');marker(last,'END');}
  c.fillStyle='#101317dd';c.fillRect(x+12,y+12,390,32);text(c,'ACTUAL  ━ RED     PLANNED  ┄ CYAN',x+24,y+34,15);
  c.fillStyle='#101317dd';c.fillRect(x+w-62,y+12,48,66);text(c,'N',x+w-47,y+36,19,colors.text,700);text(c,'↑',x+w-47,y+65,28);
  const metresPerPx=terrain.sizeM[0]/im.width/scale;
  const raw=140*metresPerPx, magnitude=10**Math.floor(Math.log10(raw)), length=Math.floor(raw/magnitude)*magnitude;
  c.fillStyle='#101317dd';c.fillRect(x+12,y+h-62,200,50);c.strokeStyle=colors.text;c.lineWidth=3;c.beginPath();c.moveTo(x+24,y+h-25);c.lineTo(x+24+length/metresPerPx,y+h-25);c.stroke();text(c,`${length} m`,x+24,y+h-37,15);
  c.restore();
}
export async function renderReport(mission, { loadImage = image, makeCanvas = () => document.createElement('canvas'), earthTime = new Date().toISOString() } = {}) {
  let im=null;
    try { im=await loadImage(`${import.meta.env?.BASE_URL || './'}data/${mission.terrain?.visible || 's_visible.jpg'}`); } catch { /* Explicit map-unavailable panel below. */ }
  const measure=makeCanvas().getContext('2d');measure.font='18px Arial, sans-serif';
  const chunks=[];
  for(const entry of mission.entries) {
    const lines=wrapText(measure,entry.text,438);
    for(let i=0;i<lines.length;i+=15) chunks.push({entry,lines:lines.slice(i,i+15),continued:i>0});
  }
  if(!chunks.length) chunks.push({lines:['No field notes recorded.'],entry:null});
  // Each journal fragment gets its own page: no discarded lines or hidden overflow.
  const pages=[];
  const stats=summary(mission),route=points(mission);
  for(let page=0;page<chunks.length;page++) {
    const canvas=makeCanvas();canvas.width=1600;canvas.height=1000;const c=canvas.getContext('2d');
    c.fillStyle=colors.bg;c.fillRect(0,0,1600,1000);
    text(c,'AERO ATLAS',40,48,28,colors.gold,700);text(c,'EVA MISSION REPORT',40,83,22,colors.text,700);
    text(c,`JEZERO CRATER  /  ${mission.status.toUpperCase()}  /  PAGE ${page+1} OF ${chunks.length}`,720,48,18,colors.cyan);
    text(c,`Mission ${mission.id}`,720,80,16,colors.muted);
    text(c,`START  Sol ${mission.start.sol} · ${mission.start.lmst} LMST     END  ${mission.end ? `Sol ${mission.end.sol} · ${mission.end.lmst} LMST` : 'Not finalized'}`,40,117,17,colors.muted);
    const values=[['RECORDED DISTANCE',fmt(stats.distance,' m')],['RECORDED DURATION',fmt(stats.duration/60,' min')],['O₂ CONSUMED',fmt(stats.oxygenConsumed,' kg',3)],['O₂ REMAINING',fmt(stats.oxygenRemaining,' kg',3)],['MEAN METABOLIC POWER',fmt(stats.averageW,' W')],['METABOLIC ENERGY',fmt(stats.energyJ===null?null:stats.energyJ/1000,' kJ')],['FIELD NOTES',String(stats.notes)],['MOVEMENT TIME',fmt(stats.movementDuration/60,' min')]];
    values.forEach(([label,value],i)=>{const x=40+(i%4)*384,y=142+Math.floor(i/4)*82;card(c,x,y,372,70);text(c,label,x+16,y+23,13,colors.gold);text(c,value,x+16,y+53,25,colors.cyan,600);});
    text(c,`START ${coordinates(route[0])}     END ${coordinates(route.at(-1))}`,40,326,16);
    drawMap(c,mission,im,40,346,1000,536);
    card(c,1060,346,500,536);
    const chunk=chunks[page],e=chunk.entry;
    text(c,'FIELD JOURNAL',1082,378,20,colors.gold,700);
    if(e) {text(c,`${e.category.toUpperCase()}${chunk.continued?' · CONTINUED':''}`,1082,414,17,colors.cyan,700);text(c,`Sol ${e.sol} · ${e.lmst} LMST · +${fmt(e.elapsed,' s')}`,1082,443,16,colors.muted);text(c,coordinates(e.position),1082,470,15,colors.muted);}
    chunk.lines.forEach((line,i)=>text(c,line,1082,505+i*23,18));
    text(c,`Time-weighted power covers ${fmt(stats.powerSeconds,' s')} of recorded simulation. Oxygen comparisons require one unchanged suit session.`,40,911,15,colors.muted);
    text(c,'Terrain: NASA/JPL/University of Arizona · MRO HiRISE mosaic and DTM, Jezero landing site (local app dataset).',40,939,15,colors.muted);
    text(c,'Simulated EVA mission — not real astronaut telemetry.',40,968,17,colors.gold);
    text(c,`Earth export time: ${earthTime}`,1030,968,14,colors.muted);
    const blob=await new Promise((resolve,reject)=>{try{canvas.toBlob(b=>b?resolve(b):reject(Error('PNG encoding failed.')),'image/png');}catch(error){reject(Error(`PNG export blocked: ${error.message}`));}});
    pages.push({blob,name:`AeroAtlas-EVA-${mission.id}-page-${page+1}.png`});
  }
  return pages;
}
