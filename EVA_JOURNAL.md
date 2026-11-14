# EVA Mission Journal & Route Replay

## Usage

Open **JOURNAL** (collapsed by default). In the Marswalk zone, enter helmet view or start the existing EV1 simulation, then choose **RECORD → START RECORDING**. Use NOTES for field entries and HISTORY for saved missions, sol filtering, sample replay and downloadable PNG report pages. The journal remains accessible outside helmet view. To see a historical route in 3D, enter the Marswalk zone; reports remain available from other views.

Recording and pause are separate from simulation playback. Pausing recording excludes elapsed recording time and creates a new route segment on resume. The mission's Mars clock continues when the underlying astronaut simulation advances. Leaving free-walk helmet view or hiding the browser tab pauses recording. Replayed samples never move the live astronaut. Keyboard focus in the Journal clears held movement keys and suppresses map shortcuts.

## Modules and integration

- `src/journal/model.js`: serializable schema v1, recording state machine, actual movement samples, segmented route, notes, common mission timestamps and summary calculations.
- `src/journal/storage.js`: IndexedDB database `aeroatlas-eva-journal`, version 1, `missions` object store keyed by mission UUID. Upgrade creates a missing store without deleting existing records. Success is acknowledged only at transaction completion.
- `src/journal/Journal.js`: HUD/controller, draft-preserving tabs, history, recovery, error/retry states, report links and simulated movement adapter.
- `src/journal/route.js`: independent red Three.js route segments and START/END or replay markers; cyan historical plan comparison. Terrain exaggeration and viewport resolution are refreshed without altering the planner.
- `src/journal/report.js`: deterministic 1600 × 1000 Canvas2D report layout, real local HiRISE map registration, metrics, note pagination and PNG encoding.
- `src/main.js`: creates Journal after terrain/planner initialization, updates the review display and excludes journal fields from map input.
- `src/terrain/FirstPerson.js`: emits actual free-walk position, simulation interval and suit readings after movement integration. Each new helmet session gets a distinct continuity identifier.
- `src/terrain/Planner.js`: emits the actual advancing EV1 position before simulation completion clears it. Walking playback and rover playback are separately labeled. No A* route is treated as recorded movement.
- `src/styles.css`: compact semi-transparent left HUD, responsive positioning above SUIT / EV1, independently scrollable tabs.

## Coordinates and continuity

Terrain x/z coordinates are kilometres; x increases east and z increases south. Horizontal distance uses differences in these coordinates multiplied by 1000, never screen pixels. The recorder checks each simulation update, retaining route samples roughly every metre, or after two simulation seconds when moving. It flushes short final movements on pause/end. Stationary frames do not create redundant route points. New epochs, pause/resume boundaries and impossible step speeds (greater than 15 m/s plus a 2 m tolerance) break segments; jumps are not added to distance. Distance aggregates accepted per-update motion, while the drawn route is the sampled representation.

## Mission clock

The existing HUD's Mars24 epoch initializes a new mission clock. The existing `marsTime`, `localTime`, `perseveranceSol` and `formatHM` functions convert that numerical epoch to Jezero LMST and mission sol. After initialization, only supplied simulation seconds advance the mission epoch: free-walk dt × displayed warp, or actual EV1 simulation-time increments. Camera motion, replay and page loading never advance it. Notes, telemetry and route points share the same clock. Numerical timestamps provide ordering across sol boundaries. The separate lighting LTST slider is not mislabeled as LMST.

## Oxygen and metabolism

Suit remaining oxygen comes from the existing capacity and actual integrated O2 use. Existing scientific equations and pathfinding are unchanged. Interval metabolic power is recovered from the exact O2 increment using the existing `o2KgPerSec(1)` conversion; this describes the rate actually integrated by the suit model rather than invented historical readings. Energy is the sum of W × simulated seconds; mean power divides energy by the duration of valid recorded intervals. Coverage seconds are printed in the report. A source/session change creates a telemetry discontinuity.

Oxygen consumption is first-minus-last only when every saved telemetry snapshot has a comparable suit epoch and capacity. Otherwise it is N/A. This endpoint difference includes consumption during recording pauses, whereas power integration and recorded duration exclude pauses. Remaining oxygen is the last captured reading, not the current live suit. Missing telemetry stays N/A. A replay never supplies telemetry to the recorder.

## Persistence and recovery

Controls and note changes request immediate writes. Active movement is checkpointed approximately every two wall-clock seconds, and on page visibility changes/pagehide when the browser allows it. The recorder retains failed writes in memory and exposes retry only after an actual failure. Refresh may lose the latest uncommitted checkpoint; unload transactions are not guaranteed by browsers. Previously committed records are retained. Reloaded unfinished missions are marked Interrupted and must be reviewed/finalized before starting another recording; there is no fabricated reconstruction of movement during absence.

Storage is local to this browser and origin. Clearing site data/private-session expiry may erase it. No backend, account sync, migration deletion, commit or push is introduced. Concurrent recording of the same session across multiple tabs is not supported; each new recording uses its own UUID.

## Terrain report

The mission snapshots site bounds and the planned route. The report loads `public/data/s_visible.jpg` through the app's base URL. Normalized image coordinates are `(lon-west)/(east-west)` and `(north-lat)/(north-south)`, matching `TerrainView.xzToLonLat`. A uniform-scale pixel crop fits recorded samples with padding and preserves north-up orientation. Scale-bar metres derive from the dataset's `sizeM`, not an Earth ellipsoid or display pixels. Actual segments are solid red and the saved plan is dashed cyan. Zero movement has only a location marker, not a fictional line. Missing imagery produces a labeled unavailable panel. Scientific attribution and the simulation disclaimer appear on every page.

Field notes wrap without truncation, including unbroken words. Additional numbered 1600 × 1000 PNG pages repeat mission context and the terrain map. Download links are exposed individually to avoid browser multi-download blocking. Report generation time is explicitly labeled Earth export time.

## Tests

Run from the project directory:

```
node --test scripts/test-journal.mjs
node scripts/test-startup.cjs
node scripts/test-intro.cjs
npm run build
```

Browser tests use Playwright supplied by the local runtime (no project dependency added):

```
node scripts/test-journal-browser.cjs
node scripts/test-journal-report.cjs
node scripts/smoke.cjs
node scripts/test-mineral-science.cjs
```

`URL` selects a running local server; new browser tests accept `CHROMIUM_PATH` for an installed Chromium. Existing smoke tests accept `DEVICE="iPhone 14"`. Test artifacts are under `artifacts/journal/`. Software Chromium checks responsive layouts, not physical-device GPU or Safari behavior.

## Verified results

- Production build: passed.
- `test-journal.mjs`: 14 tests passed.
- Existing startup and video-loader tests: passed.
- Existing smoke suite: desktop and iPhone 14 emulation passed (globe, crater, site, planning, pin routing, O2 exhaustion, helmet, warp, autopilot, no horizontal overflow/runtime errors).
- Existing Mineral Science suite: desktop and mobile passed, including scene/plan invariance and citations/dialog controls.
- `test-journal-browser.cjs`: desktop and iPhone 14 passed actual free-walk recording, pause/resume, safe note text, collapse/draft preservation, HUD geometry, replay, PNG downloads, reload persistence and interrupted-session finalization.
- `test-journal-report.cjs`: passed >180 m of actual EV1 movement, PNG export, editing historical notes, induced failed save and explicit retry, zero movement, missing telemetry, multipage notes, missing imagery, tablet and short landscape geometry. Screenshots were generated and visually inspected.
- Physical devices, Safari and Firefox were not tested; mobile checks use Chromium device emulation.

## Review artifacts

- `artifacts/journal/mission-report.png`: actual EV1 test-run report, with registered terrain and red recorded route.
- `artifacts/journal/sample-mission.json`: the underlying recorded test mission (not seeded route geometry).
- `artifacts/journal/journal-desktop.png`, `journal-mobile.png`, `journal-tablet.png`, `journal-landscape.png`: captured Journal HUD views.
- `artifacts/journal/mission-desktop.png`, `mission-mobile.png`: shorter free-walk test reports.

Future improvements: optional JSON import/export and archival management, explicit cross-tab session locking, and physical-device/Safari validation. No remote synchronization is implemented.
