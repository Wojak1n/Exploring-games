import React from 'react';
import Hero from './components/Hero';
import GameLibrary from './components/GameLibrary';
import Footer from './components/Footer';
import TermsModal from './components/TermsModal';
import { TermsProvider } from './context/TermsContext';

function App() {
  return (
    <TermsProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Hero />
        <GameLibrary />
        <Footer />
        <TermsModal />
      </div>
    </TermsProvider>
  );
}

export default App;