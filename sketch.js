let circles = [
  [54, 48], [172, 25], [292, 3], [28, 160], [140, 136], [254, 110], [372, 80],
  [-8, 268], [108, 248], [224, 220], [340, 192], [64, 356], [184, 340], [304, 308],
  [420, 284], [260, 428], [380, 400]
];

//The radius of all circles is set to 54
const RADIUS = 54;

function setup() {
  createCanvas(400, 400);

  //First draw the symmetrical corner background: the upper left half is white, the lower right half is black
  noStroke();
  //The "upper left half" is represented by the triangle (0,0), (400,0), (0,400) x+y <= 400
  fill(255);
  triangle(0, 0, 400, 0, 0, 400);
  //The "lower right half" is represented by the triangle (400,400), (400,0), (0,400) x+y >= 400
  fill(0);
  triangle(400, 400, 400, 0, 0, 400);

  //white circles
  noStroke();
  fill(255);
  for (let i = 0; i < circles.length; i++) {
    const [x, y] = circles[i];
    ellipse(x, y, RADIUS * 2, RADIUS * 2);
  }
  noLoop();
}

function draw() {
  drawSunMoon(254, 110);
  drawSunMoon(54, 48);

  drawEgg(140, 136);
  drawEgg(-8, 268);

  drawGreenCircle(108,248);
  drawGreenCircle(292, 3);

  drawBlueCircle(28, 160);
  drawBlueCircle(172, 25);
}

//Drawing on drawSunMoon(252, 108) and drawSunMoon(54,52)
function drawSunMoon(cx, cy) {
  const orange = color(241, 168, 128);
  const DarkOrange = color(236, 120, 46);
  const white = color(255);

  //Draw a circle
  strokeWeight(5);
  stroke(orange);
  noFill();
  ellipse(cx, cy, RADIUS * 2, RADIUS * 2);

  //Draw the "left semicircle" and fill it with orange
  noStroke();
  fill(orange);
  arc(cx, cy, RADIUS * 2, RADIUS * 2, PI / 2, 3 * PI / 2);

  //Draw a small white circle in the center——diameter 40
  fill(white);
  ellipse(cx, cy, 40, 40);

  //Draw another orange semicircle (radius 20) on the right half of the small white circle in the center.
  fill(DarkOrange);
  arc(cx, cy, 40, 40, -PI / 2, PI / 2);
  //Draw a small five-pointed star inside the orange semicircle in the previous step
  //Place the center of the star in the center area of ​​the right half of the small circle, here select (cx + 7, cy)
  drawStar(cx + 7, cy, 6, 4);

  //Draw radial lines around the circle
  //12 lines on the left side, white; 12 lines on the right side, orange; strokeWeight = 3
  const totalPerSide = 10;
  const step = PI / totalPerSide; //The angle between each line

  //The right half (from -PI/2 to +PI/2) is in orange
  strokeWeight(3);
  stroke(DarkOrange);
  for (let i = 0; i < totalPerSide; i++) {
    const angle = -PI / 2 + i * step;
    //Line from slightly inside radius RADIUS*1.05 to outside radius RADIUS*1.3
    const r1 = RADIUS * 0.9;
    const r2 = RADIUS * 0.6;
    const x1 = cx + cos(angle) * r1;
    const y1 = cy + sin(angle) * r1;
    const x2 = cx + cos(angle) * r2;
    const y2 = cy + sin(angle) * r2;
    line(x1, y1, x2, y2);
  }
  //The left half (from PI/2 to 3*PI/2) is white
  stroke(white);
  for (let i = 0; i < totalPerSide; i++) {
    const angle = PI / 2 + i * step;
    const r1 = RADIUS * 0.9;
    const r2 = RADIUS * 0.6;
    const x1 = cx + cos(angle) * r1;
    const y1 = cy + sin(angle) * r1;
    const x2 = cx + cos(angle) * r2;
    const y2 = cy + sin(angle) * r2;
    line(x1, y1, x2, y2);
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