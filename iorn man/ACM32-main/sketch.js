
var bg, backgroundImg;
var diamondScore=0;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironImg = loadImage("images/iron.png");
  platformImage = loadImage ("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
  spikeImage = loadImage ("images/spikes.png");
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale = 2;
  iron = createSprite(200,500,20,50);
  iron.addImage(ironImg); 
  iron.scale = 0.3;
  ground = createSprite(200,585,400,10);
  ground.visible = false
  platformGroup = new Group ();
  diamondGroup = new Group();
  spikeGroup = new Group();
 
}

function draw() {
  if (keyDown("space")){
    iron.velocityY = -15
  } 
  if (keyDown("up")){
    iron.velocityY = -10
  }
  if (keyDown("left")){
    iron.x = iron.x  -5
  }
  if (keyDown("right")){
    iron.x = iron.x  +5
  }
  iron.velocityY += 0.5 
iron.collide(ground)
bg.velocityY = 4;
if (bg.y > 500){
  bg.y = bg.width/4;
}
generatePlatforms();
for (var i = 0; i <platformGroup.length;i++){
  var temp = platformGroup.get(i);

  if (temp.isTouching(iron)){
    iron.collide(temp); 
  }
}
generateDiamonds();
for (var i = 0 ; i<diamondGroup.length;i++){
  var temp = (diamondGroup).get(i);

  if (temp.isTouching(iron)) {
    temp.destroy();
    temp=null;
    diamondScore++;

  }
}
generateSpikes();
for (var i = 0 ; i<spikeGroup.length;i++){
  var temp = (spikeGroup).get(i);

  if (temp.isTouching(iron)) {
    temp.destroy();
    temp=null;
    diamondScore -5;

  }
}

    drawSprites();
    text("diamonds collected" + diamondScore,500,50);
   
}
function generatePlatforms() {
  if (frameCount % 60 === 0) {
    var brick = createSprite(1200, 10, 40, 10);
    brick.x = random(50, 850);
    brick.addImage(platformImage);
    brick.velocityY = 5;
    brick.lifetime = 250;
    platformGroup.add(brick);
  }
}
function generateDiamonds(){
  if (frameCount % 60 === 0){
    var diamond = createSprite(1205,15,45,15);
    diamond.addImage(diamondImage)
    diamond.x = random(55,855);
    diamond.velocityY = 5;
    diamond.lifetime = 250;
    diamond.scale = 0.7;
    diamondGroup.add(diamond);
  }
}
function generateSpikes(){
  if (frameCount % 60 === 0){
    var spike = createSprite(1205,15,45,15);
    spike.addImage(spikeImage)
    spike.x = random(55,855);
    spike.velocityY = 5;
    spike.lifetime = 250;
    spike.scale = 0.5;
    spikeGroup.add(spike);
  }
}