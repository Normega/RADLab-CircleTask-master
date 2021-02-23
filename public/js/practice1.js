//PRACTICE TASK 1 

// pages of instructions for task 1 practice trials
var pract_instruct = {
    type: "instructions",
    pages: [
        "<p><b>Practice 1</b></p>" +
        "<p>Great, now we have a some more advanced practice.</p>" +
        "<p  class='description'>You will again see the  circle <em_blue>expanding</em_blue> and " + 
        "<em_red>contracting.</em_red><br>",
        "Please continue to <em>breath in </em> when the circle is <em_blue>expanding</em_blue>" +
        " and breathe out when the circle is <em_red>contracting.</em_red></p>",
        "<p><b>Keyboard Responses</b></p>" +
        "<p>Please have your hand on the arrow keys on your keyboard.</p>" +
        "<p class='description'>Press <em_blue>UP</em_blue> when the circle <em_blue>expands</em_blue>" +
        " and <em_red>DOWN</em_red> when the circle <em_red>contracts.</em_red></p>",
        "<p><b>How to Pass the Practice Trials</b></p>" +
        "<p>It is important to demonstrate that you can track the circle.</p>" +
        "<p>If you do not press the keys accurately enough, we will ask you to try again.</p>" +
        "<p class='description'>When you are ready, place your fingers on the <em_blue>UP</em_blue> and " +
        "<em_red>DOWN</em_red> arrow keys.</p>" +
        "<p class='description'>Please press <em_black>'RIGHT ARROW'</em_black> to begin!</p>",        
    ],
    show_clickable_nav: true,
    post_trial_gap: 500
};

// instructions if the person fails the task 1 practice trials
var repeat_pract_instruct = {
    type: "instructions",
    pages: [
        "<p><b>Repeat Practice</b></p>" +
        "<p>Sorry, you did not track the circle accurately enough.</p>" +
        "<p>You must press the keys <b>immediately</b> each time the circle changes direction.</p>" +
        "<p>You will need to repeat the practice trial to make sure that you " +
        "understand the task instructions.</p>",        
    ],
    show_clickable_nav: true,
    // key_forward: 's',
    post_trial_gap: 500
};

//PRACTICE NODE
var repeat_pract_node = {
    timeline: [repeat_pract_instruct],
    conditional_function: function(){
        if(repeatneeded){
            console.log(repeatneeded, "Practice Repeat needed...");
            return true;
        } else {
            console.log(repeatneeded, "Practice Good to go!");
            return false;
        }
    }
}


//Practice Trial Construction
var circlePractice = {
    type: "circle-taskv2",
    trialNumber: function () {
        // function needed to return dynamic value of step
        // otherwise 0.1 passed each time
        return pracTrialNumber;
    },
    stimulus:
        "<canvas id='myCanvas' width='800' height='500'></canvas>" +
        "<p id='prompt' style='text-align:center;font-weight:bold;'></p>",
        choices: [38, 40], //up or down
    post_trial_gap: 1000,
    response_ends_trial: false,
    step: function () {
        // function needed to return dynamic value of step (allows it to change from initial value)   
        return step;
    },
    totalRateChange: function () {
        // to update rate change
        return rateChange;            
    },
    numberOfPulses: NUMBER_OF_PRACTICE_PULSES_1,
    speed: function(){        
        return generatetrials(1)[0];
    },
    on_load: function(){        
        saveSessionData("Practice1_Begin");
    },
    on_finish: function(){
        saveSessionData("Practice1_Complete");
    }
};

repeatneeded = false;
var pracTrialNumber = 0;
var practice_node = {
    timeline: [repeat_pract_node, pract_instruct, circlePractice],
    loop_function: function(data){
        pracTrialNumber += 1;
        if (repeatneeded) { 
            var indexer = 2; //if we are already on a repeat, there were 3 trials in timeline
        }else{
            var indexer = 1; //if we are not already repeating, there were 2 trials in timeline
        }
        if(data.values()[indexer].accuracy < 80){
            repeatneeded = true;
            //console.log(data.values()[indexer].accuracy, "BOO"); //make sure the number matches the timeline order (from 0)
            return true; //keep looping when accuracy is too low
        } else {
            repeatneeded = false;
            //console.log(data.values()[indexer].accuracy, "OK!");
            return false; //break out of loop when accuracy is high enough
        }
    }
}

