// Terms modal functionality
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const termsModal = document.getElementById('terms-modal');
  const termsModalContent = document.getElementById('terms-modal-content');
  const openTermsButtons = [
    document.getElementById('terms-btn'),
    document.getElementById('privacy-btn')
  ];
  const closeTermsBtn = document.getElementById('close-terms-btn');
  const agreeTermsBtn = document.getElementById('agree-terms-btn');
  const termsLinks = document.querySelectorAll('.terms-link');
  
  // Open terms modal
  function openTermsModal() {
    termsModal.classList.add('flex', 'show');
    termsModal.classList.remove('hidden');
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Focus trap for accessibility
    setTimeout(() => {
      closeTermsBtn.focus();
    }, 100);
  }
  
  // Close terms modal
  function closeTermsModal() {
    termsModal.classList.remove('show');
    
    // Add a slight delay before hiding to allow animation to complete
    setTimeout(() => {
      termsModal.classList.remove('flex');
      termsModal.classList.add('hidden');
      
      // Restore scrolling
      document.body.style.overflow = 'unset';
    }, 300);
  }
  
  // Add click events to open buttons
  openTermsButtons.forEach(button => {
    if (button) {
      button.addEventListener('click', openTermsModal);
    }
  });
  
  // Add click events to term links in game cards
  termsLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openTermsModal();
    });
  });
  
  // Close on button click
  if (closeTermsBtn) {
    closeTermsBtn.addEventListener('click', closeTermsModal);
  }
  
  // Close on "I Agree" button click
  if (agreeTermsBtn) {
    agreeTermsBtn.addEventListener('click', closeTermsModal);
  }
  
  // Close when clicking outside the content (on the backdrop)
  if (termsModal) {
    termsModal.addEventListener('click', (e) => {
      if (e.target === termsModal) {
        closeTermsModal();
      }
    });
  }
  
  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && termsModal.classList.contains('show')) {
      closeTermsModal();
    }
  });
});

// Function to be called from other modules to open terms modal
function openTermsModal() {
  const termsModal = document.getElementById('terms-modal');
  termsModal.classList.add('flex', 'show');
  termsModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}