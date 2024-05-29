//This class manages a formation of radiating lines grouped in a circle

class RadiatingCircleFormation {
    //Constructs a RadiatingCircleFormation object
    constructor(centerX, centerY, outerRadius, numObjects, lineLength, numLines, glowColor, strokeWeight = 1) {
        this.centerX = centerX; // Central x-coordinate for the formation
        this.centerY = centerY; // Central y-coordinate for the formation
        this.outerRadius = outerRadius; // Radius to distribute the radiating objects
        this.numObjects = numObjects; // Total number of radiating line objects
        this.lineLength = lineLength; // Length of each radiating line
        this.numLines = numLines; // Number of lines in each radiating object
        this.glowColor = glowColor; // Colour used for the lines' glow effect
        this.strokeWeight = strokeWeight; // Stroke thickness of the radiating lines
        this.radiatingObjects = []; // Array to hold all radiating line objects
        this.createRadiatingObjects(); // Method call to create the objects
    }
    /**
     * Creates radiating line objects arranged in a circular pattern around the center
     */
    createRadiatingObjects() {
        let angleStep = TWO_PI / this.numObjects; // Angle step to evenly distribute objects
        for (let i = 0; i < this.numObjects; i++) {
            let x = this.centerX + this.outerRadius * cos(angleStep * i); // Calculate x-position for each object
            let y = this.centerY + this.outerRadius * sin(angleStep * i); // Calculate y-position for each object
            let angle = angleStep * i;
            // Create a new RadiatingLines object for each position and push it to the array
            this.radiatingObjects.push(new RadiatingLines(x, y, this.lineLength, this.numLines, this.glowColor, this.strokeWeight, angle));
        }
    } 

    /**
     * Displays all radiating line objects in the formation.
     * Each object is drawn multiple times to enhance visual effects such as glow.
     */
    display() {
        this.radiatingObjects.forEach(obj => {
            for (let i = 0; i < 5; i++) {  // Loop to intensify the display effect by repetition
                obj.display();// Call the display method of each radiating object
            }
        });
    }
    
}