// Node OOP Demo 

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let somePoint = new MovingPoint(width/2,height/2);
  points.push(somePoint);
}

function draw() {
  background("gray");
  for(let point of points){
    point.update();
    point.connectTo(points);
    
  }
  for (let point of points){
    point.display();
  }
}

function mousePressed(){
  let somePoint = new MovingPoint(mouseX,mouseY);
  points.push(somePoint);
}


class MovingPoint{
  constructor(x,y){
    this.speed = 5;
    this.radius = 5;
    this.maxRadius = 50;
    this.minRadius = 15;
    this.reach = 100;
    this.x = x;
    this.y = y;
    this.xTime = random(1000,10000);
    this.yTime = random(1000,10000);
    this.deltaTime  = 0.01;
    this.color = color(random(255),random(255),random(255));
  }

  display(){
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  update(){
    this.move();
    this.wrapScreen();
    this.adjustSizeWithMouse();

  }

  connectTo(pointsArray){
    for (let other of pointsArray){
      if(this !== other){
        let pointDist = dist(this.x,this.y,other.x,other.y);
        if(pointDist < this.reach){
          line(this.x,this.y,other.x,other.y);
        }
      }
    }
  }
  move(){
        // pick random direction
        let dx = noise(this.xTime);
        let dy = noise(this.yTime);
    
        // scale the movement speed 
        this.dx = map(dx,0,1,-this.speed,this.speed);
        this.dy = map(dy,0,1,-this.speed,this.speed);
    
        // move point 
        this.x += this.dx;
        this.y += this.dy;
    
        //move
        this.xTime += this.deltaTime;
        this.yTime += this.deltaTime;
  }

  wrapScreen(){
        // wrap around screen if you fall off
        if(this.x < 0){
          // fell off left 
          this.x += width;
        }
        else if(this.x > width){
          // fell off right
          this.x -= width;
        }
        else if (this.y < 0){
          // fell off top 
          this.y += height;
        }
        else if (this.y > height){
          // fell off bottom
          this.y -= height;
        }
  }
  adjustSizeWithMouse(){
    let mouseDist = dist(this.x,this.y,mouseX,mouseY);
    if(mouseDist < this.reach){
      let theSize = map(mouseDist,0,this.reach,this.maxRadius,this.minRadius);
      this.radius = this.maxRadius;
    }
    else{
      this.radius = this.minRadius;
    }
  }
}