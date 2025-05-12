import React, { useState } from 'react';
import { Download, Info, X } from 'lucide-react';
import { Game } from '../types/gameTypes';
import { initiateDownload } from '../utils/downloadUtils';
import { useTerms } from '../context/TermsContext';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { openTerms } = useTerms();

  const handleDownload = async () => {
    setIsDownloading(true);
    
    // Simulate download preparation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    initiateDownload(game);
    
    // Reset after download starts
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <div className={`
      relative rounded-xl overflow-hidden transition-all duration-500 transform
      ${isExpanded ? 'scale-105 z-10' : 'hover:scale-102'}
      bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700
    `}>
      {/* Game image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={game.imageUrl} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 rounded text-xs font-medium text-emerald-400">
          {game.size}
        </div>
      </div>
      
      {/* Game info */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-white">{game.title}</h3>
        <p className="text-gray-400 line-clamp-2 mb-4 text-sm h-10">
          {game.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className={`
              inline-block px-2 py-1 rounded text-xs font-medium
              ${game.category === 'action' ? 'bg-red-900/50 text-red-400' : ''}
              ${game.category === 'adventure' ? 'bg-blue-900/50 text-blue-400' : ''}
              ${game.category === 'rpg' ? 'bg-purple-900/50 text-purple-400' : ''}
              ${game.category === 'strategy' ? 'bg-green-900/50 text-green-400' : ''}
            `}>
              {game.category.toUpperCase()}
            </span>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            {isExpanded ? <X size={16} /> : <Info size={16} />}
          </button>
        </div>
        
        {/* Download button */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`
            w-full mt-5 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300
            ${isDownloading 
              ? 'bg-indigo-700 cursor-wait' 
              : 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/30'
            }
          `}
        >
          {isDownloading ? (
            <>
              <div className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              Processing...
            </>
          ) : (
            <>
              <Download size={18} className="mr-2" />
              Download Game
            </>
          )}
        </button>
        
        <div className="mt-3 text-xs text-center text-gray-500">
          By downloading, you agree to our{' '}
          <button 
            onClick={openTerms}
            className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
          >
            Terms of Use
          </button>
        </div>
      </div>
      
      {/* Expanded details section */}
      {isExpanded && (
        <div className="absolute inset-0 bg-gray-900/95 p-6 overflow-y-auto flex flex-col animate-fadeIn">
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-4 right-4 p-1 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            <X size={20} />
          </button>
          
          <h3 className="text-2xl font-bold mb-1 text-white">{game.title}</h3>
          <p className="text-indigo-400 mb-4">{game.developer}</p>
          
          <div className="bg-gray-800/50 p-3 rounded-lg mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Release Date</span>
              <span className="text-white">{game.releaseDate}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Genre</span>
              <span className="text-white">{game.category.charAt(0).toUpperCase() + game.category.slice(1)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">File Size</span>
              <span className="text-white">{game.size}</span>
            </div>
          </div>
          
          <p className="text-gray-300 mb-6 flex-grow">
            {game.fullDescription}
          </p>
          
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`
              mt-auto py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300
              ${isDownloading 
                ? 'bg-indigo-700 cursor-wait' 
                : 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/30'
              }
            `}
          >
            {isDownloading ? (
              <>
                <div className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                Processing...
              </>
            ) : (
              <>
                <Download size={18} className="mr-2" />
                Download Now
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default GameCard;