let img;
let shapes = [];
let lines = [];
let numShapes = 50; // Number of shapes to draw
let scaledWidth, scaledHeight; // Variables to store scaled image dimensions

function preload() {
  // Load the image
  // img = loadImage('./media/img.png');
  img = loadImage('./media/tree.jpeg');
}
let targetX, targetY; // Target coordinates for mouse interaction

function setup() {
  // Create a canvas that fits the window size
  createCanvas(windowWidth, windowHeight);
   // Calculate scaled dimensions to fit the window
   scaledWidth = min(windowWidth, img.width); // Ensure the width fits within the window
   scaledHeight = img.height * (scaledWidth / img.width); // Maintain aspect ratio
   
   // Resize the image
   img.resize(scaledWidth, scaledHeight);

  // Create initial shapes
  for (let i = 0; i < numShapes; i++) {
    shapes.push(new Shape());
    lines.push(new Line());
  }
}

function draw() {
  // Display the image
  image(img, 0, 0, width, height);
  
  // Set the target coordinates to mouse position
  targetX = mouseX;
  targetY = mouseY;
  shapes[1].display();
  lines[1].displayLine();

  // Draw and update shapes
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].display();
    lines[i].displayLine();
    shapes[i].update();
    lines[i].updateLine();
    shapes[i].moveTowardsMouse(targetX, targetY); // Move shapes towards mouse
    lines[i].moveTowardsMouse(targetX, targetY); // Move lines towards mouse
  }
}

//see if can add more shapes and lines
class Line {
  constructor() {
    this.saturationChange = random(-1, 1); // Saturation change rate
    this.x = random(width);
    this.y = random(height);
    this.lineWidth = random(0.8, 7); // Initial line width
    this.lineWidthChange = random(-0.2, 0.2); // Line width change rate
    this.size = random(4, 50);
    this.sizeChange = random(-2, 2); // Size change rate
    this.angle = random(TWO_PI);
    this.speed = random(1, 4); // Movement speed (randomized)
    this.fadeTimer = random(100); // Initial fade timer offset
    this.fadeDuration = random(10, 1000); // Fade duration (randomized)
    this.opacity = 0; // Initial opacity
    this.shapeType = random(["ellipse", "triangle", "rectangle"]); // Randomly choose shape type
  }

  displayLine() {
    // Sample the color of the background at the current position
    let bgColor = img.get(int(this.x), int(this.y));
    // Extract RGB components
    let r = red(bgColor);
    let g = green(bgColor);
    let b = blue(bgColor);
    // Increase saturation
    let maxRGB = max(r, g, b);
    let minRGB = min(r, g, b);
    let delta = (maxRGB - minRGB) / 255;
    let l = (maxRGB + minRGB) / 510;
    let s;
    if (l > 0.5) {
      s = delta / (2 - maxRGB - minRGB);
    } else {
      s = delta / (maxRGB + minRGB);
    }
    let newS = constrain(s * 100 + this.saturationChange, 0, 100);
    let c = color(r, g, b);
    c = color(hue(c), saturation(c+20) * (newS / 100), brightness(c));
    // Set the fill color with adjusted saturation
    fill(c);
    // Set the stroke color with background color and calculated opacity
    stroke(red(bgColor), green(bgColor), blue(bgColor), this.opacity);
    noFill(); // Remove the fill color
    strokeWeight(this.lineWidth); // Set the line width
    
    // Draw a shape based on the randomly chosen type
    if (this.shapeType === "ellipse") {
      ellipse(this.x, this.y, this.size, this.size);
    } else if (this.shapeType === "triangle") {
      let halfSize = this.size / 2;
      triangle(this.x, this.y - halfSize, this.x - halfSize, this.y + halfSize, this.x + halfSize, this.y + halfSize);
    } else if (this.shapeType === "rectangle") {
      rectMode(CENTER);
      rect(this.x,this.y,this.size*random(0.3,0.8),this.size*random(0.3,0.8));
    }
  }

  updateLine() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;
    // Update line width
    this.lineWidth += this.lineWidthChange;
    // Constrain line width
    this.lineWidth = constrain(this.lineWidth, 0.8, 7); // Adjust minimum and maximum width as needed
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

  moveTowardsMouse(targetX, targetY) {
    let dx = targetX - this.x;
    let dy = targetY - this.y;
    let angleToMouse = atan2(dy, dx);
    let speed = 2; // Adjust the speed as needed
    this.x += cos(angleToMouse) * speed;
    this.y += sin(angleToMouse) * speed;
  }

}
// Define a Shape class
class Shape {
  constructor() {
    this.saturationChange = random(-5, 5);
    this.x = random(width);
    this.y = random(height);
    this.size = random(10, 40);
    this.sizeChange = random(-0.2, 0.2); // Size change rate
    this.angle = random(TWO_PI);
    this.speed = random(0.5, 4); // Movement speed (randomized)
    this.fadeTimer = random(100); // Initial fade timer offset
    this.fadeDuration = random(500, 1000); // Fade duration (randomized)
    this.opacity = 0; // Initial opacity
    this.shapeType = random(["ellipse", "triangle","rectangle"]); // Randomly choose shape type
  }
  
  // Display the shape
  display() {
    // Sample the color of the background at the current position
    let bgColor = img.get(int(this.x), int(this.y));    // Sample the color of the background at the current position
    // Extract RGB components
    let r = red(bgColor);
    let g = green(bgColor);
    let b = blue(bgColor);
    // Increase saturation
    let maxRGB = max(r, g, b);
    let minRGB = min(r, g, b);
    let delta = (maxRGB - minRGB) / 255;
    let l = (maxRGB + minRGB) / 510;
    let s;
    if (l > 0.5) {
      s = delta / (2 - maxRGB - minRGB);
    } else {
      s = delta / (maxRGB + minRGB);
    }
    let newS = constrain(s * 100 + this.saturationChange, 0, 100);
    let c = color(r, g, b);
    c = color(hue(c), saturation(c) * (newS / 100), brightness(c));
    // Set the fill color with adjusted saturation
    fill(c);
    // Set the fill color with background color and calculated opacity
    fill(red(bgColor)*1.5, green(bgColor)*1.5, blue(bgColor)*1.5, this.opacity);
    noStroke(); // Remove the black border
    // Draw a shape based on the randomly chosen type
    if (this.shapeType === "ellipse") {
      ellipse(this.x, this.y, this.size, this.size);
    } else if (this.shapeType === "triangle") {
      let halfSize = this.size / 2;
      triangle(this.x, this.y - halfSize, this.x - halfSize, this.y + halfSize, this.x + halfSize, this.y + halfSize);
    } else if (this.shapeType === "rectangle") {
      rectMode(CENTER);
      rect(this.x,this.y,this.size,this.size);
    }
  }
// *random(0.8,1)*random(0.8,1)
  
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

  moveTowardsMouse(targetX, targetY) {
    let dx = targetX - this.x;
    let dy = targetY - this.y;
    let angleToMouse = atan2(dy, dx);
    let speed = 2.8; // Adjust the speed as needed
    this.x += cos(angleToMouse) * speed;
    this.y += sin(angleToMouse) * speed;
  }
}
