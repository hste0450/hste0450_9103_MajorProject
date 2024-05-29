//This class defines a formation of diamond shapes arranged in a circular pattern around a central point

class DiamondFormation{
    //Constructs a DiamondFormation object
    constructor(centerX, centerY, outerRadius, diamondSize, count) {
        this.centerX = centerX; // Center x-coordinate of the diamond formation
        this.centerY = centerY; // Center y-coordinate of the diamond formation
        this.outerRadius = outerRadius; // Radius to place diamonds around the center
        this.diamondSize = diamondSize; // Size of each individual diamond
        this.count = count; // Total number of diamonds to be created
        this.diamonds = []; // Array to store instances of Diamond
        this.createDiamonds(); // Instantly populate the formation with diamonds upon object creation
    }

    /**
   * Creates multiple diamonds positioned in a circular pattern around the center.
   * Each diamond is placed using polar coordinates converted to Cartesian coordinates.
   */
    createDiamonds() {
        let angleStep = TWO_PI / this.count; // Angle step to distribute diamonds evenly around the circle
        for (let i = 0; i < this.count; i++) {
             // Calculate x and y coordinates for each diamond using trigonometry
            let x = this.centerX + this.outerRadius * cos(angleStep * i);
            let y = this.centerY + this.outerRadius * sin(angleStep * i);
            this.diamonds.push(new Diamond(x, y, this.diamondSize, 'white')); // Create and store a new Diamond
        }
    }

    /**
   * Displays all diamonds in the formation.
   * Iterates through the array of diamonds and calls their display method.
   */
    display() {
        this.diamonds.forEach(diamond => {
            diamond.display(); // Call the display method of each diamond instance
        });
    }
}