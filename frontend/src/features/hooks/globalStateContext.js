import React, { createContext, useState } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [globalString, setGlobalString] = useState('');

  return (
    <GlobalStateContext.Provider value={{ globalString, setGlobalString }}>
      {children}
    </GlobalStateContext.Provider>
  );
};