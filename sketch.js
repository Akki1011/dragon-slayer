//Assigning global variable
var PLAY = 1;
var end = 0;
var gamestate = 1;
var gameOver;
var hero, heroimage;
var  dragonGroup, drag1, drag2, drag3, drag4;
var bombGroup, bomb1, bomb2;
var score;
var sound;
var gameOverSound;
var slashingSound;
var bg

function preload(){
//Loading all images
  heroimage = loadImage("hero4.png");
  drag1 = loadImage("1.png");
  drag2 = loadImage("2.png");
  drag3 = loadImage("3.png");
  drag4 = loadImage("4.png");
  bomb1 = loadImage("bomb1.png");
  bomb2 = loadImage("bomb2.png");
  gameOver = loadImage("game over.png");
  bg = loadImage("bg.jpg");

 // sound = loadSound("lonely_feather.mp3")
  gameOverSound = loadSound("game over.mp3");
  slashingSound = loadSound("knife sound.mp3");
}

function setup(){
//Creating canvas
  createCanvas(displayWidth, displayHeight);
//Creating hero
  hero = createSprite(150, 300, 10, 10);
  hero.addImage("sword", heroimage);
  hero.addImage("gameOver", gameOver);
  hero.scale=0.2;
//Creating the bomb and dragon group
  bombGroup = createGroup();
  dragonGroup = createGroup();
//Creating the score
  score = 0;
}

function draw(){
//Creating the background
  background(bg);
//Displaying text
  fill("red");
  textSize(30);
  text("Score : "+score, 1200, 40);
//Gamestate play  
  if (gamestate === PLAY){
    hero.y=World.mouseY;
    hero.x = World.mouseX; 
    //sound.play();
    if (hero.isTouching(dragonGroup)){
      dragonGroup.destroyEach();
      score = score+1;
      slashingSound.play();
    }
      
    if(hero.isTouching(bombGroup)){
      gamestate = end;
     // sound.stop();
      gameOverSound.play();
    } 
    spawndragonGroup();
    spawnbombGroup();
  }
  
  

//Gamestate end
  if (gamestate === end){

    //sound.stop();
    dragonGroup.setVelocityXEach(0);
    bombGroup.setVelocityXEach(0);
    dragonGroup.setLifetimeEach(-1);
    bombGroup.setLifetimeEach(-1);
    hero.changeImage("gameOver");
    hero.x=300;
    hero.y=300;
    hero.scale=2;
    bombGroup.destroyEach();
  }
  
//Displaying sprites
  drawSprites();
}

//The dragon group
function spawndragonGroup(){
  
 
  if (frameCount % 60 === 0){
    var drag = createSprite(600,random(1,600),100,40);
    var side = Math.round(random(1,2));
    if (side===1){
    drag.x=0;
    drag.velocityX=(10+score/4);
    }
    else {
    drag.x=600;
    drag.velocityX=-(10+score/4);
    }
    
    drag.scale = 0.4;
    var rand = Math.round(random(1,4));
    
    switch(rand) {
      case 1: drag.addImage(drag1);
      break;
      case 2: drag.addImage(drag2);
      break;
      case 3: drag.addImage(drag3);
      break;
      case 4: drag.addImage(drag4);
      break;
      default: break;
    }
    
    dragonGroup.add(drag);
  }

}

//The bomb group
function spawnbombGroup(){
  
  if (frameCount % 150 === 0){
    var bomb = createSprite(600,random(1,600),100,40);
    var side = Math.round(random(1,2));
    if (side===1){
    bomb.x=0;
    bomb.velocityX=(12+score/10);
    }
    else {
    bomb.x=600;
    bomb.velocityX=-(7+score/10);
    }
    
    bomb.scale = 0.2;
    var rand = Math.round(random(1,2));
    
    switch(rand) {
      case 1: bomb.addImage(bomb1);
      break;
      case 2: bomb.addImage(bomb2);
      break;       
      default: break;
    }
    
    bombGroup.add(bomb);
  }
}

