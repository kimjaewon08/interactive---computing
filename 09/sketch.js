let bigChars = [];
let smallChars = [];
 
function setup() {
	createCanvas(windowWidth, windowHeight);
	textAlign(CENTER, CENTER);
}
 
function draw() {
	background(0,80);
 
	for (let i = bigChars.length - 1; i >= 0; i--) {
		bigChars[i].update();
		bigChars[i].display();
		if (bigChars[i].shouldSplit()) {
			bigChars[i].split();
		}
		if (bigChars[i].isDone()) bigChars.splice(i, 1);
	}
 
	for (let i = smallChars.length - 1; i >= 0; i--) {
		smallChars[i].update();
		smallChars[i].display();
		if (smallChars[i].isDone()) smallChars.splice(i, 1);
	}
}
 
function keyPressed() {
	bigChars.push(new BigChar(width / 2, height / 2, key));
}
 
 
class BigChar {
	constructor(_x, _y, _c) {
		this.x = _x;
		this.y = _y;
		this.ch = _c;
		this.timer = 0;
		this.splitTime = 45;
		this.startShrink = 12;
		this.hasSplit = false;
		this.alpha = 255;
		this.maxSize = 350;
		this.size = this.maxSize;
		this.angle = 0;
	}
 
	update() {
		this.timer++;
		
		if (this.timer > this.startShrink && !this.hasSplit) {
			this.size = map(this.timer, this.startShrink, this.splitTime, this.maxSize, 10);
			let spinSpeed = map(this.timer, this.startShrink, this.splitTime, 2, 30);
			this.angle += spinSpeed;
		}
		
		if (this.hasSplit) {
			this.alpha -= 60;
		}
	}
 
	display() {
		
		let shakeAmt = 0;
		if (this.timer > this.startShrink && !this.hasSplit) {
			shakeAmt = map(this.timer, this.startShrink, this.splitTime, 0, 7);
		}
		let shakeX = random(-shakeAmt, shakeAmt);
		let shakeY = random(-shakeAmt, shakeAmt);
 
		push();
		translate(this.x + shakeX, this.y + shakeY);
		rotate(radians(this.angle));
		noStroke();
		fill(255, this.alpha);
		textSize(this.size);
		text(this.ch, 0, 0);
		pop();
	}
 
	shouldSplit() {
		return this.timer === this.splitTime && !this.hasSplit;
	}
 
	split() {
		this.hasSplit = true;
		
		for (let i = 0; i < 45; i++) {
			smallChars.push(new SmallChar(this.x, this.y, this.ch));
		}
	}
 
	isDone() {
		return this.alpha <= 0;
	}
}
 
 
class SmallChar {
	constructor(_x, _y, _c) {
		this.x = _x;
		this.y = _y;
		this.ch = _c;
		this.vx = random(-22, 22);
		this.vy = random(-22, 22);
		this.g = 0.2;
		this.angle = random(360);
		this.spin = random(-15, 15);
		this.life = 255;
		this.size = random(10, 65);
	}
 
	update() {
		this.vy += this.g;
		this.x += this.vx;
		this.y += this.vy;
		this.angle += this.spin;
		this.vx *= 0.97;
		this.vy *= 0.97;
		this.life -= 3;
	}
 
	display() {
		push();
		translate(this.x, this.y);
		rotate(radians(this.angle));
		noStroke();
		fill(255, 0, 153, this.life);
		textSize(this.size);
		text(this.ch, 0, 0);
		pop();
	}
 
	isDone() {
		
		if (this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50) {
			return true;
		}
		return this.life <= 0;
	}
}
 