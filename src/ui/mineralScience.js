// Independently written factual summaries; no catalogue records, coordinates,
// publication text, figures or third-party implementation are redistributed.
// Source checks: 14 November 2026. Catalogue latitude and reuse remain unresolved.
export function mineralScienceHTML(viewId) {
  const area = viewId === 'site' ? '6 × 6 km Marswalk zone' : 'Jezero crater view';
  return `
    <h2 id="mineral-science-title">MINERAL SCIENCE · JEZERO</h2>
    <p><strong>Reading panel · no map overlay</strong></p>
    <p>Opened from the ${area}. These research summaries describe Jezero broadly; they do not identify confirmed sampling locations within the displayed terrain.</p>
    <h3>CARBONATES · ORBITAL EVIDENCE</h3>
    <p>CRISM observations identify carbonate-bearing material near Jezero’s inner margin and western delta. Horgan and colleagues proposed that some of it could have formed in the ancient lake; that origin is an interpretation, not a confirmed fact.</p>
    <p>Instrument: MRO CRISM. <a href="https://www.usgs.gov/publications/mineral-diversity-jezero-crater-evidence-possible-lacustrine-carbonates-mars" target="_blank" rel="noopener noreferrer">Horgan et al. (2020), Icarus · USGS publication record</a> · <a href="https://doi.org/10.1016/j.icarus.2019.113526" target="_blank" rel="noopener noreferrer">DOI</a></p>
    <h3>OLIVINE · ROVER EVIDENCE</h3>
    <p>Perseverance studied olivine-rich crater-floor rocks. PIXL measurements, together with rock texture and chemistry, support formation in slowly cooling magma. This is rover evidence, not a CRISM catalogue point.</p>
    <h3>WATER ALTERATION · ROVER EVIDENCE</h3>
    <p>SuperCam observations found evidence that water altered crater-floor minerals. The alteration was not uniform across all the rocks studied.</p>
    <p>Source for both rover summaries: <a href="https://www.nasa.gov/missions/mars-2020-perseverance/perseverance-rover/nasas-perseverance-makes-new-discoveries-in-mars-jezero-crater/" target="_blank" rel="noopener noreferrer">NASA/JPL-Caltech, 25 August 2022 · Perseverance discoveries in Jezero</a>.</p>
    <h3>COORDINATES & COVERAGE</h3>
    <p><strong>Catalogue coordinates are unverified for terrain registration.</strong> Planetocentric versus planetographic latitude has not been established for the two Mars Trek compilations. No transformation has been assumed and no mineral markers are placed in either scene.</p>
    <p>Catalogue records and counts are not published in this panel while their reuse terms remain unresolved. No georeferenced detections are loaded for the Marswalk zone. This is not evidence that minerals are absent there.</p>
    <h3>SCIENTIFIC CONTEXT</h3>
    <p><a href="https://doi.org/10.1029/2012JE004145" target="_blank" rel="noopener noreferrer">Carter et al. (2013) · Hydrous minerals from CRISM and OMEGA</a> and <a href="https://doi.org/10.1146/annurev-earth-060313-055024" target="_blank" rel="noopener noreferrer">Ehlmann & Edwards (2014) · Mineralogy of the Martian surface</a> provide global context, not certified local sampling targets.</p>
    <p>These are original factual summaries with citations. No catalogue dataset, publication imagery or third-party code is included. Research evidence does not establish mineral abundance, accessible resources or biosignatures at a chosen map point.</p>`;
}

/** Reuse the existing modal and styling; never touch scene or planner state. */
export function openMineralScience(viewId, opener) {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modal-body');
  const close = document.getElementById('modal-x');
  const previous = new Map(['role', 'aria-modal', 'aria-labelledby'].map((key) => [key, modal.getAttribute(key)]));
  body.innerHTML = mineralScienceHTML(viewId);
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'mineral-science-title');
  modal.hidden = false;
  const cleanup = () => {
    observer.disconnect();
    window.removeEventListener('keydown', onKey, true);
    for (const [key, value] of previous) {
      if (value === null) modal.removeAttribute(key);
      else modal.setAttribute(key, value);
    }
    if (opener?.isConnected) opener.focus();
  };
  const onKey = (event) => {
    // Keep application shortcuts from navigating or changing the EVA behind the panel.
    event.stopImmediatePropagation();
    if (event.key === 'Escape') {
      event.preventDefault();
      modal.hidden = true;
    } else if (event.key === 'Tab') {
      const items = [...modal.querySelectorAll('button, a[href]')];
      const first = items[0], last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  };
  const observer = new MutationObserver(() => { if (modal.hidden) cleanup(); });
  observer.observe(modal, { attributes: true, attributeFilter: ['hidden'] });
  window.addEventListener('keydown', onKey, true);
  close.focus();
}
