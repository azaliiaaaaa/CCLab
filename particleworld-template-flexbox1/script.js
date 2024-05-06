let IMG_SIZE = 300;

let particles = [];
const NUM_OF_PARTICLES = 250;
let startTime;
let flags = [];
let img7;
let img8;
let img9;
let img10;
let img11;
let img12;

let decoMode = 0;

let buttonA;
let buttonB;
let buttonC;
let buttonD;

let text1 = ["W", "E", "L", "C", "O", "M", "E", ".", "T", "O", ".", "T", "H", "E"]
let text2 = ["B", "-", "D", "A", "Y", ".", "P", "A", "R", "T", "Y"]

let partyCone;


function preload() {
  img10 = loadImage("3.png");
  img7 = loadImage("C.png");
  img9 = loadImage("1.png");
  img8 = loadImage("2.png");
  img11 = loadImage("4.png");
  img12 = loadImage("12.png");
}

function setup() {
  let canvas = createCanvas(800, windowHeight);
  canvas.parent("p5-canvas-container");
  startTime = millis();

  buttonA = new Button(120, 200, 30);
  buttonB = new Button(160, 200, 30);
  buttonC = new Button(200, 200, 30);
  buttonD = new Button(240, 200, 30);

  img7.resize(IMG_SIZE, IMG_SIZE);

  // genereate flags
  for (let i = 0; i < text2.length; i++) {
    flags.push(new Flag(230 + i * 40, 150, text2[i], 1.5));
  }
  for (let i = 0; i < text1.length; i++) {
    flags.push(new Flag(100 + i * 50, 55, text1[i], 1.0));
  }

  partyCone = new Cone(width / 2, height / 2);
}


function draw() {
  background(243, 183, 247);
  image(img7, 260, 260, IMG_SIZE, 450);
  image(img12, 30, 150, 250, 400);

  if (buttonA.checkMouse() == true) {
    image(img8, 374, 173, 70, 90);
  }
  buttonA.display();

  if (buttonB.checkMouse() == true) {
    image(img10, 353, 259, 117, 50);
    image(img10, 324, 370, 170, 60);
    image(img10, 290, 470, 240, 70);
  }
  buttonB.display();


  if (buttonC.checkMouse() == true) {
    image(img9, 360, 293, 30, 30);
    image(img9, 425, 333, 30, 30);
    image(img9, 404, 390, 30, 30);
    image(img9, 360, 450, 30, 30);
    image(img9, 436, 432, 30, 30);
    image(img9, 490, 540, 30, 30);
    image(img9, 300, 564, 30, 30);
  }
  buttonC.display();


  if (buttonD.checkMouse() == true) {
    image(img11, 425, 293, 30, 30);
    image(img11, 360, 333, 30, 30);
    image(img11, 438, 390, 30, 30);
    image(img11, 467, 441, 30, 30);
    image(img11, 326, 400, 30, 30);
    image(img11, 368, 541, 30, 30);
    image(img11, 409, 565, 30, 30);
  }
  buttonD.display();


  noStroke();
  // rect(260, 200, IMG_SIZE, 450);


  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.applyWind();
    p.stop();
    p.update();
    p.display();
  }

  for (let i = 0; i < flags.length; i++) {
    let f = flags[i];
    f.display();
  }

  //
  let isPressed = partyCone.drag();
  // if cone is released, generate particles   
  if (isPressed) {
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
      particles[i] = new Particle(partyCone.x, partyCone.y);
    }
  }

  partyCone.display();


}

class Cone {
  constructor(startX, startY) {
    this.x = startX + 270;
    this.y = startY + 100;
  }
  drag() {
    if (mouseX > this.x - 40 && this.x + 40 &&
      mouseY > this.y - 20 && mouseY < this.y + 150) {
      // in
      if (mouseIsPressed) {
        this.x = mouseX;
        this.y = mouseY;
        return true;
      }
    } else {
      // out
    }
    return false;
  }
  display() {
    push();
    translate(this.x, this.y);
    fill(255, 225, 0);
    noStroke();
    triangle(-40, 0, 0, 210, 40, 0);
    ellipse(0, 0, 80, 35, 300, 300);
    stroke(153, 66, 245);
    arc(0, 30, 73, 35, PI, TWO_PI);
    arc(0, 40, 64, 35, PI, TWO_PI);
    arc(0, 80, 45, 33, PI, TWO_PI);
    arc(0, 120, 30, 30, PI, TWO_PI);

    // circle(0, 0, 15);
    // noFill();
    // stroke(255, 0, 0);
    // rect(-40, -20, 80, 200);
    pop();
  }
}


class Particle {
  // constructor function
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.xspd = random(-0.6, 0.6);
    this.yspd = random(-8, -0.4);
    this.dia = random(3, 6);
    this.dir = 1;
    this.r = random(240);
    this.g = random(240);
    this.b = random(240);
    this.rotSpd = random(0.01, 0.20);
    this.gravity = 0.04;
    this.isRising = true;
  }
  update() {
    if (this.isRising) {
      this.x += this.xspd * -this.dir;
      this.y += this.yspd;
      if (millis() - startTime > 4000) {
        this.isRising = false;
      }
    } else {
      this.yspd += this.gravity;
      this.x += this.xspd * -this.dir;
      this.y += this.yspd;
    }
  }
  display() {

    push();
    translate(this.x, this.y);

    rotate(frameCount * this.rotSpd);
    stroke(this.r, this.g, this.b);

    fill(this.r, this.g, this.b, 100);
    beginShape();
    for (let i = 0; i < TWO_PI; i += TWO_PI / 5) {
      let angle = i + PI / 2;
      let x = cos(angle) * 5;
      let y = sin(angle) * 5;
      vertex(x, y);

      angle += TWO_PI / 10;
      x = cos(angle) * 9;
      y = sin(angle) * 9;
      vertex(x, y);
    }
    endShape(CLOSE);
    rect(10, 10, 5, 10);
    circle(0, 0, this.dia);
    circle(3, 19, 5);

    pop();
  }
  applyWind() {
    if (mouseX < width / 2) {
      this.dir = 1;
    } else {
      this.dir = -1;
    }
  }
  stop() {
    if (this.y >= height - 20) {
      this.yspd = 0;
      this.xspd = 0;
    }
  }
}

class Flag {
  constructor(startX, startY, t, scl) {
    this.x = startX;
    this.y = startY;
    this.text = t;
    this.r = random(240);
    this.g = random(240);
    this.b = random(240);
    this.size = 50;
    this.scl = scl;
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.scl);
    fill(this.r, this.g, this.b);
    triangle(0, 0,
      -this.size / 2, -this.size,
      this.size / 2, -this.size);
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text(this.text, 0, -this.size / 2);
    pop();
  }
}
class Button {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad / 1.2;
    // color
    this.r = 255;
    this.g = 255;
    this.b = 255;
  }
  checkMouse() {
    let distance = dist(this.x - 85, this.y + 450, mouseX, mouseY);
    if (distance < this.rad * 1.2) {
      // mouse is in the area
      this.r = 255;
      this.g = 255;
      this.b = 0;
      if (mouseIsPressed) {
        this.r = 255;
        this.b = 0;
        this.g = 0;
        return true;
      }
    } else {
      // mouse is out of the area
      this.r = 255;
      this.g = 255;
      this.b = 255;
    }
    // return false;
  }
  display() {
    push(); // for styling

    noStroke();
    fill(this.r, this.g, this.b);
    ellipse(this.x - 85, this.y + 470, this.rad * 1.2, this.rad * 1.2); // ellipse takes a diameter!

    pop();
  }
}
