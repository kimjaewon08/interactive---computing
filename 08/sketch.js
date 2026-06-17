let capture;
let prevFrame;

function setup() {
  createCanvas(640, 480);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
  
  
  prevFrame = createImage(320, 240);
  
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  
  background(0, 0, 0, 5); 

  capture.loadPixels();
  prevFrame.loadPixels();

  let gridSize = 7; 

  for (let x = 0; x < capture.width; x += gridSize) {
    for (let y = 0; y < capture.height; y += gridSize) {
      let loc = (x + y * capture.width) * 4;
      
      
      let r = capture.pixels[loc];
      let g = capture.pixels[loc + 1];
      let b = capture.pixels[loc + 2];
      
      
      let pr = prevFrame.pixels[loc];
      let pg = prevFrame.pixels[loc + 1];
      let pb = prevFrame.pixels[loc + 2];

      
      let d = dist(r, g, b, pr, pg, pb);
      let bright = (r + g + b) / 3;
      
      let cx = map(x, 0, capture.width, 0, width);
      let cy = map(y, 0, capture.height, 0, height);

      
      if (bright > 10) {

       colorMode(RGB, 255); 
       fill(r, g, b, 150); 
       rect(cx, cy, gridSize, gridSize); 
       colorMode(HSB, 360, 100, 100, 100);
      }

      
      if (d > 40) {
        let glowSize = map(d, 10, 180, 8, 90, true);
        let h = map(d, 40, 180, 320, 190, true);

        for (let i = 3; i > 0; i--) {
          let layerSize = glowSize * (i / 3);
          let layerAlpha, layerSat, layerBright;
          
          if (i === 1) { 
            layerAlpha = 90; layerSat = 5; layerBright = 100;
          } else if (i === 2) { 
            layerAlpha = 45; layerSat = 90; layerBright = 100;
          } else { 
            layerAlpha = 20; layerSat = 100; layerBright = 80;
          }
          fill(h, layerSat, layerBright, layerAlpha);
          ellipse(cx, cy, layerSize, layerSize);
        }
      }
    }
  }

 
  prevFrame.copy(capture, 0, 0, 320, 240, 0, 0, 320, 240);
}