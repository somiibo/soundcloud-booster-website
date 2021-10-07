window.$ = require('jquery');
window.jQuery = window.$;
require('jquery-migrate');
require('bootstrap');

// require('../../../_src-uncompiled/vendor/hs-header/dist/hs-header.js');
// require('../../../_src-uncompiled/vendor/hs-mega-menu/dist/hs-mega-menu.min.js');
// console.log('-----A');
// require('../../../_src-uncompiled/vendor/hs-toggle-switch/dist/hs-toggle-switch.js');
// console.log('-----B');

require('../theme/theme.min.js');

Manager.ready(function() {
  Manager.log('app.js fired Manager.ready()');

  // Add additional logic here!
  // var theme = require('../theme/theme.js');

});
