//BG DATA
//notes to self:
//Could have A1C profiles for game that changes
//probability matrix of model

//GLOBAL VARIABLES
//Start button
let button = document.getElementById("Start");
button.addEventListener('click', Start, false);
//circular queue
let bgData = [];

//CONSTRUCTORS
function BG(index, value, state) {
  this.index = index;
  this.value = value;
  this.state = state;
};

//Circular Queue
class Queue  {
  maxSize;
  currentIndex;
  q;
  constructor(max)  {
    this.maxSize = max;
    this.currentIndex = 0;
    this.q = [maxSize];
  }

  //add element to queue
  enqueue(data) {
    //is queue full?
    if (this.length == (this.max - 1))  {
      return ("Queue is full!");
    }
    else  {
      //add element to queue
      this.queue.pop(data);
      //increment tail pointer
      this.tail = (this.tail + 1) % this.max;
      return true;
    }
  }

  //rm element from queue
  dequeue() {
    if (this.length == 0) {
      return("Queue is empty!");
    }
    else  {
      //fetch data
      data = this.queue[this.head];
      // increment head
      this.head = (this.head + 1) % this.max;
      return data;
    }
  }

  //find size of queue
  size() {
    if (this.tail >= this.head)  {
      qSize = this.tail - this.head;
    }
    else  {
      qSize = this.max - (this.head - this.tail);
    }
    //return size of queue
    return qSize;
  }
}

//FUNCTIONS
function createValue()  {
  return Math.ceil(Math.random()*40+80);
};

function createNextValue(bg) {
  return Math.ceil(jStat.normal.sample(bg,3));
};

function Start(){
  console.log("Started");
  button.removeEventListener("click", Start);
  button.addEventListener("click", Stop);
  button.value = "Start";
};

function Stop(){
  console.log("Stopped");
  button.removeEventListener("click", Stop);
  button.addEventListener("click", Start);
  button.value = "Stop";
};

function createData() {
  let count = 0;
  rear = (rear + 1) % max;
  front = (front + 1) % max;
  while (button.value == "Start") {
    bgData[0] = new BG(0,createValue(),"stable");
    bgdata[1] = new BG(1,createNextValue(bg1.value),"stable");
    if (i % 50 == 0){
      let bg = new BG(i+1,createNextValue(bgData[i-1].value),"stable");
      //wait a sec
    }
    else {
      bgData = bgData.shift();
      i = 0;
      //send a message to rebind data to d3
      //wait a sec
    }
  }}




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
xScale.domain([0,50]);
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