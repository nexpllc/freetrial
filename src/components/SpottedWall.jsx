import { SPOTTED } from '../data/spotted';
import { useUI } from '../context/UIContext';

export default function SpottedWall({ compact }) {
  const { setSightingOpen } = useUI();
  const hasPhotos = SPOTTED.length > 0;

  return (
    <section className="sec spotted">
      <div className="sec-head">
        <h2>spotted{compact ? '' : ' in the wild'}</h2>
        <button className="linkbtn" onClick={() => setSightingOpen(true)}>submit yours</button>
      </div>

      {hasPhotos ? (
        <>
          <div className="spotgrid">
            {SPOTTED.map((s) => (
              <div className="spot" key={s.id}>
                <div className="spotframe">
                  <img src={s.image} alt={`${s.handle} — ${s.loc}`} loading="lazy" />
                </div>
                <div className="spotmeta">
                  <b>{s.handle}</b>
                  <small>{s.loc}</small>
                </div>
              </div>
            ))}
          </div>
          <p className="spotnote">
            wear it outside, post it, send us the link. we credit every photo we put up.
          </p>
        </>
      ) : (
        /* An empty wall is better than a wall of invented customers. This asks
           for the first photo instead of pretending there were six. */
        <div className="spotempty">
          <b>nobody's been spotted yet.</b>
          <p>
            wear it outside, post it, send us the link. we credit every photo we
            put up — and the first one goes straight to the top of this page.
          </p>
          <button className="btn" onClick={() => setSightingOpen(true)}>send the first one</button>
        </div>
      )}
    </section>
  );
}
