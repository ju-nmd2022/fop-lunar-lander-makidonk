let bee = {
    x: width / 2,
    y: 200,
  };
  
  //wings
  noStroke();
  fill(255, 255, 255, 100);
  bezier(
    bee.x + 20,
    bee.y - 20,
    bee.x + 100,
    bee.y - 50,
    bee.x + 40,
    bee.y - 80,
    bee.x + 15,
    bee.y - 15
  );
  bezier(
    bee.x - 20,
    bee.y - 20,
    bee.x - 100,
    bee.y - 50,
    bee.x - 40,
    bee.y - 80,
    bee.x - 15,
    bee.y - 15
  );
  
  //legs
  strokeWeight(1);
  stroke(0, 0, 0);
  noFill();
  bezier(
    bee.x + 20,
    bee.y + 20,
    bee.x + 30,
    bee.y + 25,
    bee.x + 30,
    bee.y + 30,
    bee.x + 30,
    bee.y + 35
  );
  bezier(
    bee.x + 10,
    bee.y + 25,
    bee.x + 20,
    bee.y + 30,
    bee.x + 20,
    bee.y + 35,
    bee.x + 20,
    bee.y + 40
  );
  
  bezier(
    bee.x - 20,
    bee.y + 20,
    bee.x - 30,
    bee.y + 25,
    bee.x - 30,
    bee.y + 30,
    bee.x - 30,
    bee.y + 35
  );
  bezier(
    bee.x - 10,
    bee.y + 25,
    bee.x - 20,
    bee.y + 30,
    bee.x - 20,
    bee.y + 35,
    bee.x - 20,
    bee.y + 40
  );
  //body
  noStroke();
  fill(255, 255, 100);
  ellipse(bee.x, bee.y, 60);
  
  //eyes & mouth & cheeks
  fill(255, 255, 255);
  ellipse(bee.x - 18, bee.y, 25);
  ellipse(bee.x + 18, bee.y, 25);
  fill(0, 0, 0);
  ellipse(bee.x - 15, bee.y, 5);
  ellipse(bee.x + 15, bee.y, 5);
  noFill();
  strokeWeight(1);
  stroke(0,0,0);
  bezier(
    bee.x -3 ,
    bee.y + 8,
    bee.x,
    bee.y + 13,
    bee.x,
    bee.y + 13,
    bee.x + 3,
    bee.y + 8
  );
  
  noStroke();
  fill("pink");
  ellipse(bee.x-19,bee.y+12,15,8);
  ellipse(bee.x+19,bee.y+12,15,8);