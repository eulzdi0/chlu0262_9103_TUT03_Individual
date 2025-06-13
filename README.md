# Final9103
## Inspiration: 
Damien Hirst's dot paintings inspired me that circles have infinite creative possibilities, and then combined with the kaleidoscope inspiration I saw, based on the circle, I changed the color to achieve the colorful effect of the kaleidoscope.
![An image ](https://images.fineartamerica.com/images-medium-large-5/14-kaleidoscope-stained-glass-window-series-amy-cicconi.jpg)

## The Instruction of Individual Work:
In my personal works, there will be a countdown first, and then you will see the picture as the countdown ends. The circle on the right will change color every 3 seconds, and the color of the background will also change according to the local time. If it is daytime, it will be white.

## The Animation Explanation:
My design starts with a countdown text animation that decreases every second, and then enters a segmented reveal mode after the countdown ends. Every 0.5 seconds, 8 static graphics are drawn in sequence, including the sun and moon, egg shape, aqua ring, blue ring, etc.; then starting from step 9, the color palette is randomly regenerated every 3 seconds, so that patterns such as concentric rings, petals, fans, black stacks and red outlines continue to flash with step pollution; in addition, the small stars in the sun and moon rings use a sine function to achieve slow breathing, expansion and contraction; the background color automatically switches between daytime (6-18 o'clock) and night according to the local time; the entire canvas maintains responsive adaptation through resizeCanvas, translation and scaling when the window size changes.

## The Technical Explanation:
Added a scene countdown
```javascript
let countdown = 3;
let lastSecChange = 0;
const countdownInterval = 1000; 

//  Segmented disclosure 
let sceneStarted = false;
let currentStep = 0;
const stepInterval = 500;
let lastStepTime = 0;

let highlightGreen = false;

```
drawConcentricCircles uses 36 equally divided sectors to create the outermost colored ring, and then superimposes five solid circles of different diameters in the center to form concentric circles with color gradients from the outside to the inside;

drawFlawerCircles first uses 20 gray sectors as the base, then evenly arranges 14 colored petals on it, and finally draws a small colored circle in the center, like a blooming flower;

drawSectorCircles is divided into three layers: 40 colored sectors in the outermost circle, a pure black solid ring inside, and then 30 smaller colored sectors, and a small colored circle in the center, like a gear with a clear rhythm;

drawBlackCircles superimposes three layers of solid circles of different brightness, plus a circle of "black lines" composed of 100 radial straight lines, creating a texture like metal engraving;

drawRedCircle is composed of only five concentric circles of different thicknesses and random red strokes, which is simple and impactful.
Each time it is called, these color arrays (such as concentricColors, flowerPetalColors, etc.) are dynamically generated, so the colors of the concentric rings, petals, fans, or strokes are constantly refreshed, ensuring that the picture is fresh every time it appears.
```javascript
function drawConcentricCircles(cx, cy) {
  // 36 color blocks
  noStroke();
  let angle = 0;
  const slice = TWO_PI / 36;
  for (let i=0; i<36; i++) {
    fill(concentricColors[i]);
    arc(cx, cy, RADIUS*2, RADIUS*2, angle, angle+slice, PIE);
    angle += slice;
  }
  // Five circles line
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
  // 20 Sector background color
  const numSlices = 20;
  const slice = TWO_PI / numSlices;
  noStroke();
  for (let i=0; i<numSlices; i++) {
    fill(color(200,200,200)); 
    arc(cx,cy, RADIUS*2, RADIUS*2, i*slice, (i+1)*slice, PIE);
  }
  // 14 Petals
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
  
  fill(flowerCoreColor);
  ellipse(cx,cy, 20,20);
}

function drawSectorCircles(cx, cy) {
  // Outer ring 40 blocks
  noStroke();
  for (let i=0; i<40; i++) {
    fill(sectorOuterColors[i]);
    arc(cx,cy, RADIUS*2, RADIUS*2, i*TWO_PI/40, (i+1)*TWO_PI/40, PIE);
  }
  // Black solid ring
  fill(0);
  ellipse(cx,cy, RADIUS*2-20, RADIUS*2-20);
  // Inner circle 30 blocks
  for (let i=0; i<30; i++) {
    fill(sectorInnerColors[i]);
    arc(cx,cy, RADIUS*2-30, RADIUS*2-30, i*TWO_PI/30, (i+1)*TWO_PI/30, PIE);
  }

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
  const weights = [12,10,8,6,4];
  const diameters = [100,80,60,40,20];
  for (let i=0; i<5; i++) {
    stroke(redStrokeColors[i]);
    strokeWeight(weights[i]);
    ellipse(cx,cy, diameters[i], diameters[i]);
  }
  noStroke();
}