let t = 0;
let from1 = '#110031';
let to1 = '#005e89';     

let from2 = '#0a2a26';
let to2 = '#1fb2a1';    

let cellSize1 = 35;
let cellSize2 = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0);  
  
 
  blendMode(ADD);
  
  
  for(let x = 0; x < width + cellSize1; x += cellSize1) {
    for(let y = 0; y < height + cellSize1; y += cellSize1) {
      let n = noise(x * 0.007, y * 0.007, t);
      let c = lerpColor(color(from1), color(to1), n);
      let size = cellSize1 * 1.9 * n;
      

      fill(red(c), green(c), blue(c), 50);
      ellipse(x, y, size * 1.5);
      
    
      fill(red(c), green(c), blue(c), 100);
      ellipse(x, y, size * 1.1);
      
      
      fill(c);
      ellipse(x, y, size);
    }
  }
  

  for(let x = 0; x < width + cellSize2; x += cellSize2) {
    for(let y = 0; y < height + cellSize2; y += cellSize2) {
      let n = noise(x * 0.02 + 100, y * 0.02 + 100, t);
      let c = lerpColor(color(from2), color(to2), n);
      let size = cellSize2 * 1.9 * n;
      
     
      fill(red(c), green(c), blue(c), 40);
      ellipse(x, y, size * 2.5);
      
     
      fill(red(c), green(c), blue(c), 100);
      ellipse(x, y, size);
    }
  }
  
 
  blendMode(BLEND);
  
  t += 0.01;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
 

