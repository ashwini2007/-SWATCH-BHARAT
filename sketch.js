var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground, boy
var score = 0;
var bgImg
var boy_moving
var can, wood, bin
var bin2, airplane, wrapper
var binsGroup
var invisibleGround;
var sun, sunImg
var cansgroup, wrappersgroup, airplanesgroup;
var bonus, garbagetouch, fulltime;
var wastegroup;
var gameover, restart;
var gameoverImg, restartImg
var strip1, strip2, strip3, strip4, strip5, strip6;
function preload() {


  boy_moving = loadAnimation("walking_1.png", "walking_2.png", "walking_3.png", "walking_4.png")
  can = loadImage("waste.png")
  wood = loadImage("waste2.png")
  bin = loadImage("dustbin.png")
  //bin2 = loadImage("bin2.png")
  airplane = loadImage("waste4.png")
  wrapper = loadImage("waste3.png")
  bgImg = loadImage("desert.jpg")
  sunImg = loadImage("sun.png")
  bin = loadImage("dustbin.png")
  bonus = loadSound("bonus.wav");
  garbagetouch = loadSound("garbagetouch.wav");
  fulltime = loadSound("fulltimeaudio.mp3");
  gameoverImg = loadImage("gameover.png")
  restartImg = loadImage("reset.png")
  //bin2 = loadImage("bin2.png")
}

function setup() {
  createCanvas(1300, 650);
  ground = createSprite(650, 590, 26000, 120);
  ground.shapeColor = '#654321'
  ground.velocityX = -9;

  boy = createSprite(80, 450, 30, 50)
  boy.addAnimation("walkingboy", boy_moving)
  boy.scale = 0.3;

  sun = createSprite(90, 70, 60, 60)
  sun.addImage(sunImg)
  sun.scale = 0.2

  restart = createSprite(700, 350, 20, 20);
  restart.addImage(restartImg);
  restart.scale = 0.3

  gameover = createSprite(700, 200, 20, 20);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.5;

  invisibleGround = createSprite(600,570,2600,10);
  invisibleGround.visible = false; 

  strip1 = createSprite(200, 580, 100, 20);
  strip1.shapeColor = "white";
  strip2 = createSprite(400, 580, 100, 20);
  strip2.shapeColor = "white";
  strip3 = createSprite(600, 580, 100, 20);
  strip3.shapeColor = "white";
  strip4 = createSprite(800, 580, 100, 20);
  strip4.shapeColor = "white";
  strip5 = createSprite(1000, 580, 100, 20);
  strip5.shapeColor = "white";
  strip6 = createSprite(1200, 580, 100, 20);
  strip6.shapeColor = "white";
  var strip7 = createSprite(0, 580, 100, 20);
  strip7.shapeColor = "white";

  binsGroup = new Group();

  wastegroup = new Group();

  boy.setCollider("circle", 0, 190, 160);
  boy.debug = false;


}

function draw() {
  background(bgImg);


  //fulltime.play();

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  text("SCORE : " + score, 1200, 50)


  if (gameState === PLAY) {
    spawnBins();
    spawn_waste();
    gameover.visible = false;
    restart.visible = false;

    if(keyDown("space")&& boy.y >= 370) {
     boy.velocityY = -12;
  }
boy.velocityY = boy.velocityY + 0.8

    if (boy.isTouching(binsGroup)) {
      gameState = END;
      console.log("hi")
    }


  }

  if (gameState === END) {
    gameover.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    boy.velocityY = boy.velocityY + 0.8
    if (mousePressedOver(restart)) {
      reset();
    }

  }
boy.collide(invisibleGround);

  drawSprites();
}


function reset() {
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  score = 0;
  ground.velocityX = -15;
  boy.changeAnimation("walkingboy", boy_moving)


}

function spawn_waste() {
  if (frameCount % 60 === 0) {
    var waste = createSprite(1300, 560, 10, 40);
    waste.velocityX = -15;

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: waste.addImage(can);
        break;
      case 2: waste.addImage(wrapper);
        break;
      case 3: waste.addImage(airplane);
        break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    waste.scale = 0.05;
    waste.lifetime = 700;

    //add each obstacle to the group
    wastegroup.add(waste);
  }
  if (boy.isTouching(wastegroup)) {
    wastegroup.visible = false;
    score = score + 2
    garbagetouch.play();
  }

}





function spawnBins() {
  if (frameCount % 177 === 0) {
    var dustbin = createSprite(800, random(450,560), 20, 20)
    dustbin.addImage(bin)
    dustbin.velocityX = -17

    dustbin.scale = 0.1
    dustbin.lifetime = 700
    binsGroup.add(dustbin);

  }


}
