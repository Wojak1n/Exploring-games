import React, { useState } from 'react';
import GameCard from './GameCard';
import { games } from '../data/gamesData';

const GameLibrary = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = ['all', 'action', 'adventure', 'rpg', 'strategy'];
  
  const filteredGames = activeCategory === 'all' 
    ? games 
    : games.filter(game => game.category === activeCategory);

  return (
    <section id="games-section" className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Featured Games Collection
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Download our carefully curated selection of indie masterpieces. Each game has been 
            tested and verified for quality and performance.
          </p>
        </div>
        
        {/* Categories filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 uppercase tracking-wider ${
                activeCategory === category 
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Games grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameLibrary;