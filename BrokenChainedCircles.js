//This class manages a broken chain of glowing circles, which manages a set of glowing circles arranged in a broken chain pattern

class BrokenChainedCircles {
    //Constructor initializes the properties of the BrokenChainedCircles object
    constructor(x, y, radius, count, glowColor, circleColor, strokeWeight) {
        this.x = x; //Center x-coordinate of the circle arrangement
        this.y = y; //Center y-coordinate of the circle arrangement
        this.radius = radius; //Radius of the arrangement
        this.count = count; //Total number of circles in the chain
        this.glowColor = glowColor; //Colour of the glow effect
        this.circleColor = circleColor; //Colour of the circles themselves
        this.strokeWeight = strokeWeight; //Stroke thickness for each circle
        this.sizePattern = [1.0, 0.8, 0.6, 0.8, 1.0, 1.2, 1.4, 1.2]; //Pattern to vary the size of circles in the chain
        this.positions = []; //Array to store positions and sizes of each circle
        this.setupPositions(); //Call method to initialize positions based on the size pattern
    }

    //Method to calculate and store the position and diameter for each circle based on the size pattern
    setupPositions() {
        let angleStep = 2 * PI / this.count; // Calculate the angle step to evenly space circles
        let angle = 0;

        for (let i = 0; i < this.count; i++) {
            let sizeMultiplier = this.sizePattern[i % this.sizePattern.length]; //Apply size pattern
            let circleDiameter = ((1.5 * PI * this.radius) / this.count) * sizeMultiplier * 0.5; // Calculate diameter  of each circle based on radius and pattern

            let posX = this.x + cos(angle) * this.radius; //Calculate x position
            let posY = this.y + sin(angle) * this.radius; //Calculate y position
            this.positions.push({x: posX, y: posY, diameter: circleDiameter}); //Store the position and size

            angle += angleStep; // Increment angle for the next circle
        }
    }

    //Method to display all circles using their stored positions and sizes
    display() {
        blendMode(ADD); //Set blend mode to ADD for glowing effect
        for (let pos of this.positions) {
            this.applyGlow(pos.x, pos.y, pos.diameter); //Apply glow effect to each circle
        }
        blendMode(BLEND); //Reset blend mode to default to avoid affecting other graphics
    }

    //Method to draw a glowing circle at a specific position and size
    applyGlow(x, y, diameter) {
        let glowColor = color(this.glowColor[0], this.glowColor[1], this.glowColor[2], this.glowColor[3]); //Set the glow colour
        drawingContext.shadowBlur = 40; //Set shadow blur for glow effect
        drawingContext.shadowColor = glowColor; //Set shadow colour to the glow colour

        let circleColor = color(this.circleColor[0], this.circleColor[1], this.circleColor[2], this.circleColor[3]); //Set the circle colour
        noFill(); //No fill for the circle
        stroke(circleColor); //Set stroke colour
        strokeWeight(this.strokeWeight); //Set stroke weight

        //Draw the circle with an incremental size to enhance the glow effect
        for (let i = 0; i < 2; i++) {
            let increment = i * 2; //Increment size for multiple layers
            ellipse(x, y, diameter + increment, diameter + increment); //Draw the circle with the increment
        }
    }
}
