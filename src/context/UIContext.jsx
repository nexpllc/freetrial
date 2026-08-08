import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [toastMsg, setToastMsg] = useState('');
  const [toastOn, setToastOn] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [sightingOpen, setSightingOpen] = useState(false);
  const [legalDoc, setLegalDoc] = useState(null); // 'privacy' | 'terms' | 'shipping'
  const timer = useRef();

  const toast = useCallback((msg) => {
    clearTimeout(timer.current);
    setToastMsg(msg);
    setToastOn(true);
    timer.current = setTimeout(() => setToastOn(false), 2200);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  /* The email popup checks this before firing — nobody should get interrupted
     while they're reading terms or typing a message. */
  const anyModalOpen = sizeGuideOpen || contactOpen || sightingOpen || Boolean(legalDoc);

  const closeAllModals = useCallback(() => {
    setSizeGuideOpen(false);
    setContactOpen(false);
    setSightingOpen(false);
    setLegalDoc(null);
  }, []);

  return (
    <UIContext.Provider value={{
      toast, toastMsg, toastOn,
      sizeGuideOpen, setSizeGuideOpen,
      contactOpen, setContactOpen,
      sightingOpen, setSightingOpen,
      legalDoc, setLegalDoc,
      anyModalOpen, closeAllModals,
    }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
