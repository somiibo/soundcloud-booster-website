function Slapform() {
  this.id = 0;
}

Slapform.prototype.process = function (event) {
  event.target.id = event.target.id || 'slapform-' + this.id++;
  var dom = Manager.dom();
  var formData = {};
  var idSelector = '#' + event.target.id;
  setDisabled(true);
  var checkboxNames = [];
  var errorElement = event.target.getElementsByClassName('slapform-validation-error')[0];
  var pass;

  dom.select(idSelector + ' input, ' + idSelector + ' select, ' + idSelector + ' textarea').each(function (el, i) {
    var elSelected = dom.select(el);
    var type = elSelected.getAttribute('type');

    var name = elSelected.getAttribute('name');
    var required = elSelected.getAttribute('required');
    required = !(required == null);
    formData[name] = (type == 'checkbox' || type == 'radio')
    ? dom.select(idSelector + ' ' + '*[name=\'' + name + '\']').getValue()
    : elSelected.getValue();
    var valToCheck = (type == 'checkbox') ? (formData[name] || [])[0] : formData[name];
    pass = (!required || (required && !!valToCheck));
    console.log(name, formData[name], 'required = ' + required, 'pass = ' + pass);
    if (!pass) {
      setError('Please fill out all of the required fields.');
      return false;
    }
  });
  Manager.log(formData);

  if (pass) {
    fetch(dom.select(idSelector).getAttribute('action'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(function (res) {
      setError();
      window.location.href = 'https://slapform.com/submission?meta=' + encodeURIComponent('{"status":"success","referrer":"' + (formData['slap_redirect'] || window.location.href) + '"}');
    })
    .catch(function (e) {
      setError(e);
      setDisabled(false);
    });
  } else {
    setDisabled(false);
  }
  function setError(e) {
    var errorSelector = dom.select(errorElement);
    Manager.log('FAIL', e);
    if (e) {
      errorSelector.show().setInnerHTML(e);
    } else {
      errorSelector.hide();
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
