let bee = {
  x: width / 2,
  y: 200,
};
translate(bee.x, bee.y);
//wings
noStroke();
fill(255, 255, 255, 100);
push();

bezier(20, -20, 100, -50, 40, -80, 15, -15);
pop();
bezier(-20, -20, -100, -50, -40, -80, -15, -15);

//legs
strokeWeight(1);
stroke(0, 0, 0);
noFill();
bezier(20, 20, 30, 25, 30, 30, 30, 35);
bezier(10, 25, 20, 30, 20, 35, 20, 40);

bezier(-20, 20, -30, 25, -30, 30, -30, 35);
bezier(-10, 25, -20, 30, -20, 35, -20, 40);
//body
noStroke();
fill(255, 255, 100);
ellipse(0, 0, 60);

//eyes & mouth & cheeks
fill(255, 255, 255);
ellipse(-18, 0, 25);
ellipse(18, 0, 25);
fill(0, 0, 0);
ellipse(-15, 0, 5);
ellipse(15, 0, 5);
noFill();
strokeWeight(1);
stroke(0, 0, 0);
bezier(-3, 8, 0, 13, 0, 13, 3, 8);

noStroke();
fill("pink");
ellipse(-19, 12, 15, 8);
ellipse(19, 12, 15, 8);
