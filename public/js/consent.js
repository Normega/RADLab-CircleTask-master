//Get User ID and Validate
var consentID
var gotConsent = false;

var consenttext = '<div>'+
'<p class="image"><img style="width:502px; height:130px;" src="/assets/CombinedLogo.png" /></p>' +
'</div>'+
'<div style="text-align:left; font-size:14px;">'+
'<p class="consent" style="text-align:center;"><b>CONSENT FORM – Course Credit Participant</b></p>' +
 '<p class="consent">I agree to participate in a study that is investigating body awareness.' + 
 'I understand that my participation is entirely voluntary: I can leave the study at any time' +
 ' and this will have no bearing on the credit I receive, nor will it have any other undesirable' +
 ' consequences. </p>' +
 '<p class="consent"><b>The following points have been explained to me: </b></p>'+
 '<p class="consent"><b>1.	The purpose of this research </b>is to explore how people vary in their' +
 ' ability to sense their own bodies and how that relates to one’s sense of well-being.' +
 ' I understand that I will be asked to carry out tasks tapping various mental skills.</p>' +
 '<p class="consent">The benefits I may expect to receive from this study are: ' +
 '<br>(a) an appreciation of research on person perception, learning, and state of mind,' +
 '<br>(b) an opportunity to contribute to scientific research, and ' +
 '<br>(c) course credit for Psychology 100 or 201. </p>' +
 '<p class="consent"><b>2.	The procedure, lasting up to 1 hour, will be as follows: </b>' +
 '<br>1) I will breathe along with a circle that pulses (expands and contracts) on my computer screen; ' +
 '<br>2) I will monitor my breathing and report whether it is speeding up, slowing down, or not changing; and ' +
 '<br>3) I will be asked to fill out some questionnaires measuring different aspects of my mood and body awareness. </p>' +
 '<p class="consent"><b>3.	The researchers do not foresee any risks to me for participating in this study,</b> ' +
 'nor do they expect that I will experience any discomfort or stress.  ' +
 'If I do experience feelings of discomfort at any point during the study, I recognise that ' +
 'I am free to refrain from answering any question, or withdraw from the study at any time, ' +
 'without penalty, and will still receive credit for my participation regardless of my completion of the study.</p>'+
 '<p class="consent"><b>4.	All of the data collected will remain strictly confidential.</b> ' +
 ' Only people associated with the study will see my responses.  This consent form will be stored separately.  ' +
 'My responses will not be associated with my name; instead, my name will be converted to a code ' +
 'number when the researchers store the date. </p>' +
 '<p class="consent"><b>5.	The experimenter will answer any other questions about the research by email.</b> ' + 
 ' If I have any other questions or concerns, I can address them to the principal investigator:  ' + 
 'Dr. Norman Farb, email: norman.farb@utoronto.ca, tel: (905) 828-3959, ' + 
 'or the chair of the social sciences ethics board, ' + 
 ' Professor Samantha Hansen, email: samantha.hansen@rotman.utoronto.ca  tel: (416) 208-4892.</p>' +
 '<p class="consent"><b>6.	Upon completion of my participation,</b> I will receive a  written explanation about ' +
 'the rationale and predictions underlying this experiment.</p>'+
'<p class="consent"><b>By typing my name below, I hereby consent to participate in the experiment, as described above.</b></p>'+
'<table><tr><td style="text-align:right;"><p class="inputQ"><b>Legal Name: </b></p></td>'+
'<td style="text-align:left;"><p class="input"><input name="consentID" id="consentID" type="text"></p></td></tr></table>' +
'</div>';

var consentIdText = consenttext;

var getConsent_trial = {
type: 'survey-html-form',        
html:  function(){
    return consentIdText
},
autofocus: 'consentID',
data: { taskType: "consentID"},
on_finish: function(data){       
    //console.log(data.response);
    
    if(data.response.consentID){        
        console.log(consentID);
        consentID = data.response.consentID;
        gotConsent = true;
    }        
}
};

// Logs that a consent ID has been created
var consent_node = {
    timeline: [getConsent_trial],
    on_load: function() { trialNumber = 1; },
    loop_function: function(){                
        if(gotConsent){            
            console.log("Consent ID: ", consentID); //make sure the number matches the timeline order (from 0)
            //saveSessionData("GotConsent");
            trialNumber = 0;
            return false; //exit loop
        } else {  
            trialNumber +=1;          
            consentIdText = consenttext + 
            '<p style="text-align:center; color:red; font-size:14px;"><b>Sorry, but you must consent to participate in the ' +
            'study. Otherwise, please just close the browser window to exit.</b></p>'
            return true; //break out of loop when ID is valid
        }
    }
}