/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new AzaliiaDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class AzaliiaDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    //..
    //..
    //..
    this.legX = 0;
    this.angle = 0;
    //this.rotationSpeed = 0.05;
    this.handX = 0;
    this.speed = 1;
    this.starX = 0;
    this.speed1 = 0.8;

  }
  update() {
    this.handX = this.handX + this.speed;
    if (this.handX > 8 || this.handX < -8) {
      this.speed = -this.speed;
    }
    this.starX = this.starX + this.speed1;
    if (this.starX > 50 || this.starX < -50) {
      this.speed1 = -this.speed1;
    }

    // this.legX++;
    //this.angle += this.rotationSpeed;
    // update properties here to achieve
    // your dancer's desired moves and behaviour
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    //rotateY(frameCount * 0.01);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️


    push();
    translate(this.starX, 0);

    //leg left
    noStroke();
    fill(247, 202, 166);
    rect(-20, 40, 10, 40);

    push();
    //translate(this.legX, 0);
    rect(10, 40, 10, 40);
    pop();
    if (this.speed1 < 0) {
      //left l1
      rect(-25, 75, 5, 5);
      //r l2
      rect(5, 75, 5, 5);
    } else {

      //r l1
      rect(19, 75, 5, 5);
      //left l2
      rect(-10, 75, 5, 5);
    }


    //body
    stroke(1);
    if (this.speed1 < 0) {
      fill(134, 217, 252);
    } else {
      fill(150, 3, 8)
    }
    beginShape();
    for (let i = 0; i < TWO_PI; i += TWO_PI / 5) {
      let angle = i + PI / 2;
      let x = cos(angle) * 50;
      let y = sin(angle) * 50;
      vertex(x, y);

      angle += TWO_PI / 10;
      x = cos(angle) * 90;
      y = sin(angle) * 90;
      vertex(x, y);
    }
    endShape(CLOSE);

    //face
    stroke(1);
    fill(247, 202, 166);
    ellipse(0, -20, 60, 40);

    //mouth
    push();
    translate(10, -30);
    fill(245, 81, 152);
    beginShape();
    vertex(-15, 20);
    bezierVertex(-10, 40, 5, 20, 5, 15);
    endShape();
    pop();

    if (this.speed1 > 0) {
      //eye left
      fill(255);
      ellipse(-10, -25, 17, 10);
      fill(171, 15, 160);
      circle(-7, -25, 10);
      fill(0);
      circle(-5, -25, 5);
      //eye right
      fill(255);
      ellipse(10, -25, 17, 10);
      fill(171, 15, 160);
      circle(12, -25, 10);
      fill(0);
      circle(14, -25, 5);

    } else {
      //eye left 2
      fill(255);
      ellipse(-10, -25, 17, 10);
      fill(203, 245, 241);
      circle(-12, -25, 10);
      fill(0);
      circle(-14, -25, 5);
      //eye right 2 
      fill(255);
      ellipse(10, -25, 17, 10);
      fill(203, 245, 241);
      circle(7, -25, 10);
      fill(0);
      circle(5, -25, 5);
    }

    //hand left
    push();
    translate(this.handX, 0);
    if (this.speed1 < 0) {
      // if (frameCount % (frameRate() * 4) === 0) {
      noStroke();
      fill(247, 202, 166);
      rect(-70, 5, 40, 8);
      rect(-70, 5, 8, -25);
      rect(-80, -20, 14, 8);

      //hand r
      noStroke();
      fill(247, 202, 166);
      rect(30, 5, 40, 8);
      rect(62, 5, 8, 25);
      rect(68, 22, 12, 8);
    } else {

      //hand l2
      noStroke();
      fill(247, 202, 166);
      rect(-70, 5, 40, 8);
      rect(-70, 5, 8, 20);
      rect(-76, 22, 14, 8);

      //handr2
      noStroke();
      fill(247, 202, 166);
      rect(30, 5, 40, 8);
      rect(62, 5, 8, -25);
      rect(68, -20, 12, 8);
    }

    pop();
    pop();


    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/