import { useState, useEffect } from 'react';

export const useSystemLanguage = () => {
  const [languageCode, setLanguageCode] = useState(null);

  useEffect(() => {
    if (navigator && navigator.language) {
      // Get the full language string, e.g., 'en-US' or 'pl-PL'
      const languageString = navigator.language;
      
      // Split the string by the hyphen and take the first part
      const primaryLanguageCode = languageString.split('-')[0];
      
      setLanguageCode(primaryLanguageCode);
    } else {
      console.log("Browser do not support navigator.language. Set language to en by default.")
      setLanguageCode('en');
    }
  }, []);

  return languageCode;
};