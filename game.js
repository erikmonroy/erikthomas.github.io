createBG = function(){
  x = Math.ceil(Math.random()*100)
  if (x < 70){
    return x + Math.ceil(Math.random()*100)
  }
}
console.log(createBG())
createNextBG = function(bg){
  
}