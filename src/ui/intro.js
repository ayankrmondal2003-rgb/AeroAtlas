// Playback starts from the HTML autoplay attribute, before app initialization.
// It never gates data loading or readiness, even if the browser blocks autoplay.
export function startLoadingVideo() {
  const loader = document.getElementById('loader');
  const video = document.getElementById('loader-video');
  video.muted = true;
  video.playsInline = true;
  video.controls = false;
  const release = () => {
    video.pause();
    video.removeAttribute('src');
    video.load();
  };
  // Retry muted autoplay once the application module is ready. No controls or
  // fallback title are inserted if browser policy or a media error prevents it.
  try { video.play()?.catch(() => {}); } catch { /* Continue app startup. */ }
  return {
    finish() {
      loader.classList.add('done');
      loader.inert = true;
      release();
    },
    fail() {
      release();
      document.getElementById('loader-log').hidden = false;
    },
  };
}
