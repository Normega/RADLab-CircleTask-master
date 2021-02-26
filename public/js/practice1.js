//PRACTICE TASK 1 

// pages of instructions for task 1 practice trials
var pract_instruct = {
    type: "instructions",
    pages: [
        "<p><b>Practice 1</b></p>" +
        "<p>We have a some more advanced practice.</p>" +
        "<p class='description'>You will again see the circle <em_blue>expanding</em_blue> and " + 
        "<em_red>contracting.</em_red></p>",
        "<p class='description'>Please continue to <em_blue>breath in</em_blue> when the circle is "+
        "<em_blue>expanding</em_blue> and <br><em_red>breathe out</em_red> when the circle is <em_red>contracting.</em_red></p>",
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


//Practice Trial Construction
var circlePractice = {
    type: "circle-taskv2",
    trialNumber: function () {
        trialNumber +=1;
        // function needed to return dynamic value of trialNumber
        console.log("BlockName: ",blockName," TrialNum: ",trialNumber," Speed: ",curSpeed," trial.");
        console.log("lastACC ",lastACC," detectACC ",detectACC," repeatneeded ",repeatneeded);
        
        return trialNumber;
    },
    stimulus:
        "<canvas id='myCanvas' width='800' height='500'></canvas>" +
        "<p id='prompt' style='text-align:center;font-weight:bold;'></p>",
        choices: ['ArrowUp', 'ArrowDown'], //up or down 38 40
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
        return curSpeed;
    },
    on_load: function(){   
        lastACC = 0;     
        saveSessionData(blockName + "_Begin");
    },
    on_finish: function(data){
        lastACC = data.accuracy;
        if(lastACC < CRIT_TRACK_ACC){
            repeatneeded = true;         
        } else {
            repeatneeded = false;            
        }
        saveSessionData(blockName + "_Complete", data.speed, data.totalRateChange, data.step, lastACC);
    }
};

var practice_node = {
    timeline: [pract_instruct, circlePractice, repeat_pract_node],
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


