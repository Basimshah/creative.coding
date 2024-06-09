var img, x, y;

function preload() {
  // Load your own image
  img = loadImage("bmw.jpg");
}

function setup() {
  createCanvas(600, 500);
  background(0);
  noStroke();
}

function draw() {
  background(0);
  x = mouseX;
  y = mouseY;
  image(img, 0, 0);
  var c = get(x, y);
  fill(c);
  // Draw a rectangle instead of an ellipse
  rectMode(CENTER);
  rect(x, y, 100, 100);
}