var canvas, context;
var grid = [];
var gameLevel = 0;
var maxClick = 0;

var generateCell = function(){  
  var maxcell = GRID_COL*GRID_ROW;
  for(var i=0;i<maxcell;i++){ 
     var obj = {isActive: false, level:0};
     obj.imageUrl = gameImages[obj.level];
     grid.push(obj);  
  }
}

var setGameLevel = function(gameLevel){
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
}

var createGrid = function(){
  context.drawImage(bgImage, 0,0, canvas.width, canvas.height);
  if(imageCounter == imageUrlList.length-1){
    for(var row = 0; row < GRID_ROW; row++){
        for(var col=0; col<GRID_COL; col++){
          cellIndex = row*GRID_COL + col;
            var x = GRID_WIDTH*col;
            var y = row*GRID_HEIGHT;
              index = grid[cellIndex].level;
              console.log(index);
              context.drawImage(gameImages[index], x,y, GRID_WIDTH-10, GRID_HEIGHT-5); 
              if(index >0){
                context.drawImage(gameImages[4], x+20,y+15, 20, 20);
                context.drawImage(gameImages[4], x+50,y+15, 20, 20);
              }
        }
    }
  }
  
};

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
  return true;
}

function bustPopper(event){
  var cell = trackLocation(event)
  var isclickValid = true;
  if(maxClick === 0){
     isclickValid = checkForActivePopper();
     if(isclickValid){
       gameInit(0);
       //clearTimeout()
     }else{
       gameLevel++;
       gameInit(gameLevel);
     }
  }else{
      maxClick--;
      if(grid[cell].isActive){
          --grid[cell].level;;
          grid[index].imageUrl = grid[cell].level;
          grid[cell].isActive = grid[cell].level === 0 ? false : true;
            context.drawImage(gameImages[9],0,0, canvas.width, canvas.height);
            delay = 0;
            setTimeout(function(){
              handlePopperChain(cell);
            },0)      
      }
  }
  
  
}

function gameInit(level){
  if(level === 2){
    level = 0;
  }
  maxClick = 0;
  generateCell();
  setGameLevel(level);
  createGrid();
}


var onImageLoadComplete = function(){
  gameLevel = 0;
  canvas.addEventListener('mousedown', bustPopper);
  context.drawImage(bgImage, 0,0, canvas.width, canvas.height);
  gameInit(gameLevel);
}

window.onload = function(){
  canvas = document.getElementById('crazyPopper');
  context = canvas.getContext('2d');
  preloadImages(onImageLoadComplete);
}