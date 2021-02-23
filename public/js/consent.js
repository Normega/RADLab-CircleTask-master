//CONSENT FORM

var consent_block = {
    type: 'survey-multi-choice', 
    preamble: consent,
    questions: [{prompt: "<h3>Authorization</h3>", options: consent_options, required:true, name: 'consent_resp'}],
    button_label: "Next",
  on_finish: function(data){
    var responses = JSON.parse(data.responses); 
    jsPsych.data.addProperties({consent: responses.consent_resp}); 
    }
};


var check_consent = {
    timeline: [consent_block],
    conditional_function: function(){
        var data = jsPsych.data.getLastTrialData().values()[0];
        var responses = JSON.parse(data.responses);
        if(responses.consent_resp=='I have read this form and decided that I will not participate in the experiment described above.'){
            noConsent();
            jsPsych.endExperiment();
            return true; 
        } else {
        	$('html,body').scrollTop(0);
            return false; 
        }
    }
}
