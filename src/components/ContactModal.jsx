import { useEffect, useState } from 'react';
import { EMAIL_RE, sendContactMessage } from '../lib/forms';
import { CONTACT_EMAIL } from '../data/legal';
import { useUI } from '../context/UIContext';
import Modal from './Modal';

export default function ContactModal() {
  const { contactOpen, setContactOpen, toast } = useUI();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!contactOpen) return;
    setName(''); setEmail(''); setMessage('');
    setError(''); setSending(false); setDone(false);
  }, [contactOpen]);

  async function submit(e) {
    e.preventDefault();
    if (!name.trim() || !EMAIL_RE.test(email.trim()) || !message.trim()) {
      setError('name, a valid email, and a message — all three.');
      return;
    }
    setError('');
    setSending(true);
    try {
      await sendContactMessage({ name: name.trim(), email: email.trim(), message: message.trim() });
      setDone(true);
      toast("message sent — we'll reply by email");
    } catch {
      setError(`that didn't send. try again, or email ${CONTACT_EMAIL} directly.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <Modal
      open={contactOpen}
      onClose={() => setContactOpen(false)}
      label="Contact"
      eyebrow="get in touch"
      title="contact"
    >
      {done ? (
        <div className="formdone">
          <b>message sent.</b>
          we reply to everything, usually within a day.
        </div>
      ) : (
        <form className="stack" onSubmit={submit} noValidate>
          <input
            type="text" value={name} placeholder="your name" aria-label="Your name"
            onChange={(e) => { setName(e.target.value); setError(''); }}
          />
          <input
            type="email" value={email} placeholder="you@email.com" aria-label="Your email"
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
          />
          <textarea
            value={message} placeholder="what's up?" rows={5} aria-label="Message"
            onChange={(e) => { setMessage(e.target.value); setError(''); }}
          />
          {error && <div className="formerr">{error}</div>}
          <button className="add" type="submit" disabled={sending}>
            {sending ? 'sending…' : 'send message'}
          </button>
          <div className="formhint">or email {CONTACT_EMAIL}</div>
        </form>
      )}
    </Modal>
  );
}
