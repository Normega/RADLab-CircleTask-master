// Circle Task
// v.0.2
// Authors: Kyle Logie and Norman Farb
// Email: norman.farb@utoronto.ca

// Experiment-wide Variables
var maintimeline = []; // the main experiment timeline



////////////////////////////////////////////////////////
// Populate the Experiment Timeline
////////////////////////////////////////////////////////
(firebase.auth);

maintimeline.push(preload); //helpers.js
maintimeline.push(welcome_trial); //instructions.js
maintimeline.push(consent_trial); //consent.js

maintimeline.push(validateID_node); //getID.js
maintimeline.push(entrain_node);    //entrain.js
maintimeline.push(practice_node);   //practice1.js

if (Math.random() < 0.5){                   //counterbalance order
    maintimeline.push(practice2_node);    //practice2.js  
    maintimeline.push(circle1_instruct);    //run_circletask1.js
    maintimeline.push(circle1_node);    //run_circletask1.js
    maintimeline.push(graph_trial);
    
    maintimeline.push(MAIA_node); //questionnaire_MAIA.js    
    maintimeline.push(newtask_trial);    //instructions.js
    
    maintimeline.push(practice2b_node);    //practice2b.js
    maintimeline.push(circle2_instruct);    //run_circletask2.js
    maintimeline.push(circle2_node);    //run_circletask1.js
    maintimeline.push(graph_trial);    
} else {
    
    maintimeline.push(practice2b_node);    //practice2b.js
    maintimeline.push(circle2_instruct);    //run_circletask2.js
    maintimeline.push(circle2_node);    //run_circletask1.js
    maintimeline.push(graph_trial);    

    
    maintimeline.push(MAIA_node); //questionnaire_MAIA.js
    maintimeline.push(newtask_trial);    //instructions.js

    maintimeline.push(practice2_node);    //practice2.js  
    maintimeline.push(circle1_instruct);    //run_circletask1.js
    maintimeline.push(circle1_node);    //run_circletask1.js
    maintimeline.push(graph_trial);
    
};


maintimeline.push(goodbye_trial);    //instructions.js*/


// start the experiment
jsPsych.init({
    timeline: maintimeline, //unsaved
    show_progress_bar: true,
    on_finish: function () {
        console.log(jsPsych.data.get().json());
        saveSummaryData(jsPsych.data.get().json());
    }
});