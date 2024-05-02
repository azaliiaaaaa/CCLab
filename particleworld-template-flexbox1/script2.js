let numCandles = 15;
let candles = [];
let flames = [];
let mic;
let restartButton;
function setup() {
  let canvas = createCanvas(700, 450);
  canvas.parent("cnvcontainer");

  mic = new p5.AudioIn();
  mic.start();

  // restartButton = createButton('I Have Another Wish');
  // restartButton.position(width / 2 + 570, height + 100);
  // restartButton.mousePressed(restartCandles);
  // restartButton.class('pink-button');

  for (let i = 0; i < numCandles; i++) {
    let startX = width / 2 + (i - numCandles / 2) * 35;
    let startY = height / 2;
    candles[i] = new Candle(startX, startY);
  }
}

let isBlown = false;

function draw() {
  background(243, 183, 247);

  restartButton = createButton('I Have Another Wish');
  restartButton.position(width / 2 + 520, height + 400);
  restartButton.mousePressed(restartCandles);
  restartButton.class('pink-button');
  fill(215, 98, 245);
  stroke(5, 10, 10)
  textAlign(CENTER, CENTER);
  textSize(55);
  text("Make a Wish", width / 2, 90);
  textSize(45);
  text("Blow the Candles", width / 2, 150);

  let volume = mic.getLevel();

  // draw the candles first!
  for (let i = 0; i < candles.length; i++) {
    let c = candles[i];
    c.display();
  }
  if (isBlown == false) {
    for (let i = 0; i < candles.length; i++) {
      let c = candles[i];
      // generate flames on each candle's position
      flames.push(new Flame(c.x, c.y, volume));
    }
  }

  // update and display the flames
  for (let i = flames.length - 1; i >= 0; i--) {
    let f = flames[i];
    f.update();
    f.display();
    if (volume > 0.2) {
      f.destroy();
    }

    if (!f.exist) {
      flames.splice(i, 1);
      isBlown = true;
    }
  }
  while (flames.length > 500) {
    flames.splice(0, 1);
  }
}


class Candle {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.w = 10;
    this.h = 100;

    //
    this.r = random(240);
    this.g = random(240);
    this.b = random(240);
  }
  display() {
    push();
    fill(this.r, this.g, this.b);
    rectMode(CENTER);
    rect(this.x, this.y + this.h / 2, this.w, this.h);

    fill(255, 0, 0);
    circle(this.x, this.y, 10);
    pop();
  }
}

class Flame {
  constructor(startX, startY, volume) {
    this.x = startX;
    this.y = startY;
    this.xSpd = 0;
    this.ySpd = random(-0.8, -0.3);
    this.dia = random(10, 30);

    this.r = random(220, 255);
    this.g = random(255);
    this.b = 0;
    this.a = map(volume, 0, 1, 50, 220);
    this.exist = true;
  }
  update() {
    this.x += random(-1, 1);
    this.y += this.ySpd;

    this.a -= 3;
    if (this.a < 0) {
      this.a = 0;
    }

    this.dia -= random(0.1, 0.5);
    if (this.dia < 0) {
      this.dia = 0;
    }
  }
  display() {
    push();
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    circle(this.x, this.y, this.dia);
    pop();
  }


  destroy() {
    this.exist = false;
  }
}
function restartCandles() {
  flames = [];
  isBlown = false;
  for (let i = 0; i < candles.length; i++) {
    let c = candles[i];
    flames.push(new Flame(c.x, c.y, 0));
  }
}



