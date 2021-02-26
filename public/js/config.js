// experiment main settings
const EXPERIMENT_START_TIME = new Date().getTime();
const NUMBER_OF_ENTRAIN_PULSES = 2;
const NUMBER_OF_PRACTICE_PULSES_1 = 2;

const CRIT_TRACK_ACC = 80; //the proportion of time you must be tracking the circle with keyboard to pass

const NUMBER_OF_PULSES_1 = 2; // original: 8
const NUMBER_OF_PULSES_2 = 12; // original: 12
const NUMBER_OF_TRIALS_1 = 10; // original: 15
const NUMBER_OF_TRIALS_2 = 3; // original: 10

const FIRST_PULSE_TIME = 5000; //first pulse time in ms
const startRadius = 50;       

let blockName = "undefined";
let userId = "undefined";
let eventNum = 1; // keep track of every log entry, does not reset
let trialNumber = 0; // keeps track of trials, resets within blocks

let lastACC = 1; //keeps track of the last trial's acc so you can see whether a repeat is needed
let detectACC = 100; //keeps track of the current detection Accuracy
let curSpeed = "undefined" //keeps track of the current trial speed
let repeatneeded = false; //start by assuming that people are doing the tasks correctly