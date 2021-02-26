var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
  }

var detectchange = {
    type: "html-keyboard-response",
        stimulus: "<p class='image'><img src='/assets/Feedback.jpg' /></p>",
        choices: ['ArrowLeft','ArrowRight','ArrowUp'],
        prompt: "",
        data: { 
            Block: "Change Detect", 
            trialNumber: trialNumber
        },
        post_trial_gap: 500,
        on_finish: function (data) {
            correctKey = getCorrect(curSpeed);
            detectACC = jsPsych.pluginAPI.compareKeys(data.response, correctKey);
            console.log("Speed: ",curSpeed," Correct Key: ",correctKey, " Key Pressed: ", data.response, " ACC:", +
                detectACC, "Tracking ACC: ", lastACC);            
            if (!detectACC){
                repeatneeded=true;
            }
            data.correct = detectACC;            
            saveSessionData(blockName + "_Detect", curSpeed, rateChange, step, lastACC, detectACC);
        },        
};

//Breath Entraining Trial Construction
var breathEntrain = {
    type: "breath-entraining",
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
    post_trial_gap: 1000,
    response_ends_trial: false,
    numberOfPulses: NUMBER_OF_ENTRAIN_PULSES,
    on_load: function(){saveSessionData("Entrain_Begin");},
    on_finish: function(){saveSessionData("Entrain_Complete");}
};


//Circle Task 1 Trial Construction
var circleTask1 = {
    type: "circle-task1",
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
    post_trial_gap: 500,
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