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


maintimeline.push(welcome_trial);
//maintimeline.push(instructions1_trial);


var repeatneeded = false;

maintimeline.push(validateID_node);

maintimeline.push(entrain_node);
maintimeline.push(practice_node);
maintimeline.push(goodbye_trial)

// start the experiment
jsPsych.init({
    timeline: maintimeline, //unsaved
    show_progress_bar: true,
    on_finish: function () {
        console.log(jsPsych.data.get().json());
        saveSummaryData(jsPsych.data.get().json());
    }
});