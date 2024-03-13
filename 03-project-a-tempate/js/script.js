console.log("test");

let d = 0;
let scene1, scene2;
let angle = 0;

function setup() {
    let canvas = createCanvas(1400, 1000);
    canvas.parent("p5-canvas-container");
    // background(59, 98, 59);
    scene1 = true;
    scene2 = false;
}

function draw() {
    background(59, 98, 59);
    console.log(mouseX, mouseY);

    fill(255);
    textSize(40);
    //textAlign(840, 118);
    text("find which flowers will feed the butterfly", 400, 90);
    fill(255);
    textSize(40);
    text("if mousePressed the butterfly", 918, 180);
    fill(255);
    textSize(40);
    text("will turn into a caterpillar", 945, 240);
    fill(255);
    textSize(40);
    text("keep pressing the mouse on", 918, 366);
    fill(255);
    textSize(40);
    text("different flowers to find", 945, 410);
    fill(255);
    textSize(40);
    text("which flower will bring the", 918, 455);
    fill(255);
    textSize(40);
    text("butterfly back", 1020, 500);

    if (scene1) {
        push();
        translate(mouseX, mouseY);
        rotate(PI / 2);
        let r = 100;
        stroke(255);
        if (mouseX > 174 && mouseX < 210 && mouseY > 154 && mouseY < 250) {
            fill(255, 201, 73);
        } else if (mouseX > 398 && mouseX < 490 && mouseY > 480 && mouseY < 530) {
            fill(68, 34, 145);
        } else {
            fill(255, 50);
        }
        strokeWeight(1);
        let da = PI / 300;
        let dx = 0.02;
        beginShape();
        let m = 0;
        for (let a = -PI / 2; a <= PI / 2; a += da) {
            let n = noise(m, d);
            let r = sin(2 * a) * map(n, 0, 1, 50, 100);
            let x = r * cos(a);
            let y = sin(d) * r * sin(a);
            m += dx;
            vertex(x, y);
        }

        for (let a = PI / 2; a <= (3 * PI) / 2; a += da) {
            let n = noise(m, d);
            let r = sin(2 * a) * map(n, 0, 1, 50, 100);
            let x = r * cos(a);
            let y = sin(d) * r * sin(a);
            m -= dx;
            vertex(x, y);
        }
        endShape();
        d += 0.1;
        pop();
    }

    if (scene2) {
        let l = mouseX;
        let o = mouseY;
        fill(255, 0, 0);
        ellipse(l, o, 40, 40);
        for (let i = 1; i <= 10; i++) {
            fill(0, 255, 0);
            ellipse(l - i * 20, o + sin(angle + i) * 25, 40, 40);
        }
        angle += -0.08;
    }

    // if (frameCount <= 230) {
    for (let i = 0; i < 3; i++) {
        push();
        blendMode(ADD);
        let xPos = 200 + i * 290;
        let yPos = 200;
        translate(xPos, yPos);
        rotate(radians(-frameCount + (150 + i * 0.02)));
        scale(sin(frameCount * 0.004));

        for (let angle = 0; angle < 360; angle += 30) {
            push();
            rotate(radians(angle));
            scale(sin(frameCount * 0.004));
            fill(194, 49, 4);
            stroke(255, 255, 100, 100);
            beginShape();
            vertex(0, 0);
            bezierVertex(10, -50, 30, -80, 0, -100);
            bezierVertex(-30, -80, -10, -50, 0, 0);
            endShape();
            pop();

            push();
            rotate(radians(angle));
            scale(sin(frameCount * 0.003));
            noFill();
            stroke(249, 140, 4, 100);
            beginShape();
            vertex(0, 0);
            bezierVertex(10, -50, 30, -80, 0, -100);
            bezierVertex(-30, -80, -10, -50, 0, 0);
            endShape();
            pop();
        }
        pop();
    }

    for (let i = 0; i < 3; i++) {
        push();
        blendMode(ADD);
        let xPos = 150 + i * 290;
        let yPos = 500;
        translate(xPos, yPos);
        rotate(radians(frameCount + (150 + i * 0.01)));
        scale(sin(frameCount * 0.004));

        for (let angle = 0; angle < 360; angle += 30) {
            push();
            rotate(radians(angle));
            scale(sin(frameCount * 0.003));
            fill(158, 65, 241);
            stroke(255, 255, 0);
            ellipse(30, 0, 30, 10);
            ellipse(50, 50, 30, 30);
            pop();
        }
        pop();
    }

    for (let i = 0; i < 3; i++) {
        push();
        blendMode(ADD);
        let xPos = 200 + i * 290;
        let yPos = 800;
        translate(xPos, yPos);
        rotate(radians(-frameCount + (150 + i * 0.02)));
        scale(sin(frameCount * 0.004));

        for (let angle = 0; angle < 360; angle += 60) {
            push();
            rotate(radians(angle));
            scale(sin(frameCount * 0.004));
            fill(random(255), random(255), random(255));
            stroke(255, 106, 158, 30);
            ellipse(30, 0, 30, 10);
            ellipse(50, 50, 30, 30);
            pop();
        }
        pop();
    }
}

function mousePressed() {
    if (mouseX > 690 && mouseX < 830 && mouseY > 760 && mouseY < 830) {
        // Check if mouse is in the specified region, switch to scene1
        scene1 = true;
        scene2 = false;
    } else {
        // Otherwise, switch to scene2
        scene1 = false;
        scene2 = true;
    }
}
