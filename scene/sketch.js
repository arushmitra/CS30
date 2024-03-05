// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let rectX = 0;
let rectY;
let rectWidth = 250;
let rectHeight = 30;
let circleX;
let circleY;
let circleDX;
let circleDY;
let radius = 15;
let r = 0;
let g = 0;
let b = 0;

function drawRect() {
  fill("brown");
  rect(rectX, rectY, rectWidth, rectHeight);
}

function moveRect() {
  if (keyIsDown(39) && rectX + rectWidth < windowWidth) {
    rectX += 7.5;
  }
  if (keyIsDown(37) && rectX > 0) {
    rectX -= 7.5;
  }
}

function drawCircle() {
  fill(r, g, b);
  circle(circleX, circleY, 30);
}

function moveCircle() {
  circleX += circleDX;
  circleY += circleDY;
}

function bounceWall() {
  function bounceWall() {
  // Check if the circle hits the left or right wall
  if (circleX + radius >= windowWidth || circleX - radius <= 0) {
    circleDX = -1 * circleDX;
    changeColor();
  }

  // Check if the circle hits the top or bottom wall
  if (circleY + radius >= windowHeight || circleY - radius <= 0) {
    circleDY = -1 * circleDY;
    changeColor();
  }

  // Check if the circle hits the surface of the rectangle
  if (
    circleY + radius >= rectY &&
    circleY - radius <= rectY + rectHeight &&
    circleX >= rectX &&
    circleX <= rectX + rectWidth
  ) {
    circleDY = -1 * circleDY;
    changeColor();
  }
}

}

function changeColor() {
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
}


function setup() {
  rectY = windowHeight - 30;
  circleX = width / 2;
  circleY = height / 2;
  circleDX = random(5, 15);
  circleDY = random(5, 15);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  changeColor();
}

function draw() {
  background(0);
  drawRect();
  moveRect();
  if (keyIsDown(67)){//C
    drawCircle();
    moveCircle();
    bounceWall();
   
  }
}
