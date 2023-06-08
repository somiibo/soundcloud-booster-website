Manager = new (require('web-manager'));
// Manager = new (require('/Users/ianwiedenman/Documents/GitHub/ITW-Creative-Works/web-manager'));
// Manager = (new (require('ultimate-jekyll-manager')));
// Manager = new ((new (require('ultimate-jekyll-manager'))).require('web-manager'));
// Manager = require('ultimate-jekyll-manager').require('web-manager')
// Manager = (new (require('ultimate-jekyll-manager'))).webManager();

// console.log('Manager', Manager);

Manager.init(Configuration, function() {
  Manager.log('Init main.js');

  var dom = Manager.dom();
  var url = window.location.href;

  // Load page specific scripts
  if (url.includes('/pricing')) {
    dom.loadScript({src: 'https://cdn.itwcreativeworks.com/assets/general/js/pricing-page-handler/index.js'})
  } else if (url.includes('/download')) {
    dom.loadScript({src: 'https://cdn.itwcreativeworks.com/assets/general/js/download-page-handler/index.js'})
  }  

  // Load Slapform
  var slapform;
  dom.select('form.slapform')
  .each(function (el, i) {

    dom.select(el).on('submit', function (event) {
      event.preventDefault();
      import('./slapform-processor.js')
      .then(function (mod) {
        slapform = slapform || new mod.default;
        slapform.process(event);
      })
    });

    dom.select(el.querySelector('button[type="submit"]'))
      .removeAttribute('disabled')
      .removeClass('disabled');
  })

  // Require app.js
  require('../app/app.js');
});

// require('./tracking/google-analytics.js')
// window.gtag = function(){dataLayer.push(arguments);}
// window.gtag('js', new Date());
// window.gtag('config', 'UA-139422427-6');
// console.log('----2', Configuration);
