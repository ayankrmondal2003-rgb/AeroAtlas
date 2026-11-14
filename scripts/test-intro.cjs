const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('src/ui/intro.js','utf8').replace('export function','function');
const html = fs.readFileSync('index.html','utf8');
const loaderHtml = html.slice(html.indexOf('<div id="loader"'), html.indexOf('<div id="modal"'));
assert.match(loaderHtml, /src="\.\/media\/aeroatlas-intro.mp4" autoplay muted playsinline loop/);
assert(!/<button|loader-fallback|loader-video-toolbar|loader-bar/.test(loaderHtml));
function setup(mode) {
  const classes = new Set();
  const video = {src:'media/aeroatlas-intro.mp4', pause(){this.paused=true;}, removeAttribute(name){this[name]='';}, load(){}, play(){if(mode==='throw')throw Error('unsupported');return mode==='blocked'?Promise.reject(Error('blocked')):Promise.resolve();}};
  const loader = {classList:{add:name=>classes.add(name)}};
  const log = {hidden:true};
  const context=vm.createContext({document:{getElementById:id=>({'loader':loader,'loader-video':video,'loader-log':log}[id])}});
  vm.runInContext(source+'\nvar controller = startLoadingVideo();',context);
  return {video,loader,log,classes,controller:context.controller};
}
(async()=>{
  for(const mode of ['normal','blocked','throw']) {
    const s=setup(mode); await Promise.resolve();
    assert.equal(s.video.muted,true);assert.equal(s.video.playsInline,true);assert.equal(s.video.controls,false);
    s.controller.finish();assert(s.classes.has('done'));assert.equal(s.loader.inert,true);assert.equal(s.video.src,'');assert.equal(s.video.paused,true);
  }
  const s=setup('normal');s.controller.fail();assert.equal(s.log.hidden,false);
  console.log('PASS: immediate autoplay markup, no loader controls/title/progress, muted inline playback, ready cleanup, autoplay failure and startup error');
})().catch(e=>{console.error(e);process.exitCode=1;});
