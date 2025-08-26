import React, { useState, useEffect } from 'react';

function GlobalKeyboardListener() {
  const [typedString, setTypedString] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.length === 1) {
        setTypedString(prevString => prevString + event.key);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

}

export default GlobalKeyboardListener