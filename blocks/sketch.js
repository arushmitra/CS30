// Arrays and Object Notation Assignment
// Blocks In The World!  



let theCubes = [];
let numberOfCubesSlider;
let cubeOrientationSlider;
let n = 1;
let cubeMaker = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Slider for the number of cubes
  numberOfCubesSlider = createSlider(200, 6000, 100);
  numberOfCubesSlider.position(10, 10);
  numberOfCubesSlider.size(180);
  numberOfCubesSlider.input(checkAndMakeNewCubes);
  
  // Slider for cube orientation
  cubeOrientationSlider = createSlider(1, 10, 1);
  cubeOrientationSlider.position(10, windowHeight - 30);
  cubeOrientationSlider.size(180);
  cubeOrientationSlider.input(updateCubeOrientation);
  
  checkAndMakeNewCubes();
}

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

function updateCubeOrientation() {
  n = cubeOrientationSlider.value();
  checkAndMakeNewCubes();
}

function draw() {
  background("black");
  orbitControl();
  displayCubes();
}

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

function makeCube(x, y, z) {
  let someCube = {
    Width: random(50, 100),
    Height: random(50, 100),
    Depth: random(50, 100),
    Color: cubeColors(),
    Position: createVector(x, y, z),
  };
  theCubes.push(someCube);
}

function displayCubes() {
  for (let cube of theCubes) {
    push();
    translate(cube.Position.x, cube.Position.y, cube.Position.z);
    fill(cube.Color.r, cube.Color.g, cube.Color.b);
    box(cube.Width, cube.Height, cube.Depth);
    pop();
  }
}
