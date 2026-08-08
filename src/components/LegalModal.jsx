import { LEGAL } from '../data/legal';
import { useUI } from '../context/UIContext';
import Modal from './Modal';

export default function LegalModal() {
  const { legalDoc, setLegalDoc } = useUI();
  const doc = legalDoc ? LEGAL[legalDoc] : null;

  return (
    <Modal
      open={Boolean(doc)}
      onClose={() => setLegalDoc(null)}
      label={doc?.title || 'Legal'}
      eyebrow={doc?.updated}
      title={doc?.title || ''}
      wide
    >
      <div className="legalbody">
        {doc?.body.map(([heading, text]) => (
          <section key={heading}>
            <h4>{heading}</h4>
            <p>{text}</p>
          </section>
        ))}
      </div>
    </Modal>
  );
}
