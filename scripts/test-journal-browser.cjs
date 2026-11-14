const {chromium,devices}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const output=path.resolve('artifacts/journal');fs.mkdirSync(output,{recursive:true});
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 try {
  for(const mobile of [false,true]) {
   const context=await browser.newContext(mobile?devices['iPhone 14']:{viewport:{width:1440,height:1000},acceptDownloads:true});
   const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.route('**/api/space-weather**',r=>r.fulfill({json:[]}));await page.route('https://api.nasa.gov/**',r=>r.fulfill({json:[],headers:{'access-control-allow-origin':'*'}}));
   const boot=async()=>{await page.goto(process.env.URL||'http://127.0.0.1:4175/?q=low');await page.waitForFunction(()=>document.getElementById('loader').classList.contains('done')&&window.solAtlas.journal.loaded,null,{timeout:180000});};
   const idle=mode=>page.waitForFunction(m=>window.solAtlas.mode===m&&!window.solAtlas.busy,mode,{timeout:120000});
   await boot();console.log('journal boot',mobile);
   assert(await page.locator('#journal-content').isHidden(),'collapsed by default');
   await page.evaluate(()=>{window.solAtlas.maxDt=2.5;window.solAtlas.descendToJezero();});await idle('crater');await page.evaluate(()=>window.solAtlas.enterSite());await idle('site');console.log('journal site',mobile);
   await page.evaluate(()=>{window.solAtlas.maxDt=.1;window.solAtlas.fpv.enter();});
   if(await page.locator('#h-portrait').isVisible())await page.locator('#h-portrait').click();
   await page.locator('.journal-toggle').click();console.log('helmet open',await page.evaluate(()=>({mode:window.solAtlas.mode,active:window.solAtlas.fpv.active,loaded:window.solAtlas.journal.loaded})));
   await page.waitForFunction(()=>!document.querySelector('[data-action="start"]').disabled);
   await page.locator('[data-action="start"]').click();
   console.log('recording started');const id=await page.evaluate(()=>window.solAtlas.journal.recorder.mission.id);
   await page.evaluate(()=>window.solAtlas.keys.add('w'));await page.waitForTimeout(1700);await page.evaluate(()=>window.solAtlas.keys.clear());
   assert(await page.evaluate(()=>window.solAtlas.journal.recorder.mission.distance>0),'actual walk recorded');
   await page.locator('[data-action="pause"]').click();const before=await page.evaluate(()=>window.solAtlas.journal.recorder.mission.elapsed);await page.waitForTimeout(500);assert.equal(await page.evaluate(()=>window.solAtlas.journal.recorder.mission.elapsed),before);
   await page.locator('[data-action="resume"]').click();await page.waitForTimeout(300);
   await page.locator('[data-tab="notes"]').click();await page.locator('textarea[name="note"]').fill('Observed the local HiRISE terrain during a simulated helmet walk. <img src=x onerror=alert(1)> is literal journal text.');
   await page.locator('.journal-toggle').click();await page.locator('.journal-toggle').click();assert((await page.locator('textarea').inputValue()).includes('HiRISE'),'draft survives collapse');
   await page.locator('.journal-form [type="submit"]').click();assert.equal(await page.locator('.journal-entry img').count(),0,'safe note rendering');
   await page.locator('[data-tab="record"]').click();
   const bounds=await page.evaluate(()=>{const j=document.querySelector('.eva-journal').getBoundingClientRect(),s=document.getElementById('h-suit').getBoundingClientRect();return {j:{left:j.left,right:j.right,top:j.top,bottom:j.bottom,width:j.width},s:{left:s.left,top:s.top,width:s.width},w:innerWidth};});
   assert(Math.abs(bounds.j.left-bounds.s.left)<2,'aligned left');assert(bounds.j.bottom<=bounds.s.top-6,'above suit');assert(bounds.j.top>=0,'not clipped above viewport');assert(bounds.j.right<bounds.w*.5,'central view clear');
   await page.screenshot({path:path.join(output,mobile?'journal-mobile.png':'journal-desktop.png')});
   await page.locator('[data-action="end"]').click();await page.waitForFunction(()=>!window.solAtlas.journal.saving&&!window.solAtlas.journal.dirty);
   await page.locator('[data-tab="history"]').click();await page.locator('.journal-missions').selectOption(id);
   await page.locator('[data-action="replay"]').click();await page.waitForTimeout(400);await page.locator('.journal-replay').fill('0');
   await page.locator('[data-action="export"]').click();await page.waitForSelector('.journal-downloads a',{timeout:30000});
   const downloadPromise=page.waitForEvent('download');await page.locator('.journal-downloads a').first().click();const download=await downloadPromise;await download.saveAs(path.join(output,mobile?'mission-mobile.png':'mission-desktop.png'));
   // Real IndexedDB read after reload; no in-memory history survives this navigation.
   await boot();assert(await page.evaluate(id=>window.solAtlas.journal.history.has(id),id),'mission survives reload');
   await page.locator('.journal-toggle').click();await page.locator('[data-tab="history"]').click();await page.locator('.journal-missions').selectOption(id);
   assert((await page.locator('.journal-history-notes').textContent()).includes('HiRISE'),'notes survive reload');
   // Write a genuinely unfinished record via the recorder, then verify recovery.
   await page.evaluate(()=>{const a=window.solAtlas,j=a.journal;j.recorder.start(a.hud.mt.ms,null,a.site.meta,[]);});
   await page.waitForFunction(()=>!window.solAtlas.journal.saving&&!window.solAtlas.journal.dirty);
   const unfinished=await page.evaluate(()=>window.solAtlas.journal.recorder.mission.id);await boot();
   assert.equal(await page.evaluate(id=>window.solAtlas.journal.history.get(id).status,unfinished),'Interrupted');
   await page.locator('.journal-toggle').click();await page.locator('[data-tab="history"]').click();await page.locator('.journal-missions').selectOption(unfinished);await page.locator('[data-action="recover"]').click();
   await page.waitForFunction(id=>window.solAtlas.journal.history.get(id).finalized,unfinished);
   assert.deepEqual(errors,[],'no runtime errors');
   console.log(`PASS ${mobile?'mobile':'desktop'}: movement, pause/resume, note/draft safety, HUD geometry, replay, PNG download, reload persistence and recovery`);
   await context.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
