// sierpinski triangle

let initialTriangle = [
  {x:600,y:20},
  {x:100,y:780},
  {x:1100,y:780},
];

let theDepth = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  sierpinski(initialTriangle,theDepth);
}
function mousePressed(){
  if(theDepth< 7){
  theDepth++;
  }
}
function sierpinski(points, depth){
  fill(random("255"),random("255"),random("255"));
  triangle(points[0].x,points[0].y,points[1].x,points[1].y,points[2].x,points[2].y);

  if (depth > 0){
    // draw lower left triangle
    sierpinski([midPoint(points[0],points[1]) , midPoint(points[1],points[2]), points[1]],depth-1);
    
    // draw top 
    sierpinski([midPoint(points[0],points[1]) , midPoint(points[0],points[2]), points[0]],depth-1);

    // draw lower right 
    sierpinski([midPoint(points[0],points[2]) , midPoint(points[1],points[2]), points[2]],depth-1);

  

}
 
}

function midPoint(p1,p2){
  let newX = (p1.x + p2.x)/2;
  let newY = (p1.y + p2.y)/2;

  return {x:newX , y:newY};

}