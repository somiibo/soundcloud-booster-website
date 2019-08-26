Manager = new (require('web-manager'));
// Manager = new (require('/Users/ianwiedenman/Documents/GitHub/ITW-Creative-Works/web-manager'));

Manager.init(Configuration, function() {
  Manager.log('Init main.js');
  var app = require('../app/app.js');
});
