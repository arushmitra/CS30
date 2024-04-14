
let grid;
let cellSize;
const GRID_SIZE = 30;
let isAutoPlayOn = false;
let toggleStyle = "self";

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }

  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  
  cellSize = height/grid.length;
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }

  cellSize = height/grid.length;
}

function draw() {
  background(220);
  displayGrid();
  if(isAutoPlayOn= true)
  grid = updateGrid;
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }

  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }

  if (key === "n") {
    toggleStyle = "neighbours";
  }

  if (key === "s") {
    toggleStyle = "self";
  }
  if (key === "p")
    grid = updateGrid();
  
  if (key === "a"){
    isAutoPlayOn = true;
  }
}



function updateGrid(){
  // need a second array to not mess with grid while counting neighbors 
  let nextTurn = generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  for (let y = 0; y < GRID_SIZE; y++ ){
    for (let x = 0; x < GRID_SIZE; x++ ){
      let neighbors = 0;

      // look at every cell in a 3x3 grid around the cell.
      for ( let i = -1 ; i<= 1;i ++ ){
        for (let j = -1 ; j <= 1 ; j++){
          // avoid going off edge 
          if (x+i > 0 && x+i< GRID_SIZE && y + j>= 0 && y+j<GRID_SIZE ){ 
          neighbors += grid[y+j][x+i];
          }
        }
      }
      // don't count yourself 
      neighbors -= grid[x][y];

      // am i alive 
      if (grid[y][x]=== 1){
        // alive 
        if (neighbors === 2 || neighbors===3){
          nextTurn[y][x] = 1;
        }
        else{
          nextTurn[y][x] = 0;
        }
      }
      if (grid[y][x]=== 0){
        // dead 
        if (neighbors === 3){
          nextTurn[y][x] = 1;
        }
        else{
          nextTurn[y][x] = 0;
        }
      }
    }
  }
  return nextTurn;
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x, y);

  if (toggleStyle === "neighbours") {
    toggleCell(x + 1, y);
    toggleCell(x - 1, y);
    toggleCell(x, y + 1);
    toggleCell(x, y - 1);
  }
}

function toggleCell(x, y) {
  if (x < GRID_SIZE && y < GRID_SIZE &&
      x >= 0 && y >= 0) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else {
      grid[y][x] = 0;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 1) {
        fill("black");
      }
      else {
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        emptyArray[y].push(0);
      }
      else {
        emptyArray[y].push(1);
      }
    }
  }
  return emptyArray;
}

function generateEmptyGrid(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}