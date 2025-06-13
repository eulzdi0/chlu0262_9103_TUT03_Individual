//Define the center coordinates of all circles to be drawn
let circles = [
  [54, 48], [172, 25], [292, 3], [28, 160], [140, 136], [254, 110], [378, 80],
  [-8, 268], [108, 248], [224, 220], [340, 192], [64, 356], [184, 340], [304, 308],
  [420, 284], [260, 428], [380, 400]
];
const RADIUS = 54;              

// Set up countdown page
let countdown = 3;
let lastSecChange = 0;
const countdownInterval = 1000; 

//  Segmented disclosure 
let sceneStarted = false;
let currentStep = 0;
const stepInterval = 500;
let lastStepTime = 0;

let highlightGreen = false;

// Dynamic color matching
let concentricColors;    // 36 blocks
let flowerPetalColors;   // 14 petals + core
let flowerCoreColor;
let sectorOuterColors;   // 40 sectors
let sectorInnerColors;   // 30 sectors
let sectorCoreColor;
let blackFill1, blackFill2, blackFill3, blackLineColor;
let redStrokeColors;     // 5 strokes 

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(120);
  fill(255);
  lastSecChange = millis();

  // Initial color matching, and update every 3 seconds
  regeneratePalettes();
  setInterval(regeneratePalettes, 3000);

  noStroke();
}
//If the countdown is not over, then set the background to black.If the time from the last decrement is more than 1 second, 
// decrement one second and record the time.If it is decremented to 0, start the scene mark, record the start time of the segment, 
// and arrange highlightGreen = true after 2 seconds.Draw the current countdown number in the center of the screen.
function draw() {
  resizeCanvas(windowWidth, windowHeight);

  if (countdown > 0) {
    background(0);
    if (millis() - lastSecChange >= countdownInterval) {
      countdown--;
      lastSecChange = millis();
      if (countdown === 0) {
        sceneStarted = true;
        lastStepTime = millis();
        setTimeout(() => { highlightGreen = true; }, 2000);
      }
    }
    text(countdown, width/2, height/2);

  } else {
    drawDynamicScene();
  }
}
//Calculate the size of the base 400×400 grid after scaling to the screen ratio.
//Move the drawing area to the center of the screen and scale it proportionally.
function drawDynamicScene() {
  const baseSize = 400;
  const s = min(width / baseSize, height / baseSize);
  background(isDay() ? 255 : 20);

  push();
    translate((width - baseSize*s)/2, (height - baseSize*s)/2);
    scale(s);

    if (millis() - lastStepTime >= stepInterval && currentStep < 17) {
      currentStep++;
      lastStepTime = millis();
    }

    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(0,0,baseSize,baseSize);
    drawingContext.clip();

    // White circle backgrond
    fill(255);
    for (let [x,y] of circles) {
      ellipse(x,y, RADIUS*2, RADIUS*2);
    }

    //currentStep calls static drawing functions from 1 to 8 in sequence
    if (currentStep>=1) drawSunMoon(254,110);
    if (currentStep>=2) drawSunMoon(54,48);
    if (currentStep>=3) drawEgg(140,136);
    if (currentStep>=4) drawEgg(-8,268);
    if (currentStep>=5) drawGreenCircle(108,248);
    if (currentStep>=6) drawGreenCircle(292,3);
    if (currentStep>=7) drawBlueCircle(28,160);
    if (currentStep>=8) drawBlueCircle(172,25);
   //Steps 9-17 call the "dynamic color matching" version of the drawing function in sequence
    if (currentStep>=9)  drawConcentricCircles(340,192);
    if (currentStep>=10) drawConcentricCircles(184,340);
    if (currentStep>=11) drawFlawerCircles(64,356);
    if (currentStep>=12) drawFlawerCircles(304,308);
    if (currentStep>=13) drawSectorCircles(224,220);
    if (currentStep>=14) drawSectorCircles(420,284);
    if (currentStep>=15) drawBlackCircles(378,80);
    if (currentStep>=16) drawBlackCircles(260,428);
    if (currentStep>=17) drawRedCircle(380,400);

    drawingContext.restore();
  pop();
}

function windowResized() {
  redraw();
}
//Local hours during the daytime hours 6–17
function isDay() {
  const h = hour();
  return h>=6 && h<18;
}

// —— 配色更新 —— 
function regeneratePalettes() {
  // Concentric: 36 随机色块
  concentricColors = Array.from({length:36}, () => color(random(255),random(255),random(255)));
  // Flower: 14 花瓣 + 核心
  flowerPetalColors = Array.from({length:14}, () => color(random(255),random(255),random(255)));
  flowerCoreColor   = color(random(255),random(255),random(255));
  // Sector: 外圈 40 扇区，内圈 30 扇区，核心
  sectorOuterColors = Array.from({length:40}, () => color(random(255),random(255),random(255)));
  sectorInnerColors = Array.from({length:30}, () => color(random(255),random(255),random(255)));
  sectorCoreColor   = color(random(255),random(255),random(255));
  // Black: 三层填充 + 线条
  blackFill1    = color(random(255),random(255),random(255));
  blackFill2    = color(random(255),random(255),random(255));
  blackFill3    = color(random(255),random(255),random(255));
  blackLineColor= color(random(255),random(255),random(255));
  // RedCircle: 5 条描边
  redStrokeColors = Array.from({length:5}, () => color(random(255),random(255),random(255)));
}

function windowResized() {
  // draw() 已处理 resizeCanvas
  redraw();
}


//Drawing on drawSunMoon(252, 108) and drawSunMoon(54,52)
function drawSunMoon(cx, cy) {
  const orange = color(241, 168, 128);
  const DarkOrange = color(236, 120, 46);
  const white = color(255);

  // 外圈
  strokeWeight(5);
  stroke(orange);
  noFill();
  ellipse(cx, cy, RADIUS * 2, RADIUS * 2);

  // 半圆填充
  noStroke(); fill(orange);
  arc(cx, cy, RADIUS * 2, RADIUS * 2, PI / 2, 3 * PI / 2);

  // 中心小白圆
  fill(white);
  ellipse(cx, cy, 40, 40);

  // 中心小半圆
  fill(DarkOrange);
  arc(cx, cy, 40, 40, -PI / 2, PI / 2);

  // 呼吸星星（半径随时间微调）
  const pulse = 1 + 0.1 * sin((millis() - lastSecChange) * 0.005);
  drawStar(cx + 7, cy, 6 * pulse, 4 * pulse);

  // 放射线
  const totalPerSide = 10;
  const step = PI / totalPerSide;

  strokeWeight(3);
  // 右侧
  stroke(DarkOrange);
  for (let i = 0; i < totalPerSide; i++) {
    const angle = -PI / 2 + i * step;
    const r1 = RADIUS * 0.9, r2 = RADIUS * 0.6;
    line(cx + cos(angle) * r1, cy + sin(angle) * r1,
         cx + cos(angle) * r2, cy + sin(angle) * r2);
  }
  // 左侧
  stroke(white);
  for (let i = 0; i < totalPerSide; i++) {
    const angle = PI / 2 + i * step;
    const r1 = RADIUS * 0.9, r2 = RADIUS * 0.6;
    line(cx + cos(angle) * r1, cy + sin(angle) * r1,
         cx + cos(angle) * r2, cy + sin(angle) * r2);
  }
}
/**
 * Draw a five-pointed star at (x, y), where:
 * @param {*} rOuter the length from the tip of the star to the center of the star
 * @param {*} rInner the length from the valley of the star to the center of the star
 */
function drawStar(x, y, rOuter, rInner) {
  fill(255);
  noStroke();
  beginShape();
  let angle = -PI / 2;
  const step = TWO_PI / 5;
  for (let i = 0; i < 5; i++) {
    vertex(
      x + cos(angle) * rOuter,
      y + sin(angle) * rOuter
    );
    angle += step / 2;
    vertex(
      x + cos(angle) * rInner,
      y + sin(angle) * rInner
    );
    angle += step / 2;
  }
  endShape(CLOSE);
}

//Drawing on drawEgg(140,136) 和 drawEgg(-8, 268)
function drawEgg(cx, cy) {
  const Egg = color(255, 214, 160);
  const Egg2 = color(254, 181, 81);
  const Egg3 = color(255, 255, 255);
  const dark = color(235, 167, 85);
  const heartGreen = color(189, 213, 131);

  //Draw a light orange circle with a thick stroke (strokeWeight = 10)
  strokeWeight(10);
  stroke(Egg);
  noFill();
  //DIAMETER = RADIUS * 2 = 108
  ellipse(cx, cy, (RADIUS * 2) - 10, (RADIUS * 2) - 10);

  //Draw a light orange solid circle with a radius of 30 in the center
  noStroke();
  fill(Egg2);
  ellipse(cx, cy, 50, 50);

  noStroke();
  fill(Egg3);
  ellipse(cx, cy, 20, 20);

  //Add a dark brown thin stroke around the edge of the center solid circle.
  strokeWeight(2);
  stroke(dark);
  noFill();
  ellipse(cx, cy, RADIUS * 2, RADIUS * 2);

  //Insert 8 light green hearts on the white ring
  const heartCount = 8;
  const ringRadius = RADIUS - 15;
  const heartSize = 15;

  noStroke();
  fill(heartGreen);
  for (let i = 0; i < heartCount; i++) {
    const angle = (TWO_PI / heartCount) * i - PI / 2;
    const hx = cx + cos(angle) * ringRadius;
    const hy = cy + sin(angle) * ringRadius;
    drawHeart(hx, hy, heartSize, heartGreen);
  }
}

/**
* Draw a solid heart at (x, y), with a size of approximately size,
* Made up of two small circles + a triangle
 */
function drawHeart(x, y, size, c) {
  fill(c);
  noStroke();

  const r = size * 0.47;
  const offset = size * 0.35; //The offset between the center of the circle and the vertex of the triangle

  //left
  ellipse(x - offset * 0.5, y - offset * 0.5, r, r);
  //right
  ellipse(x + offset * 0.5, y - offset * 0.5, r, r);
  //bottom
  beginShape();
  vertex(x - r * 0.5, y);//left
  vertex(x + r * 0.5, y);//right
  vertex(x, y + offset * 0.5); //bottom
  endShape(CLOSE);
}

/**
 * Drawing on drawGreenCircle(108,248) and drawGreenCircle(292, 3)
 */
function drawGreenCircle(cx, cy) {
  const green = color(166, 198, 124);
  const paleGreen = color(187, 214, 161);
  const red = color(227, 170, 155);
  const yellow = color(239, 199, 120);

  //Outer green stroke (stroke 3) - keep the diameter at 108 and extend the stroke 1.5 pixels inside and outside the grey circle
  strokeWeight(3);
  stroke(green);
  noFill();
  ellipse(cx, cy, (RADIUS * 2) - 3, (RADIUS * 2) - 3);

  strokeWeight(6);
  stroke(green);
  noFill();
  ellipse(cx, cy, (RADIUS * 2) - 20, (RADIUS * 2) - 20);

  strokeWeight(3);
  stroke(red);
  noFill();
  ellipse(cx, cy, (RADIUS * 2) - 35, (RADIUS * 2) - 35);

  strokeWeight(3);
  stroke(yellow);
  noFill();
  ellipse(cx, cy, (RADIUS * 2) - 49, (RADIUS * 2) - 49);

  //A light green solid circle with a center radius of 20
  noStroke();
  fill(paleGreen);
  ellipse(cx, cy, 40, 40);

//Randomly distribute 40 small white dots inside the light green circle above
//Make the dots evenly distributed within a radius of 10: use sqrt(random()) * r to get a uniform distribution
  fill(255);
  noStroke();
  const dotCount = 40;
  const maxR = 10; //Max radius

  for (let i = 0; i < dotCount; i++) {
    //random degree
    const angle = random(0, TWO_PI);
    //Random radius, using sqrt(random()) to ensure that the points are evenly distributed within the circle
    const r = sqrt(random()) * maxR;
    const dx = cos(angle) * r;
    const dy = sin(angle) * r;
    //The radius of the small white dot is about 1 pixel (diameter 2)
    ellipse(cx + dx, cy + dy, 2, 2);
  }
}

/**
 * Drawing on drawBlueCircle(28, 160) and drawBlueCircle(172, 28)
 */
function drawBlueCircle(cx, cy) {
  //define lightblue
  const lightBlue = color(163, 202, 217);
  const lightRed = color(235, 190, 181);
  const lightYellow = color(234, 205, 155);

  //Light blue stroke for the outer circle (stroke = 5), diameter remains RADIUS*2 = 108
  strokeWeight(5);
  stroke(lightBlue);
  noFill();
  ellipse(cx, cy, (RADIUS * 2) - 5, (RADIUS * 2) - 5);

  strokeWeight(5);
  stroke(lightRed);
  noFill();
  ellipse(cx, cy, (RADIUS * 2) - 27, (RADIUS * 2) - 27);

  strokeWeight(5);
  stroke(lightYellow);
  noFill();
  ellipse(cx, cy, (RADIUS * 2) - 50, (RADIUS * 2) - 50);


  //On the white band between the three strokes above, draw 16 groups of two small circles with a radius of 1.5
  //Calculate the radii of the red and yellow rings
  const radiusRed = ((RADIUS * 2) - 27) / 2;
  const radiusYellow = ((RADIUS * 2) - 50) / 2;
  //The center radius of the white ring
  const ringMid = (radiusRed + radiusYellow) / 2;

  //Set the radius of the small circle and the offset along the tangent direction
  const smallR = 1.5;
  const offsetDistance = smallR; //Let the distance between the centers of two adjacent small circles be 3  (radius*2), and multiply the tangent unit vector by smallR
  noStroke();
  fill(lightRed);

  const total = 16;
  const angleStep = TWO_PI / total;

  for (let i = 0; i < total; i++) {
    const angle = -PI / 2 + i * angleStep; 
    //The reference point (bx, by) is located at the center of the white ring
    const bx = cx + cos(angle) * ringMid;
    const by = cy + sin(angle) * ringMid;

    //Compute the unit vector (tx, ty) in the direction of the tangent line
    const tx = -sin(angle);
    const ty = cos(angle);

    //circles
    const x1 = bx + tx * offsetDistance;
    const y1 = by + ty * offsetDistance;
    const x2 = bx - tx * offsetDistance;
    const y2 = by - ty * offsetDistance;

    //radius = 2
    ellipse(x1, y1, smallR * 2, smallR * 2);
    ellipse(x2, y2, smallR * 2, smallR * 2);
  }

  //Light blue solid circle with center radius 20 (diameter 40)
  noStroke();
  fill(lightBlue);
  ellipse(cx, cy, 40, 40);
}
/**
 * Drawing on drawConcentricCircles(340,192) and drawConcentricCircles(184,340)
 */

function drawConcentricCircles(cx, cy) {
  // 36 色块
  noStroke();
  let angle = 0;
  const slice = TWO_PI / 36;
  for (let i=0; i<36; i++) {
    fill(concentricColors[i]);
    arc(cx, cy, RADIUS*2, RADIUS*2, angle, angle+slice, PIE);
    angle += slice;
  }
  // 中五圈
  noStroke();
  fill(color(150,30,30));
  ellipse(cx,cy,80,80);
  fill(color(200,100,0));
  ellipse(cx,cy,65,65);
  fill(color(80,0,80));
  ellipse(cx,cy,50,50);
  fill(color(0,60,30));
  ellipse(cx,cy,35,35);
  fill(color(25,25,112));
  ellipse(cx,cy,20,20);
}

function drawFlawerCircles(cx, cy) {
  // 20 扇区底色
  const numSlices = 20;
  const slice = TWO_PI / numSlices;
  noStroke();
  for (let i=0; i<numSlices; i++) {
    fill(color(200,200,200)); // 固定底色
    arc(cx,cy, RADIUS*2, RADIUS*2, i*slice, (i+1)*slice, PIE);
  }
  // 14 花瓣
  const petalAngle = TWO_PI / 14;
  const petalOffset = RADIUS * 0.9;
  const petalLen = RADIUS * 1.2;
  const petalWidth = 12;
  for (let i=0; i<14; i++) {
    let theta = i*petalAngle - PI/2;
    push(); translate(cx,cy); rotate(theta);
    fill(flowerPetalColors[i]);
    ellipse(petalOffset, 0, petalLen, petalWidth);
    pop();
  }
  // 花芯
  fill(flowerCoreColor);
  ellipse(cx,cy, 20,20);
}

function drawSectorCircles(cx, cy) {
  // 外圈 40
  noStroke();
  for (let i=0; i<40; i++) {
    fill(sectorOuterColors[i]);
    arc(cx,cy, RADIUS*2, RADIUS*2, i*TWO_PI/40, (i+1)*TWO_PI/40, PIE);
  }
  // 黑实心环
  fill(0);
  ellipse(cx,cy, RADIUS*2-20, RADIUS*2-20);
  // 内圈 30
  for (let i=0; i<30; i++) {
    fill(sectorInnerColors[i]);
    arc(cx,cy, RADIUS*2-30, RADIUS*2-30, i*TWO_PI/30, (i+1)*TWO_PI/30, PIE);
  }
  // 核心
  fill(sectorCoreColor);
  ellipse(cx,cy,20,20);
}

function drawBlackCircles(cx, cy) {
  noStroke();
  fill(blackFill1);
  ellipse(cx,cy, RADIUS*2, RADIUS*2);
  fill(blackFill2);
  ellipse(cx,cy, RADIUS*1.4, RADIUS*1.4);
  fill(blackFill3);
  ellipse(cx,cy, RADIUS*0.8, RADIUS*0.8);
  stroke(blackLineColor);
  strokeWeight(2);
  for (let i=0; i<100; i++) {
    let theta = i*TWO_PI/100;
    let x1 = cx + cos(theta)*30, y1 = cy + sin(theta)*30;
    let x2 = cx + cos(theta)*45, y2 = cy + sin(theta)*45;
    line(x1,y1,x2,y2);
  }
  noStroke();
}

function drawRedCircle(cx, cy) {
  noFill();
  // 5 条描边
  const weights = [12,10,8,6,4];
  const diameters = [100,80,60,40,20];
  for (let i=0; i<5; i++) {
    stroke(redStrokeColors[i]);
    strokeWeight(weights[i]);
    ellipse(cx,cy, diameters[i], diameters[i]);
  }
  noStroke();
}