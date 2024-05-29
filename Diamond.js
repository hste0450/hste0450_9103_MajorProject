//This class represents a geometric 'diamond' shape created by positioning circles at the corner of the square

class Diamond {
  //constructs a diamond object
  constructor(x, y, size, colour) {
    this.x = x; //Center x-coordinate of the diamond
    this.y = y; //Center y-coordinate of the diamond
    this.size = size; //Size of the swuare that forms the basis of the diamond
    this.colour = colour; //Colour of the central square
  }

  /*
  Displays the diamond on the canvas.
  Draws a centraal square and four circles at its corners to create the illusion of a diamond shape
  */
  display() {
    //Configure the drawing properties for the central square
    fill(this.colour); // Fill the square with the specified colour
    rectMode(CENTER); //Set the rectangle drawing mode so that the rectangle is centered at (x,y)
    rect(this.x, this.y, this.size, this.size); // Draw the square

    // Draw four circles at the corners of the square to complete the diamond shape
    let offsets = [-0.5, 0.5]; // Offset multipliers to position the circles at the corners
    noStroke(); // No stroke for the circles
    fill(27, 27, 37); // Fill color for the circles, same as background colour
    for (let dx of offsets) {
      for (let dy of offsets) {
        ellipse(this.x + dx * this.size, // X position of the circle
          this.y + dy * this.size, // Y position of the circle
          this.size, this.size); // Diameter of the circles
      }
    }
  }
}
