function setup() {
createCanvas(400, 400);
}
 function draw() {
 background(220);
   
   
   //Body
   fill(0, 128, 255);
   rect(50, 200, 300, 50);
   rect(100, 150, 200, 50);
   
   //Window
   fill(173, 216, 230);
   rect(120, 160, 80, 30);
   rect(200, 160, 80, 30);
   
   //wheels
   fill(0);
   ellipse(100, 250, 50, 50);
   ellipse(300, 250, 50, 50);
   fill(255, 255, 255);
   ellipse(100, 250, 20, 20);
   ellipse(300, 250, 20, 20);
   
   //Roof
   fill(255,165,0);
   triangle(100, 150, 300, 150, 200, 100);
   
   //Headlight
   fill(255, 255, 0);
   ellipse(50, 200, 20, 20);
   ellipse(350, 200, 20, 20);
   
   //Taillights
   fill(255, 0, 0);
   ellipse(50, 250, 20, 20);
   ellipse(350, 250, 20, 20);
 }