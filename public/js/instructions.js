// INSTRUCTIONS

// welcome message for experiment 1
var welcome_trial = {
    type: "html-keyboard-response",
    stimulus: "<p class='image'><img style='width:502px; height:130px;' src='/assets/CombinedLogo.png' /></p>",
    choices: ['ArrowRight'], //'rightarrow' stopped working
    prompt: "<p class='description'>Welcome to the study, please press <em_black>RIGHT ARROW</em_black> to continue.</p>",    
    post_trial_gap: 500
};

// end message
var postTrial = {
    type: "html-keyboard-response",
    choices: ['ArrowRight'],
    stimulus:
        "<p style='text-align:center;'> The experiment has concluded. Your authentation number is <b> ${x} </b>. Please make a note of it. </p>" +
        "<p style='text-align:center;'>Please press <strong>RIGHT ARROW</strong> to continue.</p>"    ,
    post_trial_gap: 500,
    authentation: authnum
};

var newtask_trial = {
    type: "html-keyboard-response",
    stimulus: "<p><strong>!!!</strong></p>",
    choices: ['ArrowRight'],
    prompt: "<p style='text-align:center;'>We are now going to ask you to do a similar breathing task.</p>" + 
            "<p style='text-align:center;'>However, the task instructions are slightly different. Please <strong>" +
            "READ CAREFULLY</strong> so you can understand how the second task differs from the first.</p>" + 
            "<p style='text-align:center;'>Please press <strong>RIGHT ARROW</strong> to continue.</p>"    
};


var goodbye_trial = {
    type: "html-keyboard-response",
    stimulus: "<p class='image'><img style='width:502px; height:130px;' src='/assets/CombinedLogo.png' /></p>",
    choices: ['ArrowRight'],
    prompt: "<p style='text-align:center;'>You have completed the Study.</p>" + 
            "<p style='text-align:center;'>Thanks for your participation.</p>" + 
            "<p style='text-align:center;'>Please press <strong>RIGHT ARROW</strong> to exit.</p>"    
};

instruct_viewpulse = "<p class='description'>You will see the circle <em_blue>GROWING</em_blue> and " + 
"<em_red>SHRINKING.</em_red></p>";

instruct_breathealong = "<p class='description'><em_blue>BREATHE IN</em_blue> when the circle <em_blue>GROWS</em_blue>" +
" and <em_red>BREATHE OUT</em_red> when the circle <em_red>SHRINKS.</em_red></p>";

instruct_keypressalong = "<p class='description'>Press <em_blue>UP</em_blue> when the circle <em_blue>GROWS</em_blue>" +
" and <em_red>DOWN</em_red> when the circle <em_red>SHRINKS.</em_red></p>";

instruct_keypressalongPic = "<p>  <img style='width:500px; height:500px;' src='./assets/respiration_instruct.jpg'" +
                        "alt='Breathe with the circle'> </p>"

instruct_getready = "<p><b>Get Ready</b></p>"+
"<p class='description'>When you are ready, place your fingers on the <em_blue>UP ARROW</em_blue> and " +
"<em_red>DOWN ARROW</em_red> arrow keys.</p>" +
"<p class='description'>Please press <em_black>'RIGHT ARROW'</em_black> to begin!</p>";

instruct_whennotice = "<p class='description'>If you notice a change in your breathing, <em_black>immediately</em_black> " +
"press the <em_black> SPACEBAR.</em_black></p>" + 
"<p>However, the circle won't always change speeds, so don't press unless you are sure.</p>"

instruct_whennoticequick = "<p class='description'>Press <em_blue>SPACEBAR</em_blue> if " +
"you notice your breathing change speeds.</p>"