/* create timeline */
var timeline = [];

/* define welcome message trial */

var instructions = {
    type: 'instructions',
    pages: [
        'Welcome to the experiment. Press the right arrow key to continue.',
        `In this experiment, a circle will appear in the center 
        of the screen. Your objective is to keep the circle within range.
        <br><br> You will have a gauge of whether the circle is in range by both:
        <br>1. The <b>color</b> of the circle, and
        <br>2. The <b>time in range</b> measure above the circle.
        <br><br> While the circle is outside of the preferred range, your time in range score will decrease until it returns to within range (in the blue).
        <br><br>Press the right arrow key to continue.`,
        'Here is an example of the circle within range:<br><img src="images/dot_IR.png"></img><br>While within range (in the blue), your time in range will either increase or maintain itself at 100%<br><br>Press the right arrow key to continue.',
        'Here is an example of the circle below range:<br><img src="images/dot_lo.png"></img><br>While below range (in the red), your time in range will decrease until it returns within range.<br>If the circle is below range, use the right arrow key (->) to enlargen the circle and return it to blue, or within range.  <br><br>Press the right arrow key to continue.',
        'Here is an example of the circle above range:<br><img src="images/dot_hi.png"></img><br>While above range (in the yellow), your time in range will decrease until it returns within range.<br>If the circle is above range, use the left arrow key (<-) to shrink the circle and return it to blue, or within range. <br><br>Press the right arrow key to continue.',
        `Your task is to keep the circle blue, or within range, as much as possible.<br>Following the trial, you will answer some questions about your experience and be served a prompt. <br>Once you finish the entire experiment, your page will be redirected to Prolific for confirmation. <br>Thank you for your participation and good luck!  <br><br>Press the right arrow key to begin.`
    ],
    show_clickable_nav: false
}
// timeline.push(instructions);

var experiment1 = {
    type: 'control-game'
};
timeline.push(experiment1);

var freeResponse = {
    type: 'survey-text',
    preamble: '<p>Thank you for completing the trial. Below are free-response questions about your experience.<br>Please provide as much detail when possible.</p>',
    questions: [
        {prompt: "Did you notice anything about the circle's size in relation to pressing the arrow keys?", name: 'Arrows', required:false, rows: 5, columns: 80},
        {prompt: 'While participating, did the game remind of you of anything? <br>If there are multiple things that come to mind, feel free to list them. If nothing comes to mind, you may skip.', name: 'Any', required:false, rows: 5, columns: 80}, 
        {prompt: 'Is there any knowledge of yours that you felt helped you to perform the experiment?', name: 'Knowledge', required:false, rows: 5, columns: 80}
      ],
};
timeline.push(freeResponse);

var questions_options = ["Yes", "No"];

var diabetes_question = {
    type: 'survey-multi-choice',
    questions: [
        {prompt: "Do you have any experience managing diabetes, either your own or another person's?", name: 'Diabetes', options: questions_options, required:true}
    ],
};
timeline.push(diabetes_question);

var diabetes_options = ["Glucometer (finger prick and meter)","Syringe or insulin pen","Continuous Glucose Monitor (CGM)","Insulin pump","Software or mobile app for diabetes"];

var tech_question = {
    type: 'survey-multi-select',
    questions: [
        {prompt: "Please select from the following list all of those which you have experience with:", name: 'Tech', options: diabetes_options, required:false}
    ],
};

var if_node = {
    timeline: [tech_question],
    conditional_function: function(){
        // get the data from the previous trial,
        // and check which choice was selected
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.response["Diabetes"] == questions_options[1]){
            return false;
        } else {
            return true;
        }
    }
}

timeline.push(if_node);

var instructions2 = {
    type: 'instructions',
    pages: [`The game you just played simulates a person's response to increasing and decreasing blood sugar levels. Think of the circle as a person's blood sugar, the right arrow as food, and the left arrow as insulin. 
        <br>Specifically, each press of the right arrow key represents 15 carbohydrates, while each press of the left arrow key represents 1 unit of insulin for a person with an insulin sensitivity factor of 50. 
        <br>The blue circle represents a blood sugar between 80 mg/dL and 120mg/dL, or what is considered a normal range. 
        <br>You will now play the game one more time. Following the game you will be redirected to Prolific for study end confirmation. 
        <br> Thank you for your time thus far and good luck! <br><br> Press the right arrow key to begin the final trial.`],
    show_clickable_nav: false
}
timeline.push(instructions2);

var experiment2 = {
    type: 'control-game'
};
timeline.push(experiment2);

var save_server_data = {
    type: 'call-function',
    func: function () {
      var data = jsPsych.data.get().json();
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'php/save_json.php');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({ filedata: data }));
    },
    post_trial_gap: 1000
  };
  timeline.push(save_server_data);

/* start the experiment */
jsPsych.init({
    timeline: timeline,
    // on_finish: function(){
    //     jsPsych.data.displayData()
    // }
    // For prolific redirect
    on_finish: function(){
        window.location = "https://www.google.com/search?q=workinonit"
        // "https://app.prolific.co/submissions/complete?cc=67D2B26B"
    }
});

