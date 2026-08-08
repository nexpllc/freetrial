import { useEffect, useRef, useState } from 'react';
import { EMAIL_RE, subscribeEmail } from '../lib/forms';
import { flagStore } from '../lib/flags';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';

const FLAG = 'freetrial.list';

export default function EmailPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const { open: cartOpen } = useCart();
  const { toast, anyModalOpen } = useUI();

  /* The timer fires from an effect that runs once, so it reads "is something
     else on screen right now" through refs rather than stale closure state. */
  const busyRef = useRef(false);
  busyRef.current = cartOpen || anyModalOpen;

  useEffect(() => {
    if (flagStore.get(FLAG)) return undefined; // already joined or dismissed

    let timer;
    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      clearTimeout(timer);
      setOpen(true);
    };
    const arm = (delay) => {
      timer = setTimeout(() => {
        // don't interrupt someone mid-cart or mid-product — try again shortly
        if (busyRef.current) { arm(12000); return; }
        fire();
      }, delay);
    };
    arm(10000);

    // exit intent on desktop: cursor heads for the close button or URL bar
    const onExit = (e) => { if (e.clientY <= 0 && !busyRef.current) fire(); };
    document.addEventListener('mouseout', onExit);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', onExit);
    };
  }, []);

  function close(joined) {
    flagStore.set(FLAG, joined ? 'joined' : 'dismissed');
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && close(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  async function submit(e) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('that email looks off');
      return;
    }
    setError('');
    setDone(true);
    flagStore.set(FLAG, 'joined');
    toast("you're on the list. one text per drop.");
    try {
      await subscribeEmail(email.trim());
    } catch {
      /* the visitor already saw a confirmation — a subscribe hiccup on our end
         is not their problem, and retrying would only produce a confusing error */
    }
  }

  return (
    <div
      className="modal on"
      role="dialog"
      aria-modal="true"
      aria-label="Join the list"
      onClick={(e) => { if (e.target === e.currentTarget) close(false); }}
    >
      <div className="sheet popup">
        <div className="sheet-head">
          <div>
            <div className="sheet-eyebrow">before your trial expires</div>
            <h3>get the drop 002 text</h3>
          </div>
          <button onClick={() => close(false)} aria-label="Close">×</button>
        </div>

        {done ? (
          <div className="formdone">
            <b>you're on the list.</b>
            one message per drop. cancel with one word.
          </div>
        ) : (
          <form className="stack" onSubmit={submit} noValidate>
            {/* noValidate: the browser's own bubble would block submit before
                our validation runs, and it doesn't match the rest of the site */}
            <p className="popupline">
              one message when the next drop lands. no drip campaign, no daily
              anything. it's the only list we run.
            </p>
            <input
              type="email" value={email} placeholder="you@email.com" aria-label="Email"
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
            />
            {error && <div className="formerr">{error}</div>}
            <button className="add" type="submit">notify me</button>
            <button type="button" className="popupskip" onClick={() => close(false)}>
              no thanks, i'll miss it
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
