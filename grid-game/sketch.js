// Arush Mitra
// 2D Assignment

let grid;
let cellSize;
let GRID_SIZE = 20;
//setting constants 
const PLAYER = 9;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const GOAL = 2;
const FINISH = 3;
const BLOCK = 4; 
const FINISHLINE = 5; 

// setting the positions 
let player = {
  x: 0,
  y: 0,
};
let goal = {
  x: 1,
  y: 1,
}
let finish = {
  x: 4,
  y: 4,
};
let block = { 
  y: 4,
};
let grassImg;
let pavingImg;
let bgMusic;
let cantWalk;
let heroSprite; 
let blockToMove;
let finishLine;
let state = "start screen";
let level1;
// instead of using json file (because mine had some sort of fault) i used the data from the json file and loaded it
let mazeLayout = {
  "lvl": [
    [1, 9, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
  ]
};

// load images 
function preload() {
  grassImg = loadImage("clover 1.png");
  pavingImg = loadImage("paving 3.png");
  blockToMove = loadImage("block.png");
  heroSprite = loadImage("hero.png");
  finishLine = loadImage("finish.png");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  } else {
    createCanvas(windowHeight, windowHeight);
  }
  // set up custom level to play 
  grid = generateGridFromLayout(mazeLayout.lvl);
  cellSize = width / GRID_SIZE;


}
// putting the correct state to play 
function draw() {
  if (state === "start screen") {
    drawStartScreen();
  } else if (state === "playing") {
    background(220);
    drawGrid();
    drawPlayer();
    checkForEnd();
  } else if (state === "game over") {
    GameOver();
  } else if (state === "you win") {
    drawYouWin();
  }
}

function drawStartScreen() {
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(36);
  text("Press Enter to Start", width / 2, height / 2);
}

function keyPressed() {
  if (state === "start screen" && keyCode === ENTER) {
    state = "playing";
  } else if (state === "game over" || state === "you win") {
    if (keyCode === ENTER) {
      state = "start screen";
    }
  }

  if (state === "playing") {
    movePlayer();
  }
}

// used the grid to map out objects in current grid
function generateGridFromLayout(layout) {
  let newGrid = [];
  for (let i = 0; i < layout. length; i++) {
    newGrid.push([]);
    for (let j = 0; j < layout[i]. length;  j++) {
      if (layout[i][j] ===IMPASSIBLE) {
        newGrid[i].push (IMPASSIBLE );
      } else if (layout[i][j] ===GOAL) {
        newGrid[i].push(GOAL);
      } else if (layout[i] [j]=== FINISH) {
        newGrid[i].push(FINISH);
      } else if (layout[i][j]  === BLOCK) {
        newGrid[i].push(BLOCK);
      } else if (layout[i][j]=== FINISHLINE) { 
        newGrid[i].push( FINISHLINE);
      } else {
        newGrid[i].push(OPEN_TILE);
      }
    }
  }
  return newGrid;
}


// putting the grid in the correct position with correct data
function drawGrid() {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      let x = i * cellSize;
      let y = j * cellSize;

      if (grid[i][j] === OPEN_TILE) {
        image(grassImg, x, y, cellSize, cellSize);
      } else if (grid[i][j] === IMPASSIBLE) {
        image(pavingImg, x, y, cellSize, cellSize);
      } else if (grid[i][j] === GOAL) {
        image(blockToMove, x, y, cellSize, cellSize);
      } else if (grid[i][j] === BLOCK) { 
        image(blockToMove, x, y, cellSize, cellSize);
      } else if (grid[i][j] === FINISHLINE) {
        image(finishLine, x, y, cellSize, cellSize);
      }
    }
  }
}

function drawPlayer() {
  let x = player.x * cellSize;
  let y = player.y * cellSize;
  image(heroSprite, x, y, cellSize, cellSize);
}

// using arrow keys tomove 
function movePlayer() {
  let newX = player.x;
  let newY = player.y;

  if (keyIsDown(LEFT_ARROW)) {
    newX -= 1;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    newX += 1;
  }
  if (keyIsDown(UP_ARROW)) {
    newY -= 1;
  }
  if (keyIsDown(DOWN_ARROW)) {
    newY += 1;
  }
  if (newX >= 0 && newX < GRID_SIZE && newY >= 0 && newY < GRID_SIZE) {
    if (grid[newX][newY] === OPEN_TILE || grid[newX][newY] === GOAL) {
      player.x = newX;
      player.y = newY;
      if (grid[player.x][player.y] === GOAL) {
        grid[player.x][player.y] = OPEN_TILE;
      }
    } else if (grid[newX][newY] === BLOCK) { 
      let newBlockX = block.x + (newX - player.x);
      let newBlockY = block.y + (newY - player.y);
      if (newBlockX >= 0 && newBlockX < GRID_SIZE && newBlockY >= 0 && newBlockY < GRID_SIZE) {
        if (grid[newBlockX][newBlockY] === OPEN_TILE) {
          block.x = newBlockX;
          block.y = newBlockY;
          player.x = newX;
          player.y = newY;
        }
      }
    } else if (grid[newX][newY] === FINISHLINE) { 
      state = "you win";
    } else {
      cantWalk.play();
    }
  }
}
// check if at end 
function checkForEnd() {
  if (player.x === finish.x && player.y === finish.y) {
    state = "you win";
  }
}

// mechanism for end of game 
function GameOver() {
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(36);
  text("Game Over", width / 2, height / 2);
  text("Press Enter to Restart", width / 2, height / 2 + 50);
}

// if you win, draw againd. 
function drawYouWin() {
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(36);
  text("You Win!", width / 2, height / 2);
  text("Press Enter to Restart", width / 2, height / 2 + 50);
}
