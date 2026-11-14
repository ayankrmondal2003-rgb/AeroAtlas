import { url as dataUrl } from '../core/assets.js';
import { createMedaClient, displayValue, intervalLabel, missingReason } from '../lib/meda.js';

const client=createMedaClient(dataUrl);
const selection={sol:70,index:0,variable:'temperature1',detector:'temperature1'};
const make=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
const svgNode=(tag,attrs)=>{const el=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v]of Object.entries(attrs))el.setAttribute(k,v);return el;};

function trend(series,index){
  const svg=svgNode('svg',{viewBox:'0 0 540 190',role:'img','aria-label':`${series.label}: five-minute sample means and observed ranges over archived LMST. Gaps are not interpolated.`});
  const valid=series.bins.filter(b=>b.count);
  if(!valid.length){const text=svgNode('text',{x:40,y:90});text.textContent='No valid observations';svg.append(text);return svg;}
  let low=Math.min(...valid.map(b=>b.min)),high=Math.max(...valid.map(b=>b.max));if(high===low){low-=1;high+=1;}
  const y=v=>145-(v-low)/(high-low)*110,x=i=>66+(i+.5)/288*456;
  const unit=svgNode('text',{x:66,y:16});unit.textContent=series.id.startsWith('temperature')?'°C':series.unit;svg.append(unit);
  for(const v of [low,(low+high)/2,high]){svg.append(svgNode('line',{x1:66,y1:y(v),x2:522,y2:y(v),class:'weather-grid'}));const t=svgNode('text',{x:62,y:y(v)+4,'text-anchor':'end'});t.textContent=(series.id.startsWith('temperature')?v-273.15:v).toFixed(1);svg.append(t);}
  for(const h of [0,6,12,18,24]){const t=svgNode('text',{x:66+h/24*456,y:174,'text-anchor':'middle'});t.textContent=String(h).padStart(2,'0');svg.append(t);}
  series.bins.forEach((b,i)=>{if(!b.count)return;svg.append(svgNode('line',{x1:x(i),y1:y(b.min),x2:x(i),y2:y(b.max),class:'weather-range'}),svgNode('circle',{cx:x(i),cy:y(b.mean),r:i===index?4:1.5,class:i===index?'weather-point selected':'weather-point'}));});
  svg.append(svgNode('line',{x1:x(index),y1:25,x2:x(index),y2:150,class:'weather-cursor'}));return svg;
}

export function openWeatherIntelligence(app,opener){
  app.keys.clear();app.director?.interrupt();
  const modal=document.getElementById('modal'),body=document.getElementById('modal-body'),close=document.getElementById('modal-x');
  modal.classList.add('weather-modal');modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-labelledby','weather-title');modal.hidden=false;
  body.innerHTML=`<section class="weather-intelligence">
    <h2 id="weather-title">JEZERO WEATHER — NASA MEDA</h2><p class="weather-badge">JEZERO · ARCHIVED MEDA · NOT LIVE</p>
    <p>Archived rover observations · surface environmental measurements. Independent of the simulated EVA and its clock.</p>
    <div class="weather-status" role="status" aria-live="polite">Loading local archive…</div>
    <button class="btn weather-retry" hidden>RETRY WEATHER DATA</button>
    <div class="weather-data" hidden>
      <div class="weather-controls"><label>Archived sol<select class="weather-sol"></select></label><label>Air sensor<select class="weather-detector"><option value="temperature1">ATS 1 · mast 50°</option><option value="temperature2">ATS 2 · mast 155°</option><option value="temperature3">ATS 3 · mast 290°</option><option value="temperature4">ATS 4 · front port</option><option value="temperature5">ATS 5 · front starboard</option></select></label></div>
      <p class="weather-utc"></p><label class="weather-time">Archived interval <output></output><input class="weather-slider" type="range" min="0" max="287" step="1" value="0"></label>
      <div class="weather-cards"></div>
      <label class="weather-chart-control">Trend variable<select class="weather-variable"><option value="temperature">Air temperature</option><option value="pressure">Pressure</option><option value="humidity">Humidity over ice</option><option value="wind">Horizontal wind speed</option></select></label>
      <div class="weather-chart"></div><p class="weather-chart-key">Points: five-minute sample means. Bars: observed min–max. Blank intervals have no accepted samples; no gap filling.</p><p class="weather-bin-summary"></p>
      <details class="weather-provenance"><summary>Sources, quality & coverage</summary><div class="weather-sources"></div></details>
      <p class="weather-disclaimer">Archived conditions at the rover, not a forecast or a terrain-wide weather map. Sensor locations differ. These observations do not alter oxygen, route or readiness calculations.</p>
    </div></section>`;
  const root=body.querySelector('.weather-intelligence'),q=s=>root.querySelector(s);
  let disposed=false,controller=null,catalog=null,data=null,requestId=0;
  const retry=q('.weather-retry'),status=q('.weather-status');
  const cleanup=()=>{if(disposed)return;disposed=true;controller?.abort();observer.disconnect();window.removeEventListener('keydown',onKey,true);modal.classList.remove('weather-modal');for(const a of ['role','aria-modal','aria-labelledby'])modal.removeAttribute(a);if(opener?.isConnected)opener.focus();};
  const onKey=e=>{e.stopImmediatePropagation();if(e.key==='Escape'){e.preventDefault();modal.hidden=true;}else if(e.key==='Tab'){const items=[...modal.querySelectorAll('button,a[href],select,input,summary')].filter(el=>!el.disabled&&el.getClientRects().length);const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};
  const observer=new MutationObserver(()=>{if(modal.hidden)cleanup();});observer.observe(modal,{attributes:true,attributeFilter:['hidden']});window.addEventListener('keydown',onKey,true);
  close.focus();
  function render(){
    if(!data)return;
    q('.weather-time output').textContent=intervalLabel(selection.index);q('.weather-slider').value=selection.index;
    const cards=q('.weather-cards');cards.replaceChildren();
    for(const id of [selection.detector,'pressure','humidity','wind']){
      const series=data.series.find(s=>s.id===id),bin=series.bins[selection.index],card=make('article',undefined,'weather-card');
      card.append(make('h3',series.label));
      if(!bin.sample){card.append(make('strong','Unavailable'),make('p',missingReason(bin)));}
      else{const s=bin.sample;card.append(make('strong',displayValue(id,s.value)),make('p',`Observed ${s.lmst} LMST`),make('small',`LTST ${s.ltst} · SCLK ${s.sclk}`));
        if(id==='humidity')card.append(make('p',`Sensor temperature: ${s.localTemperatureK===null?'not provided':s.localTemperatureK.toFixed(2)+' K'}`));
        if(id==='wind')card.append(make('p',`Direction: ${s.directionDeg===null?'unavailable':s.directionDeg.toFixed(2)+'° clockwise from north'} · rover stationary`));
        card.append(make('small',s.uncertainty===null?'Uncertainty: not provided / not validated':`Reported uncertainty: ±${s.uncertainty} ${series.unit}`));
      }
      cards.append(card);
    }
    const series=data.series.find(s=>s.id===selection.variable),bin=series.bins[selection.index];q('.weather-chart').replaceChildren(trend(series,selection.index));
    q('.weather-bin-summary').textContent=`${series.label} · ${bin.count?`mean ${displayValue(series.id,bin.mean)}`:missingReason(bin)} · ${bin.count} accepted, ${bin.excluded} excluded, ${bin.missing} empty. Observed coverage ${(bin.coverageSeconds/300*100).toFixed(1)}% of this interval.`;
  }
  function sources(){
    const host=q('.weather-sources');host.replaceChildren();
    const citation=make('a','Rodriguez-Manfredi et al. (2021) · NASA PDS · DOI 10.17189/1522849');citation.href='https://doi.org/10.17189/1522849';citation.target='_blank';citation.rel='noopener noreferrer';host.append(citation);
    for(const source of data.sources){const p=make('p');const a=make('a',`${source.sensor} · PDS4 label & definitions`);a.href=source.labelUrl;a.target='_blank';a.rel='noopener noreferrer';p.append(a,make('small',source.lidvid),make('small',`UTC ${source.utcStart} — ${source.utcEnd}`),make('small',`${source.rows.toLocaleString()} input rows · SHA-256 ${source.sha256}`));host.append(p);}
    for(const series of data.series)host.append(make('p',`${series.label}: ${series.qa.accepted.toLocaleString()} / ${series.qa.inputRows.toLocaleString()} accepted. ${Object.entries(series.qa.reasons).map(([k,v])=>`${k}: ${v}`).join('; ')||'No exclusions.'}`));
    host.append(make('p','Humidity is relative to ice. Missing derived values are not replaced with calibrated readings. Wind requires a stationary rover; a single boom is not automatically rejected. Pressure uncertainty is withheld because its label lists an inconsistent unit.'));
    const link=make('a','MEDA README and quality guidance');link.href='https://atmos.nmsu.edu/PDS/data/PDS4/Mars2020/mars2020_meda/readme.txt';link.target='_blank';link.rel='noopener noreferrer';host.append(link,make('p',`Dataset ${catalog.datasetVersion} · prepared ${catalog.generatedAt}. Preparation time is not observation time.`));
  }
  async function load(){
    controller?.abort();controller=new AbortController();const id=++requestId;
    status.textContent='Loading local archive…';retry.hidden=true;q('.weather-data').hidden=true;
    try{
      catalog=await client.catalog(controller.signal);if(disposed||id!==requestId)return;
      const select=q('.weather-sol');select.replaceChildren(...catalog.sols.map(s=>new Option(`Sol ${s.sol} · archived`,String(s.sol))));
      const entry=catalog.sols.find(s=>s.sol===selection.sol)||catalog.sols[0];selection.sol=entry.sol;select.value=entry.sol;
      const next=await client.sol(entry,catalog.datasetVersion,controller.signal);if(disposed||id!==requestId)return;data=next;
      q('.weather-utc').textContent=`Temperature product UTC coverage: ${entry.utcStart} — ${entry.utcEnd}. Other sensors may cover less time.`;
      q('.weather-detector').value=selection.detector;q('.weather-variable').value=selection.variable.startsWith('temperature')?'temperature':selection.variable;
      sources();render();q('.weather-data').hidden=false;status.textContent=`Archived sol ${data.sol} loaded. Cards show actual samples within the selected interval; timestamps can differ.`;
    }catch(e){if(disposed||id!==requestId||e.name==='AbortError')return;data=null;status.textContent=`Weather unavailable: ${e.message}. The Mars simulation is unaffected.`;retry.hidden=false;}
  }
  retry.onclick=load;q('.weather-sol').onchange=e=>{selection.sol=+e.target.value;void load();};
  q('.weather-detector').onchange=e=>{selection.detector=e.target.value;if(selection.variable.startsWith('temperature'))selection.variable=selection.detector;render();};
  q('.weather-variable').onchange=e=>{selection.variable=e.target.value==='temperature'?selection.detector:e.target.value;render();};
  q('.weather-slider').oninput=e=>{selection.index=+e.target.value;render();};
  void load();
}
