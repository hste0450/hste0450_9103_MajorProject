// Set up and initialization of gloabal variables
// Visual component variables include various shapes and formations used in the visualization
let concentric, glowingCircle, radiatingLines, circleFormation, chain, diamondFormation, radiatingFormation, brokenChain, brokenChain2, brokenChain3, diamond, diamond1, diamond2, diamond3, diamondAndCircle, diamondAndCircle1, flowerCircle, flower, radiatingLines2, glowingCircle2, radiusAnimation;

//Array to hold noise offsets for dynamic visual effects
let noiseOffsets = [];

 // Define an array of RGBA colors for glowing effects on visual elements
 let glowColors = [
  [199, 74, 134, 150], // Pink glow
  [109, 147, 53, 150], // Green glow
  [134, 169, 228, 150], // Blue glow
  [255, 171, 59, 150], // Orange glow
  [255, 246, 234, 150], // Yellow glow
];
  
  let brokenChainNoiseOffset = 0; //Offset for animating the broken chain's rotation
  let angle2 = 0; //General purpose angle for rotations

function setup() {
  // Set the canvas to the full browser window size
  createCanvas(windowWidth, windowHeight);

   // Initialize noiseOffsets with random starting points for smoother transitions
   for (let i = 0; i < glowColors.length; i++) {
    let offsets = [];
    for (let j = 0; j < 4; j++) { // Assuming RGBA
      offsets.push(random(1000)); // Random starting points for noise
    }
    noiseOffsets.push(offsets);
  }

  //Initializiation of various visual components positioned at the center 
  // Initialize concentric circles at the center with a radius and number of layers
  concentric = new ConcentricCircles(windowWidth / 2, windowHeight / 2, windowWidth / 5, 5, 3, glowColors);

  // Initialize chain of circles at the center
  chain = new ChainedCircles(windowWidth / 2, windowHeight / 2, windowWidth / 10, 50, [199, 74, 134, 150],[255, 255, 255, 255], 3);

  // Initialize radiating lines from the center
  radiatingLines = new RadiatingLines(width / 2, height / 2, windowWidth / 30, 200,[255, 171, 59, 150], 1);

  // Initialize a glowing circle at the center
  glowingCircle = new GlowingCircle(width / 2, height / 2, width / 100, [255, 77, 0, 150], 20);

  // Initialize formations of diamonds and circles in a circular arrangement
  diamondFormation = new DiamondFormation(width / 2, height / 2, windowWidth / 7.2, windowWidth / 105, 15);

  //Initialize formation of glowing circles in a circular arrangement
  circleFormation = new CircleFormation(width / 2, height / 2, width / 17, windowWidth / 120, 8, glowColors, 20);

  //Initialize formation of radiating lines in a circular arrangement
  radiatingFormation = new RadiatingCircleFormation(width / 2, height / 2, windowWidth / 5.5, 24, 20, 8,[134, 169, 228, 150], 2); // Use the same blue glow

  // Initialize chain of circles outside the center
  brokenChain = new BrokenChainedCircles(width / 2, height / 2, width / 4.2, 20, [109, 147, 53, 150], [255, 255, 255, 255], windowWidth / 100);

  //Objects outside the center
  //Broken chain to the top-left of the canvas
  brokenChain2 = new BrokenChainedCircles(windowWidth / 16, windowHeight / 9, width / 6, 20, [199, 74, 134, 150],[255, 255, 255, 255], windowWidth / 250);

  //Broken chain to the bottom-right of the canvas
  brokenChain3 = new BrokenChainedCircles(windowWidth / 1.05, windowHeight / 1.2, width / 6, 20,[134, 169, 228, 150],[255, 255, 255], windowWidth / 250);

  //Diamond with smaller orange circles sorrounding it
  diamondAndCircle = new DiamondAndCircle((7 * windowWidth) / 8, windowHeight / 5, windowWidth / 15, [255], [255],[255, 171, 59, 150]);

  //Diamond with smaller pink circles sorrounding it
  diamondAndCircle1 = new DiamondAndCircle((7 * windowWidth) / 40, windowHeight / 1.2, windowWidth / 15, [255], [255], [199, 74, 134, 150]);

  //Diamond to the left
  diamond = new Diamond(width / 12, height / 1.5, windowWidth / 20, [255]);

  //Diamond to the right
  diamond1 = new Diamond(width / 1.1, height / 2.5, windowWidth / 30, [255]);

  //Diamond to the right
  diamond2 = new Diamond(width / 1.02, height / 10, windowWidth / 30, [255]);

  //Diamond to the left
  diamond3 = new Diamond(width / 16, height / 1.1, windowWidth / 30, [255]);

  //Glowing flower
  flower = new Flower(windowWidth / 10, windowHeight / 4, glowColors, windowHeight/40);

  //Radiating lines to the right
  radiatingLines2 = new RadiatingLines((7 * windowWidth) / 7.5, windowHeight / 1.2, windowWidth/15, 250, [255, 171, 59, 150], 1);

  //Glowing circle to the right
  glowingCircle2 = new GlowingCircle((7 * windowWidth) / 7.5, windowHeight / 1.2, windowWidth/70, [255, 171, 59, 150]);

  // Call the windowResized function to adjust layout based on current window size
  windowResized();
}

//Drawing the elements on the canvas
function draw() {
  // Set background color
  background(27, 27, 37);
  updateColourValues();

   // Incrementally update angle for brokenChain2 using Perlin noise
   angle2 += map(noise(brokenChainNoiseOffset), 0, 1, -0.005, 0.005); // Subtle rotation change
   push(); // Isolate transformations for brokenChain2
   translate(brokenChain2.x, brokenChain2.y);
   rotate(angle2);
   translate(-brokenChain2.x, -brokenChain2.y); // Re-center rotation at object's position
   brokenChain2.display();
   pop(); // Reset transformation matrix
   brokenChainNoiseOffset += 0.05; // Slowly increment offset
 
   // Incrementally update angle for brokenChain3 using Perlin noise
   angle2 += map(noise(brokenChainNoiseOffset), 0, 1, -0.005, 0.005); // Subtle rotation change
   push(); // Isolate transformations for brokenChain3
   translate(brokenChain3.x, brokenChain3.y);
   rotate(angle2);
   translate(-brokenChain3.x, -brokenChain3.y); // Re-center rotation at object's position
   brokenChain3.display();
   pop(); // Reset transformation matrix
   brokenChainNoiseOffset += 0.05; // Slowly increment offset

    // Incrementally update angle for brokenChain3 using Perlin noise
    angle2 += map(noise(brokenChainNoiseOffset), 0, 1, -0.005, 0.005); // Subtle rotation change
    push(); // Isolate transformations for brokenChain3
    translate(brokenChain.x, brokenChain.y);
    rotate(angle2);
    translate(-brokenChain.x, -brokenChain.y); // Re-center rotation at object's position
    brokenChain.display();
    pop(); // Reset transformation matrix
    brokenChainNoiseOffset += 0.05; // Slowly increment offset

  // Display all initialized visual components
  //Concentric glowing circles
  concentric.display();
  //Inner chain
  chain.update();
  chain.display();
  //Circle formation of glowing circles
  circleFormation.display();
  //Singular radiating lines
  radiatingLines.update();
  radiatingLines.display();
  radiatingLines2.update();
  radiatingLines2.display();
  //Glowing circles on top of radiating lines
  glowingCircle.display();
  glowingCircle2.display();
  //Circle formation of diamonds
  diamondFormation.display();
  //Circle formation of radiating lines
  radiatingFormation.display();
  //Diamonds with glowing circles surrounding them
  //Right top
  diamondAndCircle.display();
  //Left bottom
  diamondAndCircle1.display();
  //Blinking diamonds
  //Left top
  diamond.update();
  diamond.display();
  //Right bottom
  diamond1.update();
  diamond1.display();
  //Right top
  diamond2.display();
  diamond2.update();
  //Left bottom
  diamond3.display();
  diamond3.update();
  //Rotating flower
  flower.display();
}

function updateColourValues () {
    // Update colors using Perlin noise
    for (let i = 0; i < glowColors.length; i++) {
      for (let j = 0; j < 4; j++) { // Update each channel (RGBA)
        let noiseValue = noise(noiseOffsets[i][j]);
        glowColors[i][j] = map(noiseValue, 0, 1, 0, 255); // Map noise to color values
        noiseOffsets[i][j] += 0.3; // Small increment for smooth changes
      }
    }

}

// Adjust visual components when the browser window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize canvas to match window size

  // Recalculate properties of visual components to adjust to new window size

  // Calculating the concentric circles
  concentric.x = windowWidth / 2; // Center concentric circles horizontally
  concentric.y = windowHeight / 2; // Center concentric circles vertically
  concentric.radius = max(windowWidth / 5, windowHeight / 5);

  // Calculating the glowing circle in the middle of the canvas
  glowingCircle.x = windowWidth / 2;
  glowingCircle.y = windowHeight / 2;
  glowingCircle.radius = max(windowWidth / 100, windowHeight / 100);

  // Calculating the radiating lines in the middle of the canvas
  radiatingLines.x = windowWidth / 2;
  radiatingLines.y = windowHeight / 2;
  radiatingLines.length = max(windowWidth / 30, windowHeight / 30);

  //Calculating the circleformation of glowing circles
  circleFormation.centerX = windowWidth / 2;
  circleFormation.centerY = windowHeight / 2;
  circleFormation.outerRadius = max(windowWidth / 17, windowHeight / 17);
  circleFormation.innerCircleRadius = min(
    windowWidth / 120,
    windowHeight / 120
  );
  circleFormation.circles = []; // Clear the current circles
  circleFormation.createCircles(); // Recreate circles with new dimensions

  //Calculating the radiating formation
  radiatingFormation.centerX = windowWidth / 2;
  radiatingFormation.centerY = windowHeight / 2;
  radiatingFormation.outerRadius = max(windowWidth / 5.5, windowHeight / 5.5);
  radiatingFormation.lineLength = min(windowWidth / 50, windowHeight / 50);
  radiatingFormation.radiatingObjects = [];
  radiatingFormation.createRadiatingObjects();

  //Calculating the formation of diamonds
  diamondFormation.centerX = windowWidth / 2;
  diamondFormation.centerY = windowHeight / 2;
  diamondFormation.outerRadius = max(windowWidth / 7.2, windowHeight / 7.2);
  diamondFormation.diamondSize = min(windowWidth / 100, windowHeight / 100);
  diamondFormation.diamonds = [];
  diamondFormation.createDiamonds(); // Recreate diamonds with new dimensions

  //Calculating the inner chain
  chain.x = windowWidth / 2;
  chain.y = windowHeight / 2;
  chain.radius = max(windowWidth / 10, windowHeight / 10);

  //Calculating the outer bigger chain
  brokenChain.x = windowWidth / 2;
  brokenChain.y = windowHeight / 2;
  brokenChain.radius = max(windowHeight / 4.2, windowWidth / 4.2);
  brokenChain.strokeWeight = min(windowWidth / 100, windowHeight / 100);
  brokenChain.positions = [];
  brokenChain.setupPositions(); // Recalculate positions with new dimensions

  //Calculating the broken chain to the left
  brokenChain2.x = windowWidth / 16;
  brokenChain2.y = windowHeight / 8;
  brokenChain2.radius = max(windowHeight / 6, windowWidth / 6);
  brokenChain2.strokeWeight = min(windowWidth / 250, windowHeight / 250);
  brokenChain2.positions = [];
  brokenChain2.setupPositions(); // Recalculate positions with new dimensions

   //Calculating the broken chain to the right
  brokenChain3.x = windowWidth / 1.05;
  brokenChain3.y = windowHeight / 1.2;
  brokenChain3.radius = max(windowHeight / 6, windowWidth / 6);
  brokenChain3.strokeWeight = min(windowWidth / 250, windowHeight / 250);
  brokenChain3.positions = [];
  brokenChain3.setupPositions(); // Recalculate positions with new dimensions

  //Calculating the diamond to the left
  diamond.x = windowWidth / 12;
  diamond.y = windowHeight / 1.5;
  diamond.size = windowWidth / 20;

  //Calculating the diamond to the right
  diamond1.x = windowWidth / 1.1;
  diamond1.y = windowHeight / 2.5;
  diamond1.size = windowWidth / 30;

  //Calculating the diamond to the right
  diamond2.x = windowWidth / 1.02;
  diamond2.y = windowHeight / 10;
  diamond2.size = windowWidth / 30;

   //Calculating the diamond to the left
   diamond3.x = windowWidth / 16;
   diamond3.y = windowHeight / 1.1;
   diamond2.size = windowWidth / 30;

  //Calculating the diamond with smaller orange circles to the right side of the canvas
  diamondAndCircle.xPos = (7 * windowWidth) / 8;
  diamondAndCircle.yPos = windowHeight / 5;
  diamondAndCircle.size = windowWidth / 15;

  //Calculating the diamond with smaller pink circles
  diamondAndCircle1.xPos = (7 * windowWidth) / 40;
  diamondAndCircle1.yPos = windowHeight / 1.2;
  diamondAndCircle1.size = windowWidth / 15;

  //Calculating the flower
  flower.x = windowWidth / 12;
  flower.y = windowHeight / 5;
  flower.centerSize = min(windowWidth / 50, windowHeight / 50);
  flower.petalSize = min(windowWidth / 50, windowHeight / 50);

  // Calculating the glowing circle to the right of the canvas
  glowingCircle2.x = (7 * windowWidth) / 7.5;
  glowingCircle2.y = windowHeight / 1.2;
  glowingCircle2.radius = max(windowWidth / 70, windowHeight / 70);

  // Calculating the glowing radiating lines to the right of the canvas
  radiatingLines2.x = (7 * windowWidth) / 7.5;
  radiatingLines2.y = windowHeight / 1.2;
  radiatingLines2.length = max(windowWidth / 15, windowHeight / 15);
}
