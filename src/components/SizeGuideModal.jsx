import { useUI } from '../context/UIContext';

const ROWS = [['S', '20"', '27"'], ['M', '21.5"', '28"'], ['L', '23"', '29"'], ['XL', '24.5"', '30"']];

export default function SizeGuideModal() {
  const { sizeGuideOpen, setSizeGuideOpen } = useUI();

  return (
    <div
      className={'modal' + (sizeGuideOpen ? ' on' : '')}
      role="dialog"
      aria-label="Size guide"
      aria-hidden={!sizeGuideOpen}
      onClick={(e) => { if (e.target === e.currentTarget) setSizeGuideOpen(false); }}
    >
      <div className="sheet">
        <div className="sheet-head">
          <h3>size guide</h3>
          <button onClick={() => setSizeGuideOpen(false)} aria-label="Close">×</button>
        </div>
        <table className="sizetable">
          <tbody>
            <tr><th>size</th><th>chest</th><th>length</th></tr>
            {ROWS.map(([s, chest, length]) => (
              <tr key={s}><td>{s}</td><td>{chest}</td><td>{length}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="sizenote">
          measured flat, in inches. unisex boxy fit — true to size for relaxed, size down for fitted. model is 6'0" in a large.
        </p>
      </div>
    </div>
  );
}
