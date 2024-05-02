
let img;
let img2;
let img3;
let img4;
let img5;
let img6;
let showImg4 = true;

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

  console.log("img4 width:", img4.width);
  console.log("img4 height:", img4.height);
  // img4.resize(width / 3, height);
  // img5.resize(width / 3 - 20, height);
  // img6.resize(width / 3 - 40, height);
  img.resize(width / 3, height);
  img2.resize(width / 3 - 20, height);
  img3.resize(width / 3 - 40, height);
  img4.resize(width / 3, height);
  img5.resize(width / 3 - 20, height);
  img6.resize(width / 3 - 40, height);
}

function draw() {

  image(img4, width / 3, height - img4.height);


  let c = img.get(mouseX, mouseY);
  noStroke();
  fill(c);
  circle(mouseX, mouseY, 10);


  let c2 = img2.get(mouseX - width / 3 - 20, mouseY);
  noStroke();
  fill(c2);
  rect(mouseX, mouseY, 10, 10);


  let c3 = img3.get(mouseX - width / 3 - 320, mouseY);
  noStroke();
  fill(c3);
  rect(mouseX, mouseY, 10, 10);

}
function mousePressed() {
  if (mouseY >= height - img4.height) {
    showImg4 = false;
  }
}

