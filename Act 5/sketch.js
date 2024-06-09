let angle = 0;
let textSizeOffset = 0;
let textColor;
let textLeadingOffset = 0;
let fontWeightOffset = 0;
let rotationSpeed = 0.02;
let shadowBlur = 10;
let targetX, targetY;
let stars = [];
let textRotation = 0; // New variable for text rotation

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Arial', 48);
  textAlign(CENTER, CENTER);
  textColor = color(0, 191, 255);
  targetX = width / 2;
  targetY = height / 2;
  
  // Initialize stars for parallax effect
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      speed: random(0.5, 2)
    });
  }
}

function draw() {
  backgroundGradient();
  updateTextProperties();
  drawStars();
  drawText();
}

function backgroundGradient() {
  let fromColors = [color(255, 0, 0), color(255, 165, 0)];
  let toColors = [color(0, 0, 255), color(75, 0, 130)];
  let t = (sin(angle) + 1) / 2; // Animated transition factor
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let fromColor = lerpColor(fromColors[0], fromColors[1], inter);
    let toColor = lerpColor(toColors[0], toColors[1], inter);
    let c = lerpColor(fromColor, toColor, t);
    stroke(c);
    line(0, y, width, y);
  }
}

function updateTextProperties() {
  angle += rotationSpeed;
  textSizeOffset = sin(angle) * 10;
  textLeadingOffset = sin(angle * 2) * 5;
  fontWeightOffset = sin(angle * 3) * 2;
  let r = map(sin(angle), -1, 1, 0, 255);
  let g = map(cos(angle), -1, 1, 0, 255);
  let b = map(sin(angle + PI), -1, 1, 0, 255);
  textColor = color(r, g, b);

  rotationSpeed = map(mouseX, 0, width, -0.05, 0.05);

  // Smooth text position follow
  targetX = lerp(targetX, mouseX, 0.05);
  targetY = lerp(targetY, mouseY, 0.05);

  // Update text rotation based on mouse position
  let maxRotation = 20; // Maximum rotation angle
  textRotation = map(mouseX, 0, width, -maxRotation, maxRotation);
}

function drawText() {
  let txt = "BATH SPA UNIVERSITY";
  
  textSize(48 + textSizeOffset);
  textLeading(48 + textLeadingOffset);
  
  // Draw text outline with blur effect
  fill(0, 50);
  noStroke();
  textStyle(NORMAL);
  textFont('Arial', 48 + fontWeightOffset);
  push(); // Save the current drawing state
  translate(targetX, targetY); // Move the origin to the target position
  rotate(radians(textRotation)); // Rotate the text
  for (let i = -2; i <= 2; i++) {
    for (let j = -2; j <= 2; j++) {
      text(txt, i, j);
    }
  }
  pop(); // Restore the saved drawing state
  
  // Draw main text
  fill(textColor);
  textStyle(NORMAL);
  textFont('Arial', 48 + fontWeightOffset);
  push(); // Save the current drawing state
  translate(targetX, targetY); // Move the origin to the target position
  rotate(radians(textRotation)); // Rotate the text
  text(txt, 0, 0);
  pop(); // Restore the saved drawing state
}

function drawStars() {
  for (let star of stars) {
    fill(255, 255, 0, 150);
    noStroke();
    ellipse(star.x, star.y, star.size, star.size);
    star.y += star.speed;
    if (star.y > height) {
      star.y = 0;
      star.x = random(width);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}