let noteIndex = 0;
const notes = [
  { freq: 220.00, name: "A3" },
  { freq: 246.94, name: "B3" },
  { freq: 293.66, name: "D4" },
  { freq: 329.63, name: "E4" },
  { freq: 349.23, name: "F4" },
  { freq: 392.00, name: "G4" },
  { freq: 440.00, name: "A4" },
  { freq: 493.88, name: "B4" },
  { freq: 523.25, name: "C5" },
  { freq: 587.33, name: "D5" }
];
let buttons = [];
let buttonWidth = 35;
let buttonHeight = 140;
let textSizeValue = 10;
let textSizeDirection = 1

function setup() {
  let canvasWidth = notes.length * 70;
  let canvas = createCanvas(canvasWidth, 300);
  canvas.parent("p5-canvas");
  background(243, 183, 247);

  for (let i = 0; i < notes.length; i++) {
    let noteFreq = notes[i];
    buttons.push(new Button(canvasWidth / 2 - (notes.length / 2 - i) * 45, height / 2, buttonWidth, buttonHeight, noteFreq.freq, noteFreq.name));
  }
}

function draw() {
  background(243, 183, 247);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("D4, D4, E4, D4, G4, F4", width / 2, 20);
  text("D4, D4, E4, D4, A4, G4", width / 2, 38);
  text("D4, D4, D5, C5, G4, E4, B3, A3", width / 2, 56);
  text("D5, C5, B4, A4, B4, A4", width / 2, 72);

  // fill(random(255), 200, 2, 100);
  fill(random(255), 100, 100, 100);
  textAlign(CENTER, CENTER);
  textSizeValue += 0.05 * textSizeDirection;

  if (textSizeValue >= 50) {
    textSizeDirection = -1;
  } else if (textSizeValue <= 10) {
    textSizeDirection = 1;
  }

  textSize(textSizeValue);

  text("Play The Happy Birthday Song", width / 2, 270);

  for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    btn.vibrate();
    btn.checkMouse();
    btn.display();
  }
}



class Button {
  constructor(initX, initY, width, height, freq, noteName) {
    this.x = initX;
    this.y = initY;
    this.width = width;
    this.height = height;
    this.noteName = noteName;
    this.osc = new p5.Oscillator('sine');
    this.freq = freq;
    this.amp = 0.0;
    this.isPlaying = false;
  }
  checkMouse() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (
      mouseX >= this.x - this.width / 2 && mouseX <= this.x + this.width / 2 &&
      mouseY >= this.y - this.height / 2 && mouseY <= this.y + this.height / 2
    ) {

      this.r = random(243);
      this.g = random(190);
      this.b = random(243);
      // start the oscillator
      if (this.isPlaying == false) {
        this.osc.freq(this.freq, 0.05);
        this.osc.start();
        this.isPlaying = true;
      }
    } else {
      // Outside the rectangle
      this.r = 255;
      this.g = 255;
      this.b = 255;

      if (this.isPlaying == true) {
      }
    }

    this.amp = map(distance, 0, this.width / 2, 1.0, 0.0, true);
  }
  vibrate() {
    let sinValue = sin(frameCount * 0.25); // -1 to 1
    let ampValue = map(sinValue, -1, 1, this.amp * 0.5, this.amp, true);
    this.osc.amp(ampValue, 0.05);
  }
  display() {
    push();
    translate(this.x, this.y);
    fill(this.r, this.g, this.b);
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(this.noteName, 0, 0);
    pop();
  }
}