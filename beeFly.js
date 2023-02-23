function setup() {
  createCanvas(550, 550);
}

let bee = {
  x: 550 / 2,
  y: 100,
  r: 0,
};

//gamestate 1 = startmenu, 2= playing, 3= fail
let gameState = 1;

let beeIsFlying = false;
let gravity = 0.05;
let acceleration = 0.005;
let flyingPower = 0.02;
let energyStored = 500;

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
  if (energyStored < 50) {
    fill("red");
  } else {
    fill("pink");
  }
  text("Energy left = " + energyStored, 30, 50);
  fill("pink");
  text("Level", 460, 50);
  textSize(50);
  text(level, 465, 100);
}

//bee flying/falling
function flying() {
  //flying
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
    gameState = 3;
  }

  //falling (gravity)
  bee.y = bee.y + gravity;
  gravity = gravity + acceleration;
  acceleration = acceleration * 1.001;
}

// fixing the leaves
let level = 1;
let leavesRight = [];
let leavesLeft = [];
let leafRight;
let leafLeft;

//creating random start positions for the leaves on the right side
function pushLeaves() {
  for (let i = 0; i < level * 4; i++) {
    const leafRight = {
      x: Math.random() * 1000 + 420,
      y: Math.random() * 400 + 50,
    };
    leavesRight.push(leafRight);
  }

  // same for the left side
  for (let i = 0; i < level * 4; i++) {
    const leafLeft = {
      x: Math.random() * 1000 - 950,
      y: Math.random() * 400 + 50,
    };
    leavesLeft.push(leafLeft);
  }
}

//check the distance to obstacles and screen limit
function checkDistance() {
  for (i = 0; i < leavesRight.length; i++) {
    let distanceRight = Math.sqrt(
      Math.pow(bee.x - leavesRight[i].x, 2) +
        Math.pow(bee.y - leavesRight[i].y, 2)
    );
    if (distanceRight <= 30) {
      console.log("stop");
      gameState = 3;
    }
  }

  for (i = 0; i < leavesLeft.length; i++) {
    let distanceLeft = Math.sqrt(
      Math.pow(bee.x - leavesLeft[i].x, 2) +
        Math.pow(bee.y - leavesLeft[i].y, 2)
    );
    if (distanceLeft <= 30) {
      console.log("stop");
      gameState = 3;
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
      gameState = 3;
    } else {
      gameState = 4;
    }
    gravity = 0;
  }
}

//making the start menu
function startmenu() {
  noStroke();
  fill("white");
  textSize(30);
  textWrap(WORD);
  text("Help the bee land smoothly and avoid the leaves", 100, 80, 400);
  fill("lightpink");
  rect(150, 175, 200, 40);
  fill("white");
  text("start game", 180, 205);
  mouseClicked();
}
//win menu
function win() {
  noStroke();
  fill("white");
  textSize(70);
  text("You won!", 130, 120);
  fill("lightpink");
  textSize(30);
  rect(175, 175, 200, 40);
  fill("white");
  text("Next level", 210, 205);
  mouseClicked();
}
//fail menu
function fail() {
  noStroke();
  fill("white");
  textSize(50);
  textWrap(WORD);
  text("The bee died because of you!", 100, 50, 400);
  fill("lightpink");
  textSize(30);
  rect(175, 175, 200, 40);
  fill("white");
  text("Try again", 210, 205);
  mouseClicked();
}

function mouseClicked() {
  if (mouseIsPressed) {
    if (
      gameState === 1 &&
      mouseX > 150 &&
      mouseX < 150 + 200 &&
      mouseY > 175 &&
      mouseY < 174 + 40
    ) {
      gameState = 2;

      gameState = 2;
      leavesRight = [];
      leavesLeft = [];
      beeIsFlying = false;
      gravity = 0.05;
      acceleration = 0.005;
      flyingPower = 0.02;
      energyStored = 500;
      bee.x = 550 / 2;
      bee.y = 100;
      bee.r = 0;
      leafRight;
      leafLeft;
      pushLeaves();
    } else if (
      gameState === 4 &&
      mouseX > 175 &&
      mouseX < 175 + 200 &&
      mouseY > 175 &&
      mouseY < 175 + 40
    ) {
      level = level + 1;
      gameState = 2;
      leavesRight = [];
      leavesLeft = [];
      beeIsFlying = false;
      gravity = 0.05;
      acceleration = 0.005;
      flyingPower = 0.02;
      energyStored = 500;
      bee.x = 550 / 2;
      bee.y = 100;
      bee.r = 0;
      leafRight;
      leafLeft;
      pushLeaves();
    } else if (
      gameState === 3 &&
      mouseX > 175 &&
      mouseX < 175 + 200 &&
      mouseY > 175 &&
      mouseY < 175 + 40
    ) {
      level = 1;
      gameState = 1;
    }
  }
}

function draw() {
  if (gameState === 2) {
    background(50, 200, 255);
    flowerFunction();
    beeFunction();
    showText();
    flying();
    obstacles();
    checkDistance();
    velocity();
  } else if (gameState === 1) {
    background(50, 200, 255);
    startmenu();
  } else if (gameState === 4) {
    background(50, 200, 255);
    win();
  } else if (gameState === 3) {
    background(50, 200, 255);
    fail();
  }
}
