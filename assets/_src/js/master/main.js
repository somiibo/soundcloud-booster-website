// Initiate the web manager
Manager = new (require('web-manager'));

Manager.init(Configuration, function() {
  // Initialize core.js
  require('./core.js');

  // Require app.js
  require('../app/app.js');
});
