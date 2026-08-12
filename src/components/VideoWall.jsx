import { VIDEOS, YOUTUBE_CHANNEL, thumbFor } from '../data/videos';
import { useUI } from '../context/UIContext';

function PlayMark() {
  return (
    <span className="playmark" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
    </span>
  );
}

export default function VideoWall() {
  const { setVideo } = useUI();
  if (!VIDEOS.length) return null;

  return (
    <section className="sec videos">
      <div className="sec-head">
        <h2>from the <span>channel</span></h2>
        <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer">all videos</a>
      </div>
      <p className="videonote">the shirts make more sense once you've seen the videos.</p>

      <div className="videogrid">
        {VIDEOS.map((v) => (
          <button className="videocard" key={v.id} onClick={() => setVideo(v)}>
            <span className="videoframe">
              <img src={thumbFor(v.id)} alt="" loading="lazy" />
              <PlayMark />
            </span>
            <span className="videotitle">{v.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
