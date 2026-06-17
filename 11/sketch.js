let colors = ['#606060','#A1A1A1','#DFDFDF','#FFFFFF','#000000'];
let w = 100;
let crossRects = [];
let cols, rows;
let duration = 180;   
 
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  pixelDensity(1);
  cols = ceil(width / w) + 1;
  rows = ceil(height / w) + 1;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      crossRects.push(new CrossRects(i * w, j * w, w, 0));
    }
  }
}
 
function draw() {
  background(255);
  for (let cr of crossRects) { cr.show(); cr.update(); }
}
 

// easings 함수

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
}
function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}
function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
function easeInCubic(x) {
  return x * x * x;
}
 

function getSequenceProgress(currentN, appearStart, appearEnd, disappearStart, disappearEnd, appearFn, disappearFn) {
  if (currentN < appearStart) {
    return 0;   
  } else if (currentN < appearEnd) {
    return appearFn(norm(currentN, appearStart, appearEnd));   
  } else if (currentN < disappearStart) {
    return 1;  
  } else if (currentN < disappearEnd) {
    return 1 - disappearFn(norm(currentN, disappearStart, disappearEnd));   // 사라짐
  } else {
    return 0;  
  }
}
 
class CrossRects {
  constructor(x, y, w, offset) {
    this.w = w; this.x = x; this.y = y; this.offset = offset;
    this.rectW = 0; this.rectW2 = 0;
    this.circleW = 0; this.circleW2 = 0;
    this.circleW3 = 0; this.circleW4 = 0;
    this.colors1 = random(colors);
    this.colors2 = random(colors);
    this.colors3 = random(colors);
    this.colors4 = random(colors);
    this.colors5 = random(colors);
  }
  show() {
    push();
    translate(this.x, this.y);
    rectMode(CENTER);
    fill(255); rect(0, 0, this.w);
    fill(0);
    rect(0, 0, this.rectW, this.w);
    rect(0, 0, this.w, this.rectW);
    fill(255);
    rect(0, 0, this.w, this.rectW2);
    rect(0, 0, this.rectW2, this.w);
    fill(this.colors2); ellipse(0, 0, this.circleW);
    fill(this.colors3); ellipse(0, 0, this.circleW2);
    fill(this.colors4); ellipse(0, 0, this.circleW3);
    fill(this.colors5); ellipse(0, 0, this.circleW4);
    pop();
  }
  update() {

    let t = frameCount % duration;
    let n = norm(t, 0, duration);
 
   
 
    let rectP = getSequenceProgress(n,
      0, 0.15,     
      0.7, 1.0,    
      easeOutCirc,
      easeInOutCubic   
    );
    this.rectW = lerp(0, this.w * 0.8, rectP);
    this.rectW2 = this.rectW * 0.1;
 
  
    let p4 = getSequenceProgress(n,
      0.10, 0.22, 
      0.7, 1.0,
      easeOutBack, easeInOutCubic
    );
    let p3 = getSequenceProgress(n,
      0.20, 0.32,   
      0.7, 1.0,
      easeOutBack, easeInOutCubic
    );
    let p2 = getSequenceProgress(n,
      0.30, 0.42,   
      0.7, 1.0,
      easeOutBack, easeInOutCubic
    );
    let p1 = getSequenceProgress(n,
      0.40, 0.52,  
      0.7, 1.0,
      easeOutBack, easeInOutCubic
    );
 
    this.circleW  = this.w * p1;          
    this.circleW2 = this.w * 0.8 * p2;
    this.circleW3 = this.w * 0.6 * p3;
    this.circleW4 = this.w * 0.4 * p4;    
  }
}