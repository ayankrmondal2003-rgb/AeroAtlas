const {chromium,devices}=require('playwright');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');
const out=path.resolve('artifacts/planner');fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});try{for(const mobile of [false,true]){
 const ctx=await browser.newContext(mobile?devices['iPhone 14']:{viewport:{width:1440,height:1000}});const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/space-weather**',r=>r.fulfill({json:[]}));await page.route('https://api.nasa.gov/**',r=>r.fulfill({json:[],headers:{'access-control-allow-origin':'*'}}));
 await page.goto(process.env.URL||'http://127.0.0.1:4175/?q=low');await page.waitForFunction(()=>window.solAtlas?.journal&&document.getElementById('loader').classList.contains('done'),null,{timeout:180000});
 const idle=m=>page.waitForFunction(mode=>window.solAtlas.mode===mode&&!window.solAtlas.busy,m,{timeout:120000});await page.evaluate(()=>{window.solAtlas.maxDt=2.5;window.solAtlas.descendToJezero();});await idle('crater');await page.evaluate(()=>window.solAtlas.enterSite());await idle('site');if(mobile)await page.locator('#btn-info').click();
 await page.locator('#panel-left').screenshot({path:path.join(out,`planner-${mobile?'mobile':'desktop'}.png`)});
 assert(await page.evaluate(()=>{const p=document.getElementById('panel-left');return p.scrollHeight>p.clientHeight&&p.scrollWidth<=p.clientWidth+1;}),'internal scrolling without horizontal overflow');
 assert(await page.evaluate(()=>document.getElementById('panel-left').getBoundingClientRect().bottom<=document.querySelector('.eva-journal').getBoundingClientRect().top),'planner clears the Journal control');
 const rows=await page.locator('.planner-primary-actions button').evaluateAll(els=>els.map(e=>e.getBoundingClientRect().top));assert(rows.every(y=>Math.abs(y-rows[0])<1),'first action row aligned');
 await page.locator('#b-rover').click();assert(await page.evaluate(()=>window.solAtlas.planner.params.rover));await page.locator('#b-foot').click();assert(!await page.evaluate(()=>window.solAtlas.planner.params.rover));
 await page.locator('#b-follow').click();assert(await page.locator('#b-follow').evaluate(el=>el.classList.contains('on')===window.solAtlas.planner.follow));
 const options=await page.locator('#p-goal option').evaluateAll(els=>els.map(e=>e.value));await page.locator('#p-goal').selectOption(options[0]);assert.equal(await page.evaluate(()=>window.solAtlas.planner.goal),options[0]);
 // A short valid terrain route is selected from the actual existing solved route.
 await page.evaluate(()=>{const a=window.solAtlas,p=a.planner;const point=p.result.samples.find(s=>s.d>=250);p.waypoints=[p.waypoints[0],{name:'QA terrain stop',x:point.x,z:point.z}];p.params.o2CapKg=1.2;p.params.maxSlope=30;p.params.stopMin=5;a.site.setTime(9.25);p.compute();});
 const check=async(status,angle)=>{assert.equal(await page.locator('.mission-readiness').getAttribute('data-verdict'),status);assert.equal(await page.evaluate(()=>window.solAtlas.planner.result.verdict.lvl),status);assert.equal(await page.locator('.readiness-needle').getAttribute('transform'),`rotate(${angle} 120 120)`);await page.locator('.mission-readiness').scrollIntoViewIfNeeded();await page.locator('.mission-readiness').screenshot({path:path.join(out,`${status}-${mobile?'mobile':'desktop'}.png`)});};
 await check('go',60);
 await page.evaluate(()=>{const a=window.solAtlas,r=a.planner.result;a.site.setTime(r.sun.sunset-r.budget.totalT/3698.9-.5);a.planner.refreshSun();});await check('caution',0);assert((await page.locator('.readiness-info').textContent()).includes('daylight'));
 await page.locator('#b-plan').click();await page.locator('#p-o2').evaluate(el=>{el.value='0.2';el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));});await check('nogo',-60);
 const pnr=await page.evaluate(()=>window.solAtlas.planner.result.pnr);if(pnr)assert((await page.locator('.planner-pnr').textContent()).includes((pnr.d/1000).toFixed(2)));
 await page.locator('#profile').scrollIntoViewIfNeeded();assert(await page.locator('#profile svg').count());assert((await page.locator('.planner-profile-heading').textContent()).includes('HiRISE'));
 const before=await page.locator('#wps .wp').count();await page.locator('[data-rm]').last().click();assert.equal(await page.locator('#wps .wp').count(),before-1);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);console.log(`PASS ${mobile?'mobile':'desktop'}: planner layout, controls, all three real verdicts/needles, O2 update, PNR, profile and remove stop`);await ctx.close();
}}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
