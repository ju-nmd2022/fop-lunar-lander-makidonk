function setup() {
  createCanvas(550, 550);
}

let bee = {
  x: 550 / 2,
  y: 100,
  r: 0,
};

let gameIsActive = true;

let beeIsFlying = false;
let gravity = 0.05;
let acceleration = 0.005;
let flyingPower = 0.02;
let energyStored = 100;

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

function flowerFunction() {
  noStroke();
  fill("pink");
  ellipse(width / 2, 505, 40, 40);
  ellipse(width / 2 - 40, 507, 50, 40);
  ellipse(width / 2 + 40, 507, 50, 40);
  ellipse(width / 2 + 70, 515, 70, 30);
  ellipse(width / 2 - 70, 515, 70, 30);
  fill("orange");
  ellipse(width / 2, 520, 100, 30);
  fill("pink");
  ellipse(width / 2 - 50, 535, 70, 40);
  ellipse(width / 2 + 50, 535, 70, 40);
  ellipse(width / 2, 545, 90, 40);
}

function showText() {
  textSize(20);
  text("energy left = " + energyStored, 30, 50);
}

function flying() {
  if (mouseIsPressed === true) {
    beeIsFlying = true;
    acceleration = 0.005;
    gravity = gravity - flyingPower;
    bee.r = bee.r + 1 * sin(frameCount * 0.25);

    energyStored = energyStored - 1;
  } else {
    beeIsFlying = false;
    bee.r = 0;
  }
  if (energyStored < 0) {
    gameIsActive = false;
    console.log("energy empty");
  }
}

function falling() {
  bee.y = bee.y + gravity;
  gravity = gravity + acceleration;
  acceleration = acceleration * 1.001;
}

// fixing the leaves
let level = 5;
let leavesRight = [];
let leavesLeft = [];
let leafRight;
let leafLeft;

//creating random start positions for the leaves on the right side
for (let i = 0; i < level * 6; i++) {
  const leafRight = {
    x: Math.random() * 1000 + 420,
    y: Math.random() * 400 + 50,
  };
  leavesRight.push(leafRight);
}

// same for the left side
for (let i = 0; i < level * 6; i++) {
  const leafLeft = {
    x: Math.random() * 1000 - 950,
    y: Math.random() * 400 + 50,
  };
  leavesLeft.push(leafLeft);
}

function checkDistance() {
  for (i = 0; i < leavesRight.length; i++) {
    let distanceRight = Math.sqrt(
      Math.pow(bee.x - leavesRight[i].x, 2) +
        Math.pow(bee.y - leavesRight[i].y, 2)
    );
    if (distanceRight <= 30) {
      console.log("stop");
      gameIsActive = false;
    }
  }

  for (i = 0; i < leavesLeft.length; i++) {
    let distanceLeft = Math.sqrt(
      Math.pow(bee.x - leavesLeft[i].x, 2) +
        Math.pow(bee.y - leavesLeft[i].y, 2)
    );
    if (distanceLeft <= 30) {
      console.log("stop");
      gameIsActive = false;
    }
  }
}

//the leaves design and movement
function obstacles() {
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

//velocity when touching the flower
function velocity() {
  if (bee.y > 495) {
    if (gravity > 0.3) {
      console.log("crash");
    } else {
      console.log("win");
    }
    gravity = 0;
  }
}

function draw() {
  background(50, 200, 255);
  flowerFunction();
  beeFunction();
  showText();
  flying();
  falling();
  obstacles();
  checkDistance();
  velocity();
}
