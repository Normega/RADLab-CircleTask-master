/*
Mehling WE, Acree M, Stewart A, Silas J, Jones A (2018) 
The Multidimensional Assessment of Interoceptive Awareness, Version 2 (MAIA-2). 
PLoS ONE 13(12): e0208034.
*/

var MAIA_01;
var MAIA_02;
var MAIA_03;
var MAIA_04;
var MAIA_05;
var MAIA_06;
var MAIA_07;
var MAIA_08;
var MAIA_09;
var MAIA_10;
var MAIA_11;
var MAIA_12;
var MAIA_13;
var MAIA_14;
var MAIA_15;
var MAIA_16;
var MAIA_17;
var MAIA_18;
var MAIA_19;
var MAIA_20;
var MAIA_21;
var MAIA_22;
var MAIA_23;
var MAIA_24;
var MAIA_25;
var MAIA_26;
var MAIA_27;
var MAIA_28;
var MAIA_29;
var MAIA_30;
var MAIA_31;
var MAIA_32;
var MAIA_33;
var MAIA_34;
var MAIA_35;
var MAIA_36;
var MAIA_37;

var MAIA_noticing_score; 
var MAIA_noticing_score; 
var MAIA_notdistracting_score; 
var MAIA_notworrying_score; 
var MAIA_attentionregulation_score; 
var MAIA_emoaware_score; 
var MAIA_selfreg_score; 
var MAIA_bodylisten_score; 
var MAIA_trusting_score; 
var MAIA_TOTAL_score; 

var MAIA_items = [
    "0 - Never", 
    "1", 
    "2", 
    "3", 
    "4",
    "5 - Always"
  ];
  

var MAIA_noticing = {
    type: 'survey-likert',
    preamble:   '<p>Below you will find a list of statements.' +
                'Please indicate how often each statement applies to you generally in daily life.</p>',
    questions: [
        {prompt: "1. When I am tense I notice where the tension is located in my body.", name: 'MAIA_01', labels: MAIA_items, required: true},
        {prompt: "2. I notice when I am uncomfortable in my body.", name: 'MAIA_02', labels: MAIA_items, required: true},
        {prompt: "3. I notice where in my body I am comfortable.", name: 'MAIA_03', labels: MAIA_items, required: true},
        {prompt: "4. I notice changes in my breathing, such as whether it slows down or speeds up.", name: 'MAIA_04', labels: MAIA_items, required: true},            
    ],
    randomize_question_order: false,
    scale_width: scaleWidth,
    on_finish: function(data){
        MAIA_01 = data.response.MAIA_01;
        MAIA_02 = data.response.MAIA_02;
        MAIA_03 = data.response.MAIA_03;
        MAIA_04 = data.response.MAIA_04;
        MAIA_noticing_score = (MAIA_01 + MAIA_02 + MAIA_03 + MAIA_04)/4;
    },    
 };

 var MAIA_notdistracting = {
    type: 'survey-likert',
    preamble:   '<p>Below you will find a list of statements.' +
                'Please indicate how often each statement applies to you generally in daily life.</p>',
    questions: [
        {prompt: "5. I ignore physical tension or discomfort until they become more severe.", name: 'MAIA_05', labels: MAIA_items, required: true},
        {prompt: "6. I distract myself from sensations of discomfort. ", name: 'MAIA_06', labels: MAIA_items, required: true},
        {prompt: "7. When I feel pain or discomfort, I try to power through it. ", name: 'MAIA_07', labels: MAIA_items, required: true},
        {prompt: "8. I try to ignore pain ", name: 'MAIA_08', labels: MAIA_items, required: true},
        {prompt: "9. I push feelings of discomfort away by focusing on something ", name: 'MAIA_09', labels: MAIA_items, required: true},
        {prompt: "10. When I feel unpleasant body sensations, I occupy myself with something else so I don’t have to feel them.", name: 'MAIA_10', labels: MAIA_items, required: true},   
    ],
    randomize_question_order: false,
    scale_width: scaleWidth,
    on_finish: function(data){
        MAIA_05 = data.response.MAIA_05;
        MAIA_06 = data.response.MAIA_06;
        MAIA_07 = data.response.MAIA_07;
        MAIA_08 = data.response.MAIA_08;
        MAIA_09 = data.response.MAIA_09;
        MAIA_10 = data.response.MAIA_10;
        MAIA_notdistracting_score = (6 - MAIA_05 + 6 - MAIA_06 + 6 - MAIA_07 + 
                                    6 - MAIA_08 + 6 - MAIA_09 + 6 - MAIA_10)/6;
    },
 };
 
 var MAIA_notworrying = {
    type: 'survey-likert',
    preamble:   '<p>Below you will find a list of statements.' +
                'Please indicate how often each statement applies to you generally in daily life.</p>',
    questions: [
        {prompt: "11. When I feel physical pain, I become upset.", name: 'MAIA_11', labels: MAIA_items, required: true},
        {prompt: "12. I start to worry that something is wrong if I feel any discomfort.", name: 'MAIA_12', labels: MAIA_items, required: true},
        {prompt: "13. I can notice an unpleasant body sensation without worrying about it.", name: 'MAIA_13', labels: MAIA_items, required: true},
        {prompt: "14. I can stay calm and not worry when I have feelings of discomfort or pain.", name: 'MAIA_14', labels: MAIA_items, required: true},
        {prompt: "15. When I am in discomfort or pain I can’t get it out of my mind", name: 'MAIA_15', labels: MAIA_items, required: true},            
    ],
    randomize_question_order: false,
    scale_width: scaleWidth,
    on_finish: function(data){
        MAIA_11 = data.response.MAIA_11;
        MAIA_12 = data.response.MAIA_12;
        MAIA_13 = data.response.MAIA_13;
        MAIA_14 = data.response.MAIA_14;
        MAIA_15 = data.response.MAIA_15;
        MAIA_notworrying_score = (6 - MAIA_11 + 6 - MAIA_12 + 
                                 MAIA_13 + MAIA_14 + 6 - MAIA_15)/5;
    },
 };

 var MAIA_attentionregulation = {
    type: 'survey-likert',
    preamble:   '<p>Below you will find a list of statements.' +
                'Please indicate how often each statement applies to you generally in daily life.</p>',
    questions: [
        {prompt: "16. I can pay attention to my breath without being distracted by things happening around me.", name: 'MAIA_16', labels: MAIA_items, required: true},
        {prompt: "17. I can maintain awareness of my inner bodily sensations even when there is a lot going on around me.", name: 'MAIA_17', labels: MAIA_items, required: true},
        {prompt: "18. When I am in conversation with someone, I can pay attention", name: 'MAIA_18', labels: MAIA_items, required: true},
        {prompt: "19. I can return awareness to my body if I am distracted.", name: 'MAIA_19', labels: MAIA_items, required: true},
        {prompt: "20. I can refocus my attention from thinking to sensing my body.", name: 'MAIA_20', labels: MAIA_items, required: true},
        {prompt: "21. I can maintain awareness of my whole body even when a part of me is in pain or discomfort.", name: 'MAIA_21', labels: MAIA_items, required: true},
        {prompt: "22. I am able to consciously focus on my body as a whole.", name: 'MAIA_22', labels: MAIA_items, required: true},
    ],
    randomize_question_order: false,
    scale_width: scaleWidth,
    on_finish: function(data){
        MAIA_16 = data.response.MAIA_16;
        MAIA_17 = data.response.MAIA_17;
        MAIA_18 = data.response.MAIA_18;
        MAIA_19 = data.response.MAIA_19;
        MAIA_20 = data.response.MAIA_20;
        MAIA_21 = data.response.MAIA_21;
        MAIA_22 = data.response.MAIA_22;
        MAIA_attentionregulation_score = (MAIA_16 + MAIA_17 + MAIA_18 + 
                                        MAIA_19 + MAIA_20 + MAIA_21 + MAIA_22)/7;
    },
 };
 
 var MAIA_emoaware = {
    type: 'survey-likert',
    preamble:   '<p>Below you will find a list of statements.' +
                'Please indicate how often each statement applies to you generally in daily life.</p>',
    questions: [
        {prompt: "23. I notice how my body changes when I am angry.", name: 'MAIA_23', labels: MAIA_items, required: true},
        {prompt: "24. When something is wrong in my life I can feel it in my body.", name: 'MAIA_24', labels: MAIA_items, required: true},
        {prompt: "25. I notice that my body feels different after a peaceful experience.", name: 'MAIA_25', labels: MAIA_items, required: true},
        {prompt: "26. I notice that my breathing becomes free and easy when I feel comfortable.", name: 'MAIA_26', labels: MAIA_items, required: true},
        {prompt: "27. I notice how my body changes when I feel happy / joyful.", name: 'MAIA_27', labels: MAIA_items, required: true},    
    ],
    randomize_question_order: false,
    scale_width: scaleWidth,
    on_finish: function(data){
        MAIA_23 = data.response.MAIA_23;
        MAIA_24 = data.response.MAIA_24;
        MAIA_25 = data.response.MAIA_25;
        MAIA_26 = data.response.MAIA_26;
        MAIA_27 = data.response.MAIA_27;
        MAIA_emoaware_score = (MAIA_23 + MAIA_24 + MAIA_25 + MAIA_26 + MAIA_27)/5;
    },
 };
 
 var MAIA_selfreg = {
    type: 'survey-likert',
    preamble:   '<p>Below you will find a list of statements.' +
                'Please indicate how often each statement applies to you generally in daily life.</p>',
    questions: [
        {prompt: "28. When I feel overwhelmed I can find a calm place inside.", name: 'MAIA_28', labels: MAIA_items, required: true},
        {prompt: "29. When I bring awareness to my body I feel a sense of calm.", name: 'MAIA_29', labels: MAIA_items, required: true},
        {prompt: "30. I can use my breath to reduce tension.", name: 'MAIA_30', labels: MAIA_items, required: true},
        {prompt: "31. When I am caught up in thoughts, I can calm my mind by focusing on my body/breathing.", name: 'MAIA_31', labels: MAIA_items, required: true},            
    ],
    randomize_question_order: false,
    scale_width: scaleWidth,
    on_finish: function(data){
        MAIA_28 = data.response.MAIA_28;
        MAIA_29 = data.response.MAIA_29;
        MAIA_30 = data.response.MAIA_30;
        MAIA_31 = data.response.MAIA_31;
        MAIA_selfreg_score = (MAIA_28 + MAIA_29 + MAIA_30 + MAIA_31)/4;
    },
 };

 var MAIA_bodylisten = {
    type: 'survey-likert',
    preamble:   '<p>Below you will find a list of statements.' +
                'Please indicate how often each statement applies to you generally in daily life.</p>',
    questions: [
        {prompt: "32. I listen for information from my body about my emotional state.", name: 'MAIA_32', labels: MAIA_items, required: true},
        {prompt: "33. When I am upset, I take time to explore how my body feels.", name: 'MAIA_33', labels: MAIA_items, required: true},
        {prompt: "34. I listen to my body to inform me about what to do.", name: 'MAIA_34', labels: MAIA_items, required: true},
    ],
    randomize_question_order: false,
    scale_width: scaleWidth,
    on_finish: function(data){
        MAIA_32 = data.response.MAIA_32;
        MAIA_33 = data.response.MAIA_33;
        MAIA_34 = data.response.MAIA_34;
        MAIA_bodylisten_score = (MAIA_32 + MAIA_33 + MAIA_34)/3;
    },
 };

 var MAIA_trusting = {
    type: 'survey-likert',
    preamble:   '<p>Below you will find a list of statements.' +
                'Please indicate how often each statement applies to you generally in daily life.</p>',
    questions: [
        {prompt: "35. I am at home in my body.", name: 'MAIA_35', labels: MAIA_items, required: true},
        {prompt: "36. I feel my body is a safe place.", name: 'MAIA_36', labels: MAIA_items, required: true},
        {prompt: "37. I trust my body sensations.", name: 'MAIA_37', labels: MAIA_items, required: true},
    ],
    randomize_question_order: false,
    scale_width: scaleWidth,
    on_finish: function(data){
        MAIA_35 = data.response.MAIA_35;
        MAIA_36 = data.response.MAIA_36;
        MAIA_37 = data.response.MAIA_37;
        MAIA_trusting_score = (MAIA_35 + MAIA_36 + MAIA_37)/3;
    },
 };

 var MAIA_instruct = {
    type: "html-keyboard-response",
    stimulus: "<p class='image'><img style='width:256px; height:256px;' src='/assets/questionnaire.png' /></p>",
    choices: ['ArrowRight'], 
    prompt: "<p class='description'>You've completed the first task! We now have a break where we'd like you " +
            "to answer some questions about your feelings of body awareness.</p><br>" + 
            "<p class='description'>Press <em_black>RIGHT ARROW</em_black> to continue.</p>",    
    post_trial_gap: 500
};

 var MAIA_node ={
    timeline: [MAIA_instruct, MAIA_noticing, MAIA_notdistracting, MAIA_notworrying, MAIA_attentionregulation,
                MAIA_emoaware, MAIA_selfreg, MAIA_bodylisten, MAIA_trusting],
    on_timeline_start: function(){resetLogVars();},
    on_timeline_finish: function(){
        console.log("Finished MAIA! Trusting score: ",MAIA_trusting_score);
        MAIA_TOTAL_score = MAIA_01 + MAIA_02 + MAIA_03 + MAIA_04 + 6 - MAIA_05 + 6 - MAIA_06 + 
                           6 - MAIA_07 + 6 - MAIA_08 + 6 - MAIA_09 + 6 - MAIA_10 + 6 - MAIA_11 + 
                           6 - MAIA_12 + MAIA_13 + MAIA_14 + 6 - MAIA_15 + MAIA_16 + MAIA_17 + 
                           MAIA_18 + MAIA_19 + MAIA_20 + MAIA_21 + MAIA_22 + MAIA_23 + MAIA_24 + 
                           MAIA_25 + MAIA_26 + MAIA_27 + MAIA_28 + MAIA_29 + MAIA_30 + MAIA_31 + 
                           MAIA_32 + MAIA_33 + MAIA_34 + MAIA_35 + MAIA_36 + MAIA_37;
        saveSessionData("questionnaire_MAIA", curSpeed, rateChange, step, lastACC, detectACC, detectedChange, confRating,
                        MAIA_01, MAIA_02, MAIA_03, MAIA_04, MAIA_05, MAIA_06, MAIA_07, MAIA_08, MAIA_09, 
                        MAIA_10, MAIA_11, MAIA_12, MAIA_13, MAIA_14, MAIA_15, MAIA_16, MAIA_17, MAIA_18, 
                        MAIA_19, MAIA_20, MAIA_21, MAIA_22, MAIA_23, MAIA_24, MAIA_25, MAIA_26, MAIA_27, 
                        MAIA_28, MAIA_29, MAIA_30, MAIA_31, MAIA_32, MAIA_33, MAIA_34, MAIA_35, MAIA_36, MAIA_37,
                        MAIA_noticing_score, MAIA_notdistracting_score, MAIA_notworrying_score, MAIA_attentionregulation_score,
                        MAIA_emoaware_score, MAIA_selfreg_score, MAIA_bodylisten_score, MAIA_trusting_score,
                        MAIA_TOTAL_score);
        
    },

};
