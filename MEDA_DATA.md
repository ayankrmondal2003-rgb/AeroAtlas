# Archived Jezero weather

The Weather Intelligence drawer shows a versioned subset of NASA PDS Perseverance MEDA observations for mission sols 70 and 71 (May 2021). It is not live weather, a forecast, a terrain-wide map, or astronaut telemetry. Selecting an archived sol never changes the simulation clock, sunlight, oxygen, pathfinding, or mission-readiness verdict.

## Sources and reproducibility

- Dataset: Rodriguez-Manfredi et al. (2021), *The Mars Environmental Dynamics Analyzer, MEDA*, NASA Planetary Data System, https://doi.org/10.17189/1522849.
- Overview/indexes: https://pdsatmospheres.nmsu.edu/data_and_services/atmospheres_data/PERSEVERANCE/meda.html
- README: https://atmos.nmsu.edu/PDS/data/PDS4/Mars2020/mars2020_meda/readme.txt
- RDR SIS: https://atmos.nmsu.edu/PDS/data/PDS4/Mars2020/mars2020_meda/document/meda_env_rdr_sis.pdf
- Errata: https://atmos.nmsu.edu/PDS/data/PDS4/Mars2020/mars2020_meda/document/meda_release_notes.txt
- Humidity definition: https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2022JE007447 (relative humidity over ice, percent).
- PDS reuse/citation guidance: https://pds-geosciences.wustl.edu/faq.html and https://pds.nasa.gov/datastandards/citing/.

Run `node scripts/build_meda.mjs` from the project directory with Node 20+ and network access. It retrieves only eight individual products and their labels, not the multi-gigabyte archive. Node built-ins replace the originally proposed Python script because Python was unavailable in the development environment. No additional dependencies or serverless endpoint are used.

The builder checks the highest filename version in each selected sensor/sol directory against pinned P01/P02 versions and stops if a newer version needs review. It checks PDS MD5, file size and **table** row count (the separate File record count includes the header), validates chronology, then writes both sols only after all inputs validate. Generated datasets record every source URL, label URL, LIDVID, source SHA-256, label SHA-256, PDS MD5, row count and UTC bounds. The catalog records generated-file SHA-256 hashes and Earth preparation time. Future product revisions require review and a new `VERSION` in the builder; do not treat a regeneration as the same scientific release.

## Products, schema and presentation

Calibrated ATS P01, derived pressure P01, derived relative humidity P02 and derived wind P02 are the initial selected products for each sol. Exact case-sensitive filenames and versions are retained in each JSON's `sources` array. Native units are kelvin, pascal, percent RH over ice and m/s. Wind direction is degrees clockwise from north. ATS 1–3 are separate mast detectors; ATS 4–5 are at the rover front. No synthetic representative air temperature is calculated across detectors.

Schema version 1 contains eight series: five ATS temperatures, pressure, local humidity and horizontal wind speed. Each series has 288 five-minute LMST bins. Bins contain sample arithmetic mean, observed minimum/maximum, accepted/excluded/empty counts and measured temporal coverage. These are Aero Atlas summaries, not NASA-issued daily averages. Means are not weighted to fill missing time or to represent a whole sol. Coverage sums intervals between adjacent accepted samples no more than five LMST seconds apart and splits them at bin boundaries; isolated samples have zero measured span.

Each nonempty bin also preserves one **actual** accepted sample nearest its center, including original SCLK, LMST, LTST, and available uncertainty. Cards show that sample, not the bin mean. Sensors may have different timestamps within the selected interval. Only chart dots and summaries show bin means; min–max bars depict observed variability, not uncertainty. The chart does not connect bins or interpolate gaps. It has a native keyboard-operable interval slider and a text summary.

Original high-rate source data remain at PDS. This compact subset is intended for browsing, not high-frequency turbulence, vortex or extreme-event analysis.

## Time and quality policy

- Original LMST (`00070M00:00:00.878`), LTST (`0069 23:46:59`) and SCLK are retained. Data are ordered by numerical SCLK and checked against numerical LMST within each sol. Equal LTST strings are not deduplicated.
- UTC labels describe product coverage, not every sample's UTC. No precision UTC is fabricated from the application clock. Exact conversion would require suitable SPICE kernels.
- Empty cells remain missing. Both `9999999999` (README example) and the observed wind sentinel `999999999` are excluded explicitly. Zero wind remains valid.
- Nonfinite values, nonpositive kelvin/pressure and negative humidity/wind are excluded as unusable. Negative RH can occur outside the sensor's useful range; it is not clamped to zero. RH is not capped at 100 because ice supersaturation is possible.
- Humidity before sol 63 and wind before sol 36 are excluded by policy. Current release notes also warn that wind beyond sol 315 is unavailable; this subset stays within the supported early interval.
- Derived wind requires `ROVER_STILL=1`. Empty or moving-rover flags exclude that sample. `BOTH_BOOMS_USED_FOR_RETRIEVAL=0` means one boom and is not automatically a failure; missing boom-count metadata stays null.
- Missing derived values are never replaced with lower-level calibrated readings. Missing uncertainties stay null.
- The selected pressure label specifies kelvin for pressure uncertainty, an inconsistent unit. Pressure uncertainty is withheld pending source clarification; pressure itself remains in pascals.
- Pressure discontinuities mentioned in the release notes are not repaired or replaced automatically. No bespoke meteorological despiking or sensor heating correction is applied. These remain archived measurements, not a claim that every retained reading is free of all systematic error.
- Source quality metadata are not a universal good/bad bitmask. Exclusions and sample counts are disclosed per series, without inventing certainty scores.

## Application integration and failure behavior

`src/lib/meda.js` validates and caches lazy same-origin JSON loads. SHA-256 is checked where Web Crypto is available (HTTPS/localhost); schema validation always runs. No archive requests run in a visitor's browser. Existing Vite data versioning changes asset URLs when the packaged data changes.

`src/ui/weatherIntelligence.js` reuses the modal container as a scoped right-side drawer, with mobile sizing, focus trapping, Escape dismissal, focus return, cancellable loading and an explicit retry action on failure. It renders source-derived strings with `textContent`. Weather controls do not trigger background movement shortcuts.

The typical environmental context and Curiosity RAD radiation assumptions remain separately labeled. NASA DONKI/WSA-ENLIL remains a separate solar-storm **model forecast**, not a surface-weather sensor. The archived observations do not feed the simulation.

Tests: `node --test scripts/test-meda.mjs`; browser checks: `node scripts/test-weather-browser.cjs` with Playwright available through the environment and optional `CHROMIUM_PATH` / `URL`. Run `npm run build` and the existing smoke tests for regressions.
