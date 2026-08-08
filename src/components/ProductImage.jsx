import { useEffect, useState } from 'react';
import ShirtArt from './ShirtArt';

/**
 * Real photography when a colorway has it, the SVG mockup when it doesn't.
 * Falls back on a broken src too — a 404 during a photo rollout should degrade
 * to the mockup, not leave a hole in the grid.
 */
export default function ProductImage({ product, color, side, small }) {
  const src = product.images?.[color];
  const [broken, setBroken] = useState(false);

  useEffect(() => setBroken(false), [src]);

  if (src && !broken) {
    return (
      <img
        className="art"
        src={src}
        alt={`${product.name} — ${color}`}
        loading="lazy"
        onError={() => setBroken(true)}
      />
    );
  }

  return <ShirtArt product={product} color={color} side={side} small={small} />;
}
