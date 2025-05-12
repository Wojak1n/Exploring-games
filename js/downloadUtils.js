// Secure download utilities
// This is an obfuscated version of the download functionality
// to prevent direct access to the download URLs

// Track download state
let _isDownloading = false;
let _currentDownloadId = null;

// Download overlay and progress elements
const downloadOverlay = document.getElementById('download-overlay');
const downloadProgress = document.getElementById('download-progress');

// Initiate the download process for a game
async function initiateDownload(gameId) {
  // Prevent multiple simultaneous downloads
  if (_isDownloading) return;
  
  // Find the game by ID
  const game = games.find(g => g.id === gameId);
  if (!game) {
    console.error('Game not found');
    return;
  }
  
  _isDownloading = true;
  _currentDownloadId = gameId;
  
  // Show download overlay with progress bar
  downloadOverlay.classList.remove('hidden');
  downloadOverlay.classList.add('flex');
  
  // Reset progress bar
  downloadProgress.style.width = '0%';
  
  // Simulate download preparation (security checks, etc.)
  await simulateProgressiveDownload();
  
  // After "preparation", initiate the actual download
  generateDownloadFile(game);
  
  // Hide overlay after download starts
  setTimeout(() => {
    downloadOverlay.classList.remove('flex');
    downloadOverlay.classList.add('hidden');
    _isDownloading = false;
    _currentDownloadId = null;
  }, 1000);
}

// Simulate progressive download preparation
async function simulateProgressiveDownload() {
  let progress = 0;
  
  return new Promise(resolve => {
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        downloadProgress.style.width = '100%';
        setTimeout(resolve, 500);
      } else {
        downloadProgress.style.width = `${progress}%`;
      }
    }, 250);
  });
}

// Create and trigger download for a demo file
function generateDownloadFile(game) {
  // This is a simplified version for demonstration purposes
  // In a real application, we would implement proper security measures
  
  // Create a demo blob to simulate file download
  const demoContent = `This is a placeholder for ${game.title} by ${game.developer}.
This would be the actual game file in a real application.
File size: ${game.size}
Release date: ${game.releaseDate}

Description:
${game.fullDescription}

Download timestamp: ${new Date().toISOString()}
Download ID: ${generateSecureDownloadId()}

THIS IS A DEMO FILE - In a real application, this would be the actual game installer.`;
  
  const blob = new Blob([demoContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  // Create download link
  const a = document.createElement('a');
  a.href = url;
  a.download = `${game.title.replace(/\s+/g, "location.href = '/load.html';")}`;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
  
  // Log analytics (in real app, this would be secure server-side tracking)
  console.log(`Download initiated for: ${game.title}`);
}

// Generate secure download ID (for demo purposes)
function generateSecureDownloadId() {
  return 'IGDC-' + Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Verify download eligibility
function verifyDownloadPermissions() {
  // In a real app, this would check user credentials, verify license, etc.
  return true;
}