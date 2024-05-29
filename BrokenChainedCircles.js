//This class manages a broken chain of glowing circles

class BrokenChainedCircles {
    constructor(x, y, radius, count, glowColor, circleColor, strokeWeight) {
        this.x = x; //Center x-coordinate
        this.y = y; //Center y-coordinate
        this.baseRadius = radius; //Radius of the arrangement
        this.count = count; //Number of circles
        this.glowColor = glowColor; //Colour of the glow
        this.circleColor = circleColor; //Colour of the circles
        this.strokeWeight = strokeWeight; //Stroke thickness
        this.sizePattern = [1.0, 0.8, 0.6, 0.8, 1.0, 1.2, 1.4, 1.2]; //Pattern of sizes for the circles
        this.positions = []; //Array to store positions and sizes of the circles
        this.angleOffsets = new Array(count).fill(0).map(() => random(TWO_PI)); // Random initial angles for rotation
        this.setupPositions(); //Initialize positions
    }

    setupPositions() {
        let angleStep = 2 * PI / this.count; // Angle step between each circle, ensuring evenly spaced angles
        let angle = 0;

        for (let i = 0; i < this.count; i++) {
            let sizeMultiplier = this.sizePattern[i % this.sizePattern.length]; //Apply size pattern
            let circleDiameter = ((1.5 * PI * this.radius) / this.count) * sizeMultiplier * 0.5; // Calculate diameter based on radius and pattern

            let posX = this.x + cos(angle) * this.radius;
            let posY = this.y + sin(angle) * this.radius;
            this.positions.push({x: posX, y: posY, diameter: circleDiameter});

            angle += angleStep; // Increment angle for the next position/circle
        }
    }

    updatePosition(index, angle, init = false) {
        let sizeMultiplier = this.sizePattern[index % this.sizePattern.length];
        let circleDiameter = ((1.5 * PI * this.baseRadius) / this.count) * sizeMultiplier * 0.5;
        let time = millis() / 5000;  // Slower time factor for smoother changes
    
        if (!init) {
            let radiusNoiseFactor = noise(this.x * 0.005 + index, this.y * 0.005 + index, time);  // Slowed down noise factor
            let radiusNoise = this.baseRadius + map(radiusNoiseFactor, 0, 1, -20, 20);
            let posX = this.x + cos(angle) * radiusNoise;
            let posY = this.y + sin(angle) * radiusNoise;
            let sizeNoiseFactor = noise(this.x * 0.005 + index * 0.5, this.y * 0.005 + index * 0.5, time);
            circleDiameter *= map(sizeNoiseFactor, 0, 1, 0.8, 1.2);
    
            this.positions[index] = {x: posX, y: posY, diameter: circleDiameter};
        } else {
            let posX = this.x + cos(angle) * this.baseRadius;
            let posY = this.y + sin(angle) * this.baseRadius;
            this.positions[index] = {x: posX, y: posY, diameter: circleDiameter};
        }
    }

    update() {
        let angleStep = 2 * PI / this.count;
        let angle = 0;
    
        for (let i = 0; i < this.count; i++) {
            this.updatePosition(i, angle);
            angle += angleStep;
        }
    }
    

    display() {
        blendMode(ADD); //Set blend mote to ADD for glowing effect
        for (let pos of this.positions) {
            this.applyGlow(pos.x, pos.y, pos.diameter); //Apply glow to each position
        }
        blendMode(BLEND); //Reset blend mode
    }

    applyGlow(x, y, diameter) {
        let glowColor = color(this.glowColor[0], this.glowColor[1], this.glowColor[2], this.glowColor[3]); //Set the glow colour
        drawingContext.shadowBlur = 50; //Set shadow blur for glow effect
        drawingContext.shadowColor = glowColor; //Set shadow colour

        let circleColor = color(this.circleColor[0], this.circleColor[1], this.circleColor[2], this.circleColor[3]); //Set the circle colour
        noFill();
        stroke(circleColor);
        strokeWeight(this.strokeWeight);

        for (let i = 0; i < 3; i++) {
            let increment = i * 2; //Increment size for multiple layers
            ellipse(x, y, diameter + increment, diameter + increment); //Draw the circle with the increment
        }
    }
}
