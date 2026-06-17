
let colors = ['#606060','#A1A1A1','#DFDFDF','#FFFFFF','#000000'];
let w =100;


let rectW = 0;
let rectW2 = 0;
let circleW = 0;
let circleW2 = 0;
let circleW3 = 0;
let circleW4 = 0;
let steps = 0;
let dir = 1;

let crossRects = [];
let cols, rows;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  cols = ceil(width / w) + 1;
  rows = ceil(height / w) + 1;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * w;
      crossRects.push(new CrossRects(x, y, w));
    }
  }

}

function draw() {
  background(255);

  for(let cr of crossRects){
    cr.show();
    cr.update();
  }

  steps += 1.7*dir;
  if(steps>w|| steps<-w){
    dir *=(-1);
  }
  rectW = steps;
  rectW2 = steps*0.1;
  circleW = steps;
  circleW2 = steps*0.8;
  circleW3 = steps*0.6;
  circleW4 = steps*0.4;
  
}

class CrossRects {
  constructor(x,y,w){
    this.w = w;
    this.x = x;
    this.y = y;
    this.rectW = 0;
    this.circleW = 0;
    this.circleW2 = 0;
    this.circleW3 = 0;
    this.circleW4 = 0;
    this.colors1 = random(colors);
    this.colors2 = random(colors);
    this.colors3 = random(colors);
    this.colors4 = random(colors);
    this.colors5 = random(colors);
  }
  show() {

  push();
  translate(this.x,this.y);

  rectMode(CENTER);
  fill(255);
  rect(0,0,this.w);
  fill(0);
  rect(0,0,this.rectW,this.w);
  fill(0);
  rect(0,0,this.w,this.rectW);
  fill(255);
  rect(0,0,this.w,this.rectW2);
  fill(255);
  rect(0,0,this.rectW2,this.w);
  fill(this.colors2);
  ellipse(0,0,this.circleW);
  fill(this.colors3);
  ellipse(0,0,this.circleW2);
  fill(this.colors4);
  ellipse(0,0,this.circleW3);
  fill(this.colors5);
  ellipse(0,0,this.circleW4);
  pop();
  }

  update() {
     this.rectW = steps;
     this.circleW = steps;
     this.circleW2 = steps*0.8;
     this.circleW3 = steps*0.6;
     this.circleW4 = steps*0.4;
     this.rectW2 = steps*0.1;
  }
}