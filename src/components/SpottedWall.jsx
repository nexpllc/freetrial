import { SPOTTED } from '../data/spotted';
import { useUI } from '../context/UIContext';

export default function SpottedWall({ compact }) {
  const { setSightingOpen } = useUI();

  return (
    <section className="sec spotted">
      <div className="sec-head">
        <h2>spotted{compact ? '' : ' in the wild'}</h2>
        <button className="linkbtn" onClick={() => setSightingOpen(true)}>submit yours</button>
      </div>

      <div className="spotgrid">
        {SPOTTED.map((s) => (
          <div className="spot" key={s.id}>
            <div className="spotframe">
              {s.image
                ? <img src={s.image} alt={`${s.handle} — ${s.loc}`} loading="lazy" />
                : <span className="spotpending">pending</span>}
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
    </section>
  );
}
