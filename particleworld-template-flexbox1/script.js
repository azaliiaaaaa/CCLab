let IMG_SIZE = 300;

let particles = [];
const NUM_OF_PARTICLES = 250;
let startTime;
let flags = [];
let img7;

let text1 = ["W", "E", "L", "C", "O", "M", "E", ".", "T", "O", ".", "T", "H", "E"]
let text2 = ["B", "-", "D", "A", "Y", ".", "P", "A", "R", "T", "Y"]

function preload() {
  img7 = loadImage("C.png");
}

function setup() {
  let canvas = createCanvas(800, windowHeight);
  canvas.parent("p5-canvas-container");
  startTime = millis();

  img7.resize(IMG_SIZE, IMG_SIZE);

  // genereate flags
  for (let i = 0; i < text2.length; i++) {
    flags.push(new Flag(230 + i * 40, 150, text2[i], 1.5));
  }
  for (let i = 0; i < text1.length; i++) {
    flags.push(new Flag(100 + i * 50, 55, text1[i], 1.0));
  }
}


function draw() {
  background(243, 183, 247);

  noStroke();
  // rect(260, 200, IMG_SIZE, 450);
  image(img7, 260, 260, IMG_SIZE, 450);

  // generate
  if (mouseIsPressed) {
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
      particles[i] = new Particle(mouseX, mouseY);
    }
  }

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

  push();
  translate(mouseX, mouseY);
  fill(255, 225, 0);
  noStroke();
  triangle(-40, 0, 0, 210, 40, 0);
  ellipse(0, 0, 80, 35, 300, 300);
  stroke(153, 66, 245);
  arc(0, 30, 73, 35, PI, TWO_PI);
  arc(0, 40, 64, 35, PI, TWO_PI);
  arc(0, 80, 45, 33, PI, TWO_PI);
  arc(0, 120, 30, 30, PI, TWO_PI);
  pop();
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
