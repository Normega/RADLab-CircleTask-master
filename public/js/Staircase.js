let goodcount = 0;
let badcount = 0;
let reversalCount = 0;
let rateChange = STARTING_RATE_CHANGE; //starting proportional rate change across a change trial; .5 = 50% change from the base rate
let step = STARTING_STEP_SIZE; // starting step size for increasing or decreasing rate change (.1 = 10% added or subtracted from current rate)
let hardbumper = false;
let easybumper = false;
let rateData = [rateChange];


function staircase_init(){
    step = .1;
    goodcount = 0;
    hardbumper = false;
    easybumper = false;
}

function nextStep(correct){
    
    if(correct){
        goodcount ++;
    } else {
        badcount ++;
    }

    if (goodcount == STAIR_DOWN_COUNT){
        goodcount = 0; //reset the count
        hardbumper = true;
        rateChange -= step        
        if (rateChange < .01){
            rateChange =.01;
        }
    }

    if (badcount == STAIR_UP_COUNT){
        badcount = 0; //reset the count
        easybumper = true;
        rateChange += step
        if (rateChange > 1){
            rateChange =1;
        }
    }

    //check if a full reversal has been made - only update step if # of reversals is hit
    if (hardbumper & easybumper) { 
        reversalCount ++;
        hardbumper = false;
        easybumper = false;
        if (reversalCount == STAIR_REVERSALS) {
            reversalCount = 0;
            step = step * STAIR_FACTOR;          
        }         
    }

    rateData.push(rateChange);
    console.log("Step: ",step,", Rate: ",rateChange,", Good: ",goodcount,", Bad: ",badcount,", Bumpers: ",hardbumper,easybumper);

}

function graphSteps(c){
    var ctx = c.getContext('2d')
    var dataPoints = [];

    
    for (var i = 0; i < rateData.length; i++) {
        dataPoints.push({
          x: i,
          y: rateData[i]
        });
      }
      console.log(dataPoints);
     
      var chartdef = {
        title: "Staircase for Circle Task 1",
        xLabel: "Trial",
        yLabel: "Change Rate",
        //labelFont: '19pt Arial', 
        //dataPointFont: '10pt Arial',
        renderTypes: [CanvasChart.renderType.lines, CanvasChart.renderType.points],
        dataPoints: dataPoints        
      };
      
      CanvasChart.render("jspsych-canvas-stimulus",chartdef);
}

var graph_trial = {
    type: "canvas-keyboard-response",
    stimulus: graphSteps,
    canvas_size: [500, 800],
    prompt: "<p>Please press <b>'RIGHT ARROW'</b> to continue...</p>",        
    show_clickable_nav: true,
    post_trial_gap: 500,
};
