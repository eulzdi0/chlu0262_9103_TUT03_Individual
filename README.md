# Final9103
## Inspiration: 
Damien Hirst's dot paintings inspired me that circles have infinite creative possibilities, and then combined with the kaleidoscope inspiration I saw, based on the circle, I changed the color to achieve the colorful effect of the kaleidoscope.
![An image ](image1.pnge.)

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
