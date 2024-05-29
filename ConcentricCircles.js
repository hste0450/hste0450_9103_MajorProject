//This class defines a set of concentric circles with glowing effects

class ConcentricCircles {
  constructor(x, y, radius, levels, strokeWeight = 1, glowColors) {
      this.x = x; //Center x-coordinate
      this.y = y; //Center y-coordinate
      this.radius = radius; //Outer radois of the largest circle
      this.levels = levels; //Number of concenctric circles
      this.strokeWeight = strokeWeight; //Stroke thickness
      this.glowColors = glowColors;  // Array of glow colours
  }

  display() {
      for (let i = 0; i < this.levels; i++) {
          let r = this.radius * ((this.levels - i) / this.levels); //Calculate radius of each level
          let currentColor = this.glowColors[i % this.glowColors.length];  // Cycle through provided colors

          // Set shadow properties for glow effect
          drawingContext.shadowBlur = 20;  // Apply consistent glow effect
          drawingContext.shadowColor = `rgba(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]}, ${currentColor[3] / 255})`;

          //Draw the circle with specified properties
          noFill();
          // Set stroke properties
          stroke(255); 
          strokeWeight(this.strokeWeight);
          for (let j = 0; j < 3; j++) {  // Draw each circle 3 times to enhance the glow
            ellipse(this.x, this.y, r * 2, r * 2);
        }

          // Reset shadow properties after drawing each circle to ensure correct glow color application
          drawingContext.shadowBlur = 0;
          drawingContext.shadowColor = 'rgba(0, 0, 0, 0)';
      }
  }
}