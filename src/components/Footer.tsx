import React from 'react';
import { Github, Twitter, Twitch, Instagram } from 'lucide-react';
import { useTerms } from '../context/TermsContext';

const Footer = () => {
  const { openTerms } = useTerms();

  return (
    <footer className="bg-black py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              INDIE GAMES COLLECTION
            </h2>
            <p className="text-gray-400 max-w-md">
              Your trusted source for premium indie games. 
              No subscriptions, no hidden fees. Just great games.
            </p>
          </div>
          
          <div className="flex gap-4">
            <SocialButton icon={<Github size={20} />} />
            <SocialButton icon={<Twitter size={20} />} />
            <SocialButton icon={<Twitch size={20} />} />
            <SocialButton icon={<Instagram size={20} />} />
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Indie Games Collection. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={openTerms}
              className="hover:text-white transition-colors"
            >
              Terms of Use
            </button>
            <button 
              onClick={openTerms}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              className="hover:text-white transition-colors"
            >
              Support
            </button>
            <button 
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialButtonProps {
  icon: React.ReactNode;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon }) => {
  return (
    <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors text-gray-400 hover:text-white">
      {icon}
    </button>
  );
};

export default Footer;