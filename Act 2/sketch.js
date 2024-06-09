function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  drawBackground();
  translate(width / 2, height / 2);
  drawAlien();
}

function drawBackground() {
  // Gradient background
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(10, 10, 30), color(0, 0, 70), inter);
    stroke(c);
    line(0, y, width, y);
  }

  // Stars
  for (let i = 0; i < 100; i++) {
    fill(255, 255, 255, random(150, 255));
    noStroke();
    let x = random(width);
    let y = random(height);
    ellipse(x, y, random(1, 3), random(1, 3));
  }
}

function drawAlien() {
  drawBody();
  drawHead();
  drawEyes();
  drawMouth();
  drawAntennas();
  drawArms();
  drawLegs();
}

function drawBody() {
  // Smooth body with natural gradient and texture
  let bodyGradient = drawingContext.createLinearGradient(0, 60, 0, 160);
  bodyGradient.addColorStop(0, color(50, 180, 80));
  bodyGradient.addColorStop(1, color(20, 140, 60));
  drawingContext.fillStyle = bodyGradient;
  ellipse(0, 60, 100, 140);

  // Adding texture
  for (let i = 0; i < 10; i++) {
    fill(50, 150, 50, 100);
    ellipse(random(-40, 40), random(30, 90), random(10, 20), random(20, 30));
  }
}

function drawHead() {
  // Head with natural gradient and texture
  let headGradient = drawingContext.createRadialGradient(0, -50, 20, 0, -50, 70);
  headGradient.addColorStop(0, color(180, 130, 250));
  headGradient.addColorStop(1, color(130, 80, 200));
  drawingContext.fillStyle = headGradient;
  ellipse(0, -40, 120, 140);

  // Adding texture
  for (let i = 0; i < 10; i++) {
    fill(150, 100, 200, 100);
    ellipse(random(-50, 50), random(-70, -10), random(10, 20), random(20, 30));
  }
}

function drawEyes() {
  // More expressive eyes
  fill(255);
  ellipse(-30, -50, 35, 45);
  ellipse(30, -50, 35, 45);

  fill(0);
  ellipse(-30, -50, 15, 20);
  ellipse(30, -50, 15, 20);

  // Add eye glint
  fill(255);
  ellipse(-28, -52, 5, 5);
  ellipse(32, -52, 5, 5);
}

function drawMouth() {
  // Smiling mouth
  noFill();
  stroke(255, 100, 100);
  strokeWeight(3);
  arc(0, -10, 50, 30, 0, PI);

  // Tongue
  fill(255, 100, 100);
  noStroke();
  ellipse(0, -5, 20, 10);
}

function drawAntennas() {
  // Curved antennas
  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  vertex(-20, -80);
  bezierVertex(-30, -110, -10, -120, -20, -140);
  endShape();
  beginShape();
  vertex(20, -80);
  bezierVertex(30, -110, 10, -120, 20, -140);
  endShape();

  // Antenna tips
  fill(255, 0, 0);
  noStroke();
  ellipse(-20, -140, 12, 12);
  ellipse(20, -140, 12, 12);

  fill(255, 100, 100, 150);
  ellipse(-20, -140, 18, 18);
  ellipse(20, -140, 18, 18);
}

function drawArms() {
  // Organic arms with more natural bends
  stroke(150, 100, 200);
  strokeWeight(6);
  noFill();
  beginShape();
  vertex(-30, 60);
  bezierVertex(-50, 80, -70, 50, -90, 70);
  endShape();
  beginShape();
  vertex(30, 60);
  bezierVertex(50, 80, 70, 50, 90, 70);
  endShape();

  // Hands
  fill(150, 100, 200);
  noStroke();
  ellipse(-90, 70, 20, 20);
  ellipse(90, 70, 20, 20);

  fill(180, 130, 230, 150);
  ellipse(-90, 70, 15, 15);
  ellipse(90, 70, 15, 15);
}

function drawLegs() {
  // Organic legs with more natural bends
  stroke(100, 200, 100);
  strokeWeight(6);
  noFill();
  beginShape();
  vertex(-20, 130);
  bezierVertex(-30, 160, -40, 180, -50, 200);
  endShape();
  beginShape();
  vertex(20, 130);
  bezierVertex(30, 160, 40, 180, 50, 200);
  endShape();

  // Feet
  fill(100, 200, 100);
  noStroke();
  ellipse(-50, 200, 20, 10);
  ellipse(50, 200, 20, 10);

  fill(120, 220, 120, 100);
  ellipse(-50, 200, 15, 5);
  ellipse(50, 200, 15, 5);
}