function setup() {
  createCanvas(550, 550);
}

let bee = {
  x: 550 / 2,
  y: 100,
  r: 0,
};
let beeIsFlying = false;
let gravity = 0.05;
let acceleration = 0.005;
let flyingPower = 0.02;

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
    stroke(0, 0, 0, 140);
    line(bee.x + 12, bee.y - 6, bee.x + 4, bee.y - 2);
    line(bee.x + 12, bee.y + 2, bee.x + 4, bee.y - 2);
    line(bee.x + 12, bee.y - 2, bee.x + 4, bee.y - 2);

    line(bee.x - 12, bee.y - 6, bee.x - 4, bee.y - 2);
    line(bee.x - 12, bee.y + 2, bee.x - 4, bee.y - 2);
    line(bee.x - 12, bee.y - 2, bee.x - 4, bee.y - 2);
  } else {
    stroke(0, 0, 0, 140);
    strokeWeight(0.3);
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
    acceleration = 0.005;
    gravity = gravity - flyingPower;

    bee.r = bee.r + 1 * sin(frameCount * 0.25);
  } else {
    beeIsFlying = false;
    bee.r = 0;
  }
}

function falling() {
  bee.y = bee.y + gravity;
  gravity = gravity + acceleration;
  acceleration = acceleration * 1.001;
}

// fixing the leaves
let leavesRight = [];
let leavesLeft = [];

for (let i = 0; i < 10; i++) {
  //creating random start positions for the leaves on the right side
  const leafRight = {
    x: Math.random() * 800 + 550,
    y: Math.random() * 400 + 50,
  };
  leavesRight.push(leafRight);
}
for (let i = 0; i < 10; i++) {
  // same for the left side
  const leafLeft = {
    x: Math.random() * 800 - 850,
    y: Math.random() * 400 + 50,
  };
  leavesLeft.push(leafLeft);
}

function obstacles() {
  //the leaves design and movement
  for (let leafRight of leavesRight) {
    fill(255, 255, 255);
    ellipse(leafRight.x, leafRight.y, 30);
    leafRight.x = leafRight.x - 1;
  }
  for (let leafLeft of leavesLeft) {
    fill(255, 255, 255);
    ellipse(leafLeft.x, leafLeft.y, 30);
    leafLeft.x = leafLeft.x + 1;
  }
}

function draw() {
  background(50, 200, 255);
  beeFunction();
  flying();
  falling();
  obstacles();
}
