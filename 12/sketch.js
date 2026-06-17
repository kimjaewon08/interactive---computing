let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/dl1ao0y2g/';
let video;
let flippedVideo;
let label = ""; 

const W = 900, H = 1000;
const CAM_W = 200, CAM_H = 150;

let player;
let items = [];
let score = 0;
let state = 'idle';
let hitTimer = 0;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(W, H);
  textFont('Courier New');
  noStroke();

  video = createCapture(VIDEO);
  video.size(CAM_W, CAM_H);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  classifyVideo();
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  label = results[0].label;
  classifyVideo(); 
}

function initGame() {
  score = 0;
  hitTimer = 0;
  items = [];
  player = { x: W / 2, y: H - 150, r: 45, speed: 5 };
}

function addItem() {
  let x = random(40, W - 40);
  let type = random() < 0.6 ? 'spike' : 'good'; // 60% 확률로 뾰족이(폭탄) 생성
  let size = random(20, 40);
  items.push({ x, y: CAM_H + 10, r: size, type, speed: random(2.5, 6), angle: 0 });
}

function draw() {
  background(17);

  if (flippedVideo) image(flippedVideo, 0, 0, CAM_W, CAM_H);
  noFill(); stroke(80); strokeWeight(1);
  rect(0, 0, CAM_W, CAM_H);
  noStroke();

  fill(200);
  textSize(14); textAlign(LEFT, TOP);
  text('동작: ' + label, CAM_W + 10, 10);

  if (state === 'idle') { drawStart(); return; }
  if (state === 'over') { drawOver(); return; }

  // label 값에 따라 플레이어(파란 동그라미) 좌우 이동
  if (label === '왼쪽') player.x -= player.speed;
  if (label === '오른쪽') player.x += player.speed;
  player.x = constrain(player.x, player.r, W - player.r);

  if (frameCount % 30 === 0) addItem();

  for (let it of items) {
    it.y += it.speed;
    it.angle += 0.05;
  }

  if (hitTimer > 0) hitTimer--;

  items = items.filter(it => {
    if (it.y > H + 20) return false;

    let d = dist(player.x, player.y, it.x, it.y);
    if (d < player.r + it.r - 6) { // 플레이어랑 거리 계산해서 충돌 체크
      if (it.type === 'spike') {
        hitTimer = 30;
        state = 'over';
        return false;
      } else {
        score += 10;
        return false;
      }
    }
    return true;
  });

  drawPlayer();
  items.forEach(drawItem);
  drawHUD();
}

function drawPlayer() {
  if (hitTimer > 0) fill('#e74c3c');
  else fill('#3498db');
  circle(player.x, player.y, player.r * 2);


  fill(0);
  circle(player.x - player.r * 0.28, player.y - player.r * 0.15, player.r * 0.3);
  circle(player.x + player.r * 0.28, player.y - player.r * 0.15, player.r * 0.3);

  fill(255);
  circle(player.x - player.r * 0.22, player.y - player.r * 0.22, player.r * 0.1);
  circle(player.x + player.r * 0.35, player.y - player.r * 0.22, player.r * 0.1);
}

function drawItem(it) {
  push();
  translate(it.x, it.y);
  rotate(it.angle);
  if (it.type === 'spike') {
    fill('#e74c3c');
    drawSpike(it.r * 0.5, it.r, 8);
  } else {
    fill('#c8860a');
    circle(0, 0, it.r * 2);
    fill('#ffec7e');
    circle(0, 0, it.r * 1.6);
  }
  pop();
}

function drawSpike(r1, r2, n) {
  beginShape();
  for (let i = 0; i < n * 2; i++) {
    let angle = (PI / n) * i - PI / 2;
    let r = i % 2 === 0 ? r2 : r1;
    vertex(cos(angle) * r, sin(angle) * r); // 빙글빙글 돌면서 내려오게
  }
  endShape(CLOSE);
}

function drawHUD() {
  fill('#FFD700');
  textSize(24); textAlign(LEFT, TOP);
  text('SCORE: ' + score, 10, CAM_H + 10);
}

function drawStart() {
  fill(0, 0, 0, 180);
  rect(0, CAM_H, W, H - CAM_H);
  fill('#FFD700'); textSize(36); textAlign(CENTER, CENTER);
  text('DODGE BALL', W/2, H/2 - 60);
  fill(200); textSize(18);
  text('왼손 손바닥을 카메라에 보여주세요', W/2, H/2 - 10);
  text('손을 왼쪽 오른쪽으로 기울여 이동', W/2, H/2 + 30);
  fill('#e74c3c'); textSize(16);
  text('뾰족폭탄에 닿으면 바로 게임오버!', W/2, H/2 + 70);
  fill('#FFD700'); textSize(18);
  text('클릭으로 시작', W/2, H/2 + 120);
}

function drawOver() {
  fill(0, 0, 0, 180);
  rect(0, CAM_H, W, H - CAM_H);
  fill('#e74c3c'); textSize(42); textAlign(CENTER, CENTER);
  text('GAME OVER', W/2, H/2);
  fill('#FFD700'); textSize(24);
  text('SCORE: ' + score, W/2, H/2 + 60);
  fill(180); textSize(18);
  text('클릭으로 재시작', W/2, H/2 + 110);
}

function mousePressed() {
  if (state === 'idle' || state === 'over') {
    initGame();
    state = 'playing';
  }
}