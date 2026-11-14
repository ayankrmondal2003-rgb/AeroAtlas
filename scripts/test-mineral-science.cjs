// Requires Playwright + Chromium. Run against npm run dev:
// NODE_PATH=<Playwright installation>/node_modules node scripts/test-mineral-science.cjs
const { chromium, devices } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  try {
    for (const mobile of process.env.DEVICE ? [true] : [false, true]) {
      const context = await browser.newContext(mobile ? devices['iPhone 14'] : { viewport: { width: 1440, height: 1000 } });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
      await page.route('**/api/space-weather**', (r) => r.fulfill({ json: [] }));
      await page.route('https://api.nasa.gov/**', (r) => r.fulfill({ json: [], headers: { 'access-control-allow-origin': '*' } }));
      await page.goto(process.env.URL || 'http://127.0.0.1:5173/?q=low');
      await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' });
      await page.waitForFunction(() => document.getElementById('loader').classList.contains('done'), null, { timeout: 300000 });
      const idle = (mode) => page.waitForFunction((m) => window.solAtlas.mode === m && !window.solAtlas.busy, mode, { timeout: 120000 });
      await idle('orbit');
      assert(await page.evaluate(() => window.solAtlas.renderer.info.render.calls > 0), 'globe renders');
      await page.evaluate(() => { window.solAtlas.maxDt = 2.5; });
      await page.evaluate(() => window.solAtlas.descendToJezero());
      await idle('crater');
      for (const mode of ['crater', 'site']) {
        if (mode === 'site') {
          await page.evaluate(() => window.solAtlas.enterSite());
          await idle('site');
        }
        if (mobile && !(await page.locator('#btn-mineral-science').isVisible())) await page.locator('#btn-layers').click();
        const before = await page.evaluate(() => JSON.stringify({
          params: window.solAtlas.planner.params,
          result: window.solAtlas.planner.result,
          waypoints: window.solAtlas.planner.waypoints,
          layers: window.solAtlas.active.layers,
          sceneObjects: window.solAtlas.active.scene.children.length,
        }));
        const button = page.locator('#btn-mineral-science');
        await button.click();
        assert(await page.locator('#modal').isVisible());
        assert.equal(await page.locator('#modal').getAttribute('role'), 'dialog');
        const text = await page.locator('#modal-body').innerText();
        assert(text.includes('unverified for terrain registration'));
        assert(text.includes('no mineral markers'));
        assert(text.includes(mode === 'site' ? '6 × 6 km Marswalk zone' : 'Jezero crater view'));
        assert.equal(await page.locator('#modal-body a[href^="https://"]').count(), 5);
        // Focus trap and application shortcut isolation.
        await page.keyboard.press('Shift+Tab');
        assert(await page.evaluate(() => document.activeElement === document.querySelector('#modal-body a:last-of-type') || document.activeElement === [...document.querySelectorAll('#modal a')].at(-1)));
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(() => document.activeElement.id), 'modal-x');
        await page.keyboard.press('1');
        await page.keyboard.press('c');
        assert.equal(await page.evaluate(() => window.solAtlas.director.running), false);
        const after = await page.evaluate(() => JSON.stringify({
          params: window.solAtlas.planner.params,
          result: window.solAtlas.planner.result,
          waypoints: window.solAtlas.planner.waypoints,
          layers: window.solAtlas.active.layers,
          sceneObjects: window.solAtlas.active.scene.children.length,
        }));
        assert.equal(after, before, 'science panel leaves EVA, layers and scene objects unchanged');
        assert(await page.evaluate(() => {
          const card = document.querySelector('.modal-card');
          return card.scrollWidth <= card.clientWidth + 1 && document.documentElement.scrollWidth <= innerWidth;
        }), 'panel fits viewport');
        if (process.env.SHOT_DIR && mode === 'site') await page.screenshot({ path: `${process.env.SHOT_DIR}/mineral-${mobile ? 'mobile' : 'desktop'}.png` });
        await page.keyboard.press('Escape');
        await page.waitForFunction(() => document.getElementById('modal').hidden && document.activeElement.id === 'btn-mineral-science');
        assert.equal(await page.evaluate(() => window.solAtlas.mode), mode);
        await button.click();
        await page.locator('#modal-x').click();
        await page.waitForFunction(() => document.getElementById('modal').hidden);
        await button.click();
        await page.locator('#modal').click({ position: { x: 2, y: 2 } });
        await page.waitForFunction(() => document.getElementById('modal').hidden);
        console.log(`PASS ${mobile ? 'mobile' : 'desktop'} ${mode}: panel, citations, keyboard, close, layout, unchanged EVA/scene`);
      }
      await page.evaluate(() => window.solAtlas.exitUp());
      await idle('crater');
      await page.evaluate(() => window.solAtlas.exitUp());
      await idle('orbit');
      await page.locator('#btn-sources').click();
      assert((await page.locator('#modal-body').innerText()).includes('DATA SOURCES & CREDITS'));
      assert.equal(await page.locator('#modal').getAttribute('aria-labelledby'), null);
      await page.locator('#modal-x').click();
      assert.deepEqual(errors, [], 'no runtime or console errors');
      console.log(`PASS ${mobile ? 'mobile' : 'desktop'}: orbit → crater → site → crater → orbit, sources modal, no errors`);
      await context.close();
    }
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
