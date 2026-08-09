import { useId } from 'react';
import { BRANDS, GARMENTS } from '../data/brands';

const TEE = 'M120,20 L160,20 C170,52 230,52 240,20 L280,20 L384,92 L340,168 L300,140 L300,424 L100,424 L100,140 L60,168 L16,92 Z';

function shade(hex, amt) {
  const h = hex.replace('#', '');
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v * amt)));
  const r = clamp(parseInt(h.substr(0, 2), 16));
  const g = clamp(parseInt(h.substr(2, 2), 16));
  const b = clamp(parseInt(h.substr(4, 2), 16));
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

function StickerArt({ accent, soft, small }) {
  const tiles = [
    [60, 80, '#fff', accent, 'ftb'],
    [210, 80, soft, accent, 'no card'],
    [60, 190, accent, '#fff', 'cancel'],
    [210, 190, '#fff', '#101114', '7 days'],
    [60, 300, '#fff', accent, 'expired'],
    [210, 300, soft, '#101114', '0%'],
  ];
  return (
    <svg className="art" viewBox="0 0 400 440" aria-hidden="true">
      {tiles.map(([x, y, fill, ink, label]) => (
        <g key={label}>
          <rect x={x} y={y} width="130" height="86" rx="14" fill={fill} stroke="#E2E5EA" strokeWidth="2" />
          {!small && (
            <text x={x + 65} y={y + 50} textAnchor="middle" fontFamily="Poppins,sans-serif"
              fontWeight="800" fontSize="19" fill={ink}>{label}</text>
          )}
        </g>
      ))}
    </svg>
  );
}

export default function ShirtArt({ product, color, side, small }) {
  const raw = useId();
  const uid = raw.replace(/:/g, '');

  if (product.sticker) {
    return <StickerArt accent={BRANDS[side].accent} soft={BRANDS[side].soft} small={small} />;
  }

  const garment = GARMENTS[side] || GARMENTS.b;
  const c = garment[color] || garment.white;
  const print = product.prints?.[color];
  const multi = product.lines.length > 1;
  const y = multi ? 162 : 176;

  /* The tee body is only ~200 units wide in this viewBox, and a fixed size ran
     long lines ("trial expired") straight off both sleeves. Scale down to fit
     the printable width; 0.56em per character is a close enough advance width
     for Poppins at this weight, and erring small only adds margin. */
  const PRINT_WIDTH = 170;
  const longest = Math.max(...product.lines.map((l) => l.length));
  const fontSize = Math.min(multi ? 30 : 34, PRINT_WIDTH / (longest * 0.56));

  const edge = shade(c.fill, 0.9);
  const deep = shade(c.fill, 0.82);
  const light = shade(c.fill, 1.03);
  const ink = c.stroke ? '#C9CED6' : shade(c.fill, 0.74);

  return (
    <svg className="art" viewBox="0 0 400 470" aria-hidden="true">
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={deep} />
          <stop offset="0.14" stopColor={c.fill} />
          <stop offset="0.45" stopColor={light} />
          <stop offset="0.86" stopColor={c.fill} />
          <stop offset="1" stopColor={deep} />
        </linearGradient>
        <linearGradient id={`f${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={edge} stopOpacity="0" />
          <stop offset="1" stopColor={edge} stopOpacity="0.55" />
        </linearGradient>
        <filter id={`s${uid}`} x="-25%" y="-15%" width="150%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#101114" floodOpacity="0.13" />
        </filter>
      </defs>

      <g filter={`url(#s${uid})`}>
        <path d={TEE} fill={`url(#${uid})`}
          {...(c.stroke ? { stroke: c.stroke, strokeWidth: 2.5 } : {})} />
        <path d="M100,300 C128,330 132,382 118,424 L100,424 Z" fill={`url(#f${uid})`} opacity="0.7" />
        <path d="M300,300 C272,330 268,382 282,424 L300,424 Z" fill={`url(#f${uid})`} opacity="0.7" />
        <path d="M156,17 C168,56 232,56 244,17" fill="none" stroke={ink} strokeWidth="5"
          strokeLinecap="round" opacity="0.55" />
        <path d="M366,103 L330,159" fill="none" stroke={ink} strokeWidth="2.5" opacity="0.4" />
        <path d="M34,103 L70,159" fill="none" stroke={ink} strokeWidth="2.5" opacity="0.4" />
        <path d="M104,412 L296,412" fill="none" stroke={ink} strokeWidth="2.5" opacity="0.32" />
        <path d="M100,146 C114,132 120,116 118,100" fill="none" stroke={ink} strokeWidth="2" opacity="0.28" />
        <path d="M300,146 C286,132 280,116 282,100" fill="none" stroke={ink} strokeWidth="2" opacity="0.28" />
      </g>

      {print ? (
        /* The real 300 DPI artwork, scaled to the chest. Keeps the mockup
           honest — what shows here is the file that goes to Printful, not an
           SVG approximation of it that can drift out of date. */
        <image
          xlinkHref={print}
          x="125"
          y="132"
          width="150"
          height="180"
          preserveAspectRatio="xMidYMid meet"
        />
      ) : !small && (
        <>
          {product.lines.map((line, i) => (
            <text key={line} x="200" y={y + i * 33} textAnchor="middle" fontFamily="Poppins,sans-serif"
              fontWeight="800" fontSize={fontSize} letterSpacing="-1"
              fill={i === product.lines.length - 1 && multi ? c.accent : c.main}>{line}</text>
          ))}
          <text x="200" y={y + product.lines.length * 33 - 12} textAnchor="middle"
            fontFamily="Poppins,sans-serif" fontWeight="500" fontSize="11" fill={c.sub}>{product.tag}</text>
        </>
      )}
    </svg>
  );
}
