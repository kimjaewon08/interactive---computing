let pool;
let tube1, tube2, tube3, tube4, tube5, tube6;

let flapWidth = 10;
let range = 400;

let flaps = [];
let tubes = [];

let randomTube = [];
let currentTube;

let cols, rows;

function preload() {
  pool = loadImage('background.jpg');

  tube1 = loadImage('tube1.png');
  tube2 = loadImage('tube2.png');
  tube3 = loadImage('tube3.png');
  tube4 = loadImage('tube4.png');
  tube5 = loadImage('tube5.png');
  tube6 = loadImage('tube6.png');
 
  
}

function setup() {
  createCanvas(1000, 1000);
  imageMode(CENTER);
  noFill();

  randomTube = [tube1, tube2, tube3, tube4, tube5, tube6];
  currentTube = randomTube[floor(random(randomTube.length))];

  cols = ceil(width / flapWidth);
  rows = ceil(height / flapWidth);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let x = i * flapWidth * 1.2;
      let y = j * flapWidth * 1.2;

      flaps.push(new Flap(x, y));
    }
  }
}

function draw() {
  background(0);

  
  for (let flap of flaps) {
    flap.update();
    flap.show();
  }

 
  for (let t of tubes) {

    let dx = mouseX - t.x;
    let dy = mouseY - t.y;

    t.x += dx * 0.002;
    t.y += dy * 0.002;

    image(t.img, t.x, t.y, 120, 120);
  }

  
  image(currentTube, mouseX, mouseY, 120, 120);
}

function mousePressed() {

  tubes.push({
    x: mouseX,
    y: mouseY,
    img: currentTube
  });

  currentTube =
    randomTube[floor(random(randomTube.length))];
}

class Flap {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rad = 0;

    let ix = map(this.x, 0, width, 0, pool.width);
    let iy = map(this.y, 0, height, 0, pool.height);

    this.c = pool.get(ix, iy);
  }

  show() {
    stroke(this.c);
    strokeWeight(5);

    push();
    translate(this.x, this.y);
    rotate(this.rad);
    let len = map(this.rad,0,PI,2,flapWidth*1.2);
    line(0,0,len,len);
    pop();
  }

  update() {
    let distance = dist(mouseX, mouseY, this.x, this.y);

    this.rad = map(distance, 0, range, 0, PI*1.2);
  }
}