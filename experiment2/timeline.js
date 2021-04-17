/* create timeline */
var timeline = [];

/* define welcome message trial */

var instructions = {
    type: 'instructions',
    pages: [
        'Welcome to the experiment. Click next to begin.',
        `In this experiment, a circle will appear in the center 
        of the screen. Your objective is to keep the circle within range using grow and shrink buttons.`,
        'Here is a picture of the circle in an acceptable range: <img src="dot_ir.jpg"></img>',
        `If the circle shrinks out of range, use the grow button to increase it: <img src="dot_lo.jpg"`,
        `If the circle grows out of range, use the shrink button to decrease it: <img src="dot_hi.jpg"`,
        `Following the trial, you will answer some questions about your experience. Good luck!`
    ],
    show_clickable_nav: true,
    on_finish: 
}
timeline.push(instructions);

/* start the experiment */
jsPsych.init({
    timeline: timeline
});

