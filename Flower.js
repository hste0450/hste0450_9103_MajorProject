//This class represents a flower with glowing petals and a glowing center

class Flower {

  //Constructs a Flower object
  constructor(x, y, petalCount, petalWidth, petalHeight, petalColor, centerSize, circleColor = [255, 171, 59, 150], numCircles = 3, glowColour = [255, 171, 59, 150]) {
    this.x = x; // Center x-coordinate
    this.y = y; // Center y-coordinate
    this.petalCount = petalCount; // Total number of petals
    this.petalWidth = petalWidth; // Width of each petal
    this.petalHeight = petalHeight; // Height of each petal
    this.petalColor = petalColor; // Colour of the petals
    this.centerSize = centerSize; // Size of the central part of the flower
    this.circleColor = circleColor; // Colour of the central circle
    this.numCircles = numCircles; // Number of concentric circles in the center
    this.glowColour = glowColour; // Color used for the petal's glow effect
  }

  /**
   * Displays the flower on the canvas, consisting of multiple petals and a central glowing circle.
   */
  display() {
    push(); // Isolate the drawing style settings and transformations
    translate(this.x, this.y); // Move the origin to the flower's center for rotation

    // Draw flower petals with outer glow
    fill(this.petalColor); // Set the fill color for the petals
    noStroke(); // No outline for the petals
    let angleStep = TWO_PI / this.petalCount; // Calculate the angle between petals

    for (let i = 0; i < this.petalCount; i++) {
      let angle = i * angleStep;  // Calculate the rotation angle for each petal
      push(); // Isolate the transformation for each petal
      rotate(angle); // Isolate the transformation for each petal

       // Draw the main petal shape as an ellipse
      ellipse(this.petalHeight / 2, 0, this.petalHeight, this.petalWidth); // Swap width and height to rotate ellipse

      // Draw an outer glow for the petal
      fill(color(this.petalColor[0] + 50, this.petalColor[1] + 50, this.petalColor[2] + 50, 100)); // Brighter color with lower opacity
      ellipse(this.petalHeight / 2 + 1, 0, this.petalHeight + 2, this.petalWidth + 2); // Slightly larger with offset

      pop(); // Restore previous transformation state
    }

    // Draw the glowing center using a GlowingCircle instance
    fill(this.circleColor);
    let circle = new GlowingCircle(0, 0, this.centerSize, this.circleColor); // Create the central glowing circle
        circle.display(); // Display the glowing circle at the center
    pop(); // Restore original state, ensuring no interference with other drawings
  }

  
}