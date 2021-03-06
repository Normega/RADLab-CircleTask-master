// experiment main settings
const EXPERIMENT_START_TIME = new Date().getTime();
const NUMBER_OF_ENTRAIN_PULSES = 2;
const NUMBER_OF_PRACTICE_PULSES_1 = 2;
const NUMBER_OF_PRACTICE_PULSES_2 = 2;

const CRIT_TRACK_ACC = 80; //the proportion of time you must be tracking the circle with keyboard to pass

const NUMBER_OF_PULSES_1 = 8; // original: 8 --> 10
const NUMBER_OF_PULSES_2 = 12; // original: 12 --> 10
const NUMBER_OF_TRIALS_1 = 3; // original: 15
const NUMBER_OF_TRIALS_2 = 3; // original: 10

const FIRST_PULSE_TIME = 5000; //first pulse time in ms
const startRadius = 50;       

//Logging
let blockName = "undefined";
let userId = "undefined";
let eventNum = 1; // keep track of every log entry, does not reset
let trialNumber = 0; // keeps track of trials, resets within blocks

let lastACC = 1; //keeps track of the last trial's acc so you can see whether a repeat is needed
let detectACC = 100; //keeps track of the current detection Accuracy
let confRating = -1; // confidence ratings

let detectedChange = 0; // for task version B, did they exit the trial early?

//TRIAL CONTROL
let greenlight = true; //allows study to keep running- QC checks can turn off this light
let numPulses = NUMBER_OF_PRACTICE_PULSES_1; //allows us to manipulate the numPulses based on prac vs. main trials
let curSpeed = "undefined"; //keeps track of the current trial speed
let repeatneeded = false; //start by assuming that people are doing the tasks correctly

//Staircase Variables
const STARTING_RATE_CHANGE = 0.5;
const STARTING_STEP_SIZE = 0.1;
const STAIR_DOWN_COUNT=2; //2 down rule
const STAIR_UP_COUNT=1;   //1 up rule
const STAIR_REVERSALS=2; //how many reversals before we change step size
const STAIR_FACTOR = 0.5; //what to do to the step after a successful down step


// QUESTIONNAIRE CONTROL
let scaleWidth = 400; //how wide likert scales should be (in pixels)

