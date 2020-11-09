// import firebase from '../firebase'

// firebase.auth().signInAnonymously().catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
//   });
// import questions from "./questions";
// experiment constants

const NUMBER_OF_TRIALS_1 = 1; // original: 15
const NUMBER_OF_TRIALS_2 = 1; // original: 10
const NUMBER_OF_PULSES_1 = 1; // original: 8
const NUMBER_OF_PULSES_2 = 1; // original: 12

// firebase.auth().signInAnonymously().catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });// this timeline array stores each plug-in of this web application
// // this includes messages, instructions and experiments which are shown
// in the order specified in this array
var timeline = [];
//Testing questionnaire
var workerId = {
    type: 'survey-html-form',
    preamble: '<h1>Worker Id:</h1></br>',
    html: '<div id="workerId"><input name="workerId" id="worker" type="text" /></p>',
  };

(firebase.auth);
timeline.push(workerId)

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
            "From the moment the experiment begins and until it has concluded," +
            " have your index fingers placed on the F and J keys of your keyboard.",
        "<p><b>Instruction 3:</b></p>" +
            "<p>When the circle begins to <strong>expand</strong>, " +
            "press the <strong>F</strong> key on your keyboard.</p>" +
            "<p>When the circle begins to <strong>contract</strong>, press the <strong>J</strong> key" +
            " on your keyboard </p>",
        "<p><b>Instructions Summary</b></p>" +
            "<p><b>1</b>. In this experiment, a circle will appear at the center " +
            "of your screen.</p><p> The circle will be expanding and contracting.</p>" +
            "<b>2</b>. From the moment the experiment begins and until it has concluded," +
            " have your index fingers placed on the F and J keys of your keyboard." +
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

let step = 0.1;
let difficulty = 0.5;
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
            "<b>2</b>. From the moment the experiment begins and until it has concluded," +
            " have your index fingers placed on the F and J keys of your keyboard." +
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
}

var questionnaire = {
    type: 'survey-html-form',
    preamble: '<h1>Questionnaire:</h1></br><p> <strong>Please indicate how often each statement applies to you generally in daily life.</strong></p>',
    html: buildQuestionnaire(questions)
  };

timeline.push(questionnaire)


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
    timeline: timeline,
    show_progress_bar: true,
    on_finish: function () {
        saveData(jsPsych.data.get().json());
        //jsPsych.data.displayData();
    },
});

//generate random authentication number
function getAuthNum(){
    return Math.floor(Math.random() * 90000) +10000
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
        authentation: x
    };
    var firebaseRef = firebase.database().ref();
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
            let { task, trialNumber, speed, step, responses } = currTask;
            currFilteredData = {
                task: task,
                trialNumber: trialNumber,
                speed: speed,
                step: step,
                responses: responses,
            };
        } else {
            let { task, trialNumber, speed, responses } = currTask;
            currFilteredData = {
                task: task,
                trialNumber: trialNumber,
                speed: speed,
                responses: responses,
            };
        }

        finalData.push(currFilteredData);
    });
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
    // console.log(JSON.parse(filtered[0].responses).hasOwnProperty(targetForm));
    var finalData = JSON.parse(filtered[0].responses);

    return finalData;
    // return JSON.parse(
    //     jsPsych.data.get().filter({ taskType: "Circle Task 1" }).json()
    // );
}


function buildQuestionnaire(questions){
    //import list and allows edits of questions
    var result = '';
    var count = 1
    questions.forEach(question =>{
        result += `<p><br/><strong>${count}. ${question}</strong></p> <p class="answer"> <strong>Never</strong>  <span> <label for="${'q'+count.toString()+'1'}"> 1</label><input type="radio" id="${'q'+count.toString()+'1'}" name="${'q'+count.toString()}" value="1" ><label for="${'q'+count.toString()+'2'}"> 2</label><input type="radio" id="${'q'+count.toString()+'2'}" name="${'q'+count.toString()}" value="2" ><label for="${'q'+count.toString()+'3'}"> 3</label><input type="radio" id="${'q'+count.toString()+'3'}" name="${'q'+count.toString()}" value="3" checked><label for="${'q'+count.toString()+'4'}"> 4</label><input type="radio" id="${'q'+count.toString()+'4'}" name="${'q'+count.toString()}" value="4" ><label for="${'q'+count.toString()+'5'}"> 5</label><input type="radio" id="${'q'+count.toString()+'5'}" name="${'q'+count.toString()}" value="5" > <strong>Always</strong></p>`
        count += 1
    })
    return result;
}
