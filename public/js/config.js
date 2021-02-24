// experiment main settings
const EXPERIMENT_START_TIME = new Date().getTime();
const NUMBER_OF_ENTRAIN_PULSES = 1;
const NUMBER_OF_PRACTICE_PULSES_1 = 1;


const NUMBER_OF_PULSES_1 = 3; // original: 8
const NUMBER_OF_PULSES_2 = 12; // original: 12
const NUMBER_OF_TRIALS_1 = 3; // original: 15
const NUMBER_OF_TRIALS_2 = 3; // original: 10

const firstpulsetime = 5000; //first pulse time in ms
const startRadius = 50;       

let rateChange = 0.5; //starting proportional rate change across a change trial; .5 = 50% change from the base rate
let step = 0.1; // starting step size for increasing or decreasing rate change (.1 = 10% added or subtracted from current rate)

let userId = "undefined";
let eventNum = 1; // keep track of every log entry, does not reset
let trialNumber = -1; // keeps track of trials, resets within blocks

