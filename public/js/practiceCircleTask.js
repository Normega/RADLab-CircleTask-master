jsPsych.plugins["circle-task-practice"] = (function () {
    var plugin = {};

    plugin.info = {
        name: "circle-task-practice",
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
                default: jsPsych.ALL_KEYS,
                description:
                    "The keys the subject is allowed to press to respond to the stimulus.",
            },
            prompt: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: "Prompt",
                default: null,
                description:
                    "Any content here will be displayed below the stimulus.",
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
            difficultyChange: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: "Current difficulty.",
                default: 1.0,
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

    plugin.trial = function (display_element, trial) {
        const startTime = performance.now();

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

        var total = 0;
        var correct = 0;

        // function to end trial when it is time
        var end_trial = function () {
            // kill animation
            try {
                clearInterval(animationId);
            } catch (err) {
                console.log(err);
            }

            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();

            // kill keyboard listeners
            if (typeof keyboardListener !== "undefined") {
                jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
            }
            // responses.push(correct/total);

            // gather the data to store for the trial
            var trial_data = {
                task: "Practice Circle Task 1",
                trialNumber: trial.trialNumber,
                speed: trial.speed,
                step: trial.step,
                accuracy: total/trial.numberOfPulses/2, // Previous for real accuracy: correct/total,
                responses: responses,
                // stimulus: trial.stimulus,
            };

            // clear the display
            display_element.innerHTML = "";

            // move on to the next trial
            jsPsych.finishTrial(trial_data);
        };

        // response listener always listening for key presses and recording them
        var record_data = function (info) {
            var keyPressTime = performance.now() - startTime;
            total += 1;
            if (expand && info.key == 74){
                correct += 1;
            } else if (!expand && info.key == 70){
                correct += 1;
            }
            console.log(`Key ${info.key} pressed at ${keyPressTime} and correct${correct} total${total}`);
            
            responses.push({
                type: "key",
                variable: info.key,
                time: keyPressTime,
            });
        };

        // start the response listener
        if (trial.choices != jsPsych.NO_KEYS) {
            var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: record_data,
                valid_responses: trial.choices,
                rt_method: "performance",
                persist: true,
                allow_held_key: false,
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
        if (trial.speed === "up") {
            change = 1 + trial.difficultyChange;
        } else if (trial.speed === "down") {
            change = 1 - trial.difficultyChange;
        } else {
            change = 1;
        }
        const changeRate = change ** (1 / (trial.numberOfPulses - 1));

        // setting up variables
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var startRadius = 50;
        var radius = startRadius;
        var dr = 0.8;
        var expand = true;
        var currPulses = 0;

        console.log("change: ", change);

        var gradient = ctx.createLinearGradient(
            x - radius,
            y - radius,
            x + radius,
            y + radius
        );
        gradient.addColorStop("0.5", "#E80000");

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);

            // Fill with gradient
            ctx.fillStyle = gradient;
            ctx.lineWidth = 16;
            ctx.fill();
            ctx.closePath();
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var prompt = document.getElementById("prompt");
            if (expand) {
                radius += dr;
                prompt.innerHTML = `BREATHE IN`;

            } else {
                radius -= dr;
                prompt.innerHTML = `BREATHE OUT`;
            }
            drawBall();
            if (expand && radius >= (canvas.height / 2) - 5 ) {
                var maxTime = performance.now() - startTime;
                console.log(`The circle maxed out at ${maxTime}`);
                responses.push({
                    type: "circle",
                    variable: "max",
                    time: maxTime,
                });
                expand = false;
            } else if (!expand && radius <= startRadius) {
                var minTime = performance.now() - startTime;
                console.log(`The circle minned out at ${minTime}`);
                dr = dr * changeRate;
                responses.push({
                    type: "circle",
                    variable: "min",
                    time: minTime,
                });
                expand = true;
                console.log("dr: ", dr);
                currPulses++;
                if (currPulses == trial.numberOfPulses) {
                    end_trial();
                }
            }
        }

        var animationId = setInterval(draw, 10);
    };

    return plugin;
})();
