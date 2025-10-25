// The Ultimate Jekyll Service Worker manager will be bundled by webpack
// We need to use a webpack-specific require that will be processed at build time
import Manager from 'ultimate-jekyll-manager/service-worker';

// Load Manager
const manager = new Manager();

// Initialize
manager.initialize()
.then(() => {
  // Log
  console.log('Initialized service-worker.js');

  // Custom code
  // ...
});

