const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

// Execute the actual entry point, not a duplicate of the startup wiring.
const main = fs.readFileSync('src/main.js', 'utf8');
const entryOffset = main.indexOf('const loadingVideo = startLoadingVideo();');
assert(entryOffset >= 0, 'initialize the current loader before creating the app');
assert(!main.includes('showFirstVisitIntro'), 'removed intro function must not be called');
const entry = main.slice(entryOffset).replace('void boot();', 'globalThis.bootResult = boot();');

(async () => {
  for (const failure of [null, 'constructor', 'assets']) {
    const events = [];
    const log = {};
    const context = vm.createContext({
      window: {},
      document: { getElementById: id => { assert.equal(id, 'loader-log'); return log; } },
      console: { error() {} },
      startLoadingVideo: () => {
        events.push('video');
        return { fail: () => events.push('failure') };
      },
      App: class {
        constructor() {
          events.push('app');
          if (failure === 'constructor') throw Error('WebGL unavailable');
        }
        async start() {
          events.push('assets');
          if (failure === 'assets') throw Error('Asset unavailable');
        }
      },
    });
    vm.runInContext(entry, context);
    await context.bootResult;
    assert.deepEqual(events, failure === 'constructor'
      ? ['video', 'app', 'failure']
      : failure === 'assets' ? ['video', 'app', 'assets', 'failure'] : ['video', 'app', 'assets']);
    if (failure) assert.match(log.textContent, /^Failed to start:/);
    else assert(context.window.solAtlas);
  }
  console.log('PASS: actual startup entry loads the app; constructor and asset errors show a visible failure');
})().catch(err => { console.error(err); process.exitCode = 1; });
