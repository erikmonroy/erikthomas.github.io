/* create timeline */
var timeline = [];

/* define welcome message trial */

var instructions = {
    type: 'instructions',
    pages: [
        'Welcome to the experiment. Press the right arrow key to continue.',
        `In this experiment, a circle will appear in the center 
        of the screen. Your objective is to keep the circle within range.
        <br>You will have a gauge of whether the circle is in range by both:
        <br>1. The <b>color</b> of the circle, and
        <br>2. The <b>time in range</b> measure above the circle.
        <br>Continue to see examples.`,
        'Here is an example of the circle in an acceptable range:<br><img src="images/dot_IR.png"></img>',
        'Here is an example of the circle below range:<br><img src="images/dot_lo.png"></img><br>If the circle is below range, use the right (->) arrow key to enlargen the circle.',
        'Here is an example of the circle above range:<br><img src="images/dot_hi.png"></img><br>If the circle is above range, use the left (<-) arrow key to shrink the circle.',
        `Your task is to keep the circle within range as much as possible.<br>Following the trial, you will answer some questions about your experience. Good luck!`
    ],
    show_clickable_nav: false
}
timeline.push(instructions);

var experiment = {
    type: 'control-game'
};
timeline.push(experiment);

var freeResponse = {
    type: 'survey-text',
    preamble: '<p>Thank you for completing the trial. Below are free-response questions about your experience.<br>Please provide as much detail when possible.</p>',
    questions: [
        {prompt: 'While participating, did the game remind of you of anything from the past? If there are multiple things that come to mind, feel free to list them.', name: 'Any', required:true, rows: 5, columns: 80}, 
        {prompt: 'Is there any knowledge of yours that you felt helped you to perform the experiment?', name: 'Knowledge', required:true, rows: 5, columns: 80}
      ],
};
timeline.push(freeResponse);

var questions_options = ["Yes", "No"];

var questions = {
    type: 'survey-multi-choice',
    questions: [
        {prompt: "Do you have any experience managing diabetes, either your own or another person's?", name: 'Diabetes', options: questions_options, required:true},
        {prompt: "If you answered yes to the above, do you have experience using diabetes technology other than a blood glucometer (insulin pump, continuous glucose monitor, or software)?", name: 'Tech', options: questions_options, required:false}
    ],
};
timeline.push(questions);

/* start the experiment */
jsPsych.init({
    timeline: timeline,
    on_finish: function(){
        jsPsych.data.displayData()
    }
});

