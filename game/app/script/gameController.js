var canvas, context;
var grid = [];
var gameLevel = 0;
var maxClick = 0;

function drawRect(x,y, w,h, color){
  context.fillStyle = color;
  context.fillRect(x,y, w,h, color);
}// Draw rect method for canvas.

function colorText(text, textX, textY, color){
  context.font = "30px Arial";
  context.fillStyle=color;
  context.fillText(text, textX, textY);
}// to draw text for level and click left on canvas.

function generateCell(){  
  var maxcell = GRID_COL*GRID_ROW;
  for(var i=0;i<maxcell;i++){ 
     var obj = {isActive: false, level:0};
     obj.imageUrl = gameImages[obj.level];
     grid.push(obj);  
  }
} //create matrix in canvas game area.

function createGrid(){
  var curentLevel = 'Level ' + (gameLevel+1);
  var maxclick = 'Max Tap Allow ' + maxClick; 
  context.drawImage(gameImages.bgImage, 0,0, canvas.width, canvas.height);
  colorText(curentLevel, canvas.width/2 -20, canvas.height -30, 'black');
  colorText(maxclick, 50, canvas.height -30, 'black');
  console.log("Object.keys(gameImages).length",Object.keys(gameImages).length);
      for(var row = 0; row < GRID_ROW; row++){
        for(var col=0; col<GRID_COL; col++){
          cellIndex = row*GRID_COL + col;
            var x = GRID_WIDTH*col;
            var y = row*GRID_HEIGHT;
              index = grid[cellIndex].level || 0;
              if(index >0){
                context.drawImage(gameImages[popperLevel[index]], x,y, GRID_WIDTH-10, GRID_HEIGHT-5);
                context.drawImage(gameImages.rightEye, x+20,y+15, 20, 20);
                context.drawImage(gameImages.leftEye, x+50,y+15, 20, 20);
              }
        }
    }
}; // Create grid and redraw canvas on each frame.

function setGameLevelData(gameLevel){
  var level = levelList[gameLevel];
  var levelInfo = gameLevels[level];
  var size = levelInfo.popperPosition.length;
  var popperPos = levelInfo.popperPosition;
  var popperLevel = levelInfo.color;
      maxClick = levelInfo.maxClick;
  for(var i=0; i < size; i++){
    grid[popperPos[i]].isActive = true;
    grid[popperPos[i]].level = popperLevel[i];
    grid[popperPos[i]].imageUrl = gameImages[popperLevel[i]];
  } 
}// To set new level Data.

function trackLocation(eve){
  var x = Math.floor(eve.offsetX/GRID_WIDTH);
  var y = Math.floor(eve.offsetY/GRID_HEIGHT) * GRID_COL;
  var col = x+y;
  return col; 
} //Track Location on current popper.

function checkForActivePopper(){
  var level = levelList[gameLevel];
  var levelInfo = gameLevels[level];
  var size = levelInfo.popperPosition.length;
  var popperPos = levelInfo.popperPosition;
  for(var i=0; i <size; i++){
    if(grid[popperPos[i]].isActive){
        return false;
    }
  }
  popperBurst.stop();
  missSound.play();
  return true;
} //To check popper is Active or not.

function bustPopper(cell){
  maxClick--;
      if(grid[cell].isActive){
          --grid[cell].level;
          grid[index].imageUrl = grid[cell].level;
          grid[cell].isActive = grid[cell].level === 0 ? false : true;
          explodeProjectile(event, cell);
            context.drawImage(gameImages.projectile, 0,0, 10, 10);
            context.drawImage(gameImages.bgImage,0,0, canvas.width, canvas.height);
            delay = 0;
            gameBgsound.stop();
            popperBurst.play();
            handlePopperChain(cell, true);     
      }else{
        createGrid();
        missSound.play();
      }
}// Bust on popper if tap n right popper.

function onClickGameArea(event){
  var cell = trackLocation(event);
  var isclickValid = true;
  gameBgsound.play();
  if(maxClick === 0){
     missSound.play();
     isclickValid = checkForActivePopper();
     if(isclickValid){
       gameInit(0);
     }else{
      gameInit(gameLevel);  
     }
  }else{
     bustPopper(cell) 
  }
}// callback function of click eventlistener.

function gameInit(level){ 
  if(level > 2){
    level = 0;
  }
  maxClick = 0; 
  generateCell();
  gameBgsound.stop();
  setGameLevelData(level);
  createGrid();
} //to set new level game data or reset current level.

function onImageLoadComplete(){
  gameLevel = 0;
  canvas.addEventListener('mousedown', onClickGameArea);
  console.log("Draw bg image", gameImages);
  context.drawImage(gameImages.bgImage, 0,0, canvas.width, canvas.height);
  gameInit(gameLevel);
} //callback function trigger when images loaded.

window.onload = function(){
  canvas = document.getElementById('crazyPopper');
  context = canvas.getContext('2d');
  loadSound();
  drawRect(0,0, canvas.width, canvas.height, '#a1c2e8');
  colorText("Loadin Images...", canvas.width/2, canvas.height/2, 'white');
  preloadImages(onImageLoadComplete);
} // Window load method.
