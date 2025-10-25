// Import Ultimate Jekyll Manager
import Manager from 'ultimate-jekyll-manager';

// Create instance
const manager = new Manager();

// Initialize
manager.initialize()
.then(() => {
  // Shortcuts
  const { webManager } = manager;

  // Log
  console.log('Ultimate Jekyll Manager initialized successfully');

  // Custom code
  // ...
});

