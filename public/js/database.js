// Database Functions
// saves the data to firebase

function saveSessionData(blockname){
    firebase.database().ref('sessions/' + userId + '/' + eventNum).set({
        StartTime: EXPERIMENT_START_TIME,
        Time: now(),
        UserId: userId,
        Authentation: authnum,
        Block: blockname  
    });
    eventNum +=1;
}


function saveSummaryData() {
    firebase.database().ref('data/' + userId ).push().set({
        StartTime: EXPERIMENT_START_TIME,
        Time: now(),
        UserId: userId,
        Authentation: authnum
//        practice: extractTaskData('Practice Task 1'),
//        task1: extractTaskData("Circle Task 1"),
//        quesiton1: extractTaskQuestion("Circle Task 1"),
//        task2: extractTaskData("Circle Task 2"),
//        quesiton2: extractTaskQuestion("Circle Task 2"),
//        questionnaire: extractSurveyForm('q1'),
//        endQuestions: extractSurveyForm('first'),
        
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

