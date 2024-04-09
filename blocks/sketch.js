// Arush Mitra
// Arrays and Object Notation Assignment
// Blocks In The World!  

// Tip: 
// Please use your mouse wheel to zoom in and out


// Constants 
const MINNUMBEROFCUBES = 200;
const MAXNUMBEROFCUBES = 6000;
const MINCUBEORIENTATION = 1;
const MAXCUBEORIENTATION = 10;
const MINCUBESIZE = 50;
const MAXCUBESIZE = 100;


// Setting Variables
let theCubes = [];
let numberOfCubesSlider;
let cubeOrientationSlider;
let n = 1;
let cubeMaker = 0;

function setup() {
  // WEBGL used to make and compile program in 3D 
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Slider for the number of cubes
  numberOfCubesSlider = createSlider(MINNUMBEROFCUBES, MAXNUMBEROFCUBES, 100);
  numberOfCubesSlider.position(10, 10);
  numberOfCubesSlider.size(180);
  numberOfCubesSlider.input(checkAndMakeNewCubes);
  
  // Slider for cube orientation
  cubeOrientationSlider = createSlider(MINCUBEORIENTATION, MAXCUBEORIENTATION, 1);
  cubeOrientationSlider.position(10, windowHeight - 30);
  cubeOrientationSlider.size(180);
  cubeOrientationSlider.input(updateCubeOrientation);
  
  checkAndMakeNewCubes();
}

// Makes new cubes and adds to array 
function checkAndMakeNewCubes() {
  theCubes = [];
  let spawner = numberOfCubesSlider.value();
  cubeMaker = spawner;
  
  for (let i = 0; i < cubeMaker; i++) {
    makeCube(
      random(-width * n, width * n),
      random(-height * n, height * n),
      random(-500 * n, 500 * n)
    );
  }
}

// Updates the orientation of the cubes on the screen
function updateCubeOrientation() {
  n = cubeOrientationSlider.value();
  checkAndMakeNewCubes();
}

// Orbit control used to pan cubes in screen 
function draw() {
  background(25,25,25);
  orbitControl();
  displayCubes();
}

// Random color generator for cubes 
function cubeColors() {
  let r, g, b;
  let chooser = random(0, 40);
  if (chooser < 10) {
    r = 94;
    g = 22;
    b = 117;
  } else if (chooser < 20) {
    r = 238;
    g = 66;
    b = 102;
  } else if (chooser < 30) {
    r = 255;
    g = 210;
    b = 63;
  } else {
    r = 51;
    g = 115;
    b = 87;
  }
  return { r, g, b };
}

// Specific cube parame†er defining function
function makeCube(x, y, z) {
  let someCube = {
    Width: random(MINCUBESIZE, MAXCUBESIZE),
    Height: random(MINCUBESIZE, MAXCUBESIZE),
    Depth: random(MINCUBESIZE, MAXCUBESIZE),
    Color: cubeColors(),
    Position: createVector(x, y, z),
  };
  theCubes.push(someCube);
}

// Shows all the cubes in the parameters defined above 
function displayCubes() {
  for (let cube of theCubes) {
    push();
    translate(cube.Position.x, cube.Position.y, cube.Position.z);
    fill(cube.Color.r, cube.Color.g, cube.Color.b);
    box(cube.Width, cube.Height, cube.Depth);
    pop();
  }
}
