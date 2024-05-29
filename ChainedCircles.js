//This class defines a chain of glowing circles arranged in a circular pattern

class ChainedCircles {
     //Constructor initializes a new instance of ChainedCircles with a central position, radius, count of circles, and customizable colors and stroke weight
    constructor(x, y, radius, count, glowColor = [0, 100, 255, 150], circleColor = [255, 255, 255, 255], strokeWeight = 1) {
        this.x = x; //X-coordinate of the center of the chain
        this.y = y; //Y-coordinate of the center of the chain
        this.radius = radius; //Radius of the circle on which the centers of the small circles lie
        this.count = count; //Total number of circles in the chain
        this.glowColor = glowColor; // Color for the glow, defaults to a semi-transparent blue
        this.circleColor = circleColor; // Color for the circles, defaults to opaque white
        this.strokeWeight = strokeWeight;
        this.sizePattern = [1.0, 0.8, 0.6, 0.8, 1.0, 1.2, 1.4, 1.2]; // Pattern to vary the size of the circles in the chain
    }
    
    //Displays the chained circles with glowing effects on the canvas
    display() {
        blendMode(ADD); // Use additive blending to enhance the glow effect
        let angle = 0; // Start angle for the first circle
        let previousDiameter = 0; // Diameter of the previous circle, used to calculate the next position

        for (let i = 0; i < this.count; i++) {
            let sizeMultiplier = this.sizePattern[i % this.sizePattern.length]; // Get the size multiplier from the pattern
            let circleDiameter = ((2 * PI * this.radius) / this.count) * sizeMultiplier; // Calculate diameter based on the size pattern and circle count

            // Calculate the incremental angle to place each circle just touching the previous
            if (i > 0) {
                angle += asin((previousDiameter / 2 + circleDiameter / 2) / this.radius);
            }

            // Calculate the position of the circle based on the current angle
            let posX = this.x + cos(angle) * this.radius;
            let posY = this.y + sin(angle) * this.radius;
            
            // Apply the glow effect to the circle
            this.applyGlow(posX, posY, circleDiameter);

            // Update the diameter for the next iteration
            previousDiameter = circleDiameter;
        }

        blendMode(BLEND); // Reset blending mode to normal to avoid affecting other graphic elements
    }

     //Applies a glowing effect to the circles
        applyGlow(x, y, diameter) {
        // Set the shadow (glow) properties for the circle
        let glowColor = color(this.glowColor[0], this.glowColor[1], this.glowColor[2], this.glowColor[3]);
        drawingContext.shadowBlur = 50; // Set the glow spread
        drawingContext.shadowColor = glowColor; // Set the glow color

        // Set the drawing properties for the circle
        let circleColor = color(this.circleColor[0], this.circleColor[1], this.circleColor[2], this.circleColor[3]);
        noFill();
        stroke(circleColor);
        strokeWeight(this.strokeWeight);

        // Draw the circle multiple times with slight size increments to enhance the glow effect
        for (let i = 0; i < 3; i++) {
            let increment = i * 2;  // Incremental increase in diameter for each layer
            ellipse(x, y, diameter + increment, diameter + increment);
        }
    }
}
