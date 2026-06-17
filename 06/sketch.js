let colors = ['#bced0925','#4c5b5c20','#2f52e021','#f9cb402e','#f940b52e']
let part =[];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

}

function mousePressed(){
  for(let i=0; i<30; i++){
    part.push(new Particle(mouseX, mouseY));
  }
}


function draw() {
  background(255,40);
  for(let i=0; i<part.length; i ++){
    let p=part[i];
    if(p.isDone()){
      part.splice(i,1);
    } else{
    p.show();
    p.update();
  }} 
 
}

class Particle {
  constructor(x,y){
this.x = x;
this.y = y;
this.dx = 0;
this.dy = 0;
this.d = random(70,100);
this.d2 = random(70,100);


  }
  show() {
    
    stroke('#DCFFF6');
    fill(random(colors));
    rect(this.x, this.y, this.d,this.d2);
  }
  update() {


  this.x+=this.dx;
  this.y+=this.dy;
  this.d*=random(0.987,0.999);
  
 
  this.dx += random(-0.5,0.5);
  this.dy += random(-0.5,0.5);


}
    isDone() {
    if (this.x>width||this.x<0||this.y>height||this.y<0){
      return true;
    } else {
      return false;
    }

  }
}