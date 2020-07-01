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

// //HIDDEN MARKOV MODEL
// const stableProb = [0.8,0.2]
// const fallingProb = [0.1,0.9]
// const risingProb = [0.2,0.8]
// let transProb = [stableProb,fallingProb,risingProb]
// console.log(transProb)

//d3 viz

//dynamic function to resize SVG
// function responsivefy(svg) {
//   const container = d3.select(svg.node().parentNode),
//       width = parseInt(svg.style('width'), 10),
//       height = parseInt(svg.style('height'), 10),
//       aspect = width / height;
//   svg.attr('viewBox', `0 0 ${width} ${height}`)
//   .attr('preserveAspectRatio', 'xMinYMid')
//   .call(resize);
//   d3.select(window).on(
//     'resize.' + container.attr('id'), 
//     resize
//     );
//   function resize() {
//     const w = parseInt(container.style('width'));
//     svg.attr('width', w);
//     svg.attr('height', Math.round(w / aspect));
//   }
// }

//parameters
let height = 300

// create scales    
//let x_slices = [40,100,200,300,400]
let y_scale = d3.scaleLinear()
    //.domain = ([d3.min(slices),d3.max(slices)])
    .domain = ([30,400])
    .range = ([height,0]);

//create SVG element
let svg = d3.select('.graph')
    .attr("height","100%")
    .attr("width","100%")

//create line
let line = d3.line()
    .x(function (d,i){  return d.x})
    .y(function (d,i){  return height - d.y})
    .curve(d3.curveCardinal);

svg.append("path")
    .attr("fill","none")
    .attr("stroke","black")
    .attr("d",line(data));

//create dots
svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx",function (d,i){  return d.x})
    .attr("cy",function (d,i){  return height - d.y})
    .attr("r","0.75")