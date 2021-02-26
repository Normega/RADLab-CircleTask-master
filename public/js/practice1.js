//PRACTICE TASK 1 

// pages of instructions for task 1 practice trials
var pract_instruct = {
    type: "instructions",
    pages: [
        "<p><b>Practice 1</b></p>" +
        "<p>We have a some more advanced practice.</p>" +
        "<p class='description'>You will again see the circle <em_blue>expanding</em_blue> and " + 
        "<em_red>contracting.</em_red></p>",
        "<p><b>Breathe with the Circle</b></p>" +
        "<p class='description'>Please continue to <em_blue>breath in </em_blue> as the circle <em_blue>grows</em_blue>" +
        " and <em_red>breathe out</em_red> as the circle <em_red>contracts.</em_red></p>",        
        "<p><b>Keyboard Responses</b></p>" +
        "<p>Now, we would also like you to track the circle using the arrow keys.</p>" +
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

var practice_node = {
    timeline: [pract_instruct, circleTask1, repeat_pract_node],
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


