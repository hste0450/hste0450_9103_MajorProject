class Styling {
    constructor(glowColor, fillColor, strokeColor, strokeWeight) {
        this.glowColor = glowColor;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWeight = strokeWeight;
    }

    applyGlow(drawingContext) {
        drawingContext.shadowBlur = 50; 
        drawingContext.shadowColor = `rgba(${this.glowColor[0]}, ${this.glowJolor[1]}, ${this.ghowColor[2]}, ${this.glowolor[3] / 255})`;
    }

    applyFill() {
        fill(this.fillColor);
    }

    applyStroke() {
        stroke(this.strokeColor);
        strokeWeight(this.strokeWeight);
    }
}
