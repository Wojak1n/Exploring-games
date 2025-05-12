// Game card component and related functionality
document.addEventListener('DOMContentLoaded', () => {
  // Select the template
  const gameCardTemplate = document.getElementById('game-card-template');
  
  // Function to create a game card from template
  function createGameCard(game) {
    // Clone the template
    const template = gameCardTemplate.content.cloneNode(true);
    const card = template.querySelector('.game-card');
    
    // Set data attribute for identification
    card.setAttribute('data-game-id', game.id);
    
    // Set basic information
    template.querySelector('.game-image').src = game.imageUrl;
    template.querySelector('.game-image').alt = game.title;
    template.querySelector('.game-title').textContent = game.title;
    template.querySelector('.game-description').textContent = game.description;
    template.querySelector('.game-size').textContent = game.size;
    
    // Format category badge
    const categoryElement = template.querySelector('.game-category');
    categoryElement.textContent = game.category.toUpperCase();
    categoryElement.classList.add(`category-${game.category}`);
    
    // Set expanded details
    template.querySelector('.game-detail-title').textContent = game.title;
    template.querySelector('.game-developer').textContent = game.developer;
    template.querySelector('.game-release-date').textContent = game.releaseDate;
    template.querySelector('.game-genre').textContent = game.category.charAt(0).toUpperCase() + 
                                                         game.category.slice(1);
    template.querySelector('.game-detail-size').textContent = game.size;
    template.querySelector('.game-full-description').textContent = game.fullDescription;
    
    // Event listeners for card actions
    const infoBtn = template.querySelector('.info-btn');
    const closeDetailsBtn = template.querySelector('.close-details');
    const gameDetails = template.querySelector('.game-details');
    const downloadBtn = template.querySelector('.download-btn');
    const detailDownloadBtn = template.querySelector('.detail-download-btn');
    
    // Toggle expanded details view
    infoBtn.addEventListener('click', () => {
      card.classList.toggle('expanded');
      gameDetails.classList.toggle('visible');
      
      // Toggle icons
      infoBtn.querySelector('.info-icon').classList.toggle('hidden');
      infoBtn.querySelector('.close-icon').classList.toggle('hidden');
    });
    
    // Close button in expanded details
    closeDetailsBtn.addEventListener('click', () => {
      card.classList.remove('expanded');
      gameDetails.classList.remove('visible');
      
      // Reset icons
      infoBtn.querySelector('.info-icon').classList.remove('hidden');
      infoBtn.querySelector('.close-icon').classList.add('hidden');
    });
    
    // Download buttons (main and in details panel)
    [downloadBtn, detailDownloadBtn].forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (!_isDownloading) {
          // Visual feedback - add loading state
          btn.innerHTML = `
            <div class="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
            Processing...
          `;
          
          // Initiate download with a delay to show the processing state
          await new Promise(resolve => setTimeout(resolve, 500));
          initiateDownload(game.id);
          
          // Reset button after download starts
          setTimeout(() => {
            if (btn === downloadBtn) {
              btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download Game
              `;
            } else {
              btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download Now
              `;
            }
          }, 2000);
        }
      });
    });
    
    return template;
  }
  
  // Public function to render all game cards
  window.renderGameCards = function(gamesList, container) {
    // Clear container first
    container.innerHTML = '';
    
    // Create and append each game card
    gamesList.forEach(game => {
      const gameCard = createGameCard(game);
      container.appendChild(gameCard);
    });
    
    // Initialize terms modal links inside cards
    const termsLinks = document.querySelectorAll('.terms-link');
    termsLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openTermsModal();
      });
    });
  };
});