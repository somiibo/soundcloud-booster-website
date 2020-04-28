Manager = new (require('web-manager'));
// Manager = new (require('/Users/ianwiedenman/Documents/GitHub/ITW-Creative-Works/web-manager'));

Manager.init(Configuration, function() {
  Manager.log('Init main.js');
  var app = require('../app/app.js');

  var dom = Manager.dom();

  var formIdCount = 0;
  var formData = {};

  dom.select('form.slapform').on('submit', function (e) {
    e.preventDefault();
    e.target.id = e.target.id || 'slapform-' + formIdCount++;
    var idSelector = '#' + e.target.id;
    setDisabled(true);
    var checkboxNames = [];
    var errorElement = e.target.getElementsByClassName('slapform-validation-error')[0];
    var pass;
    dom.select(idSelector + ' input, ' + idSelector + ' select, ' + idSelector + ' textarea').each(function (i, el) {
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
    if (pass) {
      Manager.ajax().request({
        method: 'POST',
        url: dom.select(idSelector).getAttribute('action'),
        data: formData,
      })
      .success(function (response, status, data) { // This function runs only on success
        Manager.log('SUCCESS', response, status, data);
        setError();
        window.location.href = 'https://slapform.com/submission?meta=' + encodeURIComponent('{"status":"success","referrer":"' + (formData['slap_redirect'] || window.location.href) + '"}');
      })
      .error(function (response, status, error) { // This function runs only on error
        Manager.log('FAIL', error);
        setError(error);
        setDisabled(false);
      });
    } else {
      setDisabled(false);
    }
    Manager.log(formData);
    function setError(error) {
      var errorSelector = dom.select(errorElement);
      if (error) {
        errorSelector.show().setInnerHTML(error);
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
  });
});
