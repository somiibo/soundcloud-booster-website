Manager.log('Init main.js');

var dom = Manager.dom();
var url = window.location.href;

// Load page specific scripts
if (url.includes('/pricing')) {
  dom.loadScript({src: 'https://cdn.itwcreativeworks.com/assets/general/js/pricing-page-handler/index.js'})
} else if (url.includes('/download')) {
  dom.loadScript({src: 'https://cdn.itwcreativeworks.com/assets/general/js/download-page-handler/index.js'})
} else if (url.includes('/browser-extension') || url.includes('/extension')) {
  dom.loadScript({src: 'https://cdn.itwcreativeworks.com/assets/general/js/browser-extension-page-handler/index.js'})
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

// Setup Tracking
var storage = Manager.storage();
var auth = storage.get('user.auth') || {};
var setup = false;

if (auth && auth.uid && auth.email) {
  setupTracking(auth);
}

Manager.auth().ready(function (user) {
  setupTracking(user);

  storage.set('user.auth.uid', user.uid);
  storage.set('user.auth.email', user.email);
})

function setupTracking(config) {
  if (setup) { return; }

  var tracking = window.Configuration.global.tracking;
  var phone = config.phone ? parseInt(config.phone.replace(/\+/ig, '')) : null;

  // Google Analytics
  gtag('set', 'user_id', config.uid);

  // Facebook Pixel
  fbq('init', tracking.facebookPixel, {
    external_id: config.uid,
    em: config.email,
    ph: phone,
    // fn: 'first_name',
    // ln: 'last_name',
  });

  // TikTok Pixel
  ttq.identify({
    external_id: config.uid || '',
    email: config.email || '',
    phone_number: phone ? '+' + phone : '',
  })

  setup = true;
}

