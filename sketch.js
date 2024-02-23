let img;
let shapes = [];
let lines = [];
let numShapes = 10; // Number of shapes to draw

function preload() {
  // Load the image
  img = loadImage('./img.png');
}

function setup() {
  createCanvas(img.width, img.height);
  // Create initial shapes
  for (let i = 0; i < numShapes; i++) {
    shapes.push(new Shape());
    lines.push(new Line());
  }
}

function draw() {
  // Display the image
  image(img, 0, 0, width, height);
  
  // Draw and update shapes
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].display();
    lines[i].displayLine();
    shapes[i].update();
    lines[i].updateLine();
  }
}
class Line {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(4, 50);
    this.sizeChange = random(-1.3, 1.3); // Size change rate
    this.angle = random(TWO_PI);
    this.speed = random(1, 4); // Movement speed (randomized)
    this.fadeTimer = random(100); // Initial fade timer offset
    this.fadeDuration = random(10, 1000); // Fade duration (randomized)
    this.opacity = 0; // Initial opacity
    this.shapeType = random(["ellipse", "triangle"]); // Randomly choose shape type
  }

  displayLine() {
    // Sample the color of the background at the current position
    let bgColor = img.get(int(this.x), int(this.y));
    // Set the stroke color with background color and calculated opacity
    stroke(red(bgColor), green(bgColor), blue(bgColor), this.opacity);
    noFill(); // Remove the fill color
    
    // Draw a shape based on the randomly chosen type
    if (this.shapeType === "ellipse") {
      ellipse(this.x, this.y, this.size, this.size);
    } else if (this.shapeType === "triangle") {
      let halfSize = this.size / 2;
      triangle(this.x, this.y - halfSize, this.x - halfSize, this.y + halfSize, this.x + halfSize, this.y + halfSize);
    }
  }

  updateLine() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;
    // Wrap around if out of canvas
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.x = random(width);
      this.y = random(height);
    }
    this.angle += random(-0.1, 0.1); // Randomly change direction
    this.size += this.sizeChange;
    // Constrain size
    this.size = constrain(this.size, 10, 90); // Adjust minimum and maximum size as needed
    
    // Smoothly fade in and fade out
    if (this.fadeIn) {
      this.opacity += 5; // Increase opacity for fade-in effect
      if (this.opacity >= 255) {
        this.fadeIn = false; // Switch to fade-out mode when fully visible
      }
    } else {
      this.opacity -= 5; // Decrease opacity for fade-out effect
      if (this.opacity <= 0) {
        this.fadeIn = true; // Switch back to fade-in mode when fully transparent
      }
    }
  }

}
// Define a Shape class
class Shape {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(10, 40);
    this.sizeChange = random(-1, 1); // Size change rate
    this.angle = random(TWO_PI);
    this.speed = random(0.5, 4); // Movement speed (randomized)
    this.fadeTimer = random(1000); // Initial fade timer offset
    this.fadeDuration = random(300, 600); // Fade duration (randomized)
    this.opacity = 0; // Initial opacity
    this.shapeType = random(["ellipse", "triangle"]); // Randomly choose shape type
  }
  
  // Display the shape
  display() {
    // Sample the color of the background at the current position
    let bgColor = img.get(int(this.x)+10, int(this.y)+10);
    // Set the fill color with background color and calculated opacity
    fill(red(bgColor)*1.5, green(bgColor)*1.5, blue(bgColor)*1.5, this.opacity);
    noStroke(); // Remove the black border
    // Draw a shape based on the randomly chosen type
    if (this.shapeType === "ellipse") {
      ellipse(this.x, this.y, this.size, this.size);
    } else if (this.shapeType === "triangle") {
      let halfSize = this.size / 2;
      triangle(this.x, this.y - halfSize, this.x - halfSize, this.y + halfSize, this.x + halfSize, this.y + halfSize);
    }
  }


  
  // Update shape's position, size, and opacity
  update() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;
    // Wrap around if out of canvas
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.x = random(width);
      this.y = random(height);
    }
    this.angle += random(-0.1, 0.1); // Randomly change direction
    this.size += this.sizeChange;
    // Constrain size
    this.size = constrain(this.size, 10, 90); // Adjust minimum and maximum size as needed
    
    // Smoothly fade in and fade out
    if (this.fadeIn) {
      this.opacity += 5; // Increase opacity for fade-in effect
      if (this.opacity >= 255) {
        this.fadeIn = false; // Switch to fade-out mode when fully visible
      }
    } else {
      this.opacity -= 5; // Decrease opacity for fade-out effect
      if (this.opacity <= 0) {
        this.fadeIn = true; // Switch back to fade-in mode when fully transparent
      }
    }
  }
}
