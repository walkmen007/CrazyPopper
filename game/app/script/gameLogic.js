
var isSetNewLevel = true;
var speed = 1;
var projectileList = [];

function MoveObj(cell, x,y, max){  
  this.moveX = x;
  this.moveY = y;
  this.cell =cell;
  this.w = 20;
  this.h = 20;
  this.imgIndex = 8;

  // var obj = {
  //    rightX : checkRight(cell),
  //    leftX : checkLeft(cell),
  //    topY : checkUp(cell),
  //    bottomY : checkDown(cell),
  // }

  var checkForValidCell = function(cordinate, obj, index){
    console.log("grid[obj.index]-----",cordinate, obj.index, grid[obj.index])
    if(cordinate == obj.loc && grid[obj.index]) {
            grid[obj.index].level = obj.level;
            grid[obj.index].isActive = grid[obj.index].level >0 ? true : false;
            grid[obj.index].imageUrl = grid[obj.index].level;
            handlePopperChain(obj.index);
            if(obj.level == 0){
              projectileList[index]['isEmpty'] = true;
              popperBustLeft--;
              console.log("helllllllllllllllllll", obj.index);
            }
            return 0;
    }else{
      return 8;
    }
  }
  
  this.moveRight = function(index){
        var obj = checkRight(this.cell); 
        if(this.moveX < obj.loc){
          this.moveX += speed;
          this.imgIndex = checkForValidCell(this.moveX, obj, index);
          this.drawImg(this.imgIndex, this.moveX, this.moveY);
        }
  }

  this.moveLeft = function(){     
        var obj = checkLeft(this.cell);
        if(this.moveX > obj.loc){
           this.moveX -= speed;
           this.imgIndex = checkForValidCell(this.moveX, obj, index);
           this.drawImg(this.imgIndex, this.moveX, this.moveY);
        }
  }

  this.moveUp = function(index){
    var obj = checkUp(this.cell);
      if(this.moveY > obj.loc){
        this.moveY -= speed;
        this.imgIndex = checkForValidCell(this.moveY, obj, index)
        this.drawImg(this.imgIndex, this.moveX, this.moveY);
      }
  }


  this.moveDown = function(index){
    var obj = checkDown(this.cell);
      if(this.moveY <= obj.loc){
        this.moveY += speed;
        this.imgIndex = checkForValidCell(this.moveY, obj, index)
        this.drawImg(this.imgIndex, this.moveX, this.moveY);
      }
      
  }

  this.drawImg = function(index, x, y){
    context.drawImage(gameImages[index], x,y, this.w, this.h);
  }

}

function checkForCell(index, isFound, value, type){
    var level = -1;    
    if(grid[index].isActive){
      level = grid[index].level -1;
      isFound = true;
    }else{
      index = index + value;
      isFound = false;
    }  
    return {isFound, index, level};
}

function checkRight(cell){
  var obj = {index:0, loc:0,  level: -1};
  var maxRightCell =Math.ceil(cell/GRID_COL) * 10;
  console.log("maxRightCell",cell, maxRightCell);;
  var index = cell+1;
  var isFound = false;
  for(;!isFound && index < maxRightCell;){
    var temp = checkForCell(index, isFound, 1, "right");
    isFound = temp.isFound;
    index = temp.index;
  }
  if(index === maxRightCell){
    obj.loc = canvas.width;
    obj.index = maxRightCell;
    obj.level = 0;
  }else{
     obj.index = index;  
     obj.level = temp.level;
     obj.loc = getX(index);
  }
  return obj;
}

function checkLeft(cell){
  var minLeftCell = Math.floor(cell/GRID_COL) * GRID_COL;
  --cell;
  var index = cell;
  var obj = {index:0, loc:0};
  var isFound = false;
  for(;!isFound && index >= minLeftCell;){
    var temp = checkForCell(index, isFound, -1, "left");
    isFound = temp.isFound;
    index = temp.index; 
  }
  if(index < minLeftCell){
    obj.index = -1;
    obj.loc = -20;
    obj.level = 0;
  }else{
    obj.index = index;
    obj.loc = getX(index)+ GRID_WIDTH;
    obj.level = temp.level;
  }
  return obj;
}

function checkUp(cell){
  var maxTopCell = cell%GRID_COL;
  cell -= GRID_COL;
  var index = cell < 0 ? null : cell;
  var obj = {index:0, loc:0};
  var isFound = false;
  for(;!isFound && index >= maxTopCell;){
    var temp = checkForCell(index, isFound, -GRID_COL, "up");
    isFound = temp.isFound;
    index = temp.index; 
  }
  if(index < maxTopCell){
    obj.index = -1;
    obj.loc = 0;
    obj.level = 0;
  }else{
    obj.index = index;
    obj.loc = getY(index) + GRID_HEIGHT;
    obj.level = temp.level;
  }
  return obj;

}

function checkDown(cell){
  var maxBottomCell = GRID_COL*(GRID_ROW-1) + (cell%GRID_COL);
  //console.log("maxBottomCell, ", cell, maxBottomCell)
  cell += GRID_COL;
  var index = cell;
  var obj = {index:0, loc:0};
  var isFound = false;
  for(;!isFound && index <= maxBottomCell;){
    var temp = checkForCell(index, isFound, GRID_COL, "Down");
    isFound = temp.isFound;
    index = temp.index; 
  }
  if(index >= maxBottomCell){
    obj.index = -1;
    obj.loc = canvas.height;
    obj.level = 0;
  }else{
    obj.index = index;
    obj.loc = getY(index);
    obj.level = temp.level;
  }
  return obj;
}

function setNewGameLevel(){
  gameLevel++;
  gameCounter = 0;
  gameInit(gameLevel);
}


function explodeProjectile(e, cell){   
  var x = e.offsetX;
  var y = e.offsetY;
  context.drawImage(gameImages[8], x,y, 10, 10);
}

function getCellCordinate(index){
  var x = Math.floor(index%10) * GRID_COL;
  var Y = (index%10) * GRID_ROW;
  var obj = {x: x, y:y};
  return obj;
}

function getX(cell){
  return (cell%10) * 100;
}

function getY(cell){
  return Math.floor(cell/10) * 80;
}

var islevelComplete = false;

function animateAll(){
   var stopId = requestAnimationFrame(animateAll);
      createGrid();
      var len = projectileList.length;
      projectileList.forEach(function(item, index){
              if(item.index==0 && !item.isEmpty){
                item.instance.moveRight(index);
              }
              // if(item.index==1 && !item.isEmpty){
              //   item.instance.moveLeft(index);
              // }
              // if(item.index==2 && !item.isEmpty){
              //   item.instance.moveUp(index);
              // }
              // if(item.index==3 && !item.isEmpty){
              //   item.instance.moveDown(index);
              // }   
      });
      // if(popperBustLeft == 0 && !islevelComplete){
      //            console.log("Speed",speed);
      //            islevelComplete = true;
      //            setTimeout(function(){
      //             projectileList = [];
      //             cancelAnimationFrame(stopId);
      //             setNewGameLevel();
      //             clearTimeout();
      //           }, 2000);
      // }
      //console.log("gameCounter",gameCounter);
};

function handlePopperChain(cell, isClick){
   var x = getX(cell);
   var y = getY(cell);
   var midX = GRID_WIDTH/2; 
   var midY = GRID_HEIGHT/2;
   var currentX = midX +x;
   var currentY = midY +y;
   for(var i=0; i <4; i++){
      var obj = {
        index : i,
        isEmpty: false,
        instance: new MoveObj(cell, currentX, currentY),
      }
      projectileList.push(obj);
    }
    animateAll();
}
//file:///Volumes/Mac-Partation/code/Cxy_projectile/CrazyPopper/game/index.html

