let fCols = ['#ffffff2d','#1b1b1b46','#4545452e','#b7b7b71d'];
let w = 200;

let cols, rows;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  rectMode(CENTER);
  noStroke();
  noLoop();

  cols = ceil(width/w)+1;
  rows = ceil(height/w)+1;

  drawPattern();
}

function mousePressed() {
  background(255);
	drawPattern();
}

function drawPattern() {
  background(255);
	for (let x2 = 0; x2 < cols; x2++) {
		for (let y2 = 0; y2 < rows; y2++) {
			
      let x = x2 * w;
			let y = y2 * w;
			drawRect(x, y, w);
      drawellipse(x, y, w);
      drawline(x, y);
      drawline2(x, y);
      drawline3(x, y);
      drawtri(x, y, w);
      
      
		}
	}
}



function drawRect(x,y,w) {
  for (let theta = 0; theta < 2 * PI; theta += PI / 2){
    push();
	  translate(x, y);
    rotate(theta);
	  fill(0);
	  rect(0, 0, w);
	  pop();
}
}

function drawellipse(x,y,w) {
  push();
  translate(x,y)
  fill(255);
  noStroke();
  ellipse(0,0,w);
  fill(0)
  ellipse(0,0,w*0.05);
  noFill();
  stroke(10);
  strokeWeight(2);
  ellipse(0,0,w*0.9);
  pop();
}

function drawline(x,y) {
  for (let i = 0; i < 4; i++) {
    push();
    translate(x,y);
    rotate(i*PI/2)
    noFill();
    stroke(0);
    strokeWeight(2);
    line(0+w*0.4,0,0+w*0.45,0); 
    
    pop();
 

}
}

function drawline2(x,y) {
  push();
  translate(x,y);
  rotate(random(4)*PI);
  stroke(0);
  strokeWeight(3);
  line(0,0,0,w*0.35);
  
  pop();
}

function drawline3(x,y) {
  push();
  translate(x,y);
  rotate(random(4)*PI);
  stroke(0);
  strokeWeight(5);
  line(0,0,0,w*0.25);
  pop();

}


function drawtri(x,y,w){
  for (let theta = 0; theta < 2 * PI; theta += PI / 2){
  push();
  
	translate(x,y);
  rotate(theta);
	fill(random(fCols));
  noStroke();
  triangle(-w/2, w/2, w/2, w/2, w/2, -w/2);
  pop();
}}





function draw() {

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	cols = ceil(width / w) + 1;
	rows = ceil(height / w) + 1;

	drawPattern();

}
