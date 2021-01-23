var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstacle,obstacleImage,obstacleGroup;


var newImage;

function preload(){
  trex_running = loadAnimation("iron man 1.png","iron man 2.png","iron man 3.png","iron man 4.png","iron man 5.png","iron man 6.png");
  
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  obstacleImage = loadImage("enemy 1.png (1).jpg");
 
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  obstacleGroup=createGroup();
}

function draw() {
  background(180);
  
  
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  
  
  if(obstacleGroup.isTouching(trex))
  {
    obstacleGroup.destroyEach(-1);
  }
  
  //spawn the clouds
  spawnClouds();
  spawnObstacle();
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 134
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
    
}
function spawnObstacle(){
  if(frameCount % 80 ===0){
    obstacle = createSprite(600,150,5,5);
    obstacle.addImage(obstacleImage)
    obstacle.x=Math.round(random(200,400))
    obstacle.scale= 0.3;
    obstacle.velocityX= -2;
    obstacleGroup.add(obstacle);
    obstacleGroup.collide(invisibleGround);
  }
}
