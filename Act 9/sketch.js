let table;
let years = [];
let temps = [];
let minTemp, maxTemp;
let padding = 80; // Define padding as a global variable
let headingSize = 24; // Define heading size globally
let defaultTextSize = 16; // Define default text size globally

function preload() {
  table = loadTable('https://raw.githubusercontent.com/datasets/global-temp/master/data/monthly.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, 600);
  textSize(defaultTextSize); // Set the default text size
  let rows = table.getRows();
 
  for (let i = 0; i < rows.length; i++) {
    let year = rows[i].getString('Date').substring(0, 4);
    let temp = parseFloat(rows[i].getString('Mean'));
    if (!isNaN(temp)) {
      years.push(year);
      temps.push(temp);
    }
  }
 
  minTemp = min(temps);
  maxTemp = max(temps);
}

function draw() {
  background(255);
  drawTitle(); // Draw the title first
  drawChart();
}

function drawTitle() {
  textAlign(CENTER);
  textSize(headingSize); // Set the size of the heading text
  textStyle(BOLD); // Make the heading text bold
  fill(0, 102, 204); // Bright blue color
  text('Global Warming Over Time', width / 2, 50);
}

function drawChart() {
  // Draw axes
  stroke(0);
  line(padding, height - padding, width - padding, height - padding); // x-axis
  line(padding, padding, padding, height - padding); // y-axis
 
  // Label axes
  textAlign(CENTER);
  textSize(defaultTextSize); // Set the default text size for other text
  textStyle(NORMAL); // Ensure other text is not bold
  text('Year', width / 2, height - 10);
  drawYAxisLabel("Temp Anomaly (°C)", 20, height / 2);
 
  // Plot data
  noFill();
  beginShape();
  for (let i = 0; i < years.length; i++) {
    let x = map(years[i], years[0], years[years.length - 1], padding, width - padding);
    let y = map(temps[i], minTemp, maxTemp, height - padding, padding);
    vertex(x, y);
   
    // Draw interactive points
    if (dist(mouseX, mouseY, x, y) < 8) {
      fill(0);
      text(`${temps[i].toFixed(2)}°C`, x, y - 10);
    }
  }
  endShape();
 
  // Draw trend line
  drawTrendLine();
 
  // Draw annotations
  drawAnnotations();
 
  drawLegend();
}

function drawYAxisLabel(label, x, y) {
  push();
  translate(x, y);
  rotate(-HALF_PI);
  textAlign(CENTER);
  text(label, 0, 0);
  pop();
}

function drawTrendLine() {
  // Calculate trend line using linear regression
  let x_mean = years.reduce((acc, cur) => acc + parseFloat(cur), 0) / years.length;
  let y_mean = temps.reduce((acc, cur) => acc + parseFloat(cur), 0) / temps.length;

  let num = 0;
  let den = 0;
  for (let i = 0; i < years.length; i++) {
    num += (parseFloat(years[i]) - x_mean) * (temps[i] - y_mean);
    den += Math.pow(parseFloat(years[i]) - x_mean, 2);
  }
  let slope = num / den;
  let intercept = y_mean - slope * x_mean;

  // Plot trend line
  let x1 = map(years[0], years[0], years[years.length - 1], padding, width - padding);
  let y1 = map(slope * years[0] + intercept, minTemp, maxTemp, height - padding, padding);
  let x2 = map(years[years.length - 1], years[0], years[years.length - 1], padding, width - padding);
  let y2 = map(slope * years[years.length - 1] + intercept, minTemp, maxTemp, height - padding, padding);

  stroke(255, 0, 0); // Red color for trend line
  line(x1, y1, x2, y2);
}

function drawAnnotations() {
  // Example: Add an annotation for a significant event or period
  let annotationYear = '2016';
  let annotationIndex = years.indexOf(annotationYear);
  if (annotationIndex !== -1) {
    let x = map(years[annotationIndex], years[0], years[years.length - 1], padding, width - padding);
    let y = map(temps[annotationIndex], minTemp, maxTemp, height - padding, padding);
    fill(255, 0, 0); // Red color for annotation
    ellipse(x, y, 10, 10);
    textAlign(LEFT);
    text('Hottest Year on Record', x + 15, y - 42); // Adjusted position
  }
}

function drawLegend() {
  let legendWidth = 200;
  let legendHeight = 20;
  let gradientX = width - 300;
  let gradientY = height - 50;
 
  noStroke();
  for (let i = 0; i < legendWidth; i++) {
    let temp = map(i, 0, legendWidth, minTemp, maxTemp);
    let colorValue = map(temp, minTemp, maxTemp, 0, 1);
    let c = lerpColor(color(0, 0, 255), color(255, 0, 0), colorValue);
    fill(c);
    rect(gradientX + i, gradientY, 1, legendHeight);
  }
 
  textAlign(LEFT);
  fill(0);
  textSize(defaultTextSize); // Set the default text size for legend text
  text(`${minTemp.toFixed(2)}°C`, gradientX, gradientY + legendHeight + 15);
  textAlign(RIGHT);
  text(`${maxTemp.toFixed(2)}°C`, gradientX + legendWidth, gradientY + legendHeight + 15);
}

function windowResized() {
  resizeCanvas(windowWidth, 600);
}
