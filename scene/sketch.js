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
let bg;
let someTime = 0;
let lastSwitch = 0;
let state;

function draw() {
  state = "play";
  background(bg);
  fill("green");
  textSize(45);
  textAlign(CENTER, CENTER);
  text("Click the mouse to start the ball",width/2, height/2);

  if (millis() > lastSwitch + someTime) {
    background(bg);
    drawRect();
    moveRect();
  }
  mousePressed();
}
function mousePressed() {
  if (mouseIsPressed === true) {
    state = "mouse";
  }
  if (state === "mouse"){
  drawCircle();
  moveCircle();
  bounceWall();
  }
}

function drawRect() {
  fill("green");
  rect(rectX, rectY, rectWidth, rectHeight);
}

function moveRect() {
  if (keyIsDown(39) && rectX + rectWidth < windowWidth) {
    rectX += 20;
  }
  if (keyIsDown(37) && rectX > 0) {
    rectX -= 20;
  }
}

function drawCircle() {
  fill(r, g, b);
  circle(circleX, circleY, 30);
}

function moveCircle() {
  // move circle
  circleX += circleDX;
  circleY += circleDY;
}

function bounceWall() {
  if (circleX + radius >= width || circleX - radius <= 0) {
    circleDX = -1 * circleDX;
    changeColor();
  }
  if (circleY - radius <= 0) {
    circleDY = -1 * circleDY;
    changeColor();
  }
  if (
    circleX + radius >= rectX &&
    circleX - radius <= rectX + rectWidth &&
    circleY + radius >= rectY &&
    circleY - radius <= rectY + rectHeight &&
    circleDY > 0
  ) {
    circleDY = -1 * circleDY;
    changeColor();
  }
  else if(circleY + radius > windowHeight) {
    state = "end game";
    noLoop();
    fill("green");
    textSize(45);
    textAlign(CENTER, CENTER);
    text("Uh-oh you lose! To play again, please press Enter",width/2, height/2);
    
  }
}

function changeColor() {
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
}

function setup() {
  bg = loadImage("bg.jpeg");
  someTime = 2000;
  rectY = windowHeight - 30;
  circleX = width / 2;
  circleY = height / 2;
  circleDX = random(5, 15);
  circleDY = random(5, 15);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  changeColor();
}

