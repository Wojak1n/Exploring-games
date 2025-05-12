import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTerms } from '../context/TermsContext';

const TermsModal = () => {
  const { isTermsOpen, closeTerms } = useTerms();
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeTerms();
      }
    };

    if (isTermsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTermsOpen, closeTerms]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isTermsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isTermsOpen]);

  if (!isTermsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        ref={modalRef}
        className="bg-gray-900 border border-gray-700 rounded-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-gray-900 border-b border-gray-800">
          <h3 className="text-xl font-bold">Terms of Use & End-User License Agreement</h3>
          <button 
            onClick={closeTerms}
            className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <section className="mb-8">
            <h4 className="text-lg font-semibold mb-3 text-indigo-400">1. ACCEPTANCE OF TERMS</h4>
            <p className="text-gray-300 mb-4">
              By downloading any game from our platform, you agree to be bound by these Terms of Use and acknowledge 
              that they constitute a binding agreement between you and Indie Games Collection.
            </p>
          </section>
          
          <section className="mb-8">
            <h4 className="text-lg font-semibold mb-3 text-indigo-400">2. LICENSE GRANT</h4>
            <p className="text-gray-300 mb-4">
              Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, 
              non-sublicensable license to download and use the games for your personal, non-commercial use only.
            </p>
          </section>
          
          <section className="mb-8">
            <h4 className="text-lg font-semibold mb-3 text-indigo-400">3. RESTRICTIONS</h4>
            <p className="text-gray-300 mb-4">
              You may not:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Redistribute, sell, rent, lease, or license any game</li>
              <li>Modify, reverse engineer, decompile, or disassemble any game</li>
              <li>Remove any copyright or proprietary notices</li>
              <li>Use the games for any illegal purpose</li>
              <li>Transfer your rights under these Terms to any third party</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h4 className="text-lg font-semibold mb-3 text-indigo-400">4. INTELLECTUAL PROPERTY</h4>
            <p className="text-gray-300 mb-4">
              All games and content provided through our platform are protected by copyright, trademark, and other 
              intellectual property laws. All rights, title, and interest in and to the games, including all 
              intellectual property rights, remain with us or our licensors.
            </p>
          </section>
          
          <section className="mb-8">
            <h4 className="text-lg font-semibold mb-3 text-indigo-400">5. DISCLAIMER OF WARRANTY</h4>
            <p className="text-gray-300 mb-4">
              THE GAMES ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
              LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>
          </section>
          
          <section className="mb-8">
            <h4 className="text-lg font-semibold mb-3 text-indigo-400">6. LIMITATION OF LIABILITY</h4>
            <p className="text-gray-300 mb-4">
              IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
              DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE GAMES.
            </p>
          </section>
          
          <section>
            <h4 className="text-lg font-semibold mb-3 text-indigo-400">7. TERMINATION</h4>
            <p className="text-gray-300 mb-4">
              We reserve the right to terminate your license to use the games at any time if you fail to comply 
              with any of these Terms. Upon termination, you must destroy all copies of the games in your possession.
            </p>
          </section>
        </div>
        
        <div className="sticky bottom-0 p-6 bg-gray-900 border-t border-gray-800 flex justify-end">
          <button 
            onClick={closeTerms}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-colors"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;