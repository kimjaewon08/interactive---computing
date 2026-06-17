let faceMesh;
let video;
let faces = [];
let letters = [];
let mouthRatio = 0;
let mouthX = 0;
let mouthY = 0;

let colors = ['#FFE033', '#F1FFF7', '#FFC0CB', '#7DE8C0', '#0cb6ff','#00FF66','#FF00C3','#B2FCFF','#8000AE'];

let lipsOut = [267,269,270,409,291,375,321,405,314,17,84,181,91,146,61,185,40,39,37,0];
let lipsIn  = [13,312,311,310,415,308,324,318,402,317,14,87,178,88,95,78,191,80,81,82];

let smallLips = [];

let scaleNow = 2.2;

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, refineLandmarks: false, flipHorizontal: true });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  faceMesh.detectStart(video, gotFaces);

  let cols = 5;
  let rows = 4;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let ox = map(i, 0, cols - 1, -0.45, 0.45);
      let oy = map(j, 0, rows - 1, -0.45, 0.45);
      if (abs(ox) < 0.22 && abs(oy) < 0.25) continue;
      smallLips.push({ ox, oy, s: 0.38 });
    }
  }
}

function gotFaces(results) {
  faces = results;
}

function drawLips(kps, box, lipsCx, lipsCy, cx, cy, sc, isOpen) {
  let s = (height / box.height) * sc;

  noStroke();

  if (isOpen) {
    fill(125, 232, 192);
  } else {
    fill(255);
  }
  beginShape();
  for (let i = 0; i < lipsOut.length; i++) {
    let p = kps[lipsOut[i]];
    let x = (p.x - lipsCx) * s + cx;
    let y = (p.y - lipsCy) * s + cy;
    vertex(x, y);
  }
  endShape(CLOSE);

  if (isOpen) {
    fill(255, 107, 0);
  } else {
    fill(0);
  }
  beginShape();
  for (let i = 0; i < lipsIn.length; i++) {
    let p = kps[lipsIn[i]];
    let x = (p.x - lipsCx) * s + cx;
    let y = (p.y - lipsCy) * s + cy;
    vertex(x, y);
  }
  endShape(CLOSE);
}

function draw() {
  if (mouthRatio > 0.18 && faces.length > 0) {
    background(255, 107, 0);
  } else {
    background(0);
  }

  let targetScale = 2.2;
  if (faces.length > 0 && mouthRatio > 0.18) {
    targetScale = map(mouthRatio, 0.18, 0.7, 2.2, 1.1, true);
  }

  if (mouthRatio > 0.18) {
    scaleNow = lerp(scaleNow, targetScale, 0.99);
  } else {
    scaleNow = lerp(scaleNow, targetScale, 0.05);
  }

  for (let face of faces) {
    let kps = face.keypoints;
    let box = face.box;

    let top = kps[13];
    let bot = kps[14];
    let left = kps[78];
    let right = kps[308];
    mouthRatio = dist(top.x, top.y, bot.x, bot.y) / dist(left.x, left.y, right.x, right.y);

    let lipsCx = (kps[0].x + kps[17].x + kps[78].x + kps[308].x) / 4;
    let lipsCy = (kps[0].y + kps[17].y + kps[13].y + kps[14].y) / 4;

    let scl = (height / box.height) * scaleNow;
    let topX = (kps[13].x - lipsCx) * scl + width / 2;
    let topY = (kps[13].y - lipsCy) * scl + height / 2;
    let botX = (kps[14].x - lipsCx) * scl + width / 2;
    let botY = (kps[14].y - lipsCy) * scl + height / 2;
    mouthX = (topX + botX) / 2;
    mouthY = (topY + botY) / 2;

    if (mouthRatio > 0.18) {
      let n = floor(map(mouthRatio, 0.18, 0.7, 2, 4, true));
      for (let i = 0; i < n; i++) {
        letters.push(new Letter(mouthX, mouthY, mouthRatio));
      }
    }

    let isOpen = mouthRatio > 0.18;

    drawLips(kps, box, lipsCx, lipsCy, width / 2, height / 2, scaleNow, isOpen);

    if (isOpen) {
      for (let sl of smallLips) {
        let cx = width / 2 + width * sl.ox;
        let cy = height / 2 + height * sl.oy;
        drawLips(kps, box, lipsCx, lipsCy, cx, cy, scaleNow * sl.s, true);
      }
    }
  }

  for (let i = letters.length - 1; i >= 0; i--) {
    letters[i].update();
    letters[i].draw();
    if (letters[i].life <= 0) {
      letters.splice(i, 1);
    }
  }

  if (letters.length > 350) {
    letters.splice(0, 80);
  }
}

class Letter {
  constructor(x, y, ratio) {
    this.x = x + random(-15, 15);
    this.y = y + random(-15, 15);

    let ang = random(TWO_PI);
    let spd = random(5, 16) * map(ratio, 0.18, 0.7, 0.8, 2.0, true);
    this.vx = cos(ang) * spd;
    this.vy = sin(ang) * spd;

    this.size = random(10, 100);
    this.life = 200;
    this.decay = map(this.size, 10, 110, 8, 2);
    this.col = random(colors);
    this.rot = random(TWO_PI);
    this.rotSpd = random(-0.1, 0.1);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.3;
    this.vx *= 0.984;
    this.life -= this.decay;
    this.rot += this.rotSpd;
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.rot);
    noStroke();
    textSize(this.size);
    textAlign(CENTER, CENTER);
    let c = color(this.col);
    c.setAlpha(this.life);
    fill(c);
    text('ㅋ', 0, 0);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}