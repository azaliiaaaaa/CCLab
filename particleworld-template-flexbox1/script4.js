let IMG_SIZE = 300;

let img;
let img2;
let img3;
let img4;
let img5;
let img6;


function preload() {
  img = loadImage("fl.png");
  img2 = loadImage("so.png")
  img3 = loadImage("mo.png")
  img4 = loadImage("g1.png")
  img5 = loadImage("g2.png")
  img6 = loadImage("g3.png")
}

function setup() {
  let canvas = createCanvas(940, 300);
  canvas.parent("canvas1");
  background(255, 230, 254);

  img.resize(IMG_SIZE, IMG_SIZE);
  img2.resize(IMG_SIZE, IMG_SIZE);
  img3.resize(IMG_SIZE, IMG_SIZE);
  img4.resize(IMG_SIZE, IMG_SIZE);
  img5.resize(IMG_SIZE, IMG_SIZE);
  img6.resize(IMG_SIZE, IMG_SIZE);

  image(img4, 0, 0);
  image(img5, IMG_SIZE + 20, 0);
  image(img6, IMG_SIZE + 340, 0);
}

let gift1Open = false;
let gift2Open = false;
let gift3Open = false;

function draw() {
  // background(255, 0, 0);

  if (mouseIsPressed && mouseX < 300 && mouseX > 0 && gift1Open == false) {
    fill(255, 230, 254);
    noStroke();
    rect(0, 0, IMG_SIZE, IMG_SIZE);
    gift1Open = true;
  }

  if (gift1Open) {
    let c = img.get(mouseX, mouseY);
    noStroke();
    fill(c);
    circle(mouseX, mouseY, 10);
  }

  //2
  if (mouseIsPressed && mouseX < 620 && mouseX > 320 && gift2Open == false) {
    fill(255, 230, 254);
    noStroke();
    rect(320, 0, IMG_SIZE, IMG_SIZE);
    gift2Open = true;
  }
  if (gift2Open) {
    let c2 = img2.get(mouseX - 320, mouseY);
    noStroke();
    fill(c2);
    rect(mouseX, mouseY, 10, 10);
  }

  //3
  if (mouseIsPressed && mouseX < 940 && mouseX > 640 && gift3Open == false) {
    fill(255, 230, 254);
    noStroke();
    rect(640, 0, IMG_SIZE, IMG_SIZE);
    gift3Open = true;
  }

  if (gift3Open) {
    let c3 = img3.get(mouseX - 640, mouseY);
    noStroke();
    fill(c3);
    rect(mouseX, mouseY, 10, 10);
  }
}