// capture info from Prolific
var subject_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
var study_id = jsPsych.data.getURLVariable('STUDY_ID');
var session_id = jsPsych.data.getURLVariable('SESSION_ID');

jsPsych.data.addProperties({
    subject_id: subject_id,
    study_id: study_id,
    session_id: session_id
});

/* create timeline */
var timeline = [];

/* define welcome message trial */

var preload = {
    type: 'preload',
    images: ['images/dot.png', 'images/dot_lo.png','images/dot_hi.png']
  }
  timeline.push(preload);

var instructions = {
    type: 'instructions',
    pages: [
        'Welcome to the experiment. Press the right arrow key to continue.',
        `In this experiment, a circle will appear in the center 
        of the screen, shown below:
        <br> <img src="images/dot.png"></img>
        <br>Your objective is to keep the circle blue, or within range.
        <br><br>Press the right arrow key to continue.`,
        `Here is an example of the circle below range:
        <br><img src="images/dot_lo.png"></img>
        <br>While below range (in the red), use the right arrow key ➡️ to enlargen the circle and return it to blue, or within range.
        <br>Note that there is a delay in the effect.
        <br><br>Press the right arrow key to continue.`,
        `Here is an example of the circle above range:
        <br><img src="images/dot_hi.png"></img>
        <br>While above range (in the yellow), use the left arrow key ⬅️ to shrink the circle and return it to blue, or within range.
        <br>Note that there is a delay in the effect.
        <br><br>Press the right arrow key to continue.`,
        `Your task is to keep the circle blue, or within range, as much as possible.
        <br>Following the trial, you will answer some questions about your experience and try the experiment once more.
        <br><br>Once you finish the entire experiment, your page will be redirected to Prolific for confirmation. 
        <br>Thank you for your participation and good luck!
        <br><br>Press the right arrow key to begin.`
    ],
    show_clickable_nav: false,
    post_trial_gap: 750
}
timeline.push(instructions);

var experiment1 = {
    type: 'control-game'
};
timeline.push(experiment1);

var freeResponse1 = {
    type: 'survey-text',
    preamble: '<p>Thank you for completing the trial. To follow are 3 free-response questions about your experience.<br>Please provide as much detail when possible. <br><br>Question 1.</p>',
    questions: [
        {prompt: "Describe what you think the relationship is between pressing the keys and changes in the circle's size. If nothing comes to mind, you may skip.", name: 'Relation', required:false, rows: 5, columns: 80}
      ],
    post_trial_gap: 750
};
timeline.push(freeResponse1);

var freeResponse2 = {
    type: 'survey-text',
    preamble: '<p>Question 2.</p>',
    questions: [
        {prompt: 'While participating, did the game remind of you of anything? <br>If there are multiple things that come to mind, feel free to list them. If nothing comes to mind, you may skip.', name: 'Remind', required:false, rows: 5, columns: 80} 
      ],
    post_trial_gap: 750
};
timeline.push(freeResponse2);

var freeResponse3 = {
    type: 'survey-text',
    preamble: '<p>Question 3.</p>',
    questions: [ 
        {prompt: 'Is there any knowledge of yours that you felt helped you to perform the experiment? If nothing comes to mind, you may skip', name: 'Knowledge', required:false, rows: 5, columns: 80}
      ],
    post_trial_gap: 750
};
timeline.push(freeResponse3);

var questions_options = ["Yes", "No"];

var diabetes_question = {
    type: 'survey-multi-choice',
    questions: [
        {prompt: "Do you have any experience managing diabetes, either your own or another person's?", name: 'Diabetes', options: questions_options, required:true}
    ],
    post_trial_gap: 750
};
timeline.push(diabetes_question);

var diabetes_options = ["Glucometer (finger prick and meter)","Syringe or insulin pen","Continuous Glucose Monitor (CGM)","Insulin pump","Software or mobile app for diabetes"];

var tech_question = {
    type: 'survey-multi-select',
    questions: [
        {prompt: "Please select from the following list all of those which you have experience with:", name: 'Tech', options: diabetes_options, required:false}
    ],
    post_trial_gap: 750
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
    pages: [`The game you just played simulates diabetes.
        <br>The circle represents the concentration of sugar in the blood.
        <br><br>The left arrow key (⬅️) represents insulin, which is a medication that decreases blood sugar. Insulin's effect has a delay.
        <br><br>The right arrow key (➡️) represents a candy, which increases blood sugar. The effect of candy on blood sugar also has a delay.
        <br><br>You will now play the game one more time.
        <br>Following the game you will have the opportunity to return to Prolific for study end confirmation. 
        <br> Thank you for your time thus far and good luck! <br><br> Press the right arrow key to begin the final trial.`],
    show_clickable_nav: false,
    post_trial_gap: 750
}
timeline.push(instructions2);

var experiment2 = {
    type: 'control-game',
    events: [{type:'hi',factor:2,time:0},{type:'lo',factor:2,time:45}]
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

var explain = {
    type: 'html-keyboard-response',
    stimulus: `<p>You have successfully completed the experiment.
        <br><br>This experiement was designed to test the performance differences between people with and without diabetes,<br>and the game you just played was meant to model the system of diabetes.
        <br><br>The experiment is intended to see if people with diabetes transfer their learning to a new task with underlying similarities.
        <br>The data that controlled the circle's size was blood sugar data.
        <br>The buttons you pressed corresponded with 1 unit of insulin and 15 grams of carbs.
        <br><br> I sincerely thank you for taking the time to complete this experiment.</p>
        <p><a href="https://app.prolific.co/submissions/complete?cc=67D2B26B">Click here to return to Prolific and complete the study</a>.</p>`,
    choices: jsPsych.NO_KEYS
}
timeline.push(explain);

/* start the experiment */
jsPsych.init({
    timeline: timeline
});

