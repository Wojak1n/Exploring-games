// Animations and visual effects
document.addEventListener('DOMContentLoaded', () => {
  // Create animated particles in hero section
  createParticles();
  
  // Initialize hero parallax effect
  initParallaxEffect();
  
  // Scroll reveal animations
  initScrollReveal();
});

// Create floating particles in the hero background
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random animation duration between 8-18 seconds
    const duration = 8 + Math.random() * 10;
    
    // Set styles
    particle.style.top = `${posY}%`;
    particle.style.left = `${posX}%`;
    particle.style.animation = `floatParticle ${duration}s linear infinite`;
    
    particlesContainer.appendChild(particle);
  }
}

// Parallax effect for hero section
function initParallaxEffect() {
  const hero = document.getElementById('hero');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Parallax for background
    if (hero) {
      // Move background slightly when scrolling
      hero.style.backgroundPositionY = `${scrollY * 0.5}px`;
      
      // Fade out hero content as user scrolls down
      const opacity = 1 - scrollY / 700;
      if (opacity > 0) {
        hero.style.opacity = opacity;
      }
    }
  });
}

// Scroll reveal animations for page elements
function initScrollReveal() {
  // Select all elements to animate
  const animatedElements = document.querySelectorAll('.game-card, h2, h3, p');
  
  // Options for the Intersection Observer
  const options = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // 10% of the item visible
  };
  
  // Callback function when elements intersect viewport
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      // Add animation class when element enters viewport
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeIn');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  };
  
  // Create the observer
  const observer = new IntersectionObserver(callback, options);
  
  // Start observing each element
  animatedElements.forEach(element => {
    element.style.opacity = '0'; // Hide initially
    observer.observe(element);
  });
}

// Smooth scroll function
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}