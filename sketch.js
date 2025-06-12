let circles = [
  [54, 48], [172, 25], [292, 3], [28, 160], [140, 136], [254, 110], [378, 80],
  [-8, 268], [108, 248], [224, 220], [340, 192], [64, 356], [184, 340], [304, 308],
  [420, 284], [260, 428], [380, 400]
];
const RADIUS = 54;  // 所有圆的基准半径

// —— 倒计时逻辑 —— 
let countdown = 3;               // 倒计时起始值（秒）
let lastSecChange = 0;           // 上次秒数更新的时间戳
const countdownInterval = 1000;  // 每隔 1000ms 减 1

// —— 分段逐步揭示 —— 
let sceneStarted   = false;
let currentStep    = 0;
const stepInterval = 500;        // 每隔 500ms 揭示下一步
let lastStepTime   = 0;

// —— 延时高亮绿圈 —— 
let highlightGreen = false;

// —— 主题切换（昼/夜） —— 
function isDay() {
  const h = hour();
  return h >= 6 && h < 18;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 倒计时样式
  textAlign(CENTER, CENTER);
  textSize(120);
  fill(255);
  lastSecChange = millis();
}

function draw() {
  // 保证画布始终占满窗口
  resizeCanvas(windowWidth, windowHeight);

  if (countdown > 0) {
    // 倒计时阶段
    background(0);
    if (millis() - lastSecChange >= countdownInterval) {
      countdown--;
      lastSecChange = millis();
      if (countdown === 0) {
        // 倒计时结束，进入主场景
        sceneStarted = true;
        lastStepTime = millis();
        // 2s 后高亮绿色圆环
        setTimeout(() => { highlightGreen = true; }, 2000);
      }
    }
    text(countdown, width / 2, height / 2);

  } else {
    // 主场景持续渲染
    drawDynamicScene();
  }
}

function drawDynamicScene() {
  const baseSize = 400;
  const s = min(width / baseSize, height / baseSize);

  // 日夜背景
  background(isDay() ? 255 : 20);

  push();
    // 居中并缩放到 baseSize
    translate((width - baseSize * s) / 2, (height - baseSize * s) / 2);
    scale(s);

    // 分段揭示进度
    if (millis() - lastStepTime >= stepInterval && currentStep < 17) {
      currentStep++;
      lastStepTime = millis();
    }

    // 裁剪到 400×400 区域
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(0, 0, baseSize, baseSize);
    drawingContext.clip();

    // 背景分割
    noStroke();
    fill(255);
    triangle(0, 0, baseSize, 0, 0, baseSize);
    fill(0);
    triangle(baseSize, baseSize, baseSize, 0, 0, baseSize);

    // 所有白色底圆
    fill(255);
    for (let [x, y] of circles) {
      ellipse(x, y, RADIUS * 2, RADIUS * 2);
    }

    // 依次调用前 currentStep 步
    if (currentStep >= 1)  drawSunMoon(254, 110);
    if (currentStep >= 2)  drawSunMoon(54, 48);
    if (currentStep >= 3)  drawEgg(140, 136);
    if (currentStep >= 4)  drawEgg(-8, 268);
    if (currentStep >= 5)  drawGreenCircle(108, 248);
    if (currentStep >= 6)  drawGreenCircle(292, 3);
    if (currentStep >= 7)  drawBlueCircle(28, 160);
    if (currentStep >= 8)  drawBlueCircle(172, 25);
    if (currentStep >= 9)  drawConcentricCircles(340, 192);
    if (currentStep >= 10) drawConcentricCircles(184, 340);
    if (currentStep >= 11) drawFlawerCircles(64, 356);
    if (currentStep >= 12) drawFlawerCircles(304, 308);
    if (currentStep >= 13) drawSectorCircles(224, 220);
    if (currentStep >= 14) drawSectorCircles(420, 284);
    if (currentStep >= 15) drawBlackCircles(378, 80);
    if (currentStep >= 16) drawBlackCircles(260, 428);
    if (currentStep >= 17) drawRedCircle(380, 400);

    drawingContext.restore();
  pop();
}

function windowResized() {
  // draw() 已处理 resizeCanvas
  redraw();
}


// —— 以下为原有的各种 drawXXX 函数 —— 
// drawSunMoon, drawEgg, drawGreenCircle, drawBlueCircle, drawConcentricCircles,
// drawFlawerCircles, drawSectorCircles, drawBlackCircles, drawRedCircle, drawStar, drawHeart
// （因篇幅所限，此处略。完整实现请参照原 sketch.js 中各函数定义） 

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
  const numBlocks = 36;
  const fixedWeights = Array(numBlocks).fill(1);
  const totalW = fixedWeights.reduce((sum, w) => sum + w, 0);
  const angles = fixedWeights.map(w => (w / totalW) * TWO_PI);

  colorMode(RGB, 255);
  noStroke();
  let currentAngle = 0;
  // Outermost 随机色扇形
  for (let i = 0; i < numBlocks; i++) {
    fill(random(255), random(255), random(255));
    arc(
      cx, cy,
      RADIUS * 2,
      RADIUS * 2,
      currentAngle,
      currentAngle + angles[i],
      PIE
    );
    currentAngle += angles[i];
  }

  // 中间五个同心圆，随机填充
  const middleDiameters = [80, 65, 50, 35, 20];
  for (let d of middleDiameters) {
    fill(random(255), random(255), random(255));
    ellipse(cx, cy, d, d);
  }

  // 最外层蓝色边框 → 随机色边框
  noFill();
  stroke(random(255), random(255), random(255));
  strokeWeight(2);
  ellipse(cx, cy, (RADIUS * 2) + 2, (RADIUS * 2) + 2);
}

function drawFlawerCircles(cx, cy) {
  const numSlices = 20;
  const angleStep = TWO_PI / numSlices;

  colorMode(RGB, 255);
  noStroke();
  // 外层 20 扇形，随机填色
  for (let i = 0; i < numSlices; i++) {
    fill(random(255), random(255), random(255));
    arc(
      cx, cy,
      RADIUS * 2,
      RADIUS * 2,
      i * angleStep,
      (i + 1) * angleStep,
      PIE
    );
  }

  // 14 片花瓣，随机填色
  const numPetals = 14;
  const petalAngle = TWO_PI / numPetals;
  const petalLength = RADIUS * 1.2;
  const petalWidth  = 12;
  const petalOffset = petalLength / 2;

  for (let i = 0; i < numPetals; i++) {
    const theta = i * petalAngle - PI / 2;
    push();
      translate(cx, cy);
      rotate(theta);
      fill(random(255), random(255), random(255));
      ellipse(petalOffset, 0, petalLength, petalWidth);
    pop();
  }

  // 花心
  fill(random(255), random(255), random(255));
  noStroke();
  const coreRadius = RADIUS * 0.3;
  ellipse(cx, cy, coreRadius * 2, coreRadius * 2);
}

function drawSectorCircles(cx, cy) {
  colorMode(RGB, 255);
  noStroke();

  // 外层 40 扇形
  const numOuter = 40;
  const outerAngleStep = TWO_PI / numOuter;
  for (let i = 0; i < numOuter; i++) {
    fill(random(255), random(255), random(255));
    arc(
      cx, cy,
      RADIUS * 2,
      RADIUS * 2,
      i * outerAngleStep,
      (i + 1) * outerAngleStep,
      PIE
    );
  }

  // 实心环
  fill(random(255), random(255), random(255));
  ellipse(cx, cy, RADIUS * 2 - 20, RADIUS * 2 - 20);

  // 内层 30 扇形
  const numInner = 30;
  const innerAngleStep = TWO_PI / numInner;
  const innerDiameter = RADIUS * 2 - 30;
  for (let i = 0; i < numInner; i++) {
    fill(random(255), random(255), random(255));
    arc(
      cx, cy,
      innerDiameter,
      innerDiameter,
      i * innerAngleStep,
      (i + 1) * innerAngleStep,
      PIE
    );
  }

  // 中心小圆
  fill(random(255), random(255), random(255));
  ellipse(cx, cy, 20, 20);
}

function drawBlackCircles(cx, cy) {
  colorMode(RGB, 255);
  noStroke();
  // 三个同心实心圆，随机填色
  const radii = [110, 100, 90];
  for (let r of radii) {
    fill(random(255), random(255), random(255));
    ellipse(cx, cy, r, r);
  }

  // 放射线
  const numLines = 100;
  stroke(random(255), random(255), random(255));
  strokeWeight(2);
  for (let i = 0; i < numLines; i++) {
    const theta = i * TWO_PI / numLines;
    const rOuter = 45;
    const rInner = 30;
    const x1 = cx + cos(theta) * rInner;
    const y1 = cy + sin(theta) * rInner;
    const x2 = cx + cos(theta) * rOuter;
    const y2 = cy + sin(theta) * rOuter;
    line(x1, y1, x2, y2);
  }
  noStroke();

  // 三段扇形
  const threeAngle = TWO_PI / 3;
  const threeDiameter = 60;
  for (let i = 0; i < 3; i++) {
    fill(random(255), random(255), random(255));
    arc(
      cx, cy,
      threeDiameter,
      threeDiameter,
      i * threeAngle,
      (i + 1) * threeAngle,
      PIE
    );
  }

  // 中心双层圆
  fill(random(255), random(255), random(255));
  ellipse(cx, cy, 30, 30);
  fill(random(255), random(255), random(255));
  ellipse(cx, cy, 20, 20);
}

function drawRedCircle(cx, cy) {
  colorMode(RGB, 255);
  noFill();
  // 五层描边，每层随机描边色
  const weights = [12, 10, 8, 6, 4];
  for (let i = 0; i < weights.length; i++) {
    stroke(random(255), random(255), random(255));
    strokeWeight(weights[i]);
    const diameter = 100 - i * 20;
    ellipse(cx, cy, diameter, diameter);
  }
  noStroke();
}
