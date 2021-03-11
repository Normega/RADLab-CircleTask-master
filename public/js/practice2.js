//PRACTICE TASK 2

// pages of instructions for task 1 practice trials
var pract2_instruct = {
    type: "instructions",
    pages: [
        "<p><b>Practice 2 (Task A)</b></p>" +
        "<p>Let's practice before the main task.</p>" + instruct_viewpulse,
        "<p><b>Breathe with the Circle</b></p>" + instruct_breathealong,        
        "<p><b>Keyboard Responses</b></p>" +
        instruct_keypressalongPic + instruct_keypressalong,
        "<p><b>Noticing Change</b></p>" +
        "<p class='description'p>The new thing we would like you to do is notice if your breathing" +
        "<em_black> speeds up, slows down, </em_black> or <em_black> stays the same.</em_black> </p>" +
        "<p class='description'>We will ask you to report what happened after you breathe along with the circle.</p>", 
        instruct_getready,        
    ],
    show_clickable_nav: true,
    post_trial_gap: 500
};

// instructions if the person fails the task 1 practice trials
var repeat_pract2_instruct = {
    type: "instructions",
    repeatneeded: function(){return repeatneeded},
    detectACC: function(){return detectACC},    
    pages: [
        function(){return errortext(lastACC, detectACC)},        
    ],
    show_clickable_nav: true,
    // key_forward: 's',
    post_trial_gap: 500
};

//PRACTICE NODE
var repeat_pract2_node = {
    timeline: [repeat_pract2_instruct],
    conditional_function: function(){
        if(repeatneeded){            
            return true;
        } else {
            console.log(repeatneeded, detectACC, "Practice2 Good to go!");
            return false;
        }
    }
}

var practice2_node = {
    timeline: [pract2_instruct, fixation, circleTask1, detectchange, entrain_reminder, repeat_pract2_node],
    on_timeline_start: function() {
        console.log("Prep Practice 2");
        blockName = "Practice2";        
        lastACC = 100;      //start off as though things are great and wait to be disappointed
        detectACC = 1;      //start off as though things are great and wait to be disappointed
        curSpeed = generatetrials(1)[0]; //select 1 at random each time the node loads                      
        numPulses = NUMBER_OF_PRACTICE_PULSES_1;
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
