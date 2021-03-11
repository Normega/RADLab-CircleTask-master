//PRACTICE TASK 2

// pages of instructions for task 1 practice trials
var pract2b_instruct = {
    type: "instructions",
    pages: [
        "<p><b>Practice 2 (Task B)</b></p>" +
        "<p>Let's practice before the main task.</p>" + instruct_viewpulse,
        "<p><b>Breathe with the Circle</b></p>" + instruct_breathealong,
        
        "<p><b>Keyboard Responses</b></p>" +        
        instruct_keypressalongPic + instruct_keypressalong,
        "<p><b>Noticing Change</b></p>" +
        "<p class='description'>While you are breathing along with the circle " +
        "<em_black>you may notice </em_black> that the your breathing is " +
        "<em_black>speeding up or slowing down.</em_black></p>"+
        instruct_whennotice,
        instruct_getready +
        "<br>" +
        instruct_whennoticequick,        
        
    ],
    show_clickable_nav: true,
    post_trial_gap: 500
};

// instructions if the person fails the task 1 practice trials
var repeat_pract2b_instruct = {
    type: "instructions",
    repeatneeded: function(){return repeatneeded},
    detectACC: function(){return detectACC},    
    pages: [
        function(){return errortext(lastACC, detectACC)},        
    ],
    show_clickable_nav: true,
    post_trial_gap: 500
};

//PRACTICE NODE
var repeat_pract2b_node = {
    timeline: [repeat_pract2b_instruct],
    conditional_function: function(){
        if(repeatneeded){            
            return true;
        } else {
            console.log(repeatneeded, detectACC, "Practice2b Good to go!");
            return false;
        }
    }
}

var practice2b_node = {
    timeline: [pract2b_instruct, circleTask2, detectchange, entrain_reminder, repeat_pract2b_node],
    on_timeline_start: function() {
        console.log("Prep Practice 2b");
        blockName = "Practice2b";        
        resetLogVars();
        curSpeed = generatetrials(1)[0]; //select 1 at random each time the node loads                      
        numPulses = NUMBER_OF_PRACTICE_PULSES_2;
    },   
    loop_function: function(data){
        console.log("Track ACC: ",lastACC);
        if(repeatneeded){            
            return true; //keep looping when accuracy is too low
        } else {
            trialNumber = 0;            
            return false; //break out of loop when accuracy is high enough
        }        
    }
}
