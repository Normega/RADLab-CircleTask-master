//ENTRAIN BREATH TO CIRCLE

// pages of instructions for entraining the breath to the circle
var entrain_instruct = {
    type: "instructions",
    pages: [
        "<p><b>Breath Matching</b></p>" +
        "<p class='description'>In this study, we are going to look at how you can detect changes in your breathing.<br>" +
        "For it to work, it is important to get used to breathing along with a circle on screen.<br>" +
        "<p>  <img src='./assets/circle.png' alt='a circle'> </p>" +        
        "You will see a circle begin to <em_blue>expand</em_blue> and " +
        "<em_red>contract.</em_red></p>",
        "<p><b>Breathe with the Circle</b></p>" +
        "<p class='description'>We would like you to practice matching your breath to the circle.</p>",
        "<p><b>Breathe In with the Circle</b></p>" +
        "<p>  <img src='./assets/inst3.png' alt='Breathe in with the circle'> </p>",
        "<p><b>Breathe Out with the Circle</b></p>" +
        "<p>  <img src='./assets/inst4.png' alt='Breathe out with the circle'> </p>",
        "<p><b>Get Ready</b></p>" +
        "<p class='desciption'>We will ask you to match your breath to the circle for about a minute.<br>" +
        "Please press <em_black>'RIGHT ARROW'</em_black> to begin.</p>",        
    ],
    show_clickable_nav: true,
    post_trial_gap: 500
};

// instructions if the person reports having trouble with the entrain trials
var repeat_entrain_instruct = {
    type: "instructions",
    pages: [
        "<p><b>Repeat Breath Matching</b></p>" +
        "<p class='description'>Okay, let's try it again!</p>",        
    ],
    show_clickable_nav: true,
    // key_forward: 's',
    post_trial_gap: 500
};

//ENTRAIN NODE
var repeat_entrain_node = {
    timeline: [repeat_entrain_instruct],
    conditional_function: function(){
        if(repeatneeded){
            console.log(repeatneeded, "Entrain Repeat needed...");
            return true;
        } else {
            console.log(repeatneeded, "Entrain Good to go!");
            return false;
        }
    }
}


var entrain_check = {
    type: "html-keyboard-response",
    stimulus: "<p>Were you able to match your breath to the circle?</p>",
    choices: ["y", "n"],
    prompt: "<p>Y - Yes. <br/>  N - No. </p>",
    data: { 
        taskType: "entrainCheck", 
        trial: trialNumber 
    },
    on_finish: function(data){
        detectACC = jsPsych.pluginAPI.compareKeys(data.response, 'y');
        console.log(data.response);
        if(detectACC){ 
            data.entrainOK = true;
            repeatneeded = false;
        } else {
            data.entrainOK = false;
            repeatneeded = true;
        }
    }
}


var entrain_node = {
    timeline: [repeat_entrain_node, entrain_instruct, breathEntrain, entrain_check],
    on_load: function() {         
        blockName = "Entrain"; 
        repeatneeded = false; 
        detectACC=1;},
    loop_function: function(data){      
        if(repeatneeded){
            console.log("ENTRAIN REPEAT!"); //make sure the number matches the timeline order (from 0)
            return true; //keep looping when more entraining is needed
        } else {
            console.log("ENTRAIN OK!");
            trialNumber = 0;
            return false; //break out of loop when entraining is complete
        }
    }
}
