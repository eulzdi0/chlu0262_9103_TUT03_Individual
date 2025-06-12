// sketch.js

// —— 原有数据与常量 —— 
let circles = [
  [54, 48], [172, 25], [292, 3], [28, 160],
  [140, 136], [254, 110], [378, 80],
  [-8, 268], [108, 248], [224, 220],
  [340, 192], [64, 356], [184, 340],
  [304, 308], [420, 284], [260, 428],
  [380, 400]
];
const RADIUS = 54;   // 所有圆的基准半径
const baseSize = 400;

// 对应 circles 中每个位置要调用的绘制函数
const drawFns = [
  drawSunMoon, drawSunMoon,
  drawEgg,     drawEgg,
  drawGreenCircle, drawGreenCircle,
  drawBlueCircle,  drawBlueCircle,
  drawConcentricCircles, drawConcentricCircles,
  drawFlawerCircles,    drawFlawerCircles,
  drawSectorCircles,    drawSectorCircles,
  drawBlackCircles,     drawBlackCircles,
  drawRedCircle
];

// —— 倒计时逻辑 —— 
let countdown = 3;
let lastSecChange = 0;
const countdownInterval = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(120);
  fill(255);
  lastSecChange = millis();
}

function draw() {
  background(0);

  if (countdown > 0) {
    // 倒计时阶段
    if (millis() - lastSecChange >= countdownInterval) {
      countdown--;
      lastSecChange = millis();
    }
    text(countdown, width/2, height/2);

  } else {
    // 动画阶段：让 circles 中所有 x 坐标向右移动 1px，超出 baseSize 回到 0
    for (let pt of circles) {
      pt[0] = (pt[0] + 1) % baseSize;
    }
    drawMainScene();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// —— 主场景渲染 —— 
function drawMainScene() {
  background(255);

  const s = min(width/baseSize, height/baseSize);
  push();
    translate((width - baseSize*s)/2, (height - baseSize*s)/2);
    scale(s);

    // 裁剪到 400×400 区域
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(0,0,baseSize,baseSize);
    drawingContext.clip();

    // 分割背景
    noStroke();
    fill(255);
    triangle(0,0,baseSize,0,0,baseSize);
    fill(0);
    triangle(baseSize,baseSize,baseSize,0,0,baseSize);

    // 白色底圆
    noStroke();
    fill(255);
    for (let [x,y] of circles) {
      ellipse(x,y,RADIUS*2,RADIUS*2);
    }

    // 按顺序绘制所有图案
    for (let i = 0; i < circles.length; i++) {
      let [x,y] = circles[i];
      drawFns[i](x,y);
    }

    drawingContext.restore();
  pop();
}


// —— 各种 drawXXX 函数 —— 

function drawSunMoon(cx, cy) {
  const orange = color(241,168,128),
        dO     = color(236,120,46),
        w      = color(255);
  strokeWeight(5);
  stroke(orange);
  noFill();
  ellipse(cx,cy,RADIUS*2);

  noStroke();
  fill(orange);
  arc(cx,cy,RADIUS*2,RADIUS*2, PI/2,3*PI/2);

  fill(w);
  ellipse(cx,cy,40);

  fill(dO);
  arc(cx,cy,40,40, -PI/2,PI/2);
  drawStar(cx+7,cy,6,4);

  const total=10, step=PI/total;
  strokeWeight(3);
  stroke(dO);
  for(let i=0;i<total;i++){
    let a=-PI/2+i*step;
    line(cx+cos(a)*RADIUS*0.9, cy+sin(a)*RADIUS*0.9,
         cx+cos(a)*RADIUS*0.6, cy+sin(a)*RADIUS*0.6);
  }
  stroke(w);
  for(let i=0;i<total;i++){
    let a=PI/2+i*step;
    line(cx+cos(a)*RADIUS*0.9, cy+sin(a)*RADIUS*0.9,
         cx+cos(a)*RADIUS*0.6, cy+sin(a)*RADIUS*0.6);
  }
}

function drawStar(x,y,rO,rI){
  fill(255);
  noStroke();
  beginShape();
  let ang=-PI/2, st=TWO_PI/5;
  for(let i=0;i<5;i++){
    vertex(x+cos(ang)*rO, y+sin(ang)*rO);
    ang+=st/2;
    vertex(x+cos(ang)*rI, y+sin(ang)*rI);
    ang+=st/2;
  }
  endShape(CLOSE);
}

function drawEgg(cx,cy){
  const c1=color(255,214,160), c2=color(254,181,81),
        c3=color(255),    d=color(235,167,85),
        hg=color(189,213,131);
  strokeWeight(10);
  stroke(c1);
  noFill();
  ellipse(cx,cy,RADIUS*2-10);

  noStroke();
  fill(c2); ellipse(cx,cy,50);
  fill(c3); ellipse(cx,cy,20);

  strokeWeight(2);
  stroke(d);
  noFill();
  ellipse(cx,cy,RADIUS*2);

  noStroke();
  fill(hg);
  for(let i=0;i<8;i++){
    let a=i*TWO_PI/8-PI/2;
    drawHeart(
      cx+cos(a)*(RADIUS-15),
      cy+sin(a)*(RADIUS-15),
      15, hg
    );
  }
}

function drawHeart(x,y,size,c){
  fill(c);
  noStroke();
  let r=size*0.47, o=size*0.35;
  ellipse(x-o*0.5,y-o*0.5,r);
  ellipse(x+o*0.5,y-o*0.5,r);
  beginShape();
    vertex(x-r*0.5,y);
    vertex(x+r*0.5,y);
    vertex(x,y+o*0.5);
  endShape(CLOSE);
}

function drawGreenCircle(cx,cy){
  const g=color(166,198,124), pg=color(187,214,161),
        rd=color(227,170,155), yl=color(239,199,120);
  strokeWeight(3); stroke(g); noFill();
  ellipse(cx,cy,RADIUS*2-3);
  strokeWeight(6); stroke(g);
  ellipse(cx,cy,RADIUS*2-20);
  strokeWeight(3); stroke(rd);
  ellipse(cx,cy,RADIUS*2-35);
  stroke(yl);
  ellipse(cx,cy,RADIUS*2-49);

  noStroke();
  fill(pg);
  ellipse(cx,cy,40);

  fill(255);
  for(let i=0;i<40;i++){
    let a=random(TWO_PI), rr=sqrt(random())*10;
    ellipse(cx+cos(a)*rr, cy+sin(a)*rr, 2);
  }
}

function drawBlueCircle(cx,cy){
  const lb=color(163,202,217), lr=color(235,190,181),
        ly=color(234,205,155);
  strokeWeight(5); stroke(lb); noFill();
  ellipse(cx,cy,RADIUS*2-5);
  stroke(lr); ellipse(cx,cy,RADIUS*2-27);
  stroke(ly); ellipse(cx,cy,RADIUS*2-50);

  noStroke();
  fill(lr);
  let rR=(RADIUS*2-27)/2, rY=(RADIUS*2-50)/2, m=(rR+rY)/2;
  for(let i=0;i<16;i++){
    let a=-PI/2+i*TWO_PI/16;
    let bx=cx+cos(a)*m, by=cy+sin(a)*m;
    let tx=-sin(a), ty=cos(a);
    ellipse(bx+tx*1.5,by+ty*1.5,3);
    ellipse(bx-tx*1.5,by-ty*1.5,3);
  }

  noStroke();
  fill(lb);
  ellipse(cx,cy,40);
}

function drawConcentricCircles(cx,cy){
  const num=36;
  let wts=Array(num).fill(1),
      tot=wts.reduce((a,b)=>a+b,0),
      angs=wts.map(w=>w/tot*TWO_PI);
  const pal=[[138,54,15],[99,81,71],[204,183,102],[227,0,34],
             [227,38,54],[0,49,83],[0,105,70],[64,130,109],
             [41,36,33],[255,255,255]];
  noStroke();
  let cur=0;
  for(let i=0;i<num;i++){
    let [r,g,b]=pal[i%pal.length];
    fill(r,g,b);
    arc(cx,cy,RADIUS*2,RADIUS*2,cur,cur+angs[i],PIE);
    cur+=angs[i];
  }
  noStroke();
  fill(150,30,30); ellipse(cx,cy,80);
  fill(200,100,0);  ellipse(cx,cy,65);
  fill(80,0,80);    ellipse(cx,cy,50);
  fill(0,60,30);    ellipse(cx,cy,35);
  fill(25,25,112);  ellipse(cx,cy,20);
  noFill();
  stroke(30,55,120); strokeWeight(2);
  ellipse(cx,cy,RADIUS*2+2);
  colorMode(RGB,255);
}

function drawFlawerCircles(cx,cy){
  const slices=20, step=TWO_PI/slices;
  const pal=[[205,92,0],[87,1,79],[34,34,59],[184,134,11],
             [255,65,108],[227,0,34],[152,255,152],
             [147,112,219],[25,25,112]];
  noStroke();
  for(let i=0;i<slices;i++){
    let [r,g,b]=pal[i%pal.length];
    fill(r,g,b);
    arc(cx,cy,RADIUS*2,RADIUS*2,i*step,(i+1)*step,PIE);
  }
  const petals=14, pStep=TWO_PI/petals, off=RADIUS*1.2/2;
  noStroke();
  for(let i=0;i<petals;i++){
    let [r,g,b]=pal[i%pal.length];
    fill(r,g,b);
    let a=i*pStep-PI/2;
    push(); translate(cx,cy); rotate(a);
      ellipse(off,0,RADIUS*1.2,12);
    pop();
  }
  noStroke();
  fill(255,165,0);
  ellipse(cx,cy,RADIUS*0.6);
}

function drawSectorCircles(cx,cy){
  const pal=[[138,54,15],[99,81,71],[204,183,102],[227,0,34],
             [227,38,54],[0,49,83],[0,105,70],[64,130,109],
             [41,36,33],[255,255,255]];
  const outer=40, oStep=TWO_PI/outer;
  noStroke();
  for(let i=0;i<outer;i++){
    let [r,g,b]=pal[i%pal.length];
    fill(r,g,b);
    arc(cx,cy,RADIUS*2,RADIUS*2,i*oStep,(i+1)*oStep,PIE);
  }
  noStroke();
  fill(0); ellipse(cx,cy,RADIUS*2-20);
  const inner=30, iStep=TWO_PI/inner;
  noStroke();
  for(let i=0;i<inner;i++){
    let [r,g,b]=pal[(i+3)%pal.length];
    fill(r,g,b);
    arc(cx,cy,RADIUS*2-30,RADIUS*2-30,i*iStep,(i+1)*iStep,PIE);
  }
  noStroke();
  let [r,g,b]=pal[2];
  fill(r,g,b);
  ellipse(cx,cy,20);
}

function drawBlackCircles(cx,cy){
  const pal=[[138,54,15],[99,81,71],[204,183,102],[227,0,34],
             [227,38,54],[0,49,83],[0,105,70],[64,130,109],
             [41,36,33],[255,255,255]];
  noStroke();
  fill(148,0,211); ellipse(cx,cy,110);
  fill(0,102,204); ellipse(cx,cy,100);
  fill(0);          ellipse(cx,cy,90);
  stroke(...pal[9]); strokeWeight(2);
  for(let i=0;i<100;i++){
    let a=i*TWO_PI/100;
    line(cx+cos(a)*30,cy+sin(a)*30,
         cx+cos(a)*45,cy+sin(a)*45);
  }
  noStroke();
  const three=[[255,192,203],[221,160,221],[255,255,204]];
  for(let i=0;i<3;i++){
    fill(...three[i]);
    arc(cx,cy,60,60,i*PI*2/3,(i+1)*PI*2/3,PIE);
  }
  noStroke();
  fill(255); ellipse(cx,cy,30);
  fill(0,102,204); ellipse(cx,cy,20);
}

function drawRedCircle(cx,cy){
  noFill();
  stroke(150,30,30); strokeWeight(12); ellipse(cx,cy,100);
  stroke(200,100,0); strokeWeight(10); ellipse(cx,cy,80);
  stroke(80,0,80);   strokeWeight(8);  ellipse(cx,cy,60);
  stroke(0,60,30);   strokeWeight(6);  ellipse(cx,cy,40);
  stroke(25,25,112); strokeWeight(4);  ellipse(cx,cy,20);
  noStroke();
}
