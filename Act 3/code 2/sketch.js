let img;
let transparency = 50;
let shapeSize = 30;

function preload() {
  // Load your own image
  img = loadImage('bmw.jpg');
}

function setup() {
  createCanvas(600, 500);
  background(0);
  noStroke();
}

function draw() {
  let x = random(width);
  let y = random(height);
  
  // Get color at random point from the image
  let c = img.get(x, y);
  
  // Set fill color with increased transparency
  fill(c[0], c[1], c[2], transparency);
  
  // Draw custom shape
  drawCustomShape(x, y, shapeSize);
}

// Function to draw custom shape
function drawCustomShape(x, y, size) {
  beginShape();
  // Define custom shape vertices
  vertex(x - size / 2, y - size / 2);
  vertex(x + size / 2, y - size / 2);
  vertex(x + size / 4, y + size / 2);
  vertex(x - size / 4, y + size / 2);
  endShape(CLOSE);
}