// Helper Functions
function now(){
    var now = new Date().getTime() - EXPERIMENT_START_TIME;
    return now
}


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

//generate random authentication number
function getAuthNum() {
    return Math.floor(Math.random() * 90000) + 10000
}

//get correct response
function getCorrect(trialType){
    switch(trialType){
        case "faster":
            return "ArrowRight";
        case "slower":
            return "ArrowLeft";
        default:
            return "ArrowUp";
    }
}

//get correct response
function errortext(lastACC, detectACC){
    var badtrack = lastACC < CRIT_TRACK_ACC;
    if (badtrack & detectACC){
        feedbackHTML ="<p><b>Repeat Practice</b></p>" +            
        "<p class='description'><em_blue>Good news- you detected the change correctly!</em_blue></p>" +
        "<p class='description'><em_red>But, you did not track the circle accurately enough.</em_red></p>" +
        "<p>You will need to repeat the practice trial to make sure that you " +
        "understand the task instructions.</p>";
        console.log(badtrack, detectACC, "Practice2 Repeat needed- bad track but Good guess...");    
    } else if (badtrack & !detectACC){
        feedbackHTML ="<p><b>Repeat Practice</b></p>" +
        "<p class='description'><em_red>Sorry, but you did not detect the change correctly.</em_red></p>" +
        "<p class='description'><em_red>You also did not track the circle accurately enough.</em_red></p>" +
        "<p>You will need to repeat the practice trial to make sure that you " +
        "understand the task instructions.</p>";
        console.log(badtrack, detectACC, "Practice2 Repeat needed- pitcj bad track and bad guess...");
    } else if (!detectACC){
        feedbackHTML ="<p><b>Repeat Practice</b></p>" +
        "<p class='description'><em_blue>Good news- you tracked the circle accurately!</em_blue></p>" +
        "<p class='description'><em_red>But, you did not detect the change correctly.</em_red></p>" +
        "<p>You will need to repeat the practice trial to make sure that you " +
        "understand the task instructions.</p>";
        console.log(badtrack, detectACC, "Practice2 Repeat needed- Good track and bad guess...");
    } else {
        feedbackHTML = "this should not have happened..."
        console.log("this should not have been triggered!")
    }
    return feedbackHTML
}

function resetLogVars(){
    lastACC = 100;          //start off as though things are great and wait to be disappointed
    detectACC = 1;          //start off as though things are great and wait to be disappointed
    detectedChange = false; //only relevant for Task version B, but let's make sure it is reset
    confRating = "";        //wait for new ratings
}

var images = [
                'assets/respiration_basic.jpg',
                'assets/respiration_instruct.jpg', 
                'assets/entrain_instruct.jpg',
                'assets/CombinedLogo.png',
                'assets/confrating.jpg',
                'assets/Feedback.jpg',
                'assets/questionnaire.png'                
            ];
var preload = {
    type: 'preload',
    images:images,
    auto_preload: true 
}