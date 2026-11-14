// Presentation only: the planner remains the sole authority on mission safety.
export const READINESS = Object.freeze({
  nogo: { angle: -60, title: 'NO-GO — UNSAFE MISSION' },
  caution: { angle: 0, title: 'CAUTION — REVIEW PLAN' },
  go: { angle: 60, title: 'MARSWALK READY' },
});
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function readinessHTML(verdict, oxygenRemainingPercent) {
  const state = READINESS[verdict.lvl];
  if (!state) throw Error(`Unknown planner verdict: ${verdict.lvl}`);
  const reasons = verdict.issues.map(issue => issue.msg);
  const explanation = reasons.length
    ? `<ul>${reasons.map(reason => `<li>${escape(reason)}</li>`).join('')}</ul>`
    : `<p>All limits met.${Number.isFinite(oxygenRemainingPercent) ? ` ${oxygenRemainingPercent.toFixed(0)}% O₂ remaining at the airlock.` : ''}</p>`;
  return `<section class="mission-readiness ${verdict.lvl}" data-verdict="${verdict.lvl}" aria-label="Mission readiness">
    <svg class="readiness-gauge" viewBox="0 0 240 164" role="img" aria-label="${state.title}. Categorical safety status, not a readiness score.">
      <g fill="none" stroke-width="18">
        <path d="M 20 120 A 100 100 0 0 1 70 33.397" stroke="#C73B3B" />
        <path d="M 70 33.397 A 100 100 0 0 1 170 33.397" stroke="#E8AD26" />
        <path d="M 170 33.397 A 100 100 0 0 1 220 120" stroke="#2F9E44" />
      </g>
      <g class="readiness-needle" transform="rotate(${state.angle} 120 120)" fill="#F3E9DF">
        <path d="M 116 120 L 120 42 L 124 120 Z" />
      </g>
      <circle cx="120" cy="120" r="7" fill="#F3E9DF" />
      <g class="readiness-zone-labels" text-anchor="middle">
        <text x="28" y="144">NO-GO</text>
        <text x="120" y="144">CAUTION</text>
        <text x="207" y="144">MARSWALK</text><text x="207" y="158">READY</text>
      </g>
    </svg>
    <div class="readiness-info" role="status" aria-live="polite" aria-atomic="true">
      <h3>MISSION READINESS</h3><strong>${state.title}</strong>${explanation}
    </div>
  </section>`;
}
