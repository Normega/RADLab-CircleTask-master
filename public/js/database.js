// Database Functions
// saves the data to firebase

function saveSessionData(blockname, changeType = "", rate = "", step = "", 
                trackACC = "", detectACC = "", detectedChange = "", confRating ="",
                MAIA_01 = "",
                MAIA_02 = "",
                MAIA_03 = "",
                MAIA_04 = "",
                MAIA_05 = "",
                MAIA_06 = "",
                MAIA_07 = "",
                MAIA_08 = "",
                MAIA_09 = "",
                MAIA_10 = "",
                MAIA_11 = "",
                MAIA_12 = "",
                MAIA_13 = "",
                MAIA_14 = "",
                MAIA_15 = "",
                MAIA_16 = "",
                MAIA_17 = "",
                MAIA_18 = "",
                MAIA_19 = "",
                MAIA_20 = "",
                MAIA_21 = "",
                MAIA_22 = "",
                MAIA_23 = "",
                MAIA_24 = "",
                MAIA_25 = "",
                MAIA_26 = "",
                MAIA_27 = "",
                MAIA_28 = "",
                MAIA_29 = "",
                MAIA_30 = "",
                MAIA_31 = "",
                MAIA_32 = "",
                MAIA_33 = "",
                MAIA_34 = "",
                MAIA_35 = "",
                MAIA_36 = "",
                MAIA_37 = "",
                MAIA_noticing = "", 
                MAIA_notdistracting = "",
                MAIA_notworrying = "",
                MAIA_attentionregulation = "",
                MAIA_emoaware = "",
                MAIA_selfreg = "",
                MAIA_bodylisten = "",
                MAIA_trusting = "",
                MAIA_total = ""
                )
{
    var user = firebase.auth().currentUser;
    firebase.database().ref('sessions/' + user.uid + '/' + eventNum).set({
        StartTime: EXPERIMENT_START_TIME,
        Time: now(),        
        UserId: userId,
        Authentation: authnum,
        Block: blockname,
        TrialNum: trialNumber,
        ChangeType: changeType,
        TotalRateChange: rate,
        StepSize: step,
        TrackACC: trackACC,
        DetectACC: detectACC,
        DetectedChange: detectedChange,
        Confidence: confRating,
        MAIA_01: MAIA_01,
        MAIA_02: MAIA_02,
        MAIA_03: MAIA_03,
        MAIA_04: MAIA_04,
        MAIA_05: MAIA_05,
        MAIA_06: MAIA_06,
        MAIA_07: MAIA_07,
        MAIA_08: MAIA_08,
        MAIA_09: MAIA_09,
        MAIA_10: MAIA_10,
        MAIA_11: MAIA_11,
        MAIA_12: MAIA_12,
        MAIA_13: MAIA_13,
        MAIA_14: MAIA_14,
        MAIA_15: MAIA_15,
        MAIA_16: MAIA_16,
        MAIA_17: MAIA_17,
        MAIA_18: MAIA_18,
        MAIA_19: MAIA_19,
        MAIA_20: MAIA_20,
        MAIA_21: MAIA_21,
        MAIA_22: MAIA_22,
        MAIA_23: MAIA_23,
        MAIA_24: MAIA_24,
        MAIA_25: MAIA_25,
        MAIA_26: MAIA_26,
        MAIA_27: MAIA_27,
        MAIA_28: MAIA_28,
        MAIA_29: MAIA_29,
        MAIA_30: MAIA_30,
        MAIA_31: MAIA_31,
        MAIA_32: MAIA_32,
        MAIA_33: MAIA_33,
        MAIA_34: MAIA_34,
        MAIA_35: MAIA_35,
        MAIA_36: MAIA_36,
        MAIA_37: MAIA_37,
        MAIA_noticing: MAIA_noticing, 
        MAIA_notdistracting: MAIA_notdistracting,
        MAIA_notworrying: MAIA_notworrying,
        MAIA_attentionregulation: MAIA_attentionregulation,
        MAIA_emoaware: MAIA_emoaware,
        MAIA_selfreg: MAIA_selfreg,
        MAIA_bodylisten: MAIA_bodylisten,
        MAIA_trusting: MAIA_trusting,
        MAIA_total: MAIA_total
    });
    eventNum +=1;
}


function saveSummaryData() {
    var user = firebase.auth().currentUser;
    firebase.database().ref('data/' + user.uid ).push().set({
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

