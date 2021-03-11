//CIRCLE TASK 1

// pages of instructions for task 1 practice trials
var circle1_instruct = {
    on_load: staircase_init(),
    type: "instructions",
    pages: [
        "<p><b>Breath Task (A)</b></p>" +
        "<p>We are ready for the main task.</p>" +
        "<p class='description'>The main task will be just like what you just practiced.<br>" +
        instruct_viewpulse,
        
        "<p><b>Breathe with the Circle</b></p>" +
        instruct_breathealong,        
        
        "<p><b>Keyboard Responses</b></p>" +
        "<p>Please also continue to track the circle with the keyboard arrows.</p>" +
        instruct_keypressalong,        
        
        "<p><b>Noticing Change</b></p>" +
        "<p class='description'p>After you breathe along with the circle for up to a minute " +
        "we will ask if your breathing" +
        "<em_black> sped up, slowed down, </em_black> or <em_black> stayed the same.</em_black> </p>"+
        "<p>We will also ask you to rate how confident you are in your decision.</p>",
        instruct_getready,        
    ],
    show_clickable_nav: true,
    post_trial_gap: 500
};

// instructions if the person fails to track the circle
var repeat_circle1_instruct = {
    type: "instructions",    
    pages: [
        "<p>We noticed that you were having trouble tracking the circle.</p>" +
        "<p>We can only use your data if it is clear you are paying attention.</p>" +        
        instruct_breathealong + instruct_keypressalong,
        
    ],
    show_clickable_nav: true,
    // key_forward: 's',
    post_trial_gap: 500
};

//Circle 1 NODE
var repeat_circle1_node = {
    timeline: [repeat_circle1_instruct],
    conditional_function: function(){
        if(repeatneeded){            
            return true;
        } else {
            console.log(repeatneeded, detectACC, "Circle 1 Good to go!");
            return false;
        }
    }
}

let circle1Trials = generatetrials(NUMBER_OF_TRIALS_1)
shuffle(circle1Trials);

var circle1_node = {
    timeline: [fixation, circleTask1, detectchange, confidencerating, entrain_reminder, repeat_circle1_node],
    on_timeline_start: function() {
        console.log("Prep Circle 1");
        blockName = "Circle1";
        numPulses = NUMBER_OF_PULSES_1;
        resetLogVars();        
        
        curSpeed = circle1Trials.pop(); //select 1 from the trial list        
    },   
    loop_function: function(data){
        console.log("Track ACC: ",lastACC);
        if(circle1Trials.length > 0){ 
            console.log("Do staircase for acc: ", detectACC);
            nextStep(detectACC);           
            return true; //keep looping when there are more trials to use
        } else {
            trialNumber = 0;            
            return false; //break out of loop when trials are used up
        }        
    }
}
