var page_1_options = ["Sad", "Stone", "Cat", "Joyful", "Egg"];
var page_2_options = ["Strongly Disagree", "Disagree", "Somewhat Disagree", "Neural", "Somewhat Agree", "Agree"];
var page_3_options = [  "I do not have enough time to complete this experiment", 
                        "I will probably take a long break partway through", 
                        "I'm just going to click randomly",
                        "I'll be surfing social media the whole time",
                        "I will pay attention and do my best"];
var page_4_options = [  "Dogs lay eggs", 
                        "I am human", 
                        "Canada is near the south pole",
                        "10 + 2 = 15",
                        "A bee is bigger than an elephant"]
                        

var QC_block = {
    type: 'survey-multi-choice',
    questions: [
      {prompt: "Please select a word that means happy:", name: 'Check1', options: page_1_options, required:true}, 
      {prompt: "Please select 'Somewhat Agree' from the options below:", name: 'Check2', options: page_2_options, required: true},
      {prompt: "Please select which of the following is true:", name: 'Check3', options: page_3_options, required: true},
      {prompt: "Please select which of the following is true:", name: 'Check4', options: page_4_options, required: true}
    ],
    on_finish: function(data){
        console.log(data.response);
        if(data.response.Check1 == "Joyful" &
            data.response.Check2 == "Somewhat Agree" &
            data.response.Check3 == "I will pay attention and do my best" &
            data.response.Check4 == "I am human"
        ){ 
            greenlight = true;
        } else {
            greenlight = false;
            alert("I'm sorry, you did not answer all of the quality control questions correctly."+
            " We cannot proceed with the study.");
            jsPsych.endExperiment();
        }
    }
  };


var QCintro_trial = {
    type: "html-keyboard-response",
    stimulus: "<p><strong>Quality Control Check</strong></p>",
    choices: ['ArrowRight'],
    prompt: "<p style='text-align:center;'>We have a few quick questions for quality control.</p>" + 
            "<br><p style='text-align:center;'>You must answer the following questions <br>" + 
            "correctly to participate. Please <strong>" +
            "READ CAREFULLY</strong> and <br>answer each question to prove your understanding.</p>" + 
            "<br><p style='text-align:center;'>Please press the <strong>RIGHT ARROW</strong> to continue.</p>"    
};

  var QC_node = {
    timeline: [QCintro_trial, QC_block],
   
}
