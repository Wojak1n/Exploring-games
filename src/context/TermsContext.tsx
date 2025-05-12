import React, { createContext, useState, useContext } from 'react';

type TermsContextType = {
  isTermsOpen: boolean;
  openTerms: () => void;
  closeTerms: () => void;
};

const TermsContext = createContext<TermsContextType | undefined>(undefined);

export const TermsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const openTerms = () => setIsTermsOpen(true);
  const closeTerms = () => setIsTermsOpen(false);

  return (
    <TermsContext.Provider value={{ isTermsOpen, openTerms, closeTerms }}>
      {children}
    </TermsContext.Provider>
  );
};

export const useTerms = (): TermsContextType => {
  const context = useContext(TermsContext);
  if (context === undefined) {
    throw new Error('useTerms must be used within a TermsProvider');
  }
  return context;
};