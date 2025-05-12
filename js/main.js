// Main application logic
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Initialize categories filter
  initCategoriesFilter();
  
  // Setup scroll behavior for navigation
  setupScrollBehavior();
  
  // Initial render of game cards with all games
  renderGames('all');
});

// Initialize the categories filter buttons
function initCategoriesFilter() {
  const categoriesContainer = document.getElementById('categories-filter');
  
  // Get unique categories from games
  const categories = ['all', ...new Set(games.map(game => game.category))];
  
  // Create category buttons
  categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category.toUpperCase();
    button.classList.add(
      'px-5', 'py-2', 'rounded-full', 'text-sm', 'font-medium', 
      'transition-all', 'duration-300', 'uppercase', 'tracking-wider',
      'bg-gray-800', 'text-gray-300', 'hover:bg-gray-700'
    );
    
    // Mark 'all' as active by default
    if (category === 'all') {
      button.classList.remove('bg-gray-800', 'text-gray-300');
      button.classList.add(
        'bg-gradient-to-r', 'from-indigo-600', 'to-violet-600', 
        'text-white', 'shadow-lg', 'shadow-indigo-600/30'
      );
    }
    
    // Add click handler for filtering
    button.addEventListener('click', () => {
      // Update active button styling
      document.querySelectorAll('#categories-filter button').forEach(btn => {
        btn.classList.remove(
          'bg-gradient-to-r', 'from-indigo-600', 'to-violet-600', 
          'text-white', 'shadow-lg', 'shadow-indigo-600/30'
        );
        btn.classList.add('bg-gray-800', 'text-gray-300', 'hover:bg-gray-700');
      });
      
      button.classList.remove('bg-gray-800', 'text-gray-300', 'hover:bg-gray-700');
      button.classList.add(
        'bg-gradient-to-r', 'from-indigo-600', 'to-violet-600', 
        'text-white', 'shadow-lg', 'shadow-indigo-600/30'
      );
      
      // Filter games by category
      renderGames(category);
    });
    
    categoriesContainer.appendChild(button);
  });
}

// Render games based on selected category
function renderGames(category) {
  const gamesGrid = document.getElementById('games-grid');
  
  // Filter games based on category
  const filteredGames = category === 'all' 
    ? games 
    : games.filter(game => game.category === category);
  
  // Render the filtered games
  renderGameCards(filteredGames, gamesGrid);
}

// Setup smooth scroll behavior
function setupScrollBehavior() {
  // Explore button in hero section
  const exploreButton = document.getElementById('explore-games-btn');
  if (exploreButton) {
    exploreButton.addEventListener('click', () => {
      smoothScrollTo('games-section');
    });
  }
  
  // Scroll indicator in hero section
  const scrollIndicator = document.getElementById('scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      smoothScrollTo('games-section');
    });
  }
}