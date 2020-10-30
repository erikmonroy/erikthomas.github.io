//BG DATA
//notes to self:
//Could have A1C profiles for game that changes
//probability matrix of model

//GLOBAL VARIABLES
// Data array
let dataAmount = 300;
const subAmount = 50
let bgData = [dataAmount];
let bgSubData = [50];

//CONSTRUCTORS
function BG(index, value, state) {
  this.index = index;
  this.value = value;
  this.state = state;
};

//FUNCTIONS

// function Start(){
//   console.log("Started");
//   button.removeEventListener("click", Start);
//   button.addEventListener("click", Stop);
//   button.value = "Start";
// };

// function Stop(){
//   console.log("Stopped");
//   button.removeEventListener("click", Stop);
//   button.addEventListener("click", Start);
//   button.value = "Stop";
// };

function createValue()  {
  return Math.ceil(Math.random()*40+80);
};

function createNextValue(bg) {
  return Math.ceil(jStat.normal.sample(bg,3));
};

// bg data
bgData[0] = new BG(0,createValue(),"stable");
bgData[1] = new BG(1,createNextValue(bgData[0].value),"stable");
for (var i = 2; i < dataAmount; i++)  {
  bgData.push(new BG(i, createNextValue(bgData[i-1].value), "stable"));
}

// Need continuously updating subarray
bgSubData = bgData.slice(0, subAmount);
// // On click (for now) will update once
// function updateSubData() {
//   bgSubData.shift(bgData[0])
//   bgSubData.push(bgData[subAmount]);
// };


// //HIDDEN MARKOV MODEL or BG MODEL
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
          + (width + adj * 3) + " "
          + (height + adj * 3))
    .style("padding", padding)
    .style("margin", margin)
    .classed("svg-content", true);

//SCALES
const xScale = d3.scaleLinear().range([0,width]);
const yScale = d3.scaleLinear().rangeRound([height, 0]);
xScale.domain([0,50]);
yScale.domain([40,400]);


//AXES generators
const yAxisGen = d3.axisRight().scale(yScale).ticks(5);
const yAxis2Gen = d3.axisLeft().scale(yScale).ticks(2);
const xAxisGen = d3.axisBottom().scale(xScale);
yAxisTicks = [40,100,200,300,400]; //Dexcom intervals
yAxisTicks2 = [400,250,70]; //Rectangle 
yAxisGen.tickValues(yAxisTicks).tickSize(10);
yAxis2Gen.tickValues(yAxisTicks2).tickSize(-width);

//LINES
const line = d3.line()
    .x(function(d) { return xScale(d.index); })
    .y(function(d) { return yScale(d.value); });

//2. DRAW
// BACKGROUND
let myColor = d3.scaleOrdinal()
    .domain(yAxisTicks2)
    .range(["#ffff99","#ccccff","#ff6666"]);

svg.append("g")
    .selectAll('rect.background')
    .data(yAxisTicks2)
    .enter()
    .append("rect")
      .attr("width",width)
      .attr("height", function (d)  {return height - yScale(d) })
      .attr("x",0)
      .attr("y", function (d)  {return yScale(d) })
      .attr("fill", function(d){return myColor(d) });

//AXES
let xAxis = svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisGen);

let yAxis = svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + width + ", 0)", "rotate(-90)")
    .call(yAxisGen)
    .append("text")
    .attr("dy", ".75em")
    .attr("y", 6)
    .style("text-anchor", "end")
    .text("Blood Glucose ");

let yAxis2 = svg.append("g")
     .attr("class", "ytlines")
     .call(yAxis2Gen);
    // .append("text")
    // .attr("dy", ".75em")
    // .attr("y", 6)
    // .style("text-anchor", "end")
    // .text("Blood Glucose");

//AXES customization

yAxis.selectAll(".tick text")
      .attr("font-size","20");

//LINES
// svg.append("path").datum(bgData)
// .attr("fill", "none")
// .attr("stroke", "black")
// .attr("stroke-linejoin", "round")
// .attr("stroke-linecap", "round")
// .attr("stroke-width", 1.5)
// .attr("d", line);


//DOTS
svg.append("g")
    .selectAll('dot')
    .data(bgSubData)
    .enter().append("circle")
      .attr("r", 3.0)
      .style("fill", "black")
    .merge(svg)
      .attr("cx", function (d)  {return xScale(d.index)})
      .attr("cy", function (d)  {return yScale(d.value)});

// UPDATE DATA

// Need update count
var count = 0;
// Error catch
// if (count >= dataAmount - subAmount)  {
//   return 1;
// }

// D3 update
function updateData() {
  setInterval(function() {
    // Remove old elements
    d3.selectAll("circle")
    .remove();
    // Update data
    bgSubData.shift(bgData[0]);
    bgSubData.push(bgData[subAmount + count]);
    count += 1;
    // Scale the range of data again
    xScale.domain([0,50]);
    yScale.domain([40,400]);
    // Section we want changes to apply to
    svg.select("div#container").transition();
    // Make changes
    svg.append("g")
    .selectAll('dot')
    .data(bgSubData)
    .enter().append("circle")
    .attr("r", 3.0)
    .style("fill", "black")
    .merge(svg)
    .attr("cx", function (d)  {return xScale(d.index - count)})
    .attr("cy", function (d)  {return yScale(d.value)});
  }, 1000);
};