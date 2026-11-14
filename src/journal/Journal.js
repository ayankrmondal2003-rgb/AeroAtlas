import { MissionRecorder, active, points, summary, CATEGORIES, stamp } from './model.js';
import { MissionStore } from './storage.js';
import { JournalRoute } from './route.js';
import { renderReport, fmt, coordinates } from './report.js';

const node=(tag,text,cls)=>{const el=document.createElement(tag);if(text!=null)el.textContent=text;if(cls)el.className=cls;return el;};
export class Journal {
  constructor(app) {
    this.app=app;this.store=new MissionStore();this.history=new Map();this.source=null;this.selected=null;this.loaded=false;
    this.recorder=new MissionRecorder({changed:()=>{this.dirty=true;this.refresh();void this.save();}});
    this.route=new JournalRoute(app);this.urls=[];this.build();this.setView(app.mode);void this.load();
    this.timer=setInterval(()=>{this.refresh();if(active(this.recorder.mission)){this.recorder.flush();this.dirty=true;void this.save();}this.position();},2000);
    document.addEventListener('visibilitychange',()=>{if(document.hidden&&active(this.recorder.mission)){this.recorder.pause();this.message.textContent='Recording paused while the page is hidden. Resume when ready.';}});
    window.addEventListener('pagehide',()=>{if(active(this.recorder.mission)){this.recorder.flush();this.dirty=true;void this.save();}});
  }
  setView(mode) {
    this.el.hidden=mode!=='site';
    if(this.el.hidden){
      this.content.hidden=true;
      this.el.querySelector('.journal-toggle').setAttribute('aria-expanded','false');
    }
  }
  async load() {
    try {
      const saved=await this.store.list();
      for(const m of saved) {if(active(m)){m.status='Interrupted';m.finalized=false;}if(!this.history.has(m.id))this.history.set(m.id,m);}
      const unfinished=[...this.history.values()].filter(m=>m.status==='Interrupted'&&!m.finalized);
      if(unfinished.length)this.message.textContent=`Recovered ${unfinished.length} unfinished mission(s). Open HISTORY to review and finalize; no movement is reconstructed.`;
      this.storageError=null;this.loaded=true;
    } catch(error) {this.storageError=error.message;this.loaded=true;}
    this.refresh();
  }
  async save() {
    if(this.saving||this.storageError||!this.dirty||!this.recorder.mission)return;
    this.saving=true;this.dirty=false;const snapshot=structuredClone(this.recorder.mission);
    this.history.set(snapshot.id,snapshot);this.refreshStorage();
    try {await this.store.save(snapshot);this.storageError=null;this.saved=true;}
    catch(error){this.storageError=error.message;this.dirty=true;this.saved=false;}
    this.saving=false;this.refreshStorage();
    if(this.dirty&&!this.storageError)void this.save();
  }
  feed(position,dt,epoch,mode,oxygen,capacity,watts) {
    const ll=this.app.site.xzToLonLat(position.x,position.z);
    this.source={x:position.x,z:position.z,...ll,epoch,mode,oxygen,capacity,watts};
    this.recorder.ingest(this.source,dt);
  }
  sourceAvailable() {return this.app.mode==='site'&&!this.app.busy&&(this.app.fpv?.active||!!this.app.planner.sim);}
  start() {
    if(!this.loaded)throw Error('History is still loading.');
    if([...this.history.values()].some(m=>m.status==='Interrupted'&&!m.finalized))throw Error('Review and finalize recovered missions in HISTORY first.');
    if(!this.sourceAvailable())throw Error('Enter helmet view or start EV1 playback before recording.');
    const a=this.app,fp=a.fpv,sim=a.planner.sim;
    const position=sim?.pos || (fp?.active?fp.pos:null);
    if(!position)throw Error('Wait for the simulated astronaut position.');
    const epoch=sim?`sim-${sim.journalEpoch}`:`helmet-${fp.journalEpoch}`;
    const sample={...position,...a.site.xzToLonLat(position.x,position.z),epoch,mode:sim?(a.planner.params.rover?'rover':'EV1 playback'):'helmet walk',oxygen:Math.max(0,a.planner.params.o2CapKg-(sim?sim.state?.o2||0:fp.o2Used)),capacity:a.planner.params.o2CapKg,watts:null};
    const planned=(a.planner.result?.route||[]).map(p=>({...p,...a.site.xzToLonLat(p.x,p.z)}));
    this.selected=null;this.replaying=false;
    this.recorder.start(a.hud.mt?.ms||Date.now(),sample,a.site.meta,planned);
    this.message.textContent='Recording started.';
  }
  build() {
    this.el=node('aside',null,'eva-journal');this.el.setAttribute('aria-label','EVA Mission Journal');
    this.el.innerHTML=`<button class="btn journal-toggle" aria-expanded="false" aria-controls="journal-content">JOURNAL <span class="journal-rec"></span></button>
      <div id="journal-content" hidden>
      <nav class="journal-tabs" aria-label="Journal sections"><button class="btn" data-tab="record">RECORD</button><button class="btn" data-tab="notes">NOTES</button><button class="btn" data-tab="history">HISTORY</button></nav>
      <div class="journal-message" role="status"></div>
      <section data-pane="record"><h3>SIMULATED EVA</h3><div class="journal-summary"></div><div class="journal-actions"><button class="btn primary" data-action="start">START RECORDING</button><button class="btn" data-action="pause">PAUSE</button><button class="btn" data-action="resume">RESUME</button><button class="btn" data-action="end">END RECORDING</button></div></section>
      <section data-pane="notes" hidden><form class="journal-form"><label>Category<select name="category"></select></label><label>Field note<textarea name="note" rows="4" required placeholder="Record an observation…"></textarea></label><button class="btn primary" type="submit">SAVE ENTRY</button><button class="btn" type="button" data-action="cancel-edit" hidden>CANCEL EDIT</button></form><div class="journal-notes"></div></section>
      <section data-pane="history" hidden><label>Filter by sol<input class="journal-sol" type="number" min="0" placeholder="All sols"></label><label>Saved mission<select class="journal-missions"><option value="">Choose a mission</option></select></label><div class="journal-history-summary"></div><div class="journal-actions"><button class="btn" data-action="recover" hidden>FINALIZE INTERRUPTED</button><button class="btn" data-action="replay">REPLAY ROUTE</button><button class="btn" data-action="live">LIVE ROUTE</button><button class="btn" data-action="export">EXPORT PNG REPORT</button></div><label>Recorded sample<input class="journal-replay" type="range" min="0" value="0" max="0"></label><div class="journal-replay-time"></div><div class="journal-downloads"></div><div class="journal-history-notes"></div></section>
      <div class="journal-storage" role="status"></div><button class="btn" data-action="retry" hidden>RETRY SAVE / STORAGE</button><p class="journal-local">Stored in this browser. Clearing site data can erase mission records. Simulated telemetry only.</p></div>`;
    document.getElementById('hud').append(this.el);
    this.message=this.el.querySelector('.journal-message');this.content=this.el.querySelector('#journal-content');
    this.form=this.el.querySelector('form');for(const category of CATEGORIES)this.form.elements.category.append(new Option(category,category));
    this.el.querySelector('.journal-toggle').onclick=()=>{this.content.hidden=!this.content.hidden;this.el.querySelector('.journal-toggle').setAttribute('aria-expanded',String(!this.content.hidden));this.position();};
    this.el.addEventListener('focusin',()=>{this.app.keys.clear();});
    this.el.addEventListener('keydown',event=>{event.stopPropagation();if(event.key==='Escape'){this.content.hidden=true;this.el.querySelector('.journal-toggle').setAttribute('aria-expanded','false');this.el.querySelector('.journal-toggle').focus();}});
    this.el.addEventListener('pointerdown',e=>e.stopPropagation());
    this.el.addEventListener('click',e=>{const tab=e.target.closest('[data-tab]');if(tab){for(const pane of this.el.querySelectorAll('[data-pane]'))pane.hidden=pane.dataset.pane!==tab.dataset.tab;for(const b of this.el.querySelectorAll('[data-tab]'))b.classList.toggle('on',b===tab);this.position();}const action=e.target.closest('[data-action]');if(action)void this.action(action.dataset.action);});
    this.form.onsubmit=event=>{event.preventDefault();void this.saveNote();};
    this.el.querySelector('.journal-sol').oninput=()=>this.renderHistory();
    this.el.querySelector('.journal-missions').onchange=e=>{this.selected=e.target.value||null;this.replaying=false;this.renderSelection();};
    this.el.querySelector('.journal-replay').oninput=e=>{this.replaying=false;this.showSample(+e.target.value);};
  }
  async action(action) {
    try {
      const r=this.recorder,m=this.history.get(this.selected);
      if(action==='start')this.start();
      if(action==='pause')r.pause();
      if(action==='resume'){if(!this.sourceAvailable())throw Error('Enter helmet view or start EV1 playback to resume.');r.resume();}
      if(action==='end')r.end();
      if(action==='cancel-edit'){this.editId=null;this.editingMission=null;this.form.elements.note.value='';this.el.querySelector('[data-action="cancel-edit"]').hidden=true;}
      if(action==='retry'){this.storageError=null;await this.load();if(this.pendingRecovery){await this.store.save(this.pendingRecovery);this.history.set(this.pendingRecovery.id,this.pendingRecovery);this.pendingRecovery=null;this.renderSelection();}this.dirty=!!r.mission;await this.save();}
      if(action==='recover'&&m&&!m.finalized){if(this.pendingRecovery)throw Error('Retry the pending save first.');const copy=structuredClone(m);copy.finalized=true;copy.end=stamp(copy.clockMs,copy.elapsed);copy.summary=summary(copy);this.pendingRecovery=copy;this.refreshStorage();await this.store.save(copy);this.history.set(copy.id,copy);this.pendingRecovery=null;this.storageError=null;this.renderSelection();}
      if(action==='live'){this.selected=null;this.replaying=false;this.el.querySelector('.journal-missions').value='';this.route.show(r.mission);}
      if(action==='replay'&&m){if(r.mission?.status==='Recording')throw Error('Pause recording before reviewing a saved route.');this.replaying=!this.replaying;this.replayIndex=0;this.replayAt=performance.now();this.showSample(0);}
      if(action==='export'&&m){this.message.textContent='Rendering registered terrain report…';const pages=await renderReport(m);const host=this.el.querySelector('.journal-downloads');host.replaceChildren();for(const url of this.urls)URL.revokeObjectURL(url);this.urls=[];for(const page of pages){const url=URL.createObjectURL(page.blob);this.urls.push(url);const link=node('a',`Download ${page.name}`);link.href=url;link.download=page.name;host.append(link);}this.message.textContent=`${pages.length} PNG report page(s) ready below.`;}
      this.refresh();this.renderNotes();
    } catch(error){this.message.textContent=error.message;if(action==='recover'||action==='retry'){this.storageError=error.message;this.refreshStorage();}}
  }
  refreshStorage() {
    this.el.querySelector('.journal-storage').textContent=this.storageError?`NOT SAVED: ${this.storageError}`:this.saving?'Saving…':this.dirty||this.pendingRecovery?'Changes pending save':this.saved?'Saved locally (transaction complete)':'Browser-local mission history';
    this.el.querySelector('[data-action="retry"]').hidden=!this.storageError;
  }
  refresh() {
    const m=this.recorder.mission,s=m?summary(m):null;
    this.el.querySelector('.journal-rec').textContent=m?.status==='Recording'?'● REC':'';
    this.el.querySelector('.journal-summary').textContent=m?`${m.status} · ${m.id.slice(0,8)}\nSol ${stamp(m.clockMs).sol} · ${stamp(m.clockMs).lmst} LMST\n${fmt(m.elapsed,' s')} · ${fmt(s.distance,' m')} · ${m.entries.length} notes`:'Idle · enter helmet view or run EV1 to record.';
    for(const [action,disabled]of [['start',!this.loaded||active(m)||!this.sourceAvailable()],['pause',m?.status!=='Recording'],['resume',m?.status!=='Paused'],['end',!active(m)]])this.el.querySelector(`[data-action="${action}"]`).disabled=disabled;
    this.form.querySelector('[type="submit"]').disabled=!active(m)&&!this.editingMission;
    if(m)this.history.set(m.id,structuredClone(m));
    this.renderHistory();this.refreshStorage();
    if(!this.selected){this.route.show(m);this.renderNotes();}
  }
  renderHistory() {
    const select=this.el.querySelector('.journal-missions'),filter=this.el.querySelector('.journal-sol').value;
    const missions=[...this.history.values()].filter(m=>filter===''||(m.start.sol<=+filter&&(m.end?.sol??stamp(m.clockMs).sol)>=+filter)).sort((a,b)=>b.start.timestamp-a.start.timestamp);
    const signature=missions.map(m=>`${m.id}:${m.status}:${m.finalized}:${m.entries.length}:${Math.floor(m.elapsed)}`).join('|');if(signature===this.historySig)return;this.historySig=signature;
    select.replaceChildren(new Option('Choose a mission',''));
    for(const m of missions)select.append(new Option(`Sol ${m.start.sol} ${m.start.lmst}–${m.end?.lmst||'…'} · ${m.status} · ${fmt(m.distance,'m')} · ${fmt(m.elapsed/60,'min')} · ${m.entries.length} notes · ${m.id.slice(0,8)}`,m.id));
    select.value=this.selected||'';
  }
  renderSelection() {
    const m=this.history.get(this.selected);const s=m?summary(m):null;
    this.el.querySelector('.journal-history-summary').textContent=m?`${m.status} · ${m.id.slice(0,8)}\n${fmt(s.distance,' m')} · ${fmt(s.duration,' s')}\nO₂ used ${fmt(s.oxygenConsumed,' kg',3)}${s.oxygenPartial && s.oxygenConsumed !== null ? ' (partial coverage)' : ''} · left ${fmt(s.oxygenRemaining,' kg',3)}\nPower ${fmt(s.averageW,' W')} · energy ${fmt(s.energyJ===null?null:s.energyJ/1000,' kJ')}\n${this.app.mode==='site'?'Red actual / cyan saved plan':'Enter Marswalk zone to view the 3D route; report remains available.'}`:'';
    this.el.querySelector('[data-action="recover"]').hidden=!(m?.status==='Interrupted'&&!m.finalized);
    for(const action of ['replay','export'])this.el.querySelector(`[data-action="${action}"]`).disabled=!m;
    const slider=this.el.querySelector('.journal-replay');slider.max=Math.max(0,points(m).length-1);slider.value=slider.max;slider.disabled=!points(m).length;
    this.route.show(m);this.renderEntries(this.el.querySelector('.journal-history-notes'),m,true);
  }
  renderNotes(){this.renderEntries(this.el.querySelector('.journal-notes'),this.recorder.mission,true);}
  renderEntries(host,m,editable){
    const sig=JSON.stringify(m?.entries||[])+editable+(m?.status||'');if(host.dataset.signature===sig)return;host.dataset.signature=sig;host.replaceChildren();
    for(const entry of m?.entries||[]){const card=node('article',null,'journal-entry');card.append(node('strong',`${entry.category} · Sol ${entry.sol} ${entry.lmst}`),node('p',entry.text),node('small',coordinates(entry.position)));
      if(editable){const edit=node('button','EDIT','btn');edit.onclick=()=>{this.editId=entry.id;this.editingMission=active(this.recorder.mission)&&this.recorder.mission.id===m.id?null:m.id;this.form.elements.category.value=entry.category;this.form.elements.note.value=entry.text;this.el.querySelector('[data-tab="notes"]').click();this.el.querySelector('[data-action="cancel-edit"]').hidden=false;this.form.querySelector('[type="submit"]').disabled=false;this.form.elements.note.focus();};const del=node('button','DELETE','btn');del.onclick=()=>{if(confirm('Delete this field note?')){if(active(this.recorder.mission)&&this.recorder.mission.id===m.id){this.recorder.deleteNote(entry.id);this.renderNotes();}else{const copy=structuredClone(m);copy.entries=copy.entries.filter(e=>e.id!==entry.id);void this.saveHistorical(copy);}}};card.append(edit,del);}host.append(card);
    }
  }
  showSample(index){const m=this.history.get(this.selected);if(!m)return;this.route.show(m,index);const p=points(m)[index];this.el.querySelector('.journal-replay').value=index;this.el.querySelector('.journal-replay-time').textContent=p?`REPLAY · Sol ${p.sol} ${p.lmst} · +${fmt(p.elapsed,' s')} · ${p.mode}`:'No position recorded.';}
  async saveHistorical(copy) {
    if(this.pendingRecovery){this.message.textContent='Retry the pending save before making another historical edit.';return false;}
    copy.summary=summary(copy);
    this.pendingRecovery=copy;
    this.refreshStorage();
    try{await this.store.save(copy);this.history.set(copy.id,copy);if(this.recorder.mission?.id===copy.id&&!active(this.recorder.mission))this.recorder.mission=structuredClone(copy);this.pendingRecovery=null;this.storageError=null;this.saved=true;this.renderSelection();this.refresh();return true;}
    catch(error){this.storageError=error.message;this.message.textContent='Edit retained in memory; retry saving before leaving.';this.refreshStorage();return false;}
  }
  async saveNote() {
    try{
      const category=this.form.elements.category.value,text=this.form.elements.note.value;
      if(this.editingMission){if(!text.trim()||!CATEGORIES.includes(category))throw Error('Enter a note and valid category.');const copy=structuredClone(this.history.get(this.editingMission));const entry=copy.entries.find(e=>e.id===this.editId);if(!entry)throw Error('Entry not found.');entry.category=category;entry.text=text.trim();entry.edited=stamp(copy.clockMs,copy.elapsed);if(!await this.saveHistorical(copy))return;}
      else this.recorder.note(category,text,this.editId);
      this.editId=null;this.editingMission=null;this.form.elements.note.value='';this.el.querySelector('[data-action="cancel-edit"]').hidden=true;this.renderNotes();this.refresh();
    }catch(error){this.message.textContent=error.message;}
  }
  frame(now){this.route.update();if(this.replaying&&now-this.replayAt>=200){this.replayAt=now;const n=points(this.history.get(this.selected)).length;this.replayIndex++;if(this.replayIndex>=n)this.replaying=false;else this.showSample(this.replayIndex);}if(!this.positionAt||now-this.positionAt>250){this.positionAt=now;this.position();}}
  position(){
    const suit=document.getElementById('h-suit'),helmet=this.app.fpv?.active;
    this.el.classList.toggle('journal-helmet',!!helmet);
    if(helmet&&suit){const rect=suit.getBoundingClientRect();const bottom=innerHeight-rect.top+8;this.el.style.left=`${rect.left}px`;this.el.style.width=`${rect.width}px`;this.el.style.bottom=`${bottom}px`;const toggle=this.el.querySelector('.journal-toggle').getBoundingClientRect().height;const clearance=this.app.h<540?16:this.app.touch?56:84;this.content.style.maxHeight=`${Math.max(16,rect.top-toggle-clearance)}px`;}
    else {this.el.style.left='';this.el.style.width='';this.el.style.bottom='';this.content.style.maxHeight='';}
  }
}
