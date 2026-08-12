import { useEffect } from 'react';
import { embedFor } from '../data/videos';
import { useUI } from '../context/UIContext';

/**
 * The player only exists while a video is open, so no YouTube iframe — and no
 * request to Google at all — happens until someone actually clicks play.
 */
export default function VideoModal() {
  const { video, setVideo } = useUI();

  useEffect(() => {
    if (!video) return undefined;
    const onKey = (e) => e.key === 'Escape' && setVideo(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [video, setVideo]);

  if (!video) return null;

  return (
    <div
      className="modal on videomodal"
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={(e) => { if (e.target === e.currentTarget) setVideo(null); }}
    >
      <div className="sheet videosheet">
        <div className="sheet-head">
          <h3>{video.title}</h3>
          <button onClick={() => setVideo(null)} aria-label="Close">×</button>
        </div>
        <div className="videoplayer">
          <iframe
            src={embedFor(video.id)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
