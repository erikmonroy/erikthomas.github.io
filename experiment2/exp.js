document.querySelector("#circle").style.width = "100px";
document.querySelector("#circle").style.height = "100px";

document.querySelector("#carb").addEventListener('click', function(){
	carb_load += 10;
})

document.querySelector("#insulin").addEventListener('click', function(){
	insulin += 5;
})


var current_bg = 100;
var carb_load = 0;
var insulin = 0;

var one_carb_effect = [0, 0, 1, 1, 2, 2, 3, 4, 5, 5, 4, 3, 2, 1, 1, 0];
var one_unit_insulin = [0, 0, 0, 0, -1, -2, -3, -4, -5, -6, -5, -4, -3];

setInterval(function(){
		document.querySelector("#circle").style.width = `${current_bg}px`;
		document.querySelector("#circle").style.height = `${current_bg}px`;
   updateModel();
}, 1000)

function updateModel(){
	current_bg = 100 + carb_load - insulin;
  carb_load -= 1;
  insulin -= 1;
}