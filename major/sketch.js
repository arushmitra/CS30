let snake;
let food;

function setup() {
  createCanvas(400, 400);
  snake = new Snake();
  food = createFood();
}

function draw() {
  background(220);
  snake.update();
  snake.show();
  
  if (snake.eat(food)) {
    food = createFood();
  }
  
  fill(255, 0, 0);
  rect(food.x, food.y, 10, 10); // Food item
}

function keyPressed() {
  if (key === 'W' || key === 'w') {
    snake.changeDirection(0, -1); // Up
  } else if (key === 'S' || key === 's') {
    snake.changeDirection(0, 1); // Down
  } else if (key === 'A' || key === 'a') {
    snake.changeDirection(-1, 0); // Left
  } else if (key === 'D' || key === 'd') {
    snake.changeDirection(1, 0); // Right
  }
}

function createFood() {
  let x = floor(random(width / 10)) * 10;
  let y = floor(random(height / 10)) * 10;
  return createVector(x, y);
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(0, 0);
    this.xSpeed = 1;
    this.ySpeed = 0;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xSpeed * 10;
    head.y += this.ySpeed * 10;
    this.body.push(head);
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(255);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 10, 10);
    }
  }

  changeDirection(x, y) {
    this.xSpeed = x;
    this.ySpeed = y;
  }
  
  eat(pos) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x === pos.x && y === pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.body.push(head);
  }
}
