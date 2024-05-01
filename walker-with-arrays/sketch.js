// Walker OOP Demo 


class Walker {
  constructor(x , y,color){
    this.x = x;
    this.y = y;
    this.stepSize = 10;
    this.color = color;
    this.radius = 10;
  }
  display(){
    fill(this.color);
    circle(this.x, this.y, this.radius * 2)
  }
  move(){
    let choice = random(100);
    if(choice < 25){
      // move up 
      this.y -= this.stepSize;
    }
    else if (choice < 50){
      // move down 
      this.y += this.stepSize;
    }
    else if (choice < 75){
      // move right
      this.x += this.stepSize;
    }
    else{
      // move left
      this.x -= this.stepSize;
    }
    
  }
}

let theWalkers = [];

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  ross  = new Walker(width/2, height/2, "red");
  arush = new Walker(200,400,"green");
  ankur = new Walker(800,600,"blue");

}

function draw() {
  for(let someWalker of theWalkers){
    someWalker.move();
    someWalker.display();
  }

}
function mousePressed(){
  let theColor = color(random(105),random(105),random(105))
  let myWalker = new Walker(mouseX,mouseY,theColor);
  theWalkers.push(myWalker);
}