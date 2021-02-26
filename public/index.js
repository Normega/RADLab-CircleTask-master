// Circle Task
// v.0.2
// Authors: Kyle Logie and Norman Farb
// Email: norman.farb@utoronto.ca

// Experiment-wide Variables
var maintimeline = []; // the main experiment timeline

let TrialTypes1 = generatetrials(NUMBER_OF_TRIALS_1)
shuffle(TrialTypes1);

////////////////////////////////////////////////////////
// Populate the Experiment Timeline
////////////////////////////////////////////////////////
(firebase.auth);


//maintimeline.push(welcome_trial); //instructions.js
//maintimeline.push(consent_trial); //consent.js

maintimeline.push(validateID_node); //getID.js
//maintimeline.push(entrain_node);    //entrain.js
//maintimeline.push(practice_node);   //practice1.js

maintimeline.push(practice2_node);    //practice2.js
maintimeline.push(goodbye_trial)    //instructions.js

// start the experiment
jsPsych.init({
    timeline: maintimeline, //unsaved
    show_progress_bar: true,
    on_finish: function () {
        console.log(jsPsych.data.get().json());
        saveSummaryData(jsPsych.data.get().json());
    }
});