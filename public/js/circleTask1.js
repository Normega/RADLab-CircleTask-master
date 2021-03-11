jsPsych.plugins["circle-task1"] = (function () {
    var plugin = {};

    plugin.info = {
        name: "circle-task1",
        description: "",
        parameters: {
            stimulus: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name: "Stimulus",
                default: undefined,
                description: "The HTML string to be displayed",
            },
            choices: {
                type: jsPsych.plugins.parameterType.KEYCODE,
                array: true,
                pretty_name: "Choices",
                default: ['arrowup','arrowdown'], // up and down
                description: "The keys the subject is allowed to press to respond to the stimulus.",
            },
            prompt: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: "Prompt",
                default: null,
                description: "Any content here will be displayed below the stimulus.",
            },
            stimulus_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: "Stimulus duration",
                default: null,
                description: "How long to hide the stimulus.",
            },
            response_ends_trial: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: "Response ends trial",
                default: true,
                description:
                    "If true, trial will end when subject makes a response.",
            },
            totalRateChange: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: "Total rate change.",
                default: rateChange,
                description: "Determines the change rate of the trial.",
            },
            numberOfPulses: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: "Number of Pulses",
                default: 1.0,
                description: "Number of time the circle will pulse.",
            },
            speed: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: "Speed",
                default: null,
                description:
                    "Determines if pulse rate will speed up, down or stay constant.",
            },
            trialNumber: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: "Trial Number",
                default: 1,
                description: "The current trial number of the circle task.",
            },
            step: {
                type: jsPsych.plugins.parameterType.FLOAT,
                pretty_name: "Step",
                default: 1,
                description: "Current step in the staircase method.",
            },
            accuracy: {
                type: jsPsych.plugins.parameterType.FLOAT,
                pretty_name: "Accuracy",
                default: 0,
                description: "Current accuracy based on key presses.",
            },
        },
    };

    function computeACC(runningDeviation, totalFrames) {
        var totalACC = (totalFrames - runningDeviation) / totalFrames * 100;
        //totalACC = Math.round(totalACC * 10) / 10;
        totalACC = Math.round(totalACC);
        return totalACC;
    }

    plugin.trial = function (display_element, trial) {               
        //console.log("Starting a ",trial.speed," trial...");
        var totalFrames = 0; // keeping track of animation frames 

        var new_html =
            '<div id="jspsych-html-keyboard-response-stimulus">' +
            trial.stimulus +
            "</div>";

        // add prompt
        if (trial.prompt !== null) {
            new_html += trial.prompt;
        }

        // draw the plug in
        display_element.innerHTML = new_html;

        // for storing responses
        var responses = [];
        let current_response = "none"; //no response logged to begin
        var runningDeviation = 0;
          
        // function to end trial when it is time      
        var end_trial = function(animationId) {
            // kill animation
            try {
                //clearInterval(animationId);
                cancelAnimationFrame(animationId);
            } catch (err) {
                console.log(err);
            }

            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();

            // kill keyboard listeners
            if (typeof keyboardListener !== "undefined") {
                jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
            }

            // gather the data to store for the trial
            var trial_data = {
                task: "Circle Task 1",
                trialNumber: trial.trialNumber,
                totalRateChange: trial.totalRateChange,
                speed: trial.speed,
                step: trial.step,
                accuracy: computeACC(runningDeviation, totalFrames) 
                //responses: responses,
                // stimulus: trial.stimulus,
            };

            // clear the display
            display_element.innerHTML = "";

            // move on to the next trial and store trial data
            jsPsych.finishTrial(trial_data);
        };

        // response listener always listening for key presses and recording them
        var register_response = function (info) {            
            //console.log(info.key);
            //if (info.key == 38){
            if (jsPsych.pluginAPI.compareKeys('ArrowUp', info.key)){
                current_response = "expand";
            //} else if (info.key == 40){
            } else if (jsPsych.pluginAPI.compareKeys('ArrowDown', info.key)){
                current_response = "contract";
            }
            //console.log(`Current response: ${current_response} `);
            //console.log(`Key ${info.key} pressed`);                      
        };
      
        // start the response listener
        if (trial.choices != jsPsych.NO_KEYS) {
            var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
            callback_function: register_response,
            valid_responses: trial.choices,
            rt_method: 'performance',
            persist: true,
            allow_held_key: false
            });
        }

        // hide stimulus if stimulus_duration is set
        if (trial.stimulus_duration !== null) {
            jsPsych.pluginAPI.setTimeout(function () {
                display_element.querySelector(
                    "#jspsych-html-keyboard-response-stimulus"
                ).style.visibility = "hidden";
            }, trial.stimulus_duration);
        }

        let change;
        if (trial.speed === "faster") {
            change = 1 + trial.totalRateChange;
        } else if (trial.speed === "slower") {
            change = 1 - trial.totalRateChange;
        } else {
            change = 1;
        }
        const changeRate = change ** (1 / (trial.numberOfPulses - 1));        

        // setting up variables
        const firstpulsetime = FIRST_PULSE_TIME; //first pulse time in ms
        const startRadius = 50;       
        var radius = startRadius;

        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        const x = (canvas.width / 2);
        const y = (canvas.height / 2);                       
        const rLimit = Math.min(x,y);         // the biggest the radius can get
        const rSpan = rLimit - startRadius;   // the total change in radius (largest - smallest)        

        // the change in radius per animation frame
        var onewayTime = firstpulsetime / 2;        
        var expectedframes = onewayTime / 17; //17 hz framerate as our assumption        
        var dr = rSpan / expectedframes * .8;
        //var dr = 1; //could get way more complicated but this seems to work fine
        
        var doneTrial = false; //to prevent one extra animation frame from getting called while the end_trial is running
        var expand = true; //start off expanding
        var currPulses = 0;      
                
        console.log("Trial type: ", trial.speed, "Change Proportion: ", change);

        function getGradient(){
            var gradient = ctx.createRadialGradient(
                x, y, 0,
                x, y, radius
            );
            //gradient.addColorStop(0, "white");
            //gradient.addColorStop("0.5", "#E80000");        
            gradient.addColorStop(0, "#00A2FF");
            gradient.addColorStop(0.9, "#0080C9");
            gradient.addColorStop(1, "#005586");
            return gradient
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);

            // Fill with gradient
            ctx.fillStyle = getGradient();
            ctx.lineWidth = 16;
            ctx.fill();
            ctx.closePath();        
        }        

        function pulse(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var prompt = document.getElementById("prompt");

            totalFrames += 1;

            if (expand) {
                radius += dr;
                prompt.innerHTML = `BREATHE IN  + PRESS UP ARROW <br> ACCURACY: ${computeACC(runningDeviation, totalFrames)}`;                
                if (current_response != "expand"){
                    runningDeviation += 1;
                }
            } else {
                radius -= dr;
                prompt.innerHTML = `BREATHE OUT  + PRESS DOWN ARROW  <br> ACCURACY: ${computeACC(runningDeviation, totalFrames)}`;
                if (current_response != "contract"){
                    runningDeviation += 1;
                }
            }
            drawBall();

            
            
            now = performance.now();
            elapsed = now - then;
            
            if (expand && elapsed >= onewayTime) {                
                //console.log(`The circle maxed out at ${elapsed}`);                
                responses.push({
                    type: "circle",
                    variable: "max",
                    time: elapsed,
                });
                expand = false;
                then = now - (elapsed % onewayTime); // get ready to complete the pulse animation
            } else if (!expand && elapsed >= onewayTime) {                
                //console.log(`The circle minned out at ${elapsed}`);            

                responses.push({
                    type: "circle",
                    variable: "min",
                    time: elapsed,
                });
                expand = true;
                //console.log("dr: ", dr);
                currPulses++;
                
                then = now - (elapsed % onewayTime); // get ready for the next pulse animation

                //APPLY THE CHANGE IN TIMING FOR THE NEXT PULSE
                onewayTime /= changeRate;
                dr *= changeRate;

                if (currPulses == trial.numberOfPulses) {
                    doneTrial = true;
                    end_trial(animationId);
                }
            }           
         
            if(!doneTrial){
                requestAnimationFrame(pulse);
            }
        }

        var now, elapsed;
        var then = performance.now();
        var animationId = requestAnimationFrame(pulse);
        //draw();
        //var animationId = setInterval(draw, framerate);
        
    };

    return plugin;
})();


