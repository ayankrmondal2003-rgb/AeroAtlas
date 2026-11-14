# Feature 03: MEDA visibility and DONKI separation

## Findings

The existing MEDA drawer was wired to **Data layers → Jezero Weather** in both crater and Marswalk views, behind the Layers sheet on mobile. It was absent from the planner. The planner prominently displayed a separate DONKI advisory as “Space weather at Mars”, including raw HTTP failures. No Live Weather layer is present in the current terrain layer registry; the archived drawer is the existing replacement.

An additional local loading defect was reproduced: Windows CRLF conversion changed the bytes of both archived sol files and failed their SHA-256 integrity checks. Restoring LF gives the exact previously recorded hashes for both files. No observations, timestamps, quality exclusions, provenance or catalog checksums were changed. `.gitattributes` now preserves LF for the source and built MEDA JSON files.

## Changes

- Explicit **JEZERO WEATHER · MEDA** entry in Data layers and a compact shortcut at the top of the Marswalk planner, including archived sols and not-live labeling.
- Existing drawer retained with its selector, four measurement cards, sensor selector, archived time slider, trend plots, quality and source disclosures.
- Separate **SPACE WEATHER — NASA DONKI / Solar activity advisory** labels, also identified as DONKI in the orbit clock.
- Failed advisories say temporarily unavailable and unknown, never no activity. HTTP diagnostics go to the developer console.
- Manual advisory retry respects cached failure cooldowns; no automatic retry loop. Concurrent calls share one request. Rate limits stop fallback requests and honor Retry-After with a minimum 30-minute cooldown. Other failures back off one minute. Successful responses retain the existing 30-minute cache.
- Server preserves NASA 429 and Retry-After instead of masking them as 502, and rejects malformed successful responses instead of interpreting them as an empty forecast.
- EVA oxygen, metabolism, radiation, route and verdict calculations unchanged. Simulated mission sol 2039 remains separate from archived observation sols 70–71.

## Files

- `src/ui/hud.js`
- `src/ui/weatherIntelligence.js`
- `src/styles.css`
- `src/lib/spaceweather.js`
- `netlify/functions/space-weather.mjs`
- `.gitattributes`
- `public/data/meda/sol-0070.json`, `sol-0071.json`: original LF bytes restored only
- `scripts/test-spaceweather.mjs`
- `scripts/test-weather-browser.cjs`
- Generated `dist/` build output and screenshots under `artifacts/`

## Verification

- Production build passed.
- All 34 unit tests passed (MEDA, DONKI, readiness, Journal), plus startup regression checks.
- Desktop and iPhone 14 browser weather tests passed against the production build: both entry points, sols 70 and 71, actual measurements, missing wind, units, archived timestamps, charts, source links, retry, keyboard and focus, responsive drawer without horizontal overflow, unchanged simulation, Mineral Science access, Journal visibility, and no unexpected console errors.
- Injected DONKI 429 in desktop/mobile tests; readable unavailable messaging and manual retry without an extra network request passed.
- Desktop/mobile planner regression tests passed: layout, controls, all three verdict states and needles, oxygen updates, point of no return, elevation profile and stop removal.
- Desktop/mobile screenshots visually inspected for weather drawer layout. Mars globe startup, crater terrain and Marswalk transitions exercised.

Screenshots: `artifacts/weather/weather-desktop.png`, `weather-mobile.png`, `planner-weather-desktop.png`, `planner-weather-mobile.png`.

No commits or pushes. No application dependencies added.

Journal browser limitation: the extended desktop test passed recording, note/draft handling, replay, PNG export and IndexedDB persistence assertion, then timed out at test-journal-browser.cjs:42 trying to click the hidden Journal toggle after reloading into orbit. It did not complete recovery or the mobile run. Journal unit tests and desktop/mobile visibility checks passed; a full Journal regression pass is not claimed.
