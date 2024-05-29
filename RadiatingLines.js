//This class represents a set of radiating lines

class RadiatingLines {
    constructor(x, y, length, numLines, glowColor = [134, 169, 228, 150], strokeWeight = 1) {
        this.x = x; // Central x-coordinate for the radiating lines
        this.y = y; // Central y-coordinate for the radiating lines
        this.length = length; // Length of each line
        this.numLines = numLines; // Total number of lines to be drawn
        this.glowColor = glowColor; // Color used for the lines' glow effect
        this.strokeWeight = strokeWeight; // Stroke thickness of the radiating lines
    }
  
    /**
     * Displays the radiating lines on the canvas.
     * Applies a glow effect using canvas shadow properties and draws lines radiating from the center.
     */
    display() {
        push(); // Isolate the drawing settings
        translate(this.x, this.y); // Move the origin to the center of the radiating lines

        // Apply shadow for glow effect
        drawingContext.shadowBlur = 30; // Set the intensity of the glow
        drawingContext.shadowColor = `rgba(${this.glowColor[0]}, ${this.glowColor[1]}, ${this.glowColor[2]}, ${this.glowColor[3] / 255})`; // Adjust opacity for the glow

        stroke(255); // Set the color of the lines
        strokeWeight(this.strokeWeight); // Set the thickness of the lines
        
         // Draw each line radiating from the center
        for (let i = 0; i < this.numLines; i++) {
            let angle = TWO_PI / this.numLines * i; // Calculate the angle for each line
            let x2 = this.length * cos(angle); // Calculate the endpoint x-coordinate based on the angle
            let y2 = this.length * sin(angle); // Calculate the endpoint y-coordinate based on the angle
            line(0, 0, x2, y2); // Draw the line from the center to the calculated endpoint
        }

        pop(); // Restore previous drawing settings

        // Reset shadow to avoid affecting other elements
        drawingContext.shadowBlur = 0;
        drawingContext.shadowColor = 'rgba(0, 0, 0, 0)';
    }
}
