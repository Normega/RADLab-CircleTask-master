//CONSENT FORM
var check_consent = function(elem) {
    if (document.getElementById('consent_checkbox').checked) {
      return true;
    }
    else {
      alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'\n\n" +
      "Otherwise, please just close the browser window to exit.");
      return false;
    }
    return false;
  };
  
  
  // declare the block.
  var consent_trial = {
    type: "external-html",
    url: "./assets/consent.html",
    cont_btn: "start",
    check_fn: check_consent
  };