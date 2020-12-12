const NUMBER_OF_TRIALS_1 = 15; // original: 15
const NUMBER_OF_TRIALS_2 = 10; // original: 10
const NUMBER_OF_PULSES_1 = 8; // original: 8
const NUMBER_OF_PULSES_2 = 12; // original: 12


// import firebase from '../firebase'

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
// import questions from "./questions";
// experiment constants
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    console.log(uid);
    // ...
  } else {
    // User is signed out
    // ...
  }
});


// firebase.auth().signInAnonymously().catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });// this timeline array stores each plug-in of this web application
// // this includes messages, instructions and experiments which are shown
// in the order specified in this array
var timeline = [];
var unsaved = [];
var unsaved2 = [];
//Testing questionnaire
var workerId = {
    type: 'survey-html-form',
    preamble: '<h1>Worker Id:</h1></br>',
    html: '<div id="workerId"><input name="workerId" id="worker" type="text" /></p>',
};

(firebase.auth);

// helper method for shuffling trials
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

let step = 0.2;
let difficulty = 0.5;

//Main welcome message
var welcome0 = {
    type: "html-keyboard-response",
    stimulus:
        "Welcome to our study! Before we get started we ask that you answer a few questions to make sure that you are a live human participant.",
    post_trial_gap: 500,
};

// unsaved.push(welcome0);

unsaved.push(welcome0);

var questionnaire0 = {
    type: 'survey-html-form',
    preamble: '<h1>Questionnaire:</h1></br><p> <strong>Please answer these question before you begin.</strong></p>',
    html: `
    <p><br />Please select 'Not often' from the options provided:</p>
<p class="answer"> 
  <input type="radio" id="Never" name="screen1" value="1"><label for="Never"> Never</label><br/>
  <input type="radio" id="NotOften" name="screen" value="2"><label for="NotOften"> Not Often</label><br/>
  <input type="radio" id="Sometimes" name="screen" value="3"><label for="Sometimes"> Sometimes</label><br/>
  <input type="radio" id="OftenAlways" name="screen" value="4"><label for="OftenAlways"> Often Always</label><br/>
  <input type="radio" id="Always" name="screen" value="5"><label for="Always"> Always</label><br/>
</p>
<p><br />Which of the following options provided is a word to describe something bad?</p>
<p class="answer"> 
  <input type="radio" id="Great" name="screen2" value="1"><label for="Great"> Great</label><br/>
  <input type="radio" id="Awesome" name="screen2" value="2"><label for="Awesome"> Awesome</label><br/>
  <input type="radio" id="Okay" name="screen2" value="3"><label for="Okay"> Okay</label><br/>
  <input type="radio" id="SoSo" name="screen2" value="4"><label for="SoSo"> So So</label><br/>
  <input type="radio" id="Terrible" name="screen2" value="5"><label for="Terrible"> Terrible</label><br/>
</p>
<p><br />Which of the options provided is most obviously a word to describe a colour?</p>
<p class="answer"> 
  <input type="radio" id="School" name="screen3" value="1"><label for="School"> School</label><br/>
  <input type="radio" id="Car" name="screen3" value="2"><label for="Car"> Car</label><br/>
  <input type="radio" id="Smile" name="screen3" value="3"><label for="Smile"> Smile</label><br/>
  <input type="radio" id="Red" name="screen3" value="4"><label for="Red"> Red</label><br/>
  <input type="radio" id="Book" name="screen3" value="5"><label for="Book"> Book</label><br/>
</p>
<p><br />Please select 'neutral' from the options provided:</p>
<p class="answer"> 
  <input type="radio" id="StronglyAgree" name="screen4" value="1"><label for="StronglyAgree"> Strongly Agree</label><br/>
  <input type="radio" id="Agree" name="screen4" value="2"><label for="Agree"> Agree</label><br/>
  <input type="radio" id="Neutral" name="screen4" value="3"><label for="Neutral"> Neutral</label><br/>
  <input type="radio" id="Disagree" name="screen4" value="4"><label for="Disagree"> Disagree</label><br/>
  <input type="radio" id="StronglyDisagree" name="screen4" value="5"><label for="StronglyDisagree"> Strongly Disagree</label><br/>
</p>
    `
};

unsaved.push(questionnaire0)


var practiceInstructions1 = {
    type: "instructions",
    pages: [
        "<p><b>Instructions:</b></p>" +
        "<p>Now we are going to practice breathing along with the circle.</p>",
        "<p>We ask that you match your breath to the circle."+ 
        " Please breath-in when the circle expands and breath-out when the circle shrinks </p>",

    ],
    show_clickable_nav: true,
    post_trial_gap: 500,
};
unsaved.push(practiceInstructions1);


var practiceCircleTask1 = {
    type: "circle-task",
    trialNumber: -1,
    stimulus:
        "<canvas id='myCanvas' width='800' height='500'></canvas>" +
        "<b>Match your breath to the pulsing circle</b>.</p>",
    choices: ["f", "j"],
    post_trial_gap: 1000,
    response_ends_trial: false,
    step: function () {
        // function needed to return dynamic value of step
        // otherwise 0.1 passed each time
        return 0.1;
    },
    difficultyChange: function () {
        return 0.4
    },
    numberOfPulses:4,
    speed: 'constant',
};
unsaved.push(practiceCircleTask1);

var awareness1 = {
    type: "html-keyboard-response",
    stimulus: "<p>Did you match your breath to the pulsing circle?</p>",
    choices: ["1", "2"],
    prompt: "<p>1 Yes.   2 No. </p>",
    data: { taskType: "Circle Task 1", trial: -1 },
    on_finish: function (data) {
        // startPractice(practiceCircleTask2);
    },
};
unsaved.push(awareness1);


var practiceInstructions2 = {
    type: "instructions",
    pages: [
        "<p><b>Instructions:</b></p>" +
        "<p>Nice Job! Now we are going to practice breathing along with the circle once again. "+
        "This time we also ask that you also press a button when you breath in and breath out.</p>",
        "<p>Match your breath to the pulsing circle</p>",
        "<p>When the circle is <strong>expanding Breath in</strong> and Press the <strong>‘J’ Key</strong> on the keyboard</p>",
        "<p>When the circle is <strong>shrinking Breath out</strong> and Press the <strong>‘F’ Key</strong> on the keyboard</p>",
    ],
    show_clickable_nav: true,
    post_trial_gap: 500,
    on_finish:()=>{
        jsPsych.endCurrentTimeline();
        // startPractice(practiceInstructions2);
        // jsPsych.resumeExperiment();
    }
};
unsaved.push(practiceInstructions2);



var practiceCircleTask2 = {
    type: "circle-task",
    trialNumber: -1,
    stimulus:
        "<canvas id='myCanvas' width='800' height='500'></canvas>" +
        "<b>Press 'J' when breathing in and 'F' when breathing out with the pulsing circle</b>.</p>",
    choices: ["f", "j"],
    post_trial_gap: 1000,
    response_ends_trial: false,
    step: function () {
        // function needed to return dynamic value of step
        // otherwise 0.1 passed each time
        return 0.1;
    },
    difficultyChange: function () {
        return 0.4
    },
    numberOfPulses: 5,
    speed: 'constant',
};
// timeline.push(practiceCircleTask2);

var awareness2 = {
    type: "html-keyboard-response",
    stimulus: "<p>Did you press 'J' when breathing in and 'F' when breathing out with the pulsing circle?</p>",
    choices: ["1", "2"],
    prompt: "<p>1 Yes.   2 No. </p>",
    data: { taskType: "Circle Task 1", trial: -1 },
    on_finish: function (data) {
        return; // Practice
    },
};
unsaved2.push(awareness2);


var practiceInstructions3 = {
    type: "instructions",
    pages: [
        "<p>Great Job!! For all the upcoming tasks you will be asked to match your breath to the circle in this way</p>",
        "<p><b>Instructions:</b></p>" +
        "<p>Now we are going to practice breathing along with the circle once again.</p>",
        "<p>Match your breath to the pulsing circle</p>",
        "<p>When the circle is <strong>expanding Breath in</strong> and Press the <strong>‘J’ Key</strong> on the keyboard</p>",
        "<p>When the circle is <strong>shrinking Breath out</strong> and Press the <strong>‘F’ Key</strong> on the keyboard</p>",
        "<p>In this trial please notice if your breathing rate speeds up or slows down over the course of the trial</p>",
    ],
    show_clickable_nav: true,
    post_trial_gap: 500,
    on_finish: ()=>{
    }
};
unsaved2.push(practiceInstructions3);

var practiceCircleTask3 = {
    type: "circle-task",
    trialNumber: -1,
    stimulus:
        "<canvas id='myCanvas' width='800' height='500'></canvas>" +
        "<b>Press 'J' when breathing in and 'F' when breathing out with the pulsing circle</b>.</p>",
    choices: ["f", "j"],
    post_trial_gap: 1000,
    response_ends_trial: false,
    step: function () {
        // function needed to return dynamic value of step
        // otherwise 0.1 passed each time
        return 0.1;
    },
    difficultyChange: function () {
        return 0.7;
    },
    numberOfPulses: 8,
    speed: 'up',
};
// timeline.push(practiceCircleTask3);

var awareness3 = {
    type: "html-keyboard-response",
        stimulus: "<p>Did your breathing rate Speed up, slow down or stay constant in this trial?</p>",
        choices: ["1", "2", "3"],
        prompt: "<p>1 up. 2 down. 3 constant</p>",
        data: { taskType: "Circle Task Practice Speed Down", trial: -1},
        on_finish: function (data) {
            const keyToResponse = { 49: "up", 50: "down", 51: "constant" };
            if (keyToResponse[data.key_press] === 'up') {
                console.log("correct");
                // 70 is the numeric code for f
                data.correct = true; // can add property correct by modify data object directly
            } else {
                console.log("wrong");
            }
        },
};
// timeline.push(awareness3);


var practiceInstructions4 = {
    type: "instructions",
    pages: [
        "<p><b>Instructions:</b></p>" +
        "<p>Now we are going to practice breathing along with the circle once again.</p>",
        "<p>Match your breath to the pulsing circle</p>",
        "<p>When the circle is <strong>expanding Breath in</strong> and Press the <strong>‘J’ Key</strong> on the keyboard</p>",
        "<p>When the circle is <strong>shrinking Breath out</strong> and Press the <strong>‘F’ Key</strong> on the keyboard</p>",
        "<p>In this trial please notice if your breathing rate speeds up or slows down over the course of the trial</p>",
    ],
    show_clickable_nav: true,
    post_trial_gap: 500,
};
// timeline.push(practiceInstructions4);


var practiceCircleTask4 = {
    type: "circle-task",
    trialNumber: -1,
    stimulus:
        "<canvas id='myCanvas' width='800' height='500'></canvas>" +
        "<b>Press 'J' when breathing in and 'F' when breathing out with the pulsing circle</b>.</p>",
    choices: ["f", "j"],
    post_trial_gap: 1000,
    response_ends_trial: false,
    step: function () {
        // function needed to return dynamic value of step
        // otherwise 0.1 passed each time
        return 0.1;
    },
    difficultyChange: function () {
        return 0.2;
    },
    numberOfPulses: 8,
    speed: 'down',
};
// timeline.push(practiceCircleTask4);

var awareness4 = {
    type: "html-keyboard-response",
        stimulus: "<p>Did your breathing rate Speed up, slow down or stay constant in this trial?</p>",
        choices: ["1", "2", "3"],
        prompt: "<p>1 up. 2 down. 3 constant</p>",
        data: { taskType: "Circle Task Practice Speed Down", trial: -1},
        on_finish: function (data) {
            const keyToResponse = { 49: "up", 50: "down", 51: "constant" };
            if (keyToResponse[data.key_press] === 'down') {
                console.log("correct");
                // 70 is the numeric code for f
                data.correct = true; // can add property correct by modify data object directly
            } else {
                console.log("wrong");
            }
        },
};
// timeline.push(awareness4);


// welcome message for experiment 1
var welcome1 = {
    type: "html-keyboard-response",
    stimulus:
        "Welcome to the first part of the experiment. Press any key to show instructions.",
    post_trial_gap: 500,
};
timeline.push(welcome1);

// pages of instructions for experiment 1
var instructions1 = {
    type: "instructions",
    pages: [
        "<p><b>Instruction 1:</b></p>" +
        "<p>In this experiment, a circle will appear at the center " +
        "of your screen.</p><p> The circle will be expanding and contracting.</p>",
        "<p><b>Instruction 2:</b></p>" +
        "<p>From the moment the experiment begins and until it has concluded," +
        " have your index fingers placed on the F and J keys of your keyboard.</p>",
        "<p><b>Instruction 3:</b></p>" +
        "<p>When the circle begins to <strong>expand</strong>, " +
        "press the <strong>F</strong> key on your keyboard.</p>" +
        "<p>When the circle begins to <strong>contract</strong>, press the <strong>J</strong> key" +
        " on your keyboard </p>",
        "<p><b>Instructions Summary</b></p>" +
        "<p><b>1</b>. In this experiment, a circle will appear at the center " +
        "of your screen.</p><p> The circle will be expanding and contracting.</p>" +
        "<p><b>2</b>. From the moment the experiment begins and until it has concluded," +
        " have your index fingers placed on the F and J keys of your keyboard.</p>" +
        "<p><b>3</b>. When the circle begins to expand, " +
        "press the F key on your keyboard.</p>" +
        "<p><b>4</b>. When the circle begins to contract, press the J key" +
        " on your keyboard </p>" +
        "<p>Click Next to enter pre-experiment screen.</p>",
    ],
    show_clickable_nav: true,
    post_trial_gap: 500,
};
timeline.push(instructions1);

// pre-expriment screen for experiment 1
var startScreen = {
    type: "html-keyboard-response",
    stimulus:
        "<p>Place your fingers on the F and J keys.</p>" +
        "<p>Press any key to begin the experiment.</p>",
    post_trial_gap: 1000,
};
timeline.push(startScreen);

step = 0.1;
difficulty = 0.5;
let speeds1 = [
    "up",
    "up",
    "up",
    "up",
    "up",
    "down",
    "down",
    "down",
    "down",
    "down",
    "constant",
    "constant",
    "constant",
    "constant",
    "constant",
];

shuffle(speeds1);

var isFirstTrial = true; // needed because first trial difficulty logic is different
var conseqCorrect = 0;

// experiment 1
for (let i = 0; i < NUMBER_OF_TRIALS_1; i++) {
    console.log(speeds1[i]);
    var circleTask = {
        type: "circle-task",
        trialNumber: i + 1,
        stimulus:
            "<canvas id='myCanvas' width='800' height='500'></canvas>" +
            "<b>Recording response times... </b>.</p>",
        choices: ["f", "j"],
        post_trial_gap: 1000,
        response_ends_trial: false,
        step: function () {
            // function needed to return dynamic value of step
            // otherwise 0.1 passed each time
            return step;
        },
        difficultyChange: function () {
            if (isFirstTrial) {
                isFirstTrial = false;
                return difficulty;
            }
            var last_trial_correct = jsPsych.data.get().last(1).values()[0]
                .correct;
            if (last_trial_correct && conseqCorrect === 2) {
                console.log("2 CORRECT");
                difficulty -= step;
                step = step / 2;
                conseqCorrect = 0;
                return difficulty;
            } else {
                difficulty += step;
                step = step / 2;
                return difficulty;
            }
        },
        numberOfPulses: NUMBER_OF_PULSES_1,
        speed: speeds1[i],
    };
    timeline.push(circleTask);

    var attention = {
        type: "instructions",
        pages: [
            "<p><b>Instructions:</b></p>" +
            "<p>We noticed that you weren’t following along with your breathing and button press. Please Try again</p>",    
        ],
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    var if_bad = {
        timeline: [attention],
        conditional_function: function(){
            // get the data from the previous trial,
            // and check which key was pressed
            console.log(jsPsych.data.get().last(1).values()[0].accuracy);
            var accuracy = jsPsych.data.get().last(1).values()[0].accuracy;
            console.log(typeof accuracy , accuracy  >= 0.8)
            
            if(typeof accuracy == "number" && accuracy  >= 0.8){
                return false;
            } else {
                return true;
            }
        }
    }
    timeline.push(if_bad)

    var awareness = {
        type: "html-keyboard-response",
        stimulus: "<p>Speed?</p>",
        choices: ["1", "2", "3"],
        prompt: "<p>1 up. 2 down. 3 constant</p>",
        data: { taskType: "Circle Task 1", trial: i + 1 },
        on_finish: function (data) {
            const keyToResponse = { 49: "up", 50: "down", 51: "constant" };
            if (keyToResponse[data.key_press] === speeds1[i]) {
                console.log(speeds1[i], "correct");
                conseqCorrect += 1;
                // 70 is the numeric code for f
                data.correct = true; // can add property correct by modify data object directly
            } else {
                console.log(speeds1[i], "wrong");
                conseqCorrect = 0;
                data.correct = false;
            }
        },
    };
    timeline.push(awareness);
    var awarenessR = {
        type: "html-keyboard-response",
        stimulus: "<p>In the previous trial did you match your breath to the pulsing circle?</p>",
        choices: ["1", "2"],
        prompt: "<p>1 Yes.   2 No. </p>",
        // data: { taskType: "Circle Task 1", trial: i + 1 },
    };
    timeline.push(awarenessR);
}

// welcome message for experiment 2
var welcome2 = {
    type: "html-keyboard-response",
    stimulus:
        "Welcome to the second part of the experiment. Press any key to show instructions.",
    post_trial_gap: 500,
};
timeline.push(welcome2);

// pages of instructions for experiment 2
var instructions2 = {
    type: "instructions",
    pages: [
        "<p><b>Instruction 1:</b></p>" +
        "<p>In this experiment, a circle will appear at the center " +
        "of your screen.</p><p> The circle will be expanding and contracting.</p>",
        "<p><b>Instruction 2:</b></p>" +
        "From the moment the experiment begins and until it has concluded," +
        " have your index fingers placed on the F and J keys of your keyboard.",
        "<p><b>Instruction 3:</b></p>" +
        "<p>When the circle begins to <strong>expand</strong>, " +
        "press the <strong>F</strong> key on your keyboard.</p>" +
        "<p>When the circle begins to <strong>contract</strong>, press the <strong>J</strong> key" +
        " on your keyboard </p>",
        "<p><b>Instruction 4:</b></p>" +
        "<p>If and when you notice the circle speeding up or slowing down then press the <strong>spacebar.</strong></p> " +
        "<p>Also, if you notice that the circle is pulsing at a constant rate then press the <strong>spacebar.</strong></p>",
        "<p><b>Instructions Summary</b></p>" +
        "<p><b>1</b>. In this experiment, a circle will appear at the center " +
        "of your screen.</p><p> The circle will be expanding and contracting.</p>" +
        "<p><b>2</b>. From the moment the experiment begins and until it has concluded," +
        " have your index fingers placed on the F and J keys of your keyboard.</p>" +
        "<p><b>3</b>. When the circle begins to expand, " +
        "press the F key on your keyboard.</p>" +
        "<p><b>4</b>. When the circle begins to contract, press the J key" +
        " on your keyboard </p>" +
        "<p><b>5</b>. Press the spacebar when you notice speeding up, " +
        "slowing down or constant pulsing of the circle</p>",
        "<p>Click Next to enter pre-experiment screen.</p>",
    ],
    show_clickable_nav: true,
    post_trial_gap: 500,
};
timeline.push(instructions2);

// pre-experiment screen
var startScreen = {
    type: "html-keyboard-response",
    stimulus:
        "<p>Place your fingers on the F and J keys.</p>" +
        "<p>Press any key to begin the experiment.</p>",
    post_trial_gap: 1000,
};
timeline.push(startScreen);

let speeds2 = [
    "up",
    "up",
    "up",
    "up",
    "up",
    "down",
    "down",
    "down",
    "down",
    "down",
    "constant",
    "constant",
    "constant",
    "constant",
    "constant",
];

shuffle(speeds2);

// experiment 2
for (let i = 0; i < NUMBER_OF_TRIALS_2; i++) {
    console.log(speeds2[i]);
    var circleTask2 = {
        type: "circle-task-two",
        trialNumber: i + 1,
        stimulus:
            "<canvas id='myCanvas' width='800' height='500'></canvas>" +
            "<b>Recording response times... </b>.</p>",
        choices: ["f", "j", " "],
        post_trial_gap: 500,
        response_ends_trial: false,
        difficultyChange: 0.5,
        numberOfPulses: NUMBER_OF_PULSES_2,
        speed: speeds2[i],
    };
    timeline.push(circleTask2);
    var attention = {
        type: "instructions",
        pages: [
            "<p><b>Instructions:</b></p>" +
            "<p>We noticed that you weren’t following along with your breathing and button press. Please Try again</p>",    
        ],
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    var if_bad = {
        timeline: [attention],
        conditional_function: function(){
            // get the data from the previous trial,
            // and check which key was pressed
            console.log(jsPsych.data.get().last(1).values()[0].accuracy);
            var accuracy = jsPsych.data.get().last(1).values()[0].accuracy;
            console.log(typeof accuracy , accuracy  >= 0.8)
            
            if(typeof accuracy == "number" && accuracy  >= 0.8){
                return false;
            } else {
                return true;
            }
        }
    }
    timeline.push(if_bad)

    var awareness = {
        type: "html-keyboard-response",
        stimulus: "<p>Speed?</p>",
        choices: ["1", "2", "3"],
        prompt: "<p>1 up. 2 down. 3 constant</p>",
        data: { taskType: "Circle Task 2", trial: i + 1 },
        on_finish: function (data) {
            const keyToResponse = { 49: "up", 50: "down", 51: "constant" };
            if (keyToResponse[data.key_press] === speeds2[i]) {
                console.log(speeds2[i], "correct");
                conseqCorrect += 1;
                // 70 is the numeric code for f
                data.correct = true; // can add property correct by modify data object directly
            } else {
                console.log(speeds2[i], "wrong");
                conseqCorrect = 0;
                data.correct = false;
            }
        },
    };
    timeline.push(awareness);
    var awarenessR = {
        type: "html-keyboard-response",
        stimulus: "<p>In the previous trial did you match your breath to the pulsing circle?</p>",
        choices: ["1", "2"],
        prompt: "<p>1 Yes.   2 No. </p>",
        // data: { taskType: "Circle Task 1", trial: i + 1 },
    };
    timeline.push(awarenessR);
}
timeline.push(workerId)

var questionnaire = {
    type: 'survey-html-form',
    preamble: '<h1>Questionnaire:</h1></br><p> <strong>Please indicate how often each statement applies to you generally in daily life.</strong></p>',
    html: buildQuestionnaire(questions)
};

timeline.push(questionnaire)

var endQuestions = {
    type: "html-keyboard-response",
    stimulus:
        "Please be honest with your replies. Your responses will not be traced to you or impact whether or not you receive your compensation for this study.",
    post_trial_gap: 500,
};
timeline.push(endQuestions);

var questionnaireFinal = {
    type: 'survey-html-form',
    preamble: '<h1>Questionnaire:</h1></br><p> <strong>Please answer these final set of questions.</strong></p>',
    html: `
    <p><br />1) I found it easy to breath along with the circle.</p>
<p class="answer"> 
  <input type="radio" id="Yes1" name="first" value="Yes"><label for="Yes1"> Yes</label><br/>
  <input type="radio" id="No1" name="first" value="No"><label for="No1"> No</label><br/>
</p>
<p><br />2) I matched my breath with the circle _________</p>
<p class="answer"> 
  <input type="radio" id="all" name="second" value="allTime"><label for="all"> the entire time</label><br/>
  <input type="radio" id="often" name="second" value="often"><label for="often"> often</label><br/>
  <input type="radio" id="Some" name="second" value="Sometimes"><label for="Some"> sometimes</label><br/>
  <input type="radio" id="never" name="second" value="never"><label for="never"> never</label><br/>
</p>
<p><br />3) I never breathed along with the circle.</p>
<p class="answer"> 
    <input type="radio" id="Yes3" name="third" value="Yes"><label for="Yes3"> Yes</label><br/>
    <input type="radio" id="No3" name="third" value="No"><label for="No3"> No</label><br/>
</p>
<p><br />4) It was difficult for me to breath along with the circle</p>
<p class="answer"> 
    <input type="radio" id="Yes4" name="four" value="Yes"><label for="Yes4"> Yes</label><br/>
    <input type="radio" id="No4" name="four" value="No"><label for="No4"> No</label><br/>
</p>
    `
};

timeline.push(questionnaireFinal);


var x = getAuthNum()
// end message
var postTrial = {
    type: "html-keyboard-response",
    stimulus:
        `The experiment has concluded. Your authentation number is <b> ${x} </b>. Press any key to end.`,
    post_trial_gap: 500,
    authentation: x
};
timeline.push(postTrial);

// start the experiment
jsPsych.init({
    timeline: unsaved, //unsaved
    show_progress_bar: true,
    on_finish: function () {
        // saveData(jsPsych.data.get().json());
        //jsPsych.data.displayData();
        startPractice(practiceCircleTask2);

    },
});

//generate random authentication number
function getAuthNum() {
    return Math.floor(Math.random() * 90000) + 10000
}

// saves the data to firebase
function saveData() {
    let finalData = {
        worker: extractSurveyForm('workerId'),
        task1: extractTaskData("Circle Task 1"),
        quesiton1: extractTaskQuestion("Circle Task 1"),
        task2: extractTaskData("Circle Task 2"),
        quesiton2: extractTaskQuestion("Circle Task 2"),
        questionnaire: extractSurveyForm('q1'),
        endQuestions: extractSurveyForm('first'),
        authentation: x
    };
    var firebaseRef = firebase.database().ref();
    jsPsych.data.get();
    // console.log(extractSurveyForm('q1'));
    console.log(JSON.parse(jsPsych.data.get().json()));
    firebaseRef.push().set(finalData);
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

function extractTaskQuestion(targetTask) {
    // this works because only the questions have attribute called 'taskType'
    let task1Data = JSON.parse(
        jsPsych.data.get().filter({ taskType: targetTask }).json()
    );
    let finalData = [];
    task1Data.forEach((currTask) => {
        // filtering the needed aspects from task 1
        let { taskType, trial, correct, key_press } = currTask;
        let currFilteredData = {
            taskType: taskType,
            trial: trial,
            correct: correct,
            key_press: key_press,
        };
        finalData.push(currFilteredData);
    });
    return finalData;
    // return JSON.parse(
    //     jsPsych.data.get().filter({ taskType: "Circle Task 1" }).json()
    // );
}

function extractSurveyForm(targetForm) {
    // this works because 'targetForm' is looking for a question id that will always be in the form eg, workerID or q1
    let surveyData = JSON.parse(
        jsPsych.data.get().json()
    );
    let filtered = surveyData.filter(obj => obj.trial_type === 'survey-html-form' && JSON.parse(obj.responses).hasOwnProperty(targetForm));
    console.log(JSON.parse(filtered[0].responses));

    console.log(JSON.parse(filtered[0].responses).hasOwnProperty(targetForm));
    var finalData = JSON.parse(filtered[0].responses);

    return finalData;
    // return JSON.parse(
    //     jsPsych.data.get().filter({ taskType: "Circle Task 1" }).json()
    // );
}


function buildQuestionnaire(questions) {
    //import list and allows edits of questions
    var result = '';
    var count = 1
    questions.forEach(question => {
        result += `<p><br/><strong>${count}. ${question}</strong></p> <p class="answer"> <strong>Never</strong>  <span> <label for="${'q' + count.toString() + '1'}"> 1</label><input type="radio" id="${'q' + count.toString() + '1'}" name="${'q' + count.toString()}" value="1" ><label for="${'q' + count.toString() + '2'}"> 2</label><input type="radio" id="${'q' + count.toString() + '2'}" name="${'q' + count.toString()}" value="2" ><label for="${'q' + count.toString() + '3'}"> 3</label><input type="radio" id="${'q' + count.toString() + '3'}" name="${'q' + count.toString()}" value="3" checked><label for="${'q' + count.toString() + '4'}"> 4</label><input type="radio" id="${'q' + count.toString() + '4'}" name="${'q' + count.toString()}" value="4" ><label for="${'q' + count.toString() + '5'}"> 5</label><input type="radio" id="${'q' + count.toString() + '5'}" name="${'q' + count.toString()}" value="5" > <strong>Always</strong></p>`
        count += 1
    })
    return result;
}
var t = timeline

function timelineLoop(timeline){
    var loop_node = {
        timeline: timeline,
        on_finish: () => {
            console.log(JSON.parse(jsPsych.data.get().json()));

            var accuracy1 = JSON.parse(jsPsych.data.get().json())[0]['accuracy'];
            var accuracy2 = JSON.parse(jsPsych.data.get().json())[2]['accuracy'];
            
            var answer1 = JSON.parse(jsPsych.data.get().json())[1]['correct'];
            var answer2 = JSON.parse(jsPsych.data.get().json())[3]['correct'];
            console.log(accuracy1,accuracy2,answer1,answer2);
            if(accuracy1 == null || accuracy1 < 0.8 || accuracy2 == null || accuracy2 < 0.8 ){
                timelineLoop(timeline);
            } else if(!answer1 || !answer2){
                timelineLoop(timeline);
            } else{
                console.log(t);
                jsPsych.init({
                    timeline: t,
                    show_progress_bar: true,
                    on_finish: function () {
                        console.log(jsPsych.data.get().json());
                        saveData(jsPsych.data.get().json());
                        // jsPsych.data.displayData();
                        // timelineLoop([practiceCircleTask3,awareness3,practiceCircleTask4,awareness4]);
                
                    },
                });
            }
            console.log(jsPsych.data.get().json());  
        },
    }
    jsPsych.init(loop_node);

}

function startPractice(task){
    var loop_node = {
        timeline: [task],
        on_finish: () => {
            console.log(jsPsych.data.get().json());  
            if(JSON.parse(jsPsych.data.get().json())[0]['accuracy'] == null || JSON.parse(jsPsych.data.get().json())[0]['accuracy'] < 0.8){
                // jsPsych.endCurrentTimeline();
                redo(task);
            } else{
                jsPsych.init({
                    timeline: unsaved2,
                    show_progress_bar: true,
                    on_finish: function () {
                        // saveData(jsPsych.data.get().json());
                        //jsPsych.data.displayData();
                        timelineLoop([practiceCircleTask3,awareness3,practiceCircleTask4,awareness4]);
                
                    },
                });
            }
        },
    }
    jsPsych.init(loop_node);

}


async function quickShow(tLine){
    tLine.forEach((t)=>{
        var loop_node = {
            timeline: [t],
            on_finish: ()=>{console.log("hi")}
        }
        jsPsych.init(loop_node);
    });
    console.log(tLine)
    

}

function redo(task){
    var redoInstructions = {
        type: "instructions",
        pages: [
            "<p><b>Instructions:</b></p>" +
            "<p>We noticed that you weren’t following along with your breathing and button press. Please Try again</p>",    
        ],
        show_clickable_nav: true,
        post_trial_gap: 500,
    };
    var repeat = {
        timeline: [redoInstructions,task],
        on_finish: () => {
            console.log(jsPsych.data.get().json());  
            console.log(JSON.parse(jsPsych.data.get().json())[1]['accuracy']);
            if(JSON.parse(jsPsych.data.get().json())[1]['accuracy'] == null || JSON.parse(jsPsych.data.get().json())[1]['accuracy'] < 0.8){
                redo(task);
            } else {
                jsPsych.init({
                    timeline: unsaved2,
                    show_progress_bar: true,
                    on_finish: function () {
                        // saveData(jsPsych.data.get().json());
                        //jsPsych.data.displayData();
                        timelineLoop([practiceCircleTask3,awareness3,practiceCircleTask4,awareness4]);
                
                    },
                });
            }
            
        },
    }
    jsPsych.init(repeat);
}
