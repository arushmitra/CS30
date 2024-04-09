// 2D Grid

// Use for hard-coding
//let grid = [
//  [1,0,0,1],
//  [0,1,0,1],
//  [0,0,0,1],
//];



let grid;
let cellSize;
const  GRID_SIZE = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(GRID_SIZE,GRID_SIZE);
  cellSize = height/grid.length;
}

function draw() {
  background(220);
  displayGrid();
}
function mousePressed(){
  if (grid[y][x] === 1){
    fill("white");
  }
  else {
    fill("black");
  }
  displayGrid;
}
function keyPressed(){
  if (key === "n"){
  grid = generateRandomGrid(GRID_SIZE,GRID_SIZE);
  }

}
function displayGrid(){
  for (let y = 0; y < grid.length; y++){
    for (let x = 0; x < grid[y].length ; x++){
      square(x*cellSize,y*cellSize,cellSize);
      if (grid[y][x] === 1){
        fill("black");
      }
      else {
        fill("white");
      }
    }
  }

}


function generateRandomGrid(col,row){
  let emptyArray = [];
  for (let y = 0;y < row; y++){
    emptyArray.push([]);
    for (let x = 0; x < col;x++){
      // Flip a coin
      if (random(100) < 50){
        emptyArray[y].push(0);
      }
      emptyArray[y].push(1);
    }
  }
  return emptyArray;
}