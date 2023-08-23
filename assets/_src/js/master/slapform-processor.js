function Slapform() {
  var self = this;
  self.id = 0;
}

Slapform.prototype.init = function () {
  var self = this;

  Manager.dom().select('form.slapform')
  .each(function (el, i) {

    console.log('Initialized slapform', i, el);

    Manager.dom().select(el)
      .on('submit', function (event) {
        event.preventDefault();
        self.process(event);
      });

    Manager.dom().select(el.querySelector('button[type="submit"]'))
      .removeAttribute('disabled')
      .removeClass('disabled');
  })

};

Slapform.prototype.process = function (event) {
  var self = this;
  event.target.id = event.target.id || 'slapform-' + self.id++;
  var dom = Manager.dom();
  var formData = {};
  var idSelector = '#' + event.target.id;
  var slapType = event.target.dataset.slapType || 'form';
  var action = event.target.getAttribute('action');
  setDisabled(true);
  var checkboxNames = [];
  var pass;

  dom.select(idSelector + ' input, ' + idSelector + ' select, ' + idSelector + ' textarea').each(function (el, i) {
    var elSelected = dom.select(el);
    var type = elSelected.getAttribute('type');

    var name = elSelected.getAttribute('name');
    var required = elSelected.getAttribute('required');
    required = !(required == null);
    formData[name] = (type === 'checkbox' || type === 'radio')
    ? dom.select(idSelector + ' ' + '*[name=\'' + name + '\']').getValue()
    : elSelected.getValue();
    var valToCheck = (type === 'checkbox') ? (formData[name] || [])[0] : formData[name];
    pass = (!required || (required && !!valToCheck));
    console.log(name, formData[name], 'required = ' + required, 'pass = ' + pass);
    if (!pass) {
      setStatus(new Error('Please fill out all of the required fields.'));
      return false;
    }
  });

  formData._source = 'ultimate-jekyll';
  formData._version = '';
  formData._referrer = window.location.href;

  try {
    var currentUser = firebase.auth().currentUser;
    formData.uid = currentUser.uid;
    if (!formData.email && !formData.slap_replyto) {
      formData.slap_replyto = currentUser.email;
    }
  } catch (e) {}

  Manager.log(formData);

  if (pass) {
    if (slapType === 'form') {
      var newURL = new URL(action)
      Object.keys(formData)
      .forEach(function (key, i) {
        newURL.searchParams.set(key, formData[key])
      });
      window.location.href = newURL.toString();
    } else {
      fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      .then(function (res) {
        setStatus('success');
        // window.location.href = 'https://slapform.com/submission?meta=' + encodeURIComponent('{"status":"success","referrer":"' + (formData['slap_redirect'] || window.location.href) + '"}');
      })
      .catch(function (e) {
        setStatus(e);
        setDisabled(false);
      });
    }
  } else {
    setDisabled(false);
  }

  function setStatus(status, message) {
    var errorElement = dom.select(event.target.getElementsByClassName('slapform-error')[0]);
    var successElement = dom.select(event.target.getElementsByClassName('slapform-success')[0]);
    errorElement.setAttribute('hidden', true)
    successElement.setAttribute('hidden', true)
    if (status instanceof Error) {
      errorElement.removeAttribute('hidden').setInnerHTML(status);
    } else if (status === 'success') {
      successElement.removeAttribute('hidden').setInnerHTML(message || 'Success! Please allow a few business days for our team to get back to you.');
    }
  }

  function setDisabled(status) {
    Manager.log('setting disalbed = ', status);
    var btn = dom.select(idSelector + ' button[type=\'submit\']');
    if (status) {
      btn.setAttribute('disabled', status);
    } else {
      btn.removeAttribute('disabled');
    }
  }
};

module.exports = Slapform;
window._SlapformProcessor = Slapform;

