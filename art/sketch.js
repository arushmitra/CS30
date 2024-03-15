// Generative Art 

let tileSize = 15;
let someTile;
let theTile = [];
function setup() {
  strokeWeight("white");
  createCanvas(windowWidth, windowHeight);
  for ( let y = 0; y < height; y += tileSize){
    for (let x = 0; x < width; x+= tileSize){
      someTile = spawnTile(x, y);
      theTile.push(someTile);

    }
  }
}

function draw() {
  background(196, 164, 132) ;
  for (let someTile of theTile){
    line (someTile.x1,someTile.y1,someTile.x2,someTile.y2);
  }
}

function spawnTile(x,y){
  let choice = random(100);
  let tile;

  if (choice > 50){
    //negative slope 

    tile = {
      x1 : x - tileSize / 2,
      y1 : y - tileSize / 2, 
      x2 : x + tileSize / 2, 
      y2 : y + tileSize / 2, 

    };
  }
  else{
    //positive slope
    tile = {
      x1 : x - tileSize / 2,
      y1 : y + tileSize / 2, 
      x2 : x + tileSize / 2, 
      y2 : y - tileSize / 2, 
    };
  }
  return tile;
}