// experiment main settings
const NUMBER_OF_PULSES_1 = 3; // original: 8
const NUMBER_OF_PULSES_2 = 12; // original: 12
const NUMBER_OF_TRIALS_1 = 3; // original: 15
const NUMBER_OF_TRIALS_2 = 3; // original: 10

// Authentication

//generate random authentication number
function getAuthNum() {
    return Math.floor(Math.random() * 90000) + 10000
}
const authnum = getAuthNum()

firebase.auth().signInAnonymously()
  .then(() => {
    // Signed in..

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorMessage)
  })

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    // console.log(uid);
    // ...
  } else {
    // User is signed out
    // ...
  }
});

// Database Functions

// Logs that a user ID has been created
function writeNewUser(userId, name) {
    firebase.database().ref('users/' + userId).set({
      authentication: name,
      //email: email
      //some more user data
    });
}
// saves the data to firebase


function saveData() {
    firebase.database().ref('participantData/' + userId).set({
        userId: userId,
//        practice: extractTaskData('Practice Task 1'),
//        task1: extractTaskData("Circle Task 1"),
//        quesiton1: extractTaskQuestion("Circle Task 1"),
//        task2: extractTaskData("Circle Task 2"),
//        quesiton2: extractTaskQuestion("Circle Task 2"),
//        questionnaire: extractSurveyForm('q1'),
//        endQuestions: extractSurveyForm('first'),
        authentation: authnum
    });
}

function extractSurveyForm(targetForm) {
    // this works because 'targetForm' is looking for a question id that will always be in the form eg, userId or q1
    let surveyData = JSON.parse(
        jsPsych.data.get().json()
    );
    let filtered = surveyData.filter(obj => obj.trial_type === 'survey-html-form' && JSON.parse(obj.responses).hasOwnProperty(targetForm));
    console.log(JSON.parse(filtered[0].responses));

    console.log(JSON.parse(filtered[0].responses).hasOwnProperty(targetForm));
    var finalData = JSON.parse(filtered[0].responses);

    return finalData;
 }

function extractTaskData(targetTask) {
    let task1Data = JSON.parse(
        jsPsych.data.get().filter({ task: targetTask }).json()
    );
    let finalData = [];
    task1Data.forEach((currTask) => {
        // filtering the needed aspects from task 1
        let { task, trialNumber, speed, responses } = currTask;
        let currFilteredData;
        // only task 1 has attribute 'step'
        if (targetTask === "Circle Task 1") {
            let { task, trialNumber, speed, accuracy, step, responses } = currTask;
            currFilteredData = {
                task: task,
                trialNumber: trialNumber,
                accuracy: accuracy,
                speed: speed,
                step: step,
                responses: responses,
            };
        } else {
            let { task, trialNumber, accuracy, speed, responses } = currTask;
            currFilteredData = {
                task: task,
                trialNumber: trialNumber,
                accuracy: accuracy,
                speed: speed,
                responses: responses,
            };
        }

        finalData.push(currFilteredData);
    });
    console.log(finalData);
    return finalData;
}


// Helper Functions
// Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
}

// random integer generator
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// populates the trial array based on experiment specified number of trials
function generatetrials(numtrials) {   
    var bucket = [];    
    if (numtrials >= 3){ //random without replacement if we can help it
        for (let i = 0; i < numtrials; i++) {
            switch(i%3){
                case 0:
                    bucket.push("faster");
                    break;
                case 1:
                    bucket.push("slower");
                    break;
                case 2:
                    bucket.push("nochange");
            }
        } 
    } else { //just random with replacement if there are only a few trials
        for(let i = 0; i < numtrials; i++) {
            var pick = getRandomInt(0,2);
            switch(pick%3){
                case 0:
                    bucket.push("faster");
                    break;
                case 1:
                    bucket.push("slower");
                    break;
                case 2:
                    bucket.push("nochange");
            }
        }
    }
    return bucket;
}


// INSTRUCTIONS


// welcome message for experiment 1
var welcome_trial = {
    type: "html-keyboard-response",
    stimulus: "<p class='image'><img style='width:502px; height:130px;' src='/assets/CombinedLogo.png' /></p>",
    choices: ['rightarrow'],
    prompt: "<p style='text-align:center;'>Welcome to the study, please press <strong>RIGHT ARROW</strong> to continue.</p>",    
    post_trial_gap: 500
};

// end message
var postTrial = {
    type: "html-keyboard-response",
    choices: ['rightarrow'],
    stimulus:
        "<p style='text-align:center;'> The experiment has concluded. Your authentation number is <b> ${x} </b>. Please make a note of it. </p>" +
        "<p style='text-align:center;'>Please press <strong>RIGHT ARROW</strong> to continue.</p>"    ,
    post_trial_gap: 500,
    authentation: authnum
};

var goodbye_trial = {
    type: "html-keyboard-response",
    stimulus: "<p class='image'><img style='width:502px; height:130px;' src='/assets/CombinedLogo.png' /></p>",
    choices: ['rightarrow'],
    prompt: "<p style='text-align:center;'>You have completed the Study.</p>" + 
            "<p style='text-align:center;'>Thanks for your participation.</p>" + 
            "<p style='text-align:center;'>Please press <strong>RIGHT ARROW</strong> to exit.</p>"    
};

// pages of instructions for experiment 1
var instructions1_trial = {
    type: "instructions",
    pages: [
        "<p><b>Instruction 1:</b></p>" +
        "<p>In this experiment, a circle will appear at the center " +
        "of your screen.</p><p> The circle will be expanding and contracting.</p>",
        "<p><b>Instruction 2:</b></p>" +
        "<p>From the moment the experiment begins and until it has concluded," +
        " have your fingers placed on the UP and DOWN arrow keys of your keyboard.</p>",
        "<p><b>Instruction 3:</b></p>" +
        "<p>When the circle begins to <strong>expand</strong>, " +
        "press the <strong>UP ARROW</strong> key on your keyboard.</p>" +
        "<p>When the circle begins to <strong>contract</strong>, press the <strong>DOWN ARROW</strong> key" +
        " on your keyboard </p>",
        "<p><b>Instructions Summary</b></p>" +
        "<p><b>1</b>. In this experiment, a circle will appear at the center " +
        "of your screen.</p><p> The circle will be expanding and contracting.</p>" +
        "<p><b>2</b>. From the moment the experiment begins and until it has concluded," +
        " have your index fingers placed on the UP ARROW and DOWN ARROW keys of your keyboard.</p>" +
        "<p><b>3</b>. When the circle begins to expand, " +
        "press the UP ARROW key on your keyboard.</p>" +
        "<p><b>4</b>. When the circle begins to contract, press the DOWN ARROW key" +
        " on your keyboard </p>" +
        "<p>Click Next to enter pre-experiment screen.</p>",
    ],
    show_clickable_nav: true,
    post_trial_gap: 500
};


// pages of instructions for experiment 1 practice trials
var pract_instruct = {
    type: "instructions",
    pages: [
        "<p><b>Practice</b></p>" +
        "<p>We will being with some practice trials.</p>" +
        "<p>You will see a circle begin <strong>expanding</strong> and <strong>contracting.</strong></p>",
        "<p><b>Keyboard Responses</b></p>" +
        "<p>Please have your hand on the arrow keys on your keyboard.</p>" +
        "<p>Press <strong>UP</strong> when the circle is <strong>expanding</strong>" +
        " and <strong>DOWN</strong> when the circle is <strong>contracting.</strong></p>",
        "<p><b>How to Pass the Practice Trials</b></p>" +
        "<p>It is important to demonstrate that you can track the circle.</p>" +
        "<p>If you do not press the keys accurately enough, we will ask you to try again.</p>" +
        "<p>When you are ready, place your fingers on the <strong>UP</strong> and <strong>DOWN</strong> arrow keys.</p>" +
        "<p>Please press <strong>'RIGHT ARROW'</strong> to begin!</p>",        
    ],
    show_clickable_nav: true,
    post_trial_gap: 500
};

// instructions if the person fails the practice trials
var repeat_pract_instruct = {
    type: "instructions",
    pages: [
        "<p><b>Repeat Practice</b></p>" +
        "<p>Your did not track the circle accurately enough.</p>" +
        "<p>You will need to repeat the practice trial to make sure that you " +
        "understand the task instructions.</p>",        
    ],
    show_clickable_nav: true,
    // key_forward: 's',
    post_trial_gap: 500
};



// Experiment-wide Variables
var maintimeline = []; // the main experiment timeline

let rateChange = 0.5; //starting proportional rate change across a change trial; .5 = 50% change from the base rate
let step = 0.1; // starting step size for increasing or decreasing rate change (.1 = 10% added or subtracted from current rate)

let TrialTypes1 = generatetrials(NUMBER_OF_TRIALS_1)
shuffle(TrialTypes1);


////////////////////////////////////////////////////////
// Populate the Experiment Timeline
////////////////////////////////////////////////////////
(firebase.auth);
var userId;

maintimeline.push(welcome_trial);
//maintimeline.push(instructions1_trial);

//Get User ID and Validate
var goodId = false;

var idText = '<p>Please enter your Participant Identification Number (Sign-up ID or Worker ID): ' +
    '<input name="userId1" id="userId1" type="text" /> </p>' +
    '<p> Please enter your ID a second time to make sure we get it right: ' +
    '<input name = "userId2" id="userId2" type="text" /> </p>';

var userId_trial = {
    type: 'survey-html-form',        
    html:  function(){
        return idText
    },
    autofocus: 'userId1',
    data: { taskType: "userID"},
    on_finish: function(data){       
        var resp = JSON.parse(data.responses);
        
        if(resp.userId1 && resp.userId1 == resp.userId2){
            console.log(resp.userId1);
            userId = resp.userId1;
            goodId = true;
        }        
    }
};

var validateID_node = {
    timeline: [userId_trial],
    loop_function: function(){                
        if(goodId){            
            console.log("Good ID"); //make sure the number matches the timeline order (from 0)
            writeNewUser(userId,authnum);
            return false; //keep looping when ID is invalid
        } else {            
            idText = '<p>Sorry, those IDs are invalid or do not match. Please try again: ' +
            '<input name="userId1" id="userId1" type="text" /> </p>' +
            '<p> Please enter your ID a second time to make sure we get it right: ' +
            '<input name = "userId2" id="userId2" type="text" /> </p>';
            //console.log("Bad ID");
            return true; //break out of loop when ID is valid
        }
    }
}

maintimeline.push(validateID_node);

//Practice Trial Construction
var circlePractice = {
    type: "circle-taskv2",
    trialNumber: function () {
        // function needed to return dynamic value of step
        // otherwise 0.1 passed each time
        return pracTrialNumber;
    },
    stimulus:
        "<canvas id='myCanvas' width='800' height='500'></canvas>" +
        "<p id='prompt' style='text-align:center;font-weight:bold;'></p>",
        choices: [38, 40], //up or down
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
    numberOfPulses: NUMBER_OF_PULSES_1,
    speed: function(){        
        return generatetrials(1)[0];
    }
};

var repeatneeded = false;
var repeat_pract_node = {
    timeline: [repeat_pract_instruct],
    conditional_function: function(){
        if(repeatneeded){
            console.log(repeatneeded, "Repeat needed...");
            return true;
        } else {
            console.log(repeatneeded, "Good to go!");
            return false;
        }
    }
}

var pracTrialNumber = 0;
var practice_node = {
    timeline: [repeat_pract_node, pract_instruct, circlePractice],
    loop_function: function(data){
        pracTrialNumber += 1;
        if (repeatneeded) { 
            var indexer = 2; //if we are already on a repeat, there were 3 trials in timeline
        }else{
            var indexer = 1; //if we are not already repeating, there were 2 trials in timeline
        }
        if(data.values()[indexer].accuracy < 80){
            repeatneeded = true;
            console.log(data.values()[indexer].accuracy, "BOO"); //make sure the number matches the timeline order (from 0)
            return true; //keep looping when accuracy is too low
        } else {
            repeatneeded = false;
            console.log(data.values()[indexer].accuracy, "OK!");
            return false; //break out of loop when accuracy is high enough
        }
    }
}

maintimeline.push(practice_node);
maintimeline.push(goodbye_trial)

// start the experiment
jsPsych.init({
    timeline: maintimeline, //unsaved
    show_progress_bar: true,
    on_finish: function () {
        console.log(jsPsych.data.get().json());
        saveData(jsPsych.data.get().json());
    }
});