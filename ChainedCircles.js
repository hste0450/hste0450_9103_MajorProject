//This class defines a chain of glowing circles arranged in a circular pattern

class ChainedCircles {
    constructor(x, y, radius, count, glowColor = [0, 100, 255, 150], circleColor = [255, 255, 255, 255], strokeWeight = 1) {
        this.x = x; // X-coordinate of the center of the chain
        this.y = y; // Y-coordinate of the center of the chain
        this.radius = radius; // Radius on which the centers of the circles lie
        this.count = count; // Total number of circles
        this.glowColor = glowColor; // Color for the glow
        this.circleColor = circleColor; // Color for the circles
        this.strokeWeight = strokeWeight; // Stroke weight for the circles
        this.sizePattern = [1.0, 0.8, 0.6, 0.8, 1.0, 1.2, 1.4, 1.2]; // Size pattern for the circles
        this.noiseOffset = random(1000); // Starting point for Perlin noise
        this.positions = []; // Positions of circles
    }

    // Updates positions and sizes using Perlin noise for a natural, organic feel
    update() {
        let angle = noise(this.noiseOffset) * TWO_PI; // Use noise to vary the starting angle
        this.noiseOffset += 0.005; // Increment the noise offset to change the angle gradually

        this.positions = [];
        for (let i = 0; i < this.count; i++) {
            let sizeMultiplier = this.sizePattern[i % this.sizePattern.length]; // Select the size multiplier from the pattern
            let circleDiameter = ((2 * PI * this.radius) / this.count) * sizeMultiplier; // Calculate the diameter for each circle
            angle += asin(circleDiameter / (2 * this.radius)); // Adjust angle to position the circle so it touches or overlaps the previous one

            let posX = this.x + cos(angle) * this.radius; // Calculate the x-coordinate for the circle
            let posY = this.y + sin(angle) * this.radius; // Calculate the y-coordinate for the circle

            this.positions.push({x: posX, y: posY, diameter: circleDiameter});
            angle += asin(circleDiameter / (2 * this.radius)); // Update angle for next circle
        }
    }

    // Displays the chained circles with glowing effects
    display() {
        blendMode(ADD); //Set blend mode to add for glow effect
        for (const pos of this.positions) {
            this.applyGlow(pos.x, pos.y, pos.diameter); // Apply the glow effect to each circle
        }
        blendMode(BLEND); // Reset blend mode to default
    }

    // Applies a glowing effect to the circles
    applyGlow(x, y, diameter) {
        let glowColor = color(this.glowColor[0], this.glowColor[1], this.glowColor[2], this.glowColor[3]);
        drawingContext.shadowBlur = 20; // Set shadow blur for glow effect
        drawingContext.shadowColor = glowColor; // Set shadow color for glow effect

        let circleColor = color(this.circleColor[0], this.circleColor[1], this.circleColor[2], this.circleColor[3]);
        noFill(); // Don't fill the circle, only draw its outline
        stroke(circleColor); // Set the stroke color
        strokeWeight(this.strokeWeight); // Set the stroke weight
        ellipse(x, y, diameter, diameter); // Draw the circle
    }
}
