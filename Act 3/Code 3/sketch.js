let img;
let pixelSize = 10; // Initial pixel size

function preload() {
  img = loadImage("bmw.jpg");
}

function setup() {
  createCanvas(600, 500);
}

function draw() {
  background(0);
  
  // Map the mouse position to the pixel size
  pixelSize = map(mouseX, 0, width, 2, 20);
  
  // Apply the pixelation filter
  let d = pixelSize;
  for (let y = 0; y < height; y += d) {
    for (let x = 0; x < width; x += d) {
      let c = img.get(x, y);
      fill(c);
      noStroke();
      rect(x, y, d, d);
    }
  }
}