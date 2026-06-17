let x = 500;
let y = 500;
let rad = 0;
let rad1 = 0;

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background('#C5283D');
  noStroke();

  

  for (let x = 0; x <= 1200; x += 120) {
    for (let y = 0; y <= 1200; y += 120) {

      push();
      translate(x, y);
      scale(0.5);
      rotate(rad);
      fill('#481D24');
      beginShape();
      vertex(12,-46.5);
      bezierVertex(110,-94.5,137.16,-3.24,122,27.5);
      bezierVertex(68.5,136,6,149.5,-38.5,176.5);
      vertex(-125,106.5);
      vertex(-125,-67.5);
      vertex(-32.5,-176);
      vertex(38.5,-176);
      vertex(12,-46.5);
      endShape();

      pop();
    }
  }
  rad1 += PI/180;

  for (let x = 0; x <= 1200; x += 225) {
    for (let y = 0; y <= 1200; y += 225) {

      push();
      translate(x, y);
      scale(0.8);
      rotate(rad);
      fill('#E9724C');
      beginShape();
      vertex(161.5,101.5);
      vertex(177,-49.5);
      vertex(43.5,-56);
      vertex(126.5,-155.5);
      vertex(-14,-233);
      vertex(-178,-6);
      vertex(-14,232.5);
      vertex(80.5,141.5);
      vertex(20,68.5);
      endShape();

      pop();
    }
  }
  rad -= PI/180;


  
  
  
}

