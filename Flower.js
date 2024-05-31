//This class represents a "flower" shape

class Flower {
  // Constructs a Flower object with initial properties
  constructor(x, y, glowColors, centerSize, petalSize) {
    this.x = x; // X-coordinate of the flower's center
    this.y = y; // Y-coordinate of the flower's center
    this.glowColors = glowColors; // Array storing possible colors for the glow
    this.currentColor = random(glowColors); // Randomly select an initial color for the glow
    this.centerSize = centerSize; // Diameter of the flower's center
    this.angle = 0; // Initial rotation angle for dynamic effect
    this.petalSize = petalSize; // Size of the flower petals 
  }

  // Method to display the flower on the canvas
  display() {
    push(); // Save the current drawing style settings and transformations
    this.petalSize = (windowWidth/50, windowWidth/50);
    this.centerSize = (windowWidth/50, windowWidth/50);
    translate(this.x, this.y); // Move the origin to the flower's center
    rotate(this.angle); // Rotate the flower for dynamic visual effect
    this.angle += 0.03; // Increment the angle for continuous rotation

    // Apply shadow settings for glowing effect
    drawingContext.shadowBlur = 40; // Set the blur radius for the shadow
    drawingContext.shadowColor = color(this.currentColor[0], this.currentColor[1], this.currentColor[2], 200); // Use the current glow color

    // Draw each petal with a glow effect
    for (let i = 0; i < 8; i++) {
      push(); // Save the current transformation state
      rotate(TWO_PI / 8 * i); // Rotate to the correct angle for this petal
      fill(255,255,255, 200); // Set the fill color to white with transparency for petals
      stroke(this.currentColor); 
      strokeWeight(1);
      ellipse(0, this.petalSize, this.petalSize * 2, this.petalSize * 4); // Draw the petal
      pop(); // Restore the previous transformation state
    }

    // Draw concentric circles for the center of the flower
    fill(255);  // Set the fill color for the center
    noStroke(); // No stroke for the center
    ellipse(0, 0, this.centerSize*3, this.centerSize*3); // Largest circle
    ellipse(0, 0, this.centerSize*2, this.centerSize*2); // Medium circle
    ellipse(0, 0, this.centerSize, this.centerSize); // Smallest circle
    pop(); // Restore original state
  }
}
