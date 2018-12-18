 
var isSetNewLevel = true;
var speed = 1;
var projectileList = [];

function CreateProjectile(cell, direction){  
  this.w = 20;
  this.h = 20;
  this.imgIndex = 8;
  this.xFactor = direction == 0 ? 1 : direction== 2? -1 : 0;
  this.yFactor = direction == 1 ? 1 : direction== 3? -1 : 0;
  this.dir = direction;

   var x = getX(cell);
   var y = getY(cell);
   var midX = GRID_WIDTH/2; 
   var midY = GRID_HEIGHT/2;
   var currentX = direction ==0 ? x + GRID_WIDTH : direction ==1 || direction ==3 ? x + midX : x;
   var currentY = direction ==0 || direction ==2 ? midY + y : direction ==1 ? y+GRID_HEIGHT : y;
  // if(this.dir ==2)
     //console.log("curr dir",currentX);
  this.position = {
    x: currentX,
    y: currentY, 
  }

  this.checkCollision = function(){
    var x = this.position.x;
    var y = this.position.y;
    x = Math.floor(x/GRID_WIDTH);
    y = Math.floor(y/GRID_HEIGHT) * GRID_COL;
    var pos = 0;
    var cell = x+y;
    var triggerX, triggerY;
    var isHit = false; var isHitByWall = false;
    if(grid[cell] && grid[cell].isActive){
       posX = x * GRID_WIDTH + GRID_WIDTH-20;
       triggerX = this.position.x == x*GRID_WIDTH || (this.position.x == pos && this.dir ==2);
       triggerY = this.position.y >= y*GRID_HEIGHT + 20 || this.position.y <= y*(GRID_HEIGHT) -20;
       isHit = triggerX || triggerY;
    }else{
        triggerX = this.position.x >= canvas.width || this.position.x <= 0;
        triggerY = this.position.y >= canvas.height || this.position.y <= 0;
        isHitByWall = triggerX || triggerY;
    }
    return {isHitByWall:isHitByWall, cell:cell, isHit:isHit};
  }

  this.destroy = function(index, cell){
    if(grid[cell] && !grid[cell].isActive){
       projectileList.splice(index, 1);
    }
    if(grid[cell] && grid[cell].level===0){
      grid[cell].isActive = false;
    }
  }

  this.moveProjectile = function(index){
      this.position.x += (speed * this.xFactor);
      this.position.y += (speed * this.yFactor);
      var collision = this.checkCollision();

      //if(this.dir ==2)
        //console.log("curr dir",this.position.x, speed * this.xFactor);
      if(collision.isHitByWall || collision.isHit){
        this.imgIndex = 0;
        this.drawImg(this.imgIndex, this.position.x , this.position.y);
        this.destroy(index, collision.cell);
        if(grid[collision.cell] && grid[collision.cell].isActive){
          grid[collision.cell].level--;
          handlePopperChain(collision.cell);
        }
        
      }
      else{
        this.imgIndex = 8;
        this.drawImg(this.imgIndex, this.position.x , this.position.y);
      }
  }
  this.drawImg = function(index, x, y){
    context.drawImage(gameImages[index], x,y, this.w, this.h);
  }

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
var stopId;
function animateAll(){
    stopId = requestAnimationFrame(animateAll);
      createGrid();
      var len = projectileList.length;
      projectileList.forEach(function(item, index){
         item.moveProjectile(index);               
      });
      if(projectileList.length ==0){
        cancelAnimationFrame(stopId);
      }
      //console.log("projectileList.length",projectileList.length);
};

function handlePopperChain(cell){
  console.log("handlePopperChain",cell)
   for(var i=0; i <4; i++){
      var obj = new CreateProjectile(cell, i);
      projectileList.push(obj);
    }
    animateAll();
}
//file:///Volumes/Mac-Partation/code/Cxy_projectile/CrazyPopper/game/index.html

