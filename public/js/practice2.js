//PRACTICE TASK 2

// pages of instructions for task 1 practice trials
var pract2_instruct = {
    type: "instructions",
    pages: [
        "<p><b>Practice 2</b></p>" +
        "<p>There's one more element to add!</p>" +
        "<p class='description'>You will again see the  circle <em_blue>expanding</em_blue> and " + 
        "<em_red>contracting.</em_red></p>",
        "<p><b>Breathe with the Circle</b></p>" +
        "<p class='description'>Please continue to <em_blue>breath in </em_blue> as the circle <em_blue>grows</em_blue>" +
        " and <em_red>breathe out</em_red> as the circle <em_red>contracts.</em_red></p>",        
        "<p><b>Keyboard Responses</b></p>" +
        "<p>Please also continue to track the circle with the keyboard arrows.</p>" +
        "<p class='description'>Press <em_blue>UP</em_blue> when the circle <em_blue>expands</em_blue>" +
        " and <em_red>DOWN</em_red> when the circle <em_red>contracts.</em_red></p>",
        "<p><b>Noticing Change</b></p>" +
        "<p class='description'p>The new thing we would like you to do is notice if your breathing" +
        "<em_black> speeds up, slows down, </em_black> or <em_black> stays the same.</em_black> </p>" +
        "<p class='description'>We will ask you to choose what happened after you breathe along with the circle.</p>" +
        "<p class='description'>When you are ready, place your fingers on the <em_blue>UP</em_blue> and " +
        "<em_red>DOWN</em_red> arrow keys.</p>" +
        "<p class='description'>Please press <em_black>'RIGHT ARROW'</em_black> to begin!</p>",        
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
    timeline: [pract2_instruct, circleTask1, detectchange, repeat_pract2_node],
    on_timeline_start: function() {
        console.log("Prep Practice 2");
        blockName = "Practice2";        
        lastACC = 100;      //start off as though things are great and wait to be disappointed
        detectACC = 1;      //start off as though things are great and wait to be disappointed
        curSpeed = generatetrials(1)[0]; //select 1 at random each time the node loads                      
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
