function setup() {
  createCanvas(550, 550);
}

let beeIsFlying = false;
let bee = {
  x: 400,
  y: 300,
  r: 0,
};
let gravity = 1;
let acceleration = 0;
let flyingPower = 1.5;

function beeFunction() {
  //wings
  noStroke();
  fill(255, 255, 255, 100);
  push();
  translate(bee.x + 10, bee.y - 10);
  rotate(bee.r);
  bezier(0, 0, 40, -15, 10, -30, 0, 0);
  pop();
  push();
  translate(bee.x - 10, bee.y - 10);
  rotate(-bee.r);
  bezier(0, 0, -40, -15, -10, -30, 0, 0);
  pop();

  //legs
  strokeWeight(0.5);
  stroke(0, 0, 0);
  noFill();
  bezier(
    bee.x + 10,
    bee.y + 10,
    bee.x + 15,
    bee.y + 12.5,
    bee.x + 15,
    bee.y + 15,
    bee.x + 15,
    bee.y + 17.5
  );
  bezier(
    bee.x + 5,
    bee.y + 12.5,
    bee.x + 10,
    bee.y + 15,
    bee.x + 10,
    bee.y + 17.5,
    bee.x + 10,
    bee.y + 20
  );

  bezier(
    bee.x - 10,
    bee.y + 10,
    bee.x - 15,
    bee.y + 12.5,
    bee.x - 15,
    bee.y + 15,
    bee.x - 15,
    bee.y + 17,
    5
  );
  bezier(
    bee.x - 5,
    bee.y + 12.5,
    bee.x - 10,
    bee.y + 15,
    bee.x - 10,
    bee.y + 17.5,
    bee.x - 10,
    bee.y + 20
  );
  //body
  noStroke();
  fill(255, 255, 100);
  ellipse(bee.x, bee.y, 30);

  //eyes

  if (beeIsFlying === true) {
    strokeWeight(0.8);
    stroke(0, 0, 0);
    line(bee.x + 12, bee.y - 6, bee.x + 4, bee.y - 2);
    line(bee.x + 12, bee.y + 2, bee.x + 4, bee.y - 2);
    line(bee.x + 12, bee.y - 2, bee.x + 4, bee.y - 2);

    line(bee.x - 12, bee.y - 6, bee.x - 4, bee.y - 2);
    line(bee.x - 12, bee.y + 2, bee.x - 4, bee.y - 2);
    line(bee.x - 12, bee.y - 2, bee.x - 4, bee.y - 2);
  } else {
    fill(255, 255, 255);
    ellipse(bee.x - 9, bee.y, 12);
    ellipse(bee.x + 9, bee.y, 12);
    fill(0, 0, 0);
    ellipse(bee.x - 7, bee.y, 2.5);
    ellipse(bee.x + 7, bee.y, 2.5);
    noFill();
  }

  //cheeks

  noStroke();
  fill("pink");
  ellipse(bee.x - 9, bee.y + 6, 7, 4);
  ellipse(bee.x + 9, bee.y + 6, 7, 4);
}

function flying() {
  if (mouseIsPressed === true) {
    beeIsFlying = true;

    gravity = 0.5;
    bee.y = bee.y - flyingPower;
    flyingPower = -gravity * 0.5;

    bee.r = bee.r + 1 * sin(frameCount * 0.25);
  } else {
    flyingPower = 0.5;
    beeIsFlying = false;
    bee.r = 0;
  }
}

function falling() {
  bee.y = bee.y + gravity;
  gravity = gravity + 0.01;
}

function draw() {
  background(50, 200, 255);
  beeFunction();
  flying();
  falling();
}
