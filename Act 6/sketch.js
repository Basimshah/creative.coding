let trail = [];
let saveButton;

function setup() {
  createCanvas(800, 600);
  saveButton = createButton('Save');
  saveButton.position(10, 10); // Positioning save button at the top left corner
  saveButton.mousePressed(saveDrawing);
  background(220); // Set metallic background color
}

function draw() {
  // Display trails
  noFill();
  for (let i = 0; i < trail.length; i++) {
    let alpha = map(i, 0, trail.length, 100, 255);
    stroke(trail[i].col.levels[0], trail[i].col.levels[1], trail[i].col.levels[2], alpha);
    beginShape();
    for (let j = 0; j < trail[i].path.length; j++) {
      vertex(trail[i].path[j].x, trail[i].path[j].y);
    }
    endShape();
  }

  // Update trails
  for (let i = 0; i < trail.length; i++) {
    for (let j = 0; j < trail[i].path.length; j++) {
      trail[i].path[j].x += random(-2, 2);
      trail[i].path[j].y += random(-2, 2);
    }
  }

  // Remove old trails
  if (trail.length > 10) {
    trail.splice(0, 1);
  }
}

function mousePressed() {
  let newTrail = {
    path: [],
    col: color(random(255), random(255), random(255))
  };
  trail.push(newTrail);
}

function mouseDragged() {
  let point = {
    x: mouseX,
    y: mouseY
  };
  trail[trail.length - 1].path.push(point);
}

function saveDrawing() {
  saveCanvas('myDrawing', 'png');
}