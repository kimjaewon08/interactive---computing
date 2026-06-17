function setup() {
  createCanvas(1200,1200);
}

function draw() {
  background(255);
  noStroke();
  ellipseMode(CENTER);
  fill(0);
  rect(600,0,600,600);
  fill('#FF1E87aa');
  rect(0,0,600,600);
  fill('#BCCCD1');
  rect(0,600,600,600);
  
 
 
  fill('#FFEC59');
  arc(600,600,282,282,PI,PI+PI/2);
  ellipseMode(CENTER);
  noFill();
  stroke('#FFA30F');
  strokeWeight(10);
  strokeCap(SQUARE);
  arc(600,600,360,360,PI,PI+PI/2);

  ellipseMode(CORNER);
  noStroke();
  fill('#FFA584BB');
  ellipse(437,87,163,163);
  fill('#FFBB33BB');
  ellipse(407,25,103,103);
  fill('#FFA05CBB');
  ellipse(342,110,55,55);
  fill('#FFFF54BB');
  ellipse(524,272,62,62);
  fill('#FF6B0FBB');
  ellipse(173,379,105);
  fill('#FFE372BB');
  ellipse(53,484,76,76);
  fill('#FFEC59BB');
  ellipse(248,421,53,53);
  fill('#FFF673BB');
  ellipse(215,539,28,28);

  fill('#FAFF98bb');
  beginShape();
  vertex(0,346.33);
  bezierVertex(35.33,328.99,130,299.53,234,320.33);
  bezierVertex(338,341.13,407,447.33,428.5,497.83);
  bezierVertex(432.33,477.66,417.6,413.93,328,320.33);
  bezierVertex(238.4,226.73,72.67,240.99,0,259.83);
  bezierVertex(0,346.33);
  bezierVertex(234,320.33);
  endShape(CLOSE);

   fill('#FAFF98bb');
  beginShape();
  vertex(507.75,417.07);
  bezierVertex(485.25,324.58,491.78,304.13,496.58,291.09);
  bezierVertex(513.88,244.06,529.43,266.33,546.18,247.25);
  bezierVertex(548.29,244.84,550.1,229.29,523.92,224.79);
  bezierVertex(503.76,222.78,487.24,238.47,479.02,255.1);
  bezierVertex(453.98,305.75,479.63,353,490.23,384.13);
  bezierVertex(498.71,409.03,503.93,412.67,507.75,417.07);
  endShape(CLOSE);









fill('#74EAFF');
  beginShape();
  vertex(623,377);
  vertex(672,366.5);
  vertex(836,523.5);
  vertex(838.5,600);
  vertex(813.5,600);
  vertex(789,600);
  vertex(796.5,566.5);
  vertex(789,523.5);
  vertex(751.5,461);
  vertex(695.5,426);
  vertex(660,412.5);
  vertex(623,426);
  endShape(CLOSE);

  fill('#E03C3C');
  beginShape();
  vertex(633,334);
  vertex(668,334);
  vertex(648.5,54.5);
  endShape(CLOSE);

  fill('#A32F2F');
  beginShape();
  vertex(668,329.5);
  vertex(689.5,0);
  vertex(711,0);
  endShape(CLOSE);

  fill('#6C0000');
  beginShape();
  vertex(756.5,391.5);
  vertex(695.5,324.5);
  vertex(751,0);
  vertex(815,0);
  endShape(CLOSE);

    fill('#E03C3C');
  beginShape();
  vertex(755.5,383);
  vertex(824.5,383);
  vertex(855.5,472.5);
  vertex(937.5,472.5);
  vertex(891,543);
  vertex(891,580);
  vertex(1187.5,556.5);
  vertex(855.5,599.5);
  vertex(855.5,562.5);
  vertex(855.5,525.5);
  vertex(793,441.5);
  endShape(CLOSE);

  fill('#CD0000');
  beginShape();
  vertex(600,600);
  vertex(632.5,444.5);
  vertex(639,522.5);
  vertex(718.5,453);
  vertex(699,522.5);
  vertex(735.5,507);
  vertex(729,556);
  vertex(785,572.5);
  vertex(779.5,600);
  endShape(CLOSE);

  fill('#0CCEFF');
  beginShape();
  vertex(772,372.45);
  vertex(788.93,374.01);
  vertex(920,0);
  vertex(931,0);
  endShape(CLOSE);

  fill('#671CFF');
  beginShape();
  vertex(862.5,423);
  vertex(862.5,460);
  vertex(1166,148.5);
  endShape(CLOSE);

  fill('#4BFFC9');
  beginShape();
  vertex(917.5,535.5);
  vertex(917.5,566.5);
  vertex(1200,425);
  vertex(1200,360);
  endShape(CLOSE);

  fill('#65878F');
  rect(265,623,12,84);
  fill('#5B7D90');
  rect(290,654,20,241);
  fill('#8A7268AA');
  rect(226,790,43,56);
  fill('#89B2B8');
  rect(359,787,21,322);
  fill('#76A0CF');
  rect(323,887,23,121);
  fill('#74797E');
  rect(199,878,49,101);

  fill('#B3BBBEaa');
  rect(0,900,600,134);
  fill('#A1B4C0aa');
  rect(0,948,600,105);
  fill('#7B959Daa');
  rect(0,997,600,143);
  fill('#45555Daa');
  rect(0,1058,600,142);
  fill('#3F535Caa');
  rect(0,1094,600,106);
  fill('#5D6F7A');
  rect(54,629,44,161);
  fill('#69707A');
  rect(464,767,9,136);
  fill('#9D9EA4');
  rect(463,617,10,69);
  fill('#9FA1AB');
  rect(490,625,22,97);
  fill('#ACA9A9');
  rect(524,626,16,152);
  fill('#ADABB1');
  rect(558,625,41,221);

  let gradiant1 = drawingContext.createRadialGradient(600, 600,0,600,600,600);
  gradiant1.addColorStop(0, '#5F0000');
  gradiant1.addColorStop(1, '#1C0202');
  drawingContext.fillStyle = gradiant1;
  rect(600,600,600,600);


  ellipseMode(CENTER);
  fill('#7F0000');
  arc(600,600,704,704,0,PI/2);
  fill('#490000')
  arc(600,600,270,270,0,PI/2);

  ellipseMode(CORNER);
  fill('#E1DEDE');
  ellipse(994,1020,101);
  fill('#F6F6F6CC');
  ellipse(1010,1030,86);
  fill('#484646aa');
  ellipse(968,994,135);
  fill('#471111aa');
  ellipse(980,1001,123);
  fill(250);
  ellipse(1028,1058,61);





}

