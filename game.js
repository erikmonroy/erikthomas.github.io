//BG DATA

//notes to self:
//Could have A1C profiles for game that changes
//probability matrix of model

//Functions
createValue = function()  {
  return Math.ceil(Math.random()*40+80)
};
createNextValue = function(bg) {
  return Math.ceil(jStat.normal.sample(bg,3)) 
};

//BG Constructor
function BG(index, value, state) {
  this.index = index;
  this.value = value;
  this.state = state;
};

//BG data
let bgData = []
let bg1 = new BG(1,createValue(),"stable");
let bg2 = new BG(2,createNextValue(bg1.value),"stable");
bgData.push(bg1)
bgData.push(bg2)
for (let i = 2; i < 50; i++){
  bg3= new BG(i+1,createNextValue(bgData[i-1].value),"stable");
  bgData.push(bg3)
}

// //HIDDEN MARKOV MODEL
//https://github.com/cnatale/JSProbability/blob/master/ObservableMarkovModel.js
// let omm = ProbabilityAPI.ObservableMarkovModel;

// let probabilityTable = [
//     [.8, .15, .05],
//     [.1, .8, .1],
//     [.1, .8, .1]
// ];

// //fake an enum for readability
// let states = {
//     stable:0,
//     rising:1,
//     falling:2
// };

// let result=0;
// let probabilities = [];
// probabilities[0] = omm.getProbability([states.rising, states.falling, states.falling], probabilityTable);

// probabilities[1] =  omm.getProbability([states.rising, states.stable, states.falling], probabilityTable);


// probabilities[2] =  omm.getProbability([states.rising, states.rising, states.falling], probabilityTable);

// for(let i=0; i < probabilities.length; i++){
//    result += probabilities[i];
// }


//d3 viz
//1. PREP
//SVG
const width = 960;
const height = 500;
const margin = 5;
const padding = 5;
const adj = 30;

const svg = d3.select("div#container").append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-"
          + adj + " -"
          + adj + " "
          + (width + adj *3) + " "
          + (height + adj*3))
    .style("padding", padding)
    .style("margin", margin)
    .classed("svg-content", true);

//SCALES
const xScale = d3.scaleLinear().range([0,width]);
const yScale = d3.scaleLinear().rangeRound([height, 0]);
xScale.domain([1,50]);
yScale.domain([40,400]);

//AXES
const yaxis = d3.axisLeft().scale(yScale); 
const xaxis = d3.axisBottom().scale(xScale);

//LINES
const line = d3.line()
    .x(function(d) { return xScale(d.index); })
    .y(function(d) { return yScale(d.value); });

//2. DRAW
//AXES
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xaxis);

svg.append("g")
    .attr("class", "axis")
    .call(yaxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("dy", ".75em")
    .attr("y", 6)
    .style("text-anchor", "end")
    .text("Blood Glucose");

//LINES
svg.append("path").datum(bgData)
.attr("fill", "none")
.attr("stroke", "black")
.attr("stroke-linejoin", "round")
.attr("stroke-linecap", "round")
.attr("stroke-width", 1.5)
.attr("d", line);

//DOTS
svg.append("g")
    .selectAll('dot')
    .data(bgData)
    .enter()
    .append("circle")
      .attr("cx", function (d)  {return xScale(d.index)})
      .attr("cy", function (d)  {return yScale(d.value)})
      .attr("r", 1.5)
      .style("fill", "black")