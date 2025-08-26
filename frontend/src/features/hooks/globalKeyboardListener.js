import { useEffect, useContext } from 'react';
import { GlobalStateContext } from './globalStateContext';

export default function GlobalKeyboardListener() {
  const { globalString, setGlobalString } = useContext(GlobalStateContext);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Backspace') {
        setGlobalString(prevString => prevString.slice(0, -1));
      } else if (globalString.length < 6 && /^[a-zA-Z0-9]$/.test(event.key)) {
        setGlobalString(prevString => prevString + event.key);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [globalString, setGlobalString]);

  return null;
}