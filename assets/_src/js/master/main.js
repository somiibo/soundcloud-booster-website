Manager = new (require('web-manager'));
// Manager = new (require('/Users/ianwiedenman/Documents/GitHub/ITW-Creative-Works/web-manager'));

Manager.init(Configuration, function() {
  Manager.log('Init main.js');
  var app = require('../app/app.js');
  var slapform;

  Manager.dom().select('form.slapform').on('submit', function (event) {
    event.preventDefault();
    import('./slapform-processor.js')
    .then(function (mod) {
      slapform = slapform || new mod.default;
      slapform.process(event)
    })
  });
});
