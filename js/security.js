// Security-related functions - obfuscated for protection
(function() {
  // Unique watermark hash - don't remove or modify
  const _watermark = 'IGDC-7B3A5F2D-11E9-4D6C-8CB7-3F4A81C32E04';
  
  // 🔒 Anti-copying protection
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showProtectionNotice();
    return false;
  });
  
  // Block ctrl+u (view source)
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && e.key === 'u') || 
        (e.ctrlKey && e.key === 's') || 
        (e.ctrlKey && e.shiftKey && e.key === 'i')) {
      e.preventDefault();
      showProtectionNotice();
      return false;
    }
  });
  
  // Block F12
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12') {
      e.preventDefault();
      showProtectionNotice();
      return false;
    }
  });
  
  // Notification about copy protection (shows only when triggered)
  function showProtectionNotice() {
    // Only create notification if it doesn't exist yet
    if (!document.getElementById('protection-notice')) {
      const notice = document.createElement('div');
      notice.id = 'protection-notice';
      notice.style.position = 'fixed';
      notice.style.bottom = '20px';
      notice.style.right = '20px';
      notice.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      notice.style.color = 'white';
      notice.style.padding = '15px 20px';
      notice.style.borderRadius = '8px';
      notice.style.zIndex = '9999';
      notice.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
      notice.style.maxWidth = '300px';
      notice.style.animation = 'fadeInOut 5s forwards';
      
      notice.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff5555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 10px;">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span style="font-weight: bold;">Content Protected</span>
        </div>
        <p style="margin: 0; font-size: 14px;">This content is protected by copyright. Unauthorized copying is prohibited.</p>
      `;
      
      document.body.appendChild(notice);
      
      // Create style for animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(20px); }
          10% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(20px); }
        }
      `;
      document.head.appendChild(style);
      
      // Remove the notification after animation completes
      setTimeout(() => {
        if (notice.parentNode) {
          notice.parentNode.removeChild(notice);
        }
      }, 5000);
    }
  }
  
  // Verify page integrity periodically
  function _verifyIntegrity() {
    const integrityChecksum = calculatePageIntegrity();
    if (integrityChecksum !== _calculateExpectedChecksum()) {
      console.warn('Page integrity may be compromised.');
    }
  }
  
  function calculatePageIntegrity() {
    // Simplified integrity check for demo purposes
    return document.documentElement.innerHTML.length;
  }
  
  function _calculateExpectedChecksum() {
    // This would normally be a more sophisticated calculation
    return calculatePageIntegrity();
  }
  
  // Run integrity check periodically
  setInterval(_verifyIntegrity, 10000);
})();