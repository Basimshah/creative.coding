let particles = [];

function setup() {
  createCanvas(1024, 512);
  for (let i = 0; i < 200; i++) {
    particles.push(new Particle());
  }
  noStroke();
}

function draw() {
  drawBackground();
}

function drawBackground() {
  // Gradient background
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color('#1e3c72'), color('#2a5298'), inter);
    stroke(c);
    line(0, y, width, y);
  }

  // Draw and update particles
  for (let particle of particles) {
    particle.update();
    particle.display();
    particle.connect(particles);
  }
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(2, 6);
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > width || this.x < 0) {
      this.speedX *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.speedY *= -1;
    }
  }

  display() {
    fill(255, 150);
    ellipse(this.x, this.y, this.size);
  }

  connect(particles) {
    particles.forEach(particle => {
      let d = dist(this.x, this.y, particle.x, particle.y);
      if (d < 100) {
        stroke(255, 50);
        line(this.x, this.y, particle.x, particle.y);
      }
    });
  }
}