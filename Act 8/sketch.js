let song;
let fft;
let particles = [];

function preload() {
  // Preload the sound file
  song = loadSound('filament-song.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  // Create a new FFT object
  fft = new p5.FFT();
  song.loop(); // Loop the song

  // Initialize particles
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0);

  // Get the waveform data
  let waveformData = fft.waveform();

  // Draw the particles
  for (let particle of particles) {
    particle.update();
    particle.show();
  }

  // Draw the circular waveform with gradient color
  let numCircles = 5; // Number of concentric circles
  for (let j = 0; j < numCircles; j++) {
    let alpha = map(j, 0, numCircles, 50, 255); // Vary transparency
    stroke(255, 0, 255, alpha);
    strokeWeight(map(j, 0, numCircles, 1, 4));
    beginShape();
    for (let i = 0; i < waveformData.length; i++) {
      let angle = map(i, 0, waveformData.length, 0, TWO_PI);
      let radius = map(waveformData[i], -1, 1, 150 + j * 20, 300 + j * 20);
      let x = width / 2 + radius * cos(angle);
      let y = height / 2 + radius * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Particle class
class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.size = random(2, 5);
  }

  update() {
    // Get the current amplitude
    let level = fft.getEnergy(20, 200);
    let amplitude = map(level, 0, 255, 0, 2);

    // Apply noise to velocity
    this.acc = p5.Vector.random2D().mult(amplitude);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);

    // Wrap around the edges
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    noStroke();
    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}