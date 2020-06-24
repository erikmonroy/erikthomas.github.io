createBG = function(){
  bg = Math.ceil(Math.random()*40+80)
  return bg
}

createNextBG = function(bg){
  return Math.ceil(jStat.normal.sample(bg,3))
}



const stableProb = [0.8,0.2]
const fallingProb = [0.1,0.9]
const risingProb = [0.2,0.8]
let transProb = [stableProb,fallingProb,risingProb]
console.log(transProb)