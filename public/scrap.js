//with updating int he circle function (seems wrong)

totalRateChange: function () {
    if (i == 0) {
        return rateChange;
    }
    var last_trial_correct = jsPsych.data.get().last(1).values()[0]
        .correct;
    if (last_trial_correct && conseqCorrect === 2) {
        console.log("2 CORRECT");
        rateChange -= step;
        step = step / 2;
        conseqCorrect = 0;
        return rateChange;
    } else {
        rateChange += step;
        step = step / 2;
        return rateChange;
    }



// pre-expriment screen for experiment 1
var startScreen = {
    type: "html-keyboard-response",
    stimulus:
        "<p>Place your fingers on the F and J keys.</p>" +
        "<p>Press any key to begin the experiment.</p>",
    post_trial_gap: 1000,
};
timeline.push(startScreen);


var correctAnswer = {
    type: "instructions",
    pages: [
        "<p class='image'><img src='./correctAnswer.jpg' />",    
    ],
    show_clickable_nav: true,
    post_trial_gap: 500,
};

var wrongAnswer = {
    type: "instructions",
    pages: [
        "<p class='image'><img src='./wrongAnswer.jpg' />",    
    ],
    show_clickable_nav: true,
    post_trial_gap: 500,
};



var conseqCorrect = 0;

// experiment 1
for (let i = 0; i < NUMBER_OF_TRIALS_1; i++) {
    console.log(speeds1[i]);
    var circleTask = {
        type: "circle-task",
        trialNumber: i + 1,
        stimulus:
            "<canvas id='myCanvas' width='800' height='500'></canvas>" +
            "<p id='prompt' style='text-align:center;font-weight:bold;'></p>",
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
        stimulus: "<p class='image'><img src='/assets/Feedback.jpg' /></p>",
        choices: [37,38,39],
        prompt: "",
        data: { taskType: "Circle Task 1", trial: i + 1 },
        on_finish: function (data) {
            const keyToResponse = { 39: "up", 37: "down", 38: "constant" };
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
    
    timeline.push(buildCertainty('circle-task-1-'+String(i)));
    
    var if_right = {
        timeline: [correctAnswer],
        conditional_function: function(){
            // get the data from the previous trial,
            // and check which key was pressed
            console.log(jsPsych.data.get().last(2).values()[0]);
            var answer = jsPsych.data.get().last(2).values()[0].correct;
            // console.log(typeof accuracy , accuracy  >= 0.8)
            
            return answer;
        }
    }
    timeline.push(if_right)
    var if_wrong = {
        timeline: [wrongAnswer],
        conditional_function: function(){
            // get the data from the previous trial,
            // and check which key was pressed
            console.log(jsPsych.data.get().last(2).values());
            console.log(jsPsych.data.get().last(2).values()[0]);
            var answer = jsPsych.data.get().last(2).values()[0].trial_type == "survey-html-form";
            // console.log(typeof accuracy , accuracy  >= 0.8)
            
            return !answer;
        }
    }
    timeline.push(if_wrong);

    var awarenessR = {
        type: "html-keyboard-response",
        stimulus: "<p>In the previous trial did you match your breath to the pulsing circle?</p>",
        choices: ["y", "n"],
        prompt: "<p>Y - Yes. <br/>  N - No. </p>",
        // data: { taskType: "Circle Task 1", trial: i + 1 },
    };
    timeline.push(awarenessR);
}

var x = getAuthNum()
// end message
var postTrial = {
    type: "html-keyboard-response",
    stimulus:
        `The experiment has concluded. Your authentication number is <b> ${x} </b>. Press any key to end.`,
    post_trial_gap: 500,
    authentication: x
};
timeline.push(postTrial);



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
function buildCertainty(identifier) {
    //import list and allows edits of questions
    var question = {
        type: 'survey-html-form',
        preamble: `<p style="justify-content:center;" class='image'><img src='./certainty.jpg' /> <br /></p><br />`,
        html: `<p  class="answer"><br /> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<strong>NOT SURE &nbsp&nbsp&nbsp</strong>  <span> 
        <label for="${'q' + identifier + '-1'}"> 1</label><input type="radio" id="${'q' + identifier + '-1'}" name="${'q' + identifier}" value="1" >&nbsp
        <label for="${'q' + identifier + '-2'}"> 2</label><input type="radio" id="${'q' + identifier + '-2'}" name="${'q' + identifier}" value="2" >&nbsp
        <label for="${'q' + identifier + '-3'}"> 3</label><input type="radio" id="${'q' + identifier + '-3'}" name="${'q' + identifier}" value="3" checked>&nbsp
        <label for="${'q' + identifier + '-4'}"> 4</label><input type="radio" id="${'q' + identifier + '-4'}" name="${'q' + identifier}" value="4" >&nbsp
        <label for="${'q' + identifier + '-5'}"> 5</label><input type="radio" id="${'q' + identifier + '-5'}" name="${'q' + identifier}" value="5" > &nbsp
        <label for="${'q' + identifier + '-6'}"> 6</label><input type="radio" id="${'q' + identifier + '-6'}" name="${'q' + identifier}" value="6" > &nbsp
        <label for="${'q' + identifier + '-7'}"> 7</label><input type="radio" id="${'q' + identifier + '-7'}" name="${'q' + identifier}" value="7" > 
        </span><strong>&nbsp&nbsp&nbsp VERY CONFIDENT</strong><br /></p>`
    };
    return question;
}



var t = timeline

function timelineLoop(timeline){
    var loop_node = {
        timeline: timeline,
        on_finish: () => {
            console.log(JSON.parse(jsPsych.data.get().json()));

            var accuracy1 = JSON.parse(jsPsych.data.get().json())[1]['accuracy'];
            var accuracy2 = JSON.parse(jsPsych.data.get().json())[3]['accuracy'];
            
            var answer1 = JSON.parse(jsPsych.data.get().json())[2]['correct'];
            var answer2 = JSON.parse(jsPsych.data.get().json())[4]['correct'];

            // var aware = isAware();

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

function startPractice2(){
    var loop_node = {
        timeline: unsaved2,
        on_finish: () => {
            console.log(jsPsych.data.get().json());
            var aware = isAware();
            var accuracte = isAccurate(1);
            console.log(aware, accuracte);
            if(!(accuracte && aware)){
                // jsPsych.endCurrentTimeline();
                redo(practiceCircleTask2,2);
            } else{
                // console.log("Yo the last parts");
                timelineLoop([practiceInstructions3, practiceCircleTask3,awareness3,practiceCircleTask4,awareness4]);
            }
        },
    }
    jsPsych.init(loop_node);

}

function redo(task, checks){ // TODO add awareness and generalize, checks: 1 for awareness and 2 for both
    var redoInstructions = {
        type: "instructions",
        pages: [
            "<p><b>Instructions:</b></p>" +
            "<p>We noticed that you weren’t following along with your breathing and button press. Please Try again</p>",    
        ],
        show_clickable_nav: true,
        post_trial_gap: 500,
    };
    var aware = {
        type: "html-keyboard-response",
        stimulus: "<p>In the previous trial did you match your breath to the pulsing circle?</p>",
        choices: ["y", "n"],
        prompt: "<p>Y - Yes. <br/>  N - No. </p>",
        // data: { taskType: "Circle Task 1", trial: i + 1 },
    };
    var repeat = {
        timeline: [redoInstructions,task,aware],
        on_finish: () => {
            console.log(jsPsych.data.get().json());  
            console.log(JSON.parse(jsPsych.data.get().json()));
            if (checks == 1){
                console.log(!isAware());

                if(!isAware()){
                    redo(task,1);
                }
                else {
                    // TODO practice 2 next part
                    // console.log("YAY!");
                    startPractice2();
                    return;
                }
            }
            else{
                var aware = isAware();
                var accuracte = isAccurate(1);
                console.log(aware, accuracte);
                // console.log("Nopp!")

                if(!(accuracte && aware)){
                    redo(practiceCircleTask2,2);
                } else {
                    // console.log("YOo 3 and 4 time");
                    timelineLoop([practiceInstructions3, practiceCircleTask3,awareness3,practiceCircleTask4,awareness4]);
                }
            }            
        },
    }
    jsPsych.init(repeat);
}

function isAware(){ //Call after awareness task
    return JSON.parse(jsPsych.data.get().json())[2]["key_press"] == 89
}

function isAccurate(pos){
    return !(JSON.parse(jsPsych.data.get().json())[pos]['accuracy'] == null || JSON.parse(jsPsych.data.get().json())[pos]['accuracy'] < 0.8);
}


on_finish: function () {
    // saveData(jsPsych.data.get().json());
    //jsPsych.data.displayData();
    var length = JSON.parse(jsPsych.data.get().json()).length;
    console.log(JSON.parse(jsPsych.data.get().json())[length-1]["key_press"]);
    // console.log(data.key_press);
    
    if (notBot){
        // console.log("end unsaved");
        if(JSON.parse(jsPsych.data.get().json())[length-1]["key_press"] == 50){
            redo(practiceCircleTask1,1);
        } else {
            startPractice2();
        }
    }
    else{
        var badEnding = {
            type: "html-keyboard-response",
            stimulus:
                `Unfortunately, you cannot participate in the study.`,
            post_trial_gap: 500,
        }
        jsPsych.init({
            timeline: [badEnding], //unsaved
            show_progress_bar: true,
        });
    }
}


var userAuthRepeat = false;
var repeat_userAuth_node = {
    timeline: [repeat_userId_instruct],
    conditional_function: function(){
        if(userAuthRepeat){
            console.log(repeatneeded, ", Auth Repeat needed...");
            return true;
        } else {
            console.log(repeatneeded, ", Auth Good to go!");
            return false;
        }
    }
}


var userAuth_repeat_node = {
    timeline: [repeat_userID_node],
    loop_function: function(data){                        
        if(userId_repeat){
            console.log(data.values()[indexer].accuracy, "OK!");
            return true; //keep looping until a valid userid is entered
        } else {
            repeatneeded = false;
            console.log(data.values()[indexer].accuracy, "OK!");
            return false; //break out of loop when accuracy is high enough
        }
    }
}

maintimeline.push(userAuth_repeat_node)

function checkUserId(targetForm) {
    // this works because 'targetForm' is looking for a question id that will always be in the form eg, userId or q1
    let surveyData = JSON.parse(
        jsPsych.data.get().json()
    );
    let filtered = surveyData.filter(obj => obj.trial_type === 'survey-html-form' && JSON.parse(obj.responses).hasOwnProperty(targetForm));
    var id1 = JSON.parse(filtered[0].responses);
    var id2 = JSON.parse(filtered[1].responses);
    
    console.log('responses: ', id1, id2);
    if(id1 == id2){
        return id1;
    } else {
        return 'invalid';
    }
 }



 // Experiment 1 Trial Constructor
var conseqCorrect = 0; // how many correct (need to compare to step rule to see whether we should make it harder)
for (let i = 0; i < NUMBER_OF_TRIALS_1; i++) {
    //console.log(TrialTypes1[i]);
    var circleTask = {
        type: "circle-taskv2",
        trialNumber: i + 1,
        stimulus:
            "<canvas id='myCanvas' width='800' height='500'></canvas>" +
            "<p id='prompt' style='text-align:center;font-weight:bold;'></p>",
            choices: [38, 40], //up or down
        post_trial_gap: 1000,
        response_ends_trial: false,
        step: function () {
            // function needed to return dynamic value of step
            // otherwise 0.1 passed each time
            return step;
        },
        totalRateChange: function () {
            // to update rate change
            return rateChange;            
        },
        numberOfPulses: NUMBER_OF_PULSES_1,
        speed: TrialTypes1[i],
    };
    
    var awareness = {
        type: "html-keyboard-response",
        stimulus: "<p class='image'><img src='/assets/Feedback.jpg' /></p>",
        choices: [37,38,39],
        prompt: "",
        data: { taskType: "Circle Task 1", trial: i + 1 },
        on_finish: function (data) {
            const keyToResponse = { 39: "faster", 37: "slower", 38: "nochange" };
            if (keyToResponse[data.key_press] === TrialTypes1[i]) {
                console.log(TrialTypes1[i], "correct");
                conseqCorrect += 1;
                data.correct = true; // can add property correct by modify data object directly
            } else {
                console.log(TrialTypes1[i], "wrong");
                conseqCorrect = 0;
                data.correct = false;
            }
        },
    };
    
    //maintimeline.push(circleTask);
    //maintimeline.push(awareness);
}


var userId_trial = {
    type: 'survey-html-form',        
    html:   '<p>Please enter your Participant Identification Number (Sign-up ID or Worker ID): ' +
            '<input name="userId1" id="userId1" type="text" /> </p>' +
            '<p> Please enter your ID a second time to make sure we get it right: ' +
            '<input name = "userId2" id="userId2" type="text" /> </p>',
    autofocus: 'userId1',
    on_finish: function(data){       
        var resp = JSON.parse(data.responses);
        
        if(resp.userId1 == resp.userId2){
            console.log("good to go set true");
            goodId = true;
        }        
    }
};



var gradient = ctx.createLinearGradient(
    x - radius,
    y - radius,
    x + radius,
    y + radius
);


var repeat_userId_instruct = {
    type: 'survey-html-form',
    preamble: '<h1>Sorry, the two IDs do not match, please re-enter them:</h1></br>',    
    html: '<p> Participant ID: <input name="userId1" id="userId1" type="text" /> <br> <br> ' +
           'Please enter your ID a second time to make sure we get it right: <br><br>' +
           '<input name = "userId2" id="userId2" type="text" /> </p>',
    autofocus: 'userId1'    
};
