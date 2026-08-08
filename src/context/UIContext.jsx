import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [toastMsg, setToastMsg] = useState('');
  const [toastOn, setToastOn] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const timer = useRef();

  const toast = useCallback((msg) => {
    clearTimeout(timer.current);
    setToastMsg(msg);
    setToastOn(true);
    timer.current = setTimeout(() => setToastOn(false), 2200);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <UIContext.Provider value={{ toast, toastMsg, toastOn, sizeGuideOpen, setSizeGuideOpen }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
