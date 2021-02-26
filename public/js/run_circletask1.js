//PRACTICE TASK 2

// pages of instructions for task 1 practice trials
var circle1_instruct = {
    on_load: staircase_init(),
    type: "instructions",
    pages: [
        "<p><b>Breath Task (A)</b></p>" +
        "<p>Practice is now complete. We are ready for the main task.</p>" +
        "<p class='description'>The main task will be just like what you just practiced.<br>" +
         "you will again see the circle <em_blue>expanding</em_blue> and " + 
        "<em_red>contracting.</em_red></p>",
        "<p><b>Breathe with the Circle</b></p>" +
        "<p class='description'>Please continue to <em_blue>breath in </em_blue> as the circle <em_blue>grows</em_blue>" +
        " and <em_red>breathe out</em_red> as the circle <em_red>contracts.</em_red></p>",
        "<p><b>Keyboard Responses</b></p>" +
        "<p>Please also continue to track the circle with the keyboard arrows.</p>" +
        "<p class='description'>Press <em_blue>UP</em_blue> when the circle <em_blue>expands</em_blue>" +
        " and <em_red>DOWN</em_red> when the circle <em_red>contracts.</em_red></p>",
        "<p><b>Noticing Change</b></p>" +
        "<p class='description'p>After you breathe along with the circle for up to a minute " +
        "we will ask if your breathing" +
        "<em_black> sped up, slowed down, </em_black> or <em_black> stayed the same.</em_black> </p>"+
        "<p>We will also ask you to rate how confident you are in your decision.</p>",
        "<p><b>Get Ready</b></p>"+
        "<p class='description'>When you are ready, place your fingers on the <em_blue>UP ARROW</em_blue> and " +
        "<em_red>DOWN ARROW</em_red> arrow keys.</p>" +
        "<p class='description'>Please press <em_black>'RIGHT ARROW'</em_black> to begin!</p>",        
    ],
    show_clickable_nav: true,
    post_trial_gap: 500
};

// instructions if the person fails to track the circle
var repeat_circle1_instruct = {
    type: "instructions",    
    pages: [
        "<p>We noticed that you are not tracking the circle very well.</p>" +
        "<p>We can only use your data if you show that you are paying attention.</p>" +
        "<p>Please try to stay focused and press the keys along with your breaths.</p>" +
        "<p class='description'>Remember: <em_blue>breath in </em_blue> as the circle <em_blue>grows</em_blue>" +
        " and <em_red>breathe out</em_red> as the circle <em_red>contracts.</em_red></p>" +
        "<p class='description'>Press <em_blue>UP ARROW</em_blue> when the circle <em_blue>expands</em_blue>" +
        " and <em_red>DOWN ARROW</em_red> when the circle <em_red>contracts.</em_red></p>",  
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
    timeline: [fixation, circleTask1, detectchange, repeat_circle1_node],
    on_timeline_start: function() {
        console.log("Prep Circle 1");
        blockName = "Circle1";        
        lastACC = 100;      //start off as though things are great and wait to be disappointed
        detectACC = 1;      //start off as though things are great and wait to be disappointed
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
