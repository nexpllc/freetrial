import { useEffect } from 'react';

/**
 * Shared shell for every dialog on the site. The size guide predates this and
 * has its own markup; everything added since routes through here so the
 * backdrop, escape key, and close affordance behave identically.
 */
export default function Modal({ open, onClose, label, eyebrow, title, wide, children }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal on"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={'sheet' + (wide ? ' wide' : '')}>
        <div className="sheet-head">
          <div>
            {eyebrow && <div className="sheet-eyebrow">{eyebrow}</div>}
            <h3>{title}</h3>
          </div>
          <button onClick={onClose} aria-label="Close">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}
