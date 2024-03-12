//Arrays and Object Demo

let ballArray = [];

function setup() {
  noStroke;

  createCanvas(windowWidth, windowHeight);
  spawnBall(width/2,height/2);
}

function draw() {
  background(220);
  moveBalls();
  displayBalls();
}
function moveBalls(){
  for(let ball of ballArray){
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    if (ball.x > width){
      ball.x = 0;
    }
    else if(ball.x< 0){
      ball.x = width;
    }
    if (ball.y > height){
      ball.y = 0;
    }
    else if(ball.x< 0){
      ball.y = height;
    }
  }
}
function mousePressed(){
  spawnBall(mouseX,mouseY);
}
function displayBalls(){
  for(let ball of ballArray){
    fill(ball.color);
    circle(ball.x,ball.y,ball.radius*2);
  }
}

function spawnBall(iX,iY){
  let ball = {
    x: iX,
    y:iY,
    radius: random(15,30),
    color:color(random(255),random(255),random(255)),
    dx: random(-5,5),
    dy: random(-5,5),

  };
  ballArray.push(ball);
}