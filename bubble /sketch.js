// Bubble Movement Demo 
// Object Notation and Arrays 

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i = 0; i<5; i++){
    spawnBubble();
  }
  // spawn new bubble every half second 
  // execute this once, hence it is in setup
  window.setInterval(spawnBubble,50);
}

function draw() {
  background("black");
  //moveBubblesRandom();
  moveBubblesNoise();
  displayBubbles();
}
function moveBubblesNoise(){
  // figure out where to be 
  for (let bubble of theBubbles){
    let x = noise(bubble.timeX) * width;
    let y = noise(bubble.timeY) * height;

    // set the bubble object location
    bubble.x = x;
    bubble.y = y;

    // increment timeX and timeY
    bubble.timeX += bubble.dT;
    bubble.timeY += bubble.dT;
  }
}
function moveBubblesRandom(){
  for ( let bubble of theBubbles){
    let choice = random(100);
    if(choice < 25){
      // move up 
      bubble.y -= bubble.speed;
    }
    else if (choice < 50){
      //move down
      bubble.y += bubble.speed;
    }
    else if (choice < 75 ){
      // move right
      bubble.x += bubble.speed;
    }
    else {
      //move left 
      bubble.x -= bubble.speed;
    }
  }
}

function displayBubbles(){
  for ( let bubble of theBubbles){
    fill(bubble.r,bubble.g,bubble.b,bubble.alpha);
    circle(bubble.x,bubble.y,bubble.size);
}
}
function spawnBubble() {
  let someBubble = {
    size : random(10,30),
    x : random(width),
    y : random(height),
    speed : 3,
    r : random(0,255),
    g : random(0,255),
    b : random(0,255),
    // alpha is the opacity
    alpha : random(0,255),
    timeX : random(10000000),
    timeY : random(10000000),
    dT : 0.002,

  };
  theBubbles.push(someBubble);
}