// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let state = "red";
let lastTime = 0;
let RedDuration = 2000;
let GreenDuration = 2500;
let YelloDuration = 1000;


function setup() {
  createCanvas(100, 300);
  someTime = 2000;
}
function drawRedLight() {
  fill("red");
  let r = ellipse(width / 2, height / 2 - 65, 50, 50); //top
}
function drawYellowLight() {
  fill("yellow");
  let y = ellipse(width / 2, height / 2, 50, 50); //middle
}
function drawGreenLight() {
  fill("green");
  let g = ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
}
function drawCorrectLight() {
  if (state === "green") {
    drawGreenLight();
  } else if (state === "red") {
    drawRedLight();
  } else if (state === "yellow") {
    drawYellowLight();
  }
}
function findState(){
  if (state === 'red'&& (millis()> lastTime + RedDuration)){
      lastTime = millis();
      state = 'green';
    }
  else if(state === 'green'&&(millis()> lastTime + RedDuration)){
    lastTime = millis;
    state = 'yellow';
  }
 else if(state ==='yellow'&& (millis()>lastTime + RedDuration)){
   lastTime = millis;
   state = 'red';
 }
  
  
}
function draw() {
  background(255);
  drawOutlineOfLights();
  findState();
  drawCorrectLight();
  
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10);

  //lights
  fill(255);
  let r = ellipse(width / 2, height / 2 - 65, 50, 50); //top
  let y = ellipse(width / 2, height / 2, 50, 50); //middle
  let g = ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
}
