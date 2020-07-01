//BG DATA
createBG = function(){
  bg = Math.ceil(Math.random()*40+80)
  return bg
}
createNextBG = function(bg){
  return Math.ceil(jStat.normal.sample(bg,3))
}
let data = []
bg1 = {x:1,y:createBG()}
bg2 = {x:2,y:createNextBG(bg1.y)}
data.push(bg1)
data.push(bg2)
for (let i = 2; i < 50; i++){
  bg3= {x:(i+1),y:createNextBG(data[i-1].y)}
  data.push(bg3)
}
console.log(data)

//d3 viz
//create SVG element

let svg = d3.select('.graph')
    .append('svg')
    .attr("height","100%")
    .attr("width","100%")

let line = d3.line()
    .x(function (d,i){  return })
    .y()


//bind data and create dots
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function(d){
      return d
    })
    .attr('cy', function(d){
      return d[0]
    })
    .attr('r', 1)




// //HIDDEN MARKOV MODEL
// const stableProb = [0.8,0.2]
// const fallingProb = [0.1,0.9]
// const risingProb = [0.2,0.8]
// let transProb = [stableProb,fallingProb,risingProb]
// console.log(transProb)