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

