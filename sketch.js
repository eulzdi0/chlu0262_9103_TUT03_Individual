// sketch.js — Chen’s sketch with clipping to square region

// Normalized positions based on a 400×400 reference
const positions = {
  sun1: { x: 254/400, y: 110/400 }, sun2: { x: 54/400, y: 48/400 },
  egg1:{ x: 140/400, y:136/400 }, egg2:{ x:-8/400, y:268/400 },
  green1:{x:108/400, y:248/400}, green2:{x:292/400, y:3/400},
  blue1:{ x:28/400, y:160/400 }, blue2:{ x:172/400, y:25/400 },
  conc1:{ x:340/400, y:192/400 }, conc2:{ x:184/400, y:340/400 },
  flow1:{ x:64/400,  y:356/400 }, flow2:{ x:304/400, y:308/400 },
  sect1:{ x:224/400, y:220/400 }, sect2:{ x:420/400, y:284/400 },
  black1:{x:378/400, y:80/400}, black2:{x:260/400, y:428/400}, red:{x:380/400,y:400/400}
};
const RADIUS_RATIO = 54 / 400;
let side, offsetX, offsetY, dr;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  calculateCanvas();
}

function draw() {
  background(255);

  // Clip drawing to the centered square region
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(offsetX, offsetY, side, side);
  drawingContext.clip();

  // Two-tone background in square
  fill(255);
  triangle(offsetX, offsetY, offsetX+side, offsetY, offsetX, offsetY+side);
  fill(0);
  triangle(offsetX+side, offsetY+side, offsetX+side, offsetY, offsetX, offsetY+side);

  // Draw all elements
  drawSunMoon( positions.sun1 );
  drawSunMoon( positions.sun2 );
  drawEgg(     positions.egg1 );
  drawEgg(     positions.egg2 );
  drawGreenCircle( positions.green1 );
  drawGreenCircle( positions.green2 );
  drawBlueCircle(  positions.blue1 );
  drawBlueCircle(  positions.blue2 );
  drawConcentricCircles( positions.conc1 );
  drawConcentricCircles( positions.conc2 );
  drawFlawerCircles(    positions.flow1 );
  drawFlawerCircles(    positions.flow2 );
  drawSectorCircles(    positions.sect1 );
  drawSectorCircles(    positions.sect2 );
  drawBlackCircles(     positions.black1 );
  drawBlackCircles(     positions.black2 );
  drawRedCircle(        positions.red    );

  drawingContext.restore();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateCanvas();
  redraw();
}

function calculateCanvas() {
  side    = min(windowWidth, windowHeight);
  offsetX = (windowWidth  - side) / 2;
  offsetY = (windowHeight - side) / 2;
  dr      = side * RADIUS_RATIO;
}

function toCanvas(p) {
  return { x: offsetX + p.x*side, y: offsetY + p.y*side };
}

// ... (all drawHelper functions unchanged, as in previous version) ...



function drawStar(cx, cy, rOut, rIn) {
  fill(255); noStroke();
  beginShape();
  let ang = -PI/2;
  const step = TWO_PI/5;
  for (let i=0; i<5; i++) {
    vertex(cx + cos(ang)*rOut, cy + sin(ang)*rOut);
    ang += step/2;
    vertex(cx + cos(ang)*rIn, cy + sin(ang)*rIn);
    ang += step/2;
  }
  endShape(CLOSE);
}

function drawHeart(x, y, size) {
  noStroke(); fill(color(189,213,131));
  const r = size*0.47;
  const off = size*0.35;
  ellipse(x - off*0.5, y - off*0.5, r, r);
  ellipse(x + off*0.5, y - off*0.5, r, r);
  beginShape();
  vertex(x - r*0.5, y);
  vertex(x + r*0.5, y);
  vertex(x, y + off*0.5);
  endShape(CLOSE);
}

function drawSunMoon(norm) {
  const {x: cx, y: cy} = toCanvas(norm);
  const orange = color(241,168,128), darkO = color(236,120,46);
  const strokeW = (5/400)*side;
  // outer circle
  strokeWeight(strokeW); stroke(orange); noFill();
  ellipse(cx, cy, dr*2, dr*2);
  // filled half
  noStroke(); fill(orange);
  arc(cx, cy, dr*2, dr*2, PI/2, 3*PI/2);
  fill(255); ellipse(cx, cy, (40/400)*side, (40/400)*side);
  fill(darkO); arc(cx, cy, (40/400)*side, (40/400)*side, -PI/2, PI/2);
  // star
  drawStar(cx, cy, (6/400)*side, (4/400)*side);
  // radiating lines
  stroke(orange); strokeWeight((2/400)*side);
  for (let i=0; i<10; i++) {
    const a = -PI/2 + i*(PI/5);
    line(cx + cos(a)*(dr+4/400*side), cy + sin(a)*(dr+4/400*side),
         cx + cos(a)*(dr+20/400*side), cy + sin(a)*(dr+20/400*side));
  }
}

function drawEgg(norm) {
  const {x: cx, y: cy} = toCanvas(norm);
  // colors
  const Egg = color(255,214,160), Egg2=color(254,181,81), Egg3=color(255), dark=color(235,167,85);
  // outer ring
  strokeWeight((10/400)*side); stroke(Egg); noFill();
  ellipse(cx, cy, dr*2 - (10/400)*side, dr*2 - (10/400)*side);
  // inner solid circles
  noStroke(); fill(Egg2);
  ellipse(cx, cy, (50/400)*side, (50/400)*side);
  fill(Egg3); ellipse(cx, cy, (20/400)*side, (20/400)*side);
  // dark stroke around center circle
  strokeWeight((2/400)*side); stroke(dark); noFill();
  ellipse(cx, cy, dr*2, dr*2);
  // hearts
  const heartCount = 8;
  const ringR = dr - (15/400)*side;
  const size = (15/400)*side;
  noStroke(); fill(color(189,213,131));
  for (let i=0; i<heartCount; i++) {
    const a = -PI/2 + i*(TWO_PI/heartCount);
    const hx = cx + cos(a)*ringR;
    const hy = cy + sin(a)*ringR;
    drawHeart(hx, hy, size);
  }
}

function drawGreenCircle(norm) {
  const {x: cx, y: cy} = toCanvas(norm);
  const green = color(166,198,124), pale = color(187,214,161), red=color(227,170,155), yellow=color(239,199,120);
  noFill();
  strokeWeight((3/400)*side); stroke(green);
  ellipse(cx, cy, dr*2 - (3/400)*side, dr*2 - (3/400)*side);
  strokeWeight((6/400)*side); stroke(green);
  ellipse(cx, cy, dr*2 - (20/400)*side, dr*2 - (20/400)*side);
  strokeWeight((3/400)*side); stroke(red);
  ellipse(cx, cy, dr*2 - (35/400)*side, dr*2 - (35/400)*side);
  stroke(color(yellow));
  ellipse(cx, cy, dr*2 - (49/400)*side, dr*2 - (49/400)*side);
  noStroke(); fill(pale);
  ellipse(cx, cy, (40/400)*side, (40/400)*side);
  // dots
  fill(255);
  const dotCount = 40, maxR=(10/400)*side;
  for (let i=0; i<dotCount; i++) {
    const a = random(TWO_PI);
    const r = sqrt(random())*maxR;
    ellipse(cx + cos(a)*r, cy + sin(a)*r, (2/400)*side, (2/400)*side);
  }
}

function drawBlueCircle(norm) {
  const {x: cx, y: cy} = toCanvas(norm);
  const lightBlue = color(163,202,217), lightRed = color(235,190,181), lightY = color(234,205,155);
  noFill();
  strokeWeight((5/400)*side); stroke(lightBlue);
  ellipse(cx, cy, dr*2 - (5/400)*side, dr*2 - (5/400)*side);
  stroke(lightRed);
  ellipse(cx, cy, dr*2 - (27/400)*side, dr*2 - (27/400)*side);
  stroke(lightY);
  ellipse(cx, cy, dr*2 - (50/400)*side, dr*2 - (50/400)*side);
  // white band circles
  const radiusRed = (dr*2 - (27/400)*side)/2;
  const radiusYellow = (dr*2 - (50/400)*side)/2;
  const mid = (radiusRed + radiusYellow)/2;
  const smallR=(1.5/400)*side;
  noStroke(); fill(lightRed);
  for (let i=0; i<16; i++) {
    const a=-PI/2 + i*(TWO_PI/16);
    const bx=cx+cos(a)*mid, by=cy+sin(a)*mid;
    const tx=-sin(a), ty=cos(a);
    ellipse(bx+tx*smallR, by+ty*smallR, smallR*2, smallR*2);
    ellipse(bx-tx*smallR, by-ty*smallR, smallR*2, smallR*2);
  }
  noStroke(); fill(lightBlue);
  ellipse(cx, cy, (40/400)*side, (40/400)*side);
}

function drawConcentricCircles(norm) {
  const {x: cx, y: cy} = toCanvas(norm);
  const oilPalette = [[138,54,15],[99,81,71],[204,183,102],[227,0,34],[227,38,54],[0,49,83],[0,105,70],[64,130,109],[41,36,33],[255,255,255]];
  const num=36;
  const angles = Array(num).fill(1).map((_,i,arr)=>TWO_PI/arr.length);
  let ang=0;
  noStroke();
  for (let i=0; i<num; i++) {
    const c=oilPalette[i%oilPalette.length]; fill(...c);
    arc(cx, cy, dr*2, dr*2, ang, ang+angles[i], PIE);
    ang+=angles[i];
  }
  // inner rings
  const inners=[80,65,50,35,20].map(d=>d/400*side);
  const colors=[[150,30,30],[200,100,0],[80,0,80],[0,60,30],[25,25,112]];
  inners.forEach((d,i)=>{fill(...colors[i]);ellipse(cx,cy,d,d);});
  noFill(); stroke(30,55,120); strokeWeight((2/400)*side);
  ellipse(cx,cy,dr*2+(2/400)*side,dr*2+(2/400)*side);
  colorMode(RGB,255);
}

function drawFlawerCircles(norm) {
  const {x: cx, y: cy} = toCanvas(norm);
  const palette=[[205,92,0],[87,1,79],[34,34,59],[184,134,11],[255,65,108],[227,0,34],[152,255,152],[147,112,219],[25,25,112]];
  const slices=20; const petalCount=14;
  noStroke();
  for (let i=0; i<slices; i++) {
    fill(...palette[i%palette.length]);
    arc(cx, cy, dr*2, dr*2, i*(TWO_PI/slices), (i+1)*(TWO_PI/slices), PIE);
  }
  const length=dr*1.2, widthP=(12/400)*side;
  for (let i=0; i<petalCount; i++) {
    fill(...palette[i%palette.length]);
    const theta=i*(TWO_PI/petalCount)-PI/2;
    push(); translate(cx,cy); rotate(theta);
    ellipse(length/2,0,length,widthP);
    pop();
  }
  fill(255,165,0); ellipse(cx,cy,(dr*0.3)*2,(dr*0.3)*2);
}

function drawSectorCircles(norm) {
  const {x: cx, y: cy} = toCanvas(norm);
  const palette=[[138,54,15],[99,81,71],[204,183,102],[227,0,34],[227,38,54],[0,49,83],[0,105,70],[64,130,109],[41,36,33],[255,255,255]];
  const outer=40, inner=30;
  noStroke();
  for (let i=0; i<outer; i++) {
    const c=palette[i%palette.length]; fill(...c);
    arc(cx,cy,dr*2,dr*2,i*(TWO_PI/outer),(i+1)*(TWO_PI/outer),PIE);
  }
  fill(0); ellipse(cx,cy,dr*2-(20/400)*side,dr*2-(20/400)*side);
  for (let i=0; i<inner; i++) {
    const c=palette[(i+3)%palette.length]; fill(...c);
    arc(cx,cy,dr*2-(30/400)*side,dr*2-(30/400)*side,i*(TWO_PI/inner),(i+1)*(TWO_PI/inner),PIE);
  }
  fill(...palette[2]); ellipse(cx,cy,(20/400)*side,(20/400)*side);
}

function drawBlackCircles(norm) {
  const {x: cx, y: cy} = toCanvas(norm);
  noStroke(); fill(148,0,211); ellipse(cx,cy,(110/400)*side,(110/400)*side);
  fill(0,102,204); ellipse(cx,cy,(100/400)*side,(100/400)*side);
  fill(0); ellipse(cx,cy,(90/400)*side,(90/400)*side);
  const lines=100;
  stroke(...[255,255,255]); strokeWeight((2/400)*side);
  for (let i=0;i<lines;i++){const a=i*(TWO_PI/lines);
    line(cx+cos(a)*(30/400)*side,cy+sin(a)*(30/400)*side,
         cx+cos(a)*(45/400)*side,cy+sin(a)*(45/400)*side);
  }
  noStroke(); const pal=[[255,192,203],[221,160,221],[255,255,204]];
  for(let i=0;i<3;i++){fill(...pal[i]); const a=i*(TWO_PI/3);
    arc(cx,cy,(60/400)*side,(60/400)*side,a,a+(TWO_PI/3),PIE);
  }
  fill(255); ellipse(cx,cy,(30/400)*side,(30/400)*side);
  fill(0,102,204); ellipse(cx,cy,(20/400)*side,(20/400)*side);
}

function drawRedCircle(norm) {
  const {x: cx, y: cy} = toCanvas(norm);
  noFill();
  const weights=[12,10,8,6,4].map(w=> (w/400)*side);
  const cols=[[150,30,30],[200,100,0],[80,0,80],[0,60,30],[25,25,112]];
  const radii=[100,80,60,40,20].map(d=> (d/400)*side);
  for(let i=0;i<5;i++){
    stroke(...cols[i]); strokeWeight(weights[i]);
    ellipse(cx,cy,radii[i],radii[i]);
  }
}
