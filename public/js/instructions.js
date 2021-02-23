// INSTRUCTIONS

// welcome message for experiment 1
var welcome_trial = {
    type: "html-keyboard-response",
    stimulus: "<p class='image'><img style='width:502px; height:130px;' src='/assets/CombinedLogo.png' /></p>",
    choices: ['rightarrow'],
    prompt: "<p class='description'>Welcome to the study, please press <em_black>RIGHT ARROW</em_black> to continue.</p>",    
    post_trial_gap: 500
};

// end message
var postTrial = {
    type: "html-keyboard-response",
    choices: ['rightarrow'],
    stimulus:
        "<p style='text-align:center;'> The experiment has concluded. Your authentation number is <b> ${x} </b>. Please make a note of it. </p>" +
        "<p style='text-align:center;'>Please press <strong>RIGHT ARROW</strong> to continue.</p>"    ,
    post_trial_gap: 500,
    authentation: authnum
};

var goodbye_trial = {
    type: "html-keyboard-response",
    stimulus: "<p class='image'><img style='width:502px; height:130px;' src='/assets/CombinedLogo.png' /></p>",
    choices: ['rightarrow'],
    prompt: "<p style='text-align:center;'>You have completed the Study.</p>" + 
            "<p style='text-align:center;'>Thanks for your participation.</p>" + 
            "<p style='text-align:center;'>Please press <strong>RIGHT ARROW</strong> to exit.</p>"    
};



// pages of instructions for experiment 1
var instructions1_trial = {
    type: "instructions",
    pages: [
        "<p><b>Instruction 1:</b></p>" +
        "<p>In this experiment, a circle will appear at the center " +
        "of your screen.</p><p> The circle will be expanding and contracting.</p>",
        "<p><b>Instruction 2:</b></p>" +
        "<p>From the moment the experiment begins and until it has concluded," +
        " have your fingers placed on the UP and DOWN arrow keys of your keyboard.</p>",
        "<p><b>Instruction 3:</b></p>" +
        "<p>When the circle begins to <strong>expand</strong>, " +
        "press the <strong>UP ARROW</strong> key on your keyboard.</p>" +
        "<p>When the circle begins to <strong>contract</strong>, press the <strong>DOWN ARROW</strong> key" +
        " on your keyboard </p>",
        "<p><b>Instructions Summary</b></p>" +
        "<p><b>1</b>. In this experiment, a circle will appear at the center " +
        "of your screen.</p><p> The circle will be expanding and contracting.</p>" +
        "<p><b>2</b>. From the moment the experiment begins and until it has concluded," +
        " have your index fingers placed on the UP ARROW and DOWN ARROW keys of your keyboard.</p>" +
        "<p><b>3</b>. When the circle begins to expand, " +
        "press the UP ARROW key on your keyboard.</p>" +
        "<p><b>4</b>. When the circle begins to contract, press the DOWN ARROW key" +
        " on your keyboard </p>" +
        "<p>Click Next to enter pre-experiment screen.</p>",
    ],
    show_clickable_nav: true,
    post_trial_gap: 500
};




