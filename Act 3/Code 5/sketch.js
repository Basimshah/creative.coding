let textMask = "HELLO";
let img;

function preload() {
  img = loadImage('bmw.jpg'); // Load the image to be clipped
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(255);

  // Draw the clipped image
  clipImage();
  
  // Draw text on top of the clipped image
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text(textMask, width / 2, height / 2);
}

function clipImage() {
  // Create a graphics buffer
  let textGraphic = createGraphics(width, height);

  // Set up text properties on the graphics buffer
  textGraphic.textSize(128);
  textGraphic.textAlign(CENTER, CENTER);
  textGraphic.fill(255);
  textGraphic.text(textMask, width / 2, height / 2);
  
  // Create an image mask from the text graphic
  let maskImage = textGraphic.get();
  
  // Apply the mask to the image
  img.mask(maskImage);
  
  // Draw the clipped image
  image(img, 0, 0, width, height);
}
