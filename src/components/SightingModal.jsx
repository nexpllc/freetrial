import { useEffect, useState } from 'react';
import { EMAIL_RE, sendSighting } from '../lib/forms';
import { useUI } from '../context/UIContext';
import Modal from './Modal';

export default function SightingModal() {
  const { sightingOpen, setSightingOpen, toast } = useUI();
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!sightingOpen) return;
    setHandle(''); setEmail(''); setLink(''); setNote('');
    setError(''); setSending(false); setDone(false);
  }, [sightingOpen]);

  async function submit(e) {
    e.preventDefault();
    if (!handle.trim() || !link.trim()) {
      setError('we need your handle and a link to the post.');
      return;
    }
    if (email.trim() && !EMAIL_RE.test(email.trim())) {
      setError('that email looks off — or leave it blank.');
      return;
    }
    setError('');
    setSending(true);
    try {
      await sendSighting({
        handle: handle.trim(), email: email.trim(),
        link: link.trim(), note: note.trim(),
      });
      setDone(true);
      toast('got it — we look at every one');
    } catch {
      setError("that didn't send. try again in a minute.");
    } finally {
      setSending(false);
    }
  }

  return (
    <Modal
      open={sightingOpen}
      onClose={() => setSightingOpen(false)}
      label="Submit a photo"
      eyebrow="get on the wall"
      title="send us the photo"
    >
      {done ? (
        <div className="formdone">
          <b>got it.</b>
          we look at every submission. if yours goes up, you get credited by handle.
        </div>
      ) : (
        <form className="stack" onSubmit={submit} noValidate>
          <input
            type="text" value={handle} placeholder="@yourhandle" aria-label="Your handle"
            onChange={(e) => { setHandle(e.target.value); setError(''); }}
          />
          <input
            type="url" value={link} placeholder="link to the post" aria-label="Link to the post"
            onChange={(e) => { setLink(e.target.value); setError(''); }}
          />
          <input
            type="email" value={email} placeholder="you@email.com (optional)" aria-label="Your email, optional"
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
          />
          <textarea
            value={note} placeholder="anything we should know? (optional)" rows={3} aria-label="Note, optional"
            onChange={(e) => { setNote(e.target.value); setError(''); }}
          />
          {error && <div className="formerr">{error}</div>}
          <button className="add" type="submit" disabled={sending}>
            {sending ? 'sending…' : 'submit the photo'}
          </button>
          <div className="formhint">
            sending it means we can repost it with your handle. changed your mind later? email us and it comes down.
          </div>
        </form>
      )}
    </Modal>
  );
}
