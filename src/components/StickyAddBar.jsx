import { useEffect, useState } from 'react';
import { money } from '../lib/format';

/**
 * Mobile-only add bar. Appears once the real add button has scrolled off the
 * top of the viewport, matching the original's rect.bottom < 0 check.
 */
export default function StickyAddBar({ price, variantLabel, onAdd, addButtonRef }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const check = () => {
      const el = addButtonRef.current;
      if (!el) return;
      setOn(el.getBoundingClientRect().bottom < 0);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [addButtonRef]);

  return (
    <div className={'pbar' + (on ? ' on' : '')}>
      <div className="p">{money(price)}<small>{variantLabel}</small></div>
      <button onClick={onAdd}>start the trial</button>
    </div>
  );
}
