import { useState } from 'react';
import { useUI } from '../context/UIContext';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function Signup() {
  const [email, setEmail] = useState('');
  const { toast } = useUI();

  /* No backend yet — validates the shape, then drops it. Wire this to whatever
     sends the drop text before launch, or the signups go nowhere. */
  function submit(e) {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      toast('that email looks off');
      return;
    }
    setEmail('');
    toast("you're on the list. one text per drop.");
  }

  return (
    <section className="signup">
      <h3>get the text when<br /><span>drop 002</span> goes live</h3>
      <p>one message. no drip campaign. cancel with one word.</p>
      <form className="form" onSubmit={submit}>
        <input
          type="email"
          placeholder="you@email.com"
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">notify me</button>
      </form>
      <div className="formnote">we text once per drop. that's the whole plan.</div>
    </section>
  );
}
