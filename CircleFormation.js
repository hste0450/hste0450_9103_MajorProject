// This class defines a formation of glowing circles arranged in a circular pattern around a central point

class CircleFormation {
     //Constructs a formation of glowing circles.
    constructor(centerX, centerY, outerRadius, innerCircleRadius, count, glowColors, shadowBlur) {
        this.centerX = centerX;  // Center x-coordinate of the circle formation
        this.centerY = centerY;  // Center y-coordinate of the circle formation
        this.outerRadius = outerRadius;  // Radius to place circles around the center
        this.innerCircleRadius = innerCircleRadius;  // Radius of each individual circle
        this.count = count;  // Number of circles in the formation
        this.glowColors = glowColors;  // Colors used for the glowing effect of circles
        this.shadowBlur = shadowBlur;  // Blur intensity for the glow effect
        this.circles = [];  // Initialize an empty array to hold circle objects
        this.createCircles();  // Call the method to create circles immediately upon instantiation
    }

     //Creates multiple glowing circles positioned in a circular pattern around the center
    createCircles() {
        let angleStep = TWO_PI / this.count;  // Angle step to distribute circles evenly
        for (let i = 0; i < this.count; i++) {
            // Calculate x and y positions for each circle using trigonometry
            let x = this.centerX + this.outerRadius * cos(angleStep * i);
            let y = this.centerY + this.outerRadius * sin(angleStep * i);
            let color = this.glowColors[i % this.glowColors.length]; // Select color from the glowColors array
            // Create a new glowing circle at the calculated position
            this.circles.push(new GlowingCircle(x, y, this.innerCircleRadius, color, this.shadowBlur));
        }
    }

    //Displays all circles in the formation
    display() {
        this.circles.forEach(circle => {
            // Draw each circle multiple times to enhance the glow effect visually
            for (let i = 0; i < 5; i++) {
                circle.display();
            }
        });
    }
}