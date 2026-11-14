import { marsTime, localTime, perseveranceSol, formatHM, JEZERO } from '../lib/marstime.js';

export const CATEGORIES = ['Discovery', 'Observation', 'Mistake', 'Safety Incident', 'General'];
export const active = m => m && ['Recording', 'Paused'].includes(m.status);
export function stamp(ms, elapsed = 0) {
  return { timestamp: ms, sol: perseveranceSol(ms), lmst: formatHM(localTime(marsTime(ms), JEZERO.lon).lmst), elapsed };
}
const valid = n => typeof n === 'number' && Number.isFinite(n);
export const points = m => (m?.segments || []).flatMap(s => s.points);
export function summary(m) {
  const first = m.telemetry?.[0], last = m.telemetry?.at(-1);
  const comparable = first && last && m.telemetry.every(t => t.epoch === first.epoch && t.capacity === first.capacity);
  const oxygen = comparable && valid(first.oxygen) && valid(last.oxygen) && first.oxygen >= last.oxygen;
  return { distance: m.distance || 0, duration: m.elapsed || 0, movementDuration: m.movementDuration || 0,
    oxygenConsumed: oxygen ? first.oxygen - last.oxygen : null,
    oxygenRemaining: valid(last?.oxygen) ? last.oxygen : null,
    averageW: m.powerSeconds > 0 ? m.energyJ / m.powerSeconds : null,
    energyJ: m.powerSeconds > 0 ? m.energyJ : null, powerSeconds: m.powerSeconds || 0, notes: m.entries.length };
}
export class MissionRecorder {
  constructor({ id = () => crypto.randomUUID(), changed = () => {} } = {}) { this.id = id; this.changed = changed; this.mission = null; this.last = null; }
  start(ms, sample, terrain, planned) {
    if (active(this.mission) || this.mission?.status === 'Interrupted') throw Error('Finalize the existing mission first.');
    this.mission = { schemaVersion: 1, id: this.id(), status: 'Recording', start: stamp(ms), end: null,
      clockMs: ms, elapsed: 0, distance: 0, movementDuration: 0, energyJ: 0, powerSeconds: 0,
      segments: [], entries: [], telemetry: [], terrain: structuredClone(terrain), planned: structuredClone(planned || []) };
    this.last = null; this.breakNext = true;
    if (sample) this.ingest(sample, 0);
    this.changed(); return this.mission;
  }
  ingest(sample, dt) {
    const m = this.mission;
    if (!active(m)) return;
    dt = valid(dt) && dt >= 0 ? dt : 0;
    m.clockMs += dt * 1000;
    if (m.status === 'Paused') { this.last = null; this.breakNext = true; return; }
    m.elapsed += dt;
    if (!sample || !valid(sample.x) || !valid(sample.z)) { this.last = null; this.breakNext = true; return; }
    const time = stamp(m.clockMs, m.elapsed);
    const p = { ...sample, ...time };
    const last = this.last;
    const d = last ? Math.hypot(sample.x - last.x, sample.z - last.z) * 1000 : 0;
    const gap = this.breakNext || !last || last.epoch !== sample.epoch || last.mode !== sample.mode || d > dt * 15 + 2;
    if (gap) {
      this.flush();
      m.segments.push({ reason: last ? 'source change / discontinuity' : 'start / resume', points: [p] });
    } else {
      m.distance += d;
      if (d > 0.001) m.movementDuration += dt;
      const end = m.segments.at(-1).points.at(-1);
      if (Math.hypot(p.x - end.x, p.z - end.z) * 1000 >= 1 || (p.elapsed - end.elapsed >= 2 && d > .001)) m.segments.at(-1).points.push(p);
      // Power comes from the exact existing suit O2 integration over this interval.
      if (valid(sample.watts) && sample.watts >= 0 && dt > 0) { m.energyJ += sample.watts * dt; m.powerSeconds += dt; }
    }
    const t = m.telemetry.at(-1);
    if (!t || gap || time.elapsed - t.elapsed >= 2) m.telemetry.push({ ...time, oxygen: sample.oxygen, watts: sample.watts, capacity: sample.capacity, epoch: sample.epoch, mode: sample.mode });
    this.last = p; this.breakNext = false;
  }
  flush() {
    const m = this.mission, p = this.last;
    if (!m || !p) return;
    const list = m.segments.at(-1)?.points, end = list?.at(-1);
    if (end && (end.x !== p.x || end.z !== p.z)) list.push({ ...p });
    const t = m.telemetry.at(-1);
    if (!t || t.timestamp !== p.timestamp) m.telemetry.push({ ...p });
  }
  pause() { if (this.mission?.status !== 'Recording') return; this.flush(); this.mission.status = 'Paused'; this.last = null; this.breakNext = true; this.changed(); }
  resume() { if (this.mission?.status !== 'Paused') return; this.mission.status = 'Recording'; this.last = null; this.breakNext = true; this.changed(); }
  end(interrupted = false) {
    if (!this.mission || (!active(this.mission) && this.mission.status !== 'Interrupted')) return;
    this.flush(); this.mission.status = interrupted ? 'Interrupted' : 'Completed';
    this.mission.end = stamp(this.mission.clockMs, this.mission.elapsed); this.mission.finalized = true;
    this.mission.summary = summary(this.mission); this.changed();
  }
  note(category, text, id) {
    const m = this.mission;
    if (!active(m)) throw Error('Notes require an active recording (recording or paused).');
    if (!CATEGORIES.includes(category) || !text.trim()) throw Error('Choose a category and enter a note.');
    const existing = id && m.entries.find(e => e.id === id);
    if (id && !existing) throw Error('Entry not found.');
    if (existing) { existing.category = category; existing.text = text.trim(); existing.edited = stamp(m.clockMs, m.elapsed); }
    else m.entries.push({ id: this.id(), missionId: m.id, category, text: text.trim(), ...stamp(m.clockMs, m.elapsed), position: this.last ? { x: this.last.x, z: this.last.z, lat: this.last.lat, lon: this.last.lon } : null });
    this.changed();
  }
  deleteNote(id) { if (!active(this.mission)) throw Error('Only active mission notes can be changed.'); this.mission.entries = this.mission.entries.filter(e => e.id !== id); this.changed(); }
}
