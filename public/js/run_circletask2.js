//CIRCLE TASK 1

// pages of instructions for task 1 practice trials
var circle2_instruct = {
    on_load: staircase_init(),
    type: "instructions",
    pages: [
        "<p><b>Breath Task (B)</b></p>" +
        "<p>Practice is now complete. We are ready for the main task.</p>" +
        "<p class='description'>The main task will be just like what you just practiced.<br>" +
        instruct_viewpulse,

        "<p><b>Breathe with the Circle</b></p>" + instruct_breathealong,
        
        "<p><b>Keyboard Responses</b></p>" +
        "<p>Please also continue to track the circle with the keyboard arrows.</p>" +
        instruct_keypressalong,

        "<p><b>Noticing Change</b></p>" +
        "<p class='description'p>While you are breathing along with the circle " +
        "you may notice your breathing" +
        "<em_black> speed up </em_black>or <em_black>slow down.</em_black></p>"+
        instruct_whennotice,
        instruct_getready,                
        instruct_whennoticequick,        
        
    ],
    show_clickable_nav: true,
    post_trial_gap: 500
};

// instructions if the person fails to track the circle
var repeat_circle2_instruct = {
    type: "instructions",    
    pages: [
        "<p>We noticed that you are not tracking the circle very well.</p>" +
        "<p>We can only use your data if you show that you are paying attention.</p>" +
        "<p>Please try to stay focused and press the keys along with your breaths.</p><br>" +
        instruct_breathealong + instruct_keypressalong + 
        instruct_whennoticequick,  
    ],
    show_clickable_nav: true,
    post_trial_gap: 500
};

//Circle 2 NODE
var repeat_circle2_node = {
    timeline: [repeat_circle2_instruct],
    conditional_function: function(){
        if(repeatneeded){            
            return true;
        } else {
            console.log(repeatneeded, detectACC, "Circle 2 Good to go!");
            return false;
        }
    }
}

let circle2Trials = generatetrials(NUMBER_OF_TRIALS_2)
shuffle(circle2Trials);

var circle2_node = {
    timeline: [fixation, circleTask2, detectchange, confidencerating, entrain_reminder, repeat_circle2_node],
    on_timeline_start: function() {
        console.log("Prep Circle 2");
        blockName = "Circle2"; 
        numPulses = NUMBER_OF_PULSES_2;       
        resetLogVars();
        curSpeed = circle2Trials.pop(); //select 1 from the trial list        
    },   
    loop_function: function(data){
        console.log("Track ACC: ",lastACC);
        if(circle2Trials.length > 0){ 
            //console.log("Do staircase for acc: ", detectACC);
            //nextStep(detectACC); No staircase for Version B            
            return true; //keep looping when there are more trials to use
        } else {
            trialNumber = 0;            
            return false; //break out of loop when trials are used up
        }        
    }
}
