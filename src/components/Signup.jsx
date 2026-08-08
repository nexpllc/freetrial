import { useState } from 'react';
import { EMAIL_RE, subscribeEmail } from '../lib/forms';
import { flagStore } from '../lib/flags';
import { useUI } from '../context/UIContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const { toast } = useUI();

  async function submit(e) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      toast('that email looks off');
      return;
    }
    const address = email.trim();
    setEmail('');
    setDone(true);
    /* Joining here means the popup should never bother them later. */
    flagStore.set('freetrial.list', 'joined');
    toast("you're on the list. one text per drop.");
    try {
      await subscribeEmail(address);
    } catch {
      /* They've already been told they're in. Surfacing a Shopify hiccup at
         this point helps nobody — the address is lost either way, and the
         failure belongs in our logs, not in their face. */
    }
  }

  return (
    <section className="signup">
      <h3>get the text when<br /><span>drop 002</span> goes live</h3>
      <p>one message. no drip campaign. cancel with one word.</p>

      {done ? (
        <div className="signupdone">you're on the list.</div>
      ) : (
        <form className="form" onSubmit={submit} noValidate>
          <input
            type="email"
            placeholder="you@email.com"
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">notify me</button>
        </form>
      )}

      <div className="formnote">we text once per drop. that's the whole plan.</div>
    </section>
  );
}
