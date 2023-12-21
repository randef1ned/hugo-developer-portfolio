function init_recaptcha(site_id) {
  grecaptcha.execute(site_id, {action: 'submit'}).then(function (token) {
    document.getElementById('g-recaptcha-response').value = token;
    document.getElementById('submit').textContent = 'Submit';
    document.getElementById('submit').disabled = false;
    document.getElementById('message').disabled = false;
  });
};

window.addEventListener('DOMContentLoaded', () => {
  var name_input = document.getElementById('name');
  var email_input = document.getElementById('email');
  var message_input = document.getElementById('message');
  
  function save_data() {
    localStorage['contact_name'] = name_input.value;
    localStorage['contact_email'] = email_input.value;
    localStorage['message'] = message_input.value;
  };
  
  function load_data() {
    if (localStorage['contact_name'])
      name_input.value = localStorage['contact_name'];
    if (localStorage['contact_email'])
      email_input.value = localStorage['contact_email'];
    if (localStorage['message'])
      message_input.value = localStorage['message'];
  };
  
  function supports_html5_storage(){
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch(e) {
      return false;
    }
  };
  
  // create alert box
  const alertPlaceholder = document.getElementById('auto_save');
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      '   <h4 class="alert-heading">About auto save</h4>',
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      `   <div>${message}</div>`,
      '</div>'
    ].join('');
    
    alertPlaceholder.append(wrapper);
  };
  if (supports_html5_storage()) {
    name_input.addEventListener('change', save_data);
    email_input.addEventListener('change', save_data);
    message_input.addEventListener('change', save_data);
    window.addEventListener('DOMContentLoaded', load_data);
    appendAlert('Your browser does support auto save.', 'success');
  } else {
    var warning_message = 'CAUTION: Your browser does not support auto save!!';
    appendAlert(warning_message, 'danger');
    window.alert(warning_message);
  };
});

