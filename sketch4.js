class MyFairy {
  constructor(imgPath, x, y, scale, fadeDuration) {
    this.img = loadImage(imgPath);
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.alpha = 255;
    this.fadeSpeed = 255 / (frameRate() * fadeDuration);
    this.fadeDuration = fadeDuration;
    this.fadeStartTime = millis(); // Record the start time
  }

  display() {
    let scaledWidth = this.img.width * this.scale;
    let scaledHeight = this.img.height * this.scale;

    let isMouseOverRegion = mouseX > this.x && mouseX < this.x + scaledWidth &&
                            mouseY > this.y && mouseY < this.y + scaledHeight;

    if (isMouseOverRegion) {
      this.fadeStartTime = millis(); // Reset the start time when the mouse is over the region
    }

    let elapsedMillis = millis() - this.fadeStartTime;
    let normalizedTime = constrain(elapsedMillis / (this.fadeDuration * 100), 0, 1);

    this.alpha = 255 - normalizedTime * 255;

    if (this.alpha > 0) {
      tint(255, this.alpha);
      image(this.img, this.x, this.y, scaledWidth, scaledHeight);
    }
  }
}

class MyPerson {
  constructor(imgPath, x, y, scale, fadeDuration) {
    this.img = loadImage(imgPath);
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.alpha = 255;
    this.fadeSpeed = 255 / (frameRate() * fadeDuration);
    this.fadeDuration = fadeDuration;
    this.fadeStartTime = millis(); // Record the start time
  }

  display() {
    let scaledWidth = this.img.width * this.scale;
    let scaledHeight = this.img.height * this.scale;

    let isMouseOverRegion = mouseX > this.x && mouseX < this.x + scaledWidth &&
                            mouseY > this.y && mouseY < this.y + scaledHeight;

    if (isMouseOverRegion) {
      this.fadeStartTime = millis(); // Reset the start time when the mouse is over the region
    }

    let elapsedMillis = millis() - this.fadeStartTime;
    let normalizedTime = constrain(elapsedMillis / (this.fadeDuration * 100), 0, 1);

    this.alpha = 255 - normalizedTime * 255;

    if (this.alpha > 0) {
      tint(255, this.alpha);
      image(this.img, this.x, this.y, scaledWidth, scaledHeight);
    }
  }
}

class MyBird {
  constructor(imgPath, x, y, scale, fadeDuration) {
    this.img = loadImage(imgPath);
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.alpha = 255;
    this.fadeSpeed = 255 / (frameRate() * fadeDuration);
    this.fadeDuration = fadeDuration;
    this.fadeStartTime = millis(); // Record the start time
  }

  display() {
    let scaledWidth = this.img.width * this.scale;
    let scaledHeight = this.img.height * this.scale;

    let isMouseOverRegion = mouseX > this.x && mouseX < this.x + scaledWidth &&
                            mouseY > this.y && mouseY < this.y + scaledHeight;

    if (isMouseOverRegion) {
      this.fadeStartTime = millis(); // Reset the start time when the mouse is over the region
    }

    let elapsedMillis = millis() - this.fadeStartTime;
    let normalizedTime = constrain(elapsedMillis / (this.fadeDuration * 100), 0, 1);

    this.alpha = 255 - normalizedTime * 255;

    if (this.alpha > 0) {
      tint(255, this.alpha);
      image(this.img, this.x, this.y, scaledWidth, scaledHeight);
    }
  }
}

let backgroundImage;
let fairy;
let bird;
let person;

function preload() {
  backgroundImage = loadImage('./media/street.jpeg');
  fairy = new MyFairy('./media/fairy-removebg-preview.png', 300, 200, 0.2, 10);
  bird = new MyBird('./media/bird.png', 600, 100, 0.2, 10);
  person = new MyPerson('./media/person.png', 900, 300, 0.8, 10)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // Display the background image
  background(backgroundImage);

  // Display the smaller images using the class methods
  fairy.display();
  bird.display();
  person.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
