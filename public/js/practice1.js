//PRACTICE TASK 1 

// pages of instructions for task 1 practice trials
var pract_instruct = {
    type: "instructions",
    pages: [
        "<p><b>Practice 1</b></p>" +
        "<p>We have some practice before the main task.</p>" + instruct_viewpulse,
        
        "<p><b>Breathe with the Circle</b></p>" + instruct_breathealong,        
        
        "<p><b>Keyboard Responses</b></p>" +
        "<p>We would also like you to track the circle using the arrow keys.</p>" +
        instruct_keypressalongPic + 
        "<p>Please have your hand on the arrow keys on your keyboard.</p>" + instruct_keypressalong,
        
        "<p><b>How to Pass the Practice Trials</b></p>" +
        "<p>It is important to demonstrate that you can track the circle.</p>" +
        "<p>If you do not press the keys accurately enough, we will ask you to try again.</p>",        
        instruct_getready,        
    ],
    show_clickable_nav: true,
    post_trial_gap: 500
};

// instructions if the person fails the task 1 practice trials
var repeat_pract_instruct = {
    type: "instructions",
    pages: [
        "<p><b>Repeat Practice</b></p>" +
        "<p>Sorry, you did not track the circle accurately enough.</p><br>" +
        instruct_keypressalong +
        "<br><p>You will need to repeat the practice trial to make sure that you " +
        "understand the task instructions.</p>",        
    ],
    show_clickable_nav: true,
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

var practice_node = {
    timeline: [pract_instruct, fixation, circleTask1, entrain_reminder, repeat_pract_node],
    on_timeline_start: function() {         
        blockName = "Practice1"; 
        repeatneeded=false; //start off as though things are great and wait to be disappointed
        lastACC = 100; //start off as though things are great and wait to be disappointed
        detectACC=1;  //start off as though things are great and wait to be disappointed
        curSpeed = "nochange";
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


