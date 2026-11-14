export class MissionStore {
  constructor(factory = globalThis.indexedDB) { this.factory = factory; this.db = null; }
  open() {
    if (this.db) return Promise.resolve(this.db);
    return new Promise((resolve, reject) => {
      if (!this.factory) return reject(Error('IndexedDB is unavailable. Records are only in memory.'));
      const request = this.factory.open('aeroatlas-eva-journal', 1);
      let settled = false;
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains('missions')) request.result.createObjectStore('missions', { keyPath: 'id' });
      };
      request.onblocked = () => { settled = true; reject(Error('Storage upgrade blocked. Close other AeroAtlas tabs and retry.')); };
      request.onerror = () => reject(request.error || Error('Cannot open mission storage.'));
      request.onsuccess = () => {
        if (settled) { request.result.close(); return; }
        this.db = request.result;
        this.db.onversionchange = () => { this.db.close(); this.db = null; };
        resolve(this.db);
      };
    });
  }
  async transaction(mode, action) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('missions', mode);
      let result;
      tx.oncomplete = () => resolve(result);
      tx.onabort = tx.onerror = () => reject(tx.error || Error('Mission transaction failed; changes remain in memory.'));
      try {
        const request = action(tx.objectStore('missions'));
        request.onsuccess = () => { result = request.result; };
      } catch (error) { try { tx.abort(); } catch {} reject(error); }
    });
  }
  save(mission) { const copy = structuredClone(mission); return this.transaction('readwrite', s => s.put(copy)); }
  list() { return this.transaction('readonly', s => s.getAll()); }
}
