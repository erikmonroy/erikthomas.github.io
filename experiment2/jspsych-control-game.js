/*
 * Control Game
 */

jsPsych.plugins["control-game"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "control-game",
    parameters: {
      decrease_key: {
        type: jsPsych.plugins.parameterType.KEYCODE, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: 37 // <-
      },
      increase_key: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        default: 39 // ->
      },
      insulin_curve: {
        type: jsPsych.plugins.parameterType.FLOAT,
        default: [0.0, -0.1835875 , -0.45450114, -0.68209674, -0.87150191,
          -1.02730467, -1.15360686, -1.25407239, -1.33197094, -1.3902174 ,
          -1.43140765, -1.45785072, -1.47159801, -1.47446957, -1.4680779 ,
          -1.45384933, -1.43304343, -1.40677043, -1.37600694, -1.34161013,
          -1.30433049, -1.26482335, -1.22365914, -1.18133277, -1.13827196,
          -1.0948447 , -1.05136606, -1.00810422, -0.96528584, -0.92310098,
          -0.88170743, -0.84123458, -0.80178693, -0.76344716, -0.72627895,
          -0.6903294 , -0.65563126, -0.62220487, -0.59005991, -0.55919693,
          -0.52960872, -0.50128152, -0.47419605, -0.44832851, -0.42365137,
          -0.40013406, -0.37774369, -0.35644552, -0.33620347, -0.31698055,
          -0.2987392 , -0.28144162, -0.26505   , -0.2495268 , -0.23483487,
          -0.22093767, -0.20779935, -0.19538492, -0.18366027, -0.17259227,
          -0.16214884, -0.15229895, -0.14301266, -0.13426115, -0.12601671,
          -0.11825276, -0.1109438 , -0.10406543, -0.09759435, -0.09150828,
          -0.085786  , -0.08040727, -0.07535283, -0.07060437, -0.06614449,
          -0.06195666, -0.05802519, -0.05433524, -0.05087271, -0.04762427,
          -0.0445773 , -0.04171986, -0.03904066, -0.03652906, -0.03417498,
          -0.03196892, -0.02990192, -0.02796551, -0.02615175, -0.0244531 ,
          -0.0228625 , -0.02137328, -0.01997918, -0.01867429, -0.01745306,
          -0.01631028]
      },
      carb_curve: {
        type: jsPsych.plugins.parameterType.FLOAT,
        default: [0.00000000e+00, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
          0.00000000e+00, 6.73406849e+00, 5.97827385e+00, 5.30730542e+00,
          4.71164279e+00, 4.18283403e+00, 3.71337585e+00, 3.29660706e+00,
          2.92661410e+00, 2.59814710e+00, 2.30654543e+00, 2.04767151e+00,
          1.81785218e+00, 1.61382649e+00, 1.43269952e+00, 1.27190125e+00,
          1.12915008e+00, 1.00242051e+00, 8.89914371e-01, 7.90035299e-01,
          7.01366102e-01, 6.22648646e-01, 5.52766003e-01, 4.90726601e-01,
          4.35650158e-01, 3.86755192e-01, 3.43347926e-01, 3.04812452e-01,
          2.70601986e-01, 2.40231114e-01, 2.13268901e-01, 1.89332778e-01,
          1.68083113e-01, 1.49218393e-01, 1.32470945e-01, 1.17603138e-01,
          1.04404012e-01, 9.26862825e-02, 8.22836863e-02, 7.30486200e-02,
          6.48500465e-02, 5.75716356e-02, 5.11101133e-02, 4.53737966e-02,
          4.02812923e-02, 3.57603426e-02, 3.17467994e-02, 2.81837140e-02,
          2.50205297e-02, 2.22123637e-02, 1.97193707e-02, 1.75061775e-02,
          1.55413808e-02, 1.37971021e-02, 1.22485916e-02, 1.08738774e-02,
          9.65345346e-03, 8.57000318e-03, 7.60815337e-03, 6.75425627e-03,
          5.99619587e-03, 5.32321597e-03, 4.72576763e-03, 4.19537358e-03,
          3.72450803e-03, 3.30648983e-03, 2.93538768e-03, 2.60593598e-03,
          2.31346013e-03, 2.05381014e-03, 1.82330184e-03, 1.61866452e-03,
          1.43699455e-03, 1.27571423e-03, 1.13253511e-03, 1.00542563e-03,
          8.92582209e-04, 7.92403714e-04, 7.03468699e-04, 6.24515259e-04,
          5.54423117e-04, 4.92197730e-04, 4.36956176e-04, 3.87914629e-04,
          3.44377234e-04, 3.05726236e-04, 2.71413213e-04, 2.40951293e-04,
          2.13908252e-04, 1.89900371e-04, 1.68587003e-04, 1.49665729e-04]
      },
      events: {
        type: jsPsych.plugins.parameterType.OBJECT,
        // Event architecture {type: 'lo/hi',factor: #,stretch:#}
        default: [{type:'lo',factor:0,stretch:1,time:5},{type:'hi',factor:1,stretch:1,time:20}]
      }
    }
  }

  plugin.trial = function(display_element, trial) {
    
    // Pre-Load
    var t = 0;
    var ir = 0;
    var tir = 100;
    const low_thresh = 80;
    const hi_thresh = 150;
    const trial_time = 1000*30;
    var numEvents = trial.events.length;

    // data saving
    var trial_data = {
      timeInRange: ir/t,
    };
    var rt = [];
    var keys = [];
    var eventTimes = [];
    
    // Data Structure
    var bg_array = new Array(96);
    bg_array.fill(100);
    var l = bg_array.length;
    for (let i = 0; i < l; i++) {
      bg_array[i] = Math.round(jStat.normal.sample(bg_array[94],3));
    }
    var current_bg = bg_array[0];
    
    // Dot color code
    var color_scale = ["#ff6666","#ccccff","#ffff99", "#000000"];
    function getColor(bg) {
      if (bg < low_thresh){
        return color_scale[0];
      }
      else if (bg < hi_thresh) {
        return color_scale[1];
      }
      else {
        return color_scale[2];
      }
    }

    function updateGraphics() {
      circle_color = getColor(current_bg);
      if (t > 0) {
        tir = Math.round(100 * (ir/t),2);
      }
      display_element.querySelector("#circle").style.width = `${current_bg}px`;
      display_element.querySelector("#circle").style.height = `${current_bg}px`;
      display_element.querySelector("#circle").style.background = circle_color;
      display_element.querySelector("#score").innerHTML = `${tir}% in range`;
    }

    function updateModel() {
      // Take out 1st element
      bg_array.shift(bg_array[0])
      // // Sample next point
      bg_array.push(Math.round(jStat.normal.sample(bg_array[94],3)))
      // // Update global BG
      current_bg = bg_array[0];
      console.log(current_bg);
    }
    
    function updateScore() {
      if (bg_array[0] > low_thresh & bg_array[0] < hi_thresh) {
        ir += 0.25;
      }
    }

    // Game functions
    function updateCarb(x)	{
      for (let i = 1; i < 96; i++) {
        bg_array[i] = (bg_array[i-1] + trial.carb_curve[i]*x);
      }
    }
    
    function updateInsulin(x) {
      for (let i = 1; i < 96; i++) {
        bg_array[i] = (bg_array[i-1] + trial.insulin_curve[i]*x);
      }
    }

    // create var event here to clear timout later
    function runEvent(i) {
      if (trial.events[i].type == 'lo') {
        for (let j = 0; j < trial.events[i].stretch; j++) {
          setTimeout(updateInsulin(trial.events[i].factor/trial.events[i].stretch, trial.events[i].stretch*1000));
        }
      }
      else if (trial.events[i].type == 'hi') {
        for (let j = 0; j < trial.events[i].stretch; j++) {
          setTimeout(updateCarb(trial.events[i].factor/trial.events[i].stretch, trial.events[i].stretch*1000));
        }
      }
    }

    function create_control_game() {
      updateGraphics();
      updateModel();
      updateScore();
    }

    var game;

    function show_stimulus(){
      var circle_color = getColor(100);
      display_element.innerHTML = '<div class="container-fluid" style="height: 700px"> <div class="row align-items-end"> <div class="col"> <h3 id = "score"> </h3> </div> </div> <div class="row align-items-center" style="height:300px"> <div class="col align-self-center"> <svg id="circle"> </svg> </div> </div> </div>';
      display_element.querySelector("#circle").style.width = "100px";
      display_element.querySelector("#circle").style.height = "100px";
      display_element.querySelector("#circle").style.background = circle_color;
      display_element.querySelector("#score").innerHTML = `100% in range`;

      // for remembering keyboard response and turning off at end
      // var keyboardListener = 
      jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: [trial.increase_key,trial.decrease_key],
        rt_method: 'performance',
        persist: true,
        allow_held_key: false
      });

      
      // use trial.events.length and t to determine when to runEvent
      // var period_length = (trial_time / trial.events.length)/1000;
      // for (let i = 0; i < trial.events.length; i++) {
      //   var begin = period_length*i;
      //   var end = (period_length*(i+1) - 10);
      //   eventTimes.push(Math.floor(Math.random() * (end - begin + 1)) + begin);
      // }

      game = setInterval(function() {
        create_control_game();
        console.log(numEvents);
        for (let i = 0; i < trial.events.length; i++) {
          if (t == trial.events[i].time) {
            runEvent(i);
            numEvents --;
          }
        }
        if (t == (trial_time/1000)) {
          end_trial();
        }
        t += 0.25;
      }, 250);
    }

    function after_response(response_info){
      rt.push(response_info.rt);
      keys.push(response_info.key);


      if (response_info.key == "arrowleft") {
        updateInsulin(1);
      }
      if (response_info.key == "arrowright") {
        updateCarb(1);
      }
    }

    function end_trial(){
      trial_data.rt = JSON.stringify(rt);
      trial_data.keys = JSON.stringify(keys);
      trial_data.eventTimes = JSON.stringify(eventTimes);
      jsPsych.pluginAPI.cancelAllKeyboardResponses();
      clearInterval(game);

      // end trial
      jsPsych.finishTrial(trial_data);
    }

    show_stimulus();
  };

  return plugin;
})();
