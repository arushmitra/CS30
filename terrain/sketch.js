// Terrain Generation 
// Object Notation and Arrays Demo 


let terrain = [];
let numOfRects; 
let rectWidth; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  numOfRects = width; 
  rectWidth = width / numOfRects;
  generateTerrain(); 
}


function draw() {
  background(220);
  for ( let someRect of terrain){
    rect(someRect.x,someRect.y,someRect.w,someRect.h);
  }
}
function generateTerrain(){
  let time = 0;
  let dt = 0.001;

  for(let x = 0; x < width; x += rectWidth){
    let theHeight = noise(time) * height;
    spawnRect(x,theHeight);
    time += dt;
  }
}
function spawnRect(leftSide,rectHeight){
  fill("green");

  let thisRect = {
    x : leftSide,
    y : height-rectHeight,
    w : rectWidth,
    h : rectHeight,
  };
  terrain.push(thisRect);

}
