// This class represents a composite geometric design combining a central diamond shape with glowing circles around its perimeter

class DiamondAndCircle {
  //Constructs a DiamondAndCircle object
  constructor(xPos, yPos, size, colourDiamond, colourCircles, glowColor) {
    this.xPos = xPos; // X-coordinate of the diamond's center
    this.yPos = yPos; // Y-coordinate of the diamond's center
    this.size = size; // Size of the diamond's square
    this.colourDiamond = colourDiamond; // Colour of the diamond
    this.colourCircles = colourCircles; // Colour of the circles
    this.glowColor = glowColor; // Glow colour for the circles
  }

  //Displays the diamond and surrounding glowing circles on the canvas
  display() {
    //Draw the diamond as a square
    fill(this.colourDiamond);
    rectMode(CENTER);
    rect(this.xPos, this.yPos, this.size, this.size);

    //Calculate positions for circles at each corner of the diamond
    let offsets = [-0.5, 0.5];
    let midOffset = 0.75;

    //Draw larger dark circles at the corners to form the diamond shape
    noStroke();
    fill(27, 27, 37); //Same as background colour
    for (let dx of offsets) {
      for (let dy of offsets) {
        ellipse(this.xPos + dx * this.size, this.yPos + dy * this.size, this.size, this.size);
      }
    }

    // Draw smaller glowing circles with increasing glow intensity
    for (let dx of offsets) {
      for (let dy of offsets) {
        let x = this.xPos + dx * this.size * midOffset;
        let y = this.yPos + dy * this.size * midOffset;
        let size = this.size * 0.2; // Size of the smaller glowing circles
        for (let i = 0; i < 5; i++) {  // Draw 5 layers of circles
          let circle = new GlowingCircle(x, y, size, this.adjustGlowColor(i, this.glowColor));
          circle.display();
        }
      }
    }
  }

  // Function to adjust the glow color based on the layer
  adjustGlowColor(layerIndex, glowColor) {
    let alpha = glowColor[3] / 255 * (100 + 20 * layerIndex);  // Calculate alpha incrementally to enhance glow effect
    return [glowColor[0], glowColor[1], glowColor[2], alpha];
  }
}
