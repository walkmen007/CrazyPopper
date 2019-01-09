 function animateAll(){
    stopId = requestAnimationFrame(animateAll);
      createGrid();
      projectileList.forEach(function(item, index){
         item.moveProjectile(index);               
      });
      if(!projectileList.length){
        cancelAnimationFrame(stopId);
        checkForGameEnd();
      }
}; // Animate projectile using requestAnimationFrame.

function checkForGameEnd(){
  var isActive = checkForActivePopper();
  if(isActive){
    gameLevel++;
    gameInit();
  }
}// Check for Game End Condition;

CreateProjectile.prototype.destroy = function(index, collission){
    console.log("Destroy call");
    delete this.position.x;
    delete this.position.y;
    var cell = this.cell
    projectileList.splice(index, 1);
    if(grid[cell] && collission.isHit){
          grid[collission.cell].level--;
          grid[collission.cell].isActive = grid[collission.cell].level==0 ? false: true;
          handlePopperChain(collission.cell);
    } 
}

CreateProjectile.prototype.checkCollision = function (){
    var x = this.position.x;
    var y = this.position.y;
    x = x < 0 ? 0 : Math.floor(x/GRID_WIDTH);
    y = Math.floor(y/GRID_HEIGHT) * GRID_COL;
    var cell = x+y;
    var triggerX, triggerY;
    var isHit = false; var isHitByWall = false;

    if(grid[cell] && grid[cell].isActive){
      triggerX = this.position.x >= x*GRID_WIDTH || (this.position.x <= 0 && this.dir ==2);
      triggerY = this.position.y >= y*GRID_COL || this.position.y >= (y*GRID_COL - GRID_HEIGHT);
      isHit = triggerX && triggerY;
    }
    else{
        triggerX = this.position.x >= canvas.width || this.position.x <= 0;
        triggerY = this.position.y >= canvas.height || this.position.y <= 0;
        isHitByWall = triggerX || triggerY;
    }
    return {isHitByWall:isHitByWall, cell:cell, isHit:isHit}; 
}

CreateProjectile.prototype.moveProjectile = function(index){
      this.position.x += (speed * this.xFactor);
      this.position.y += (speed * this.yFactor);
      var collision = this.checkCollision();
      if(collision.isHit)
        popperBurstSound.play();
      if(collision.isHitByWall || collision.isHit){
        this.destroy(index, collision);     
      }
      else{
        this.drawImg(gameImages.projectile, this.position.x , this.position.y);
      }  
}

CreateProjectile.prototype.drawImg = function(){
   context.drawImage(img, x,y, this.w, this.h);
}

function CreateProjectile(cell, direction){  
  this.w = 20;
  this.h = 20;
  this.xFactor = direction == 0 ? 1 : direction== 2? -1 : 0;
  this.yFactor = direction == 1 ? 1 : direction== 3? -1 : 0;
  this.dir = direction;
  this.cell = cell;
   var x = getX(this.cell);
   var y = getY(this.cell);
   var midX = GRID_WIDTH/2; 
   var midY = GRID_HEIGHT/2;
   var currentX = direction ==0 ? x + GRID_WIDTH : direction ==1 || direction ==3 ? x + midX : x;
   var currentY = direction ==0 || direction ==2 ? midY + y : direction ==1 ? y+GRID_HEIGHT : y;
   this.position = {
      x: currentX,
      y: currentY, 
   }
   this.drawImg = function(img, x, y){
    context.drawImage(img, x,y, this.w, this.h);
   }

}//Class CreateProjectile for Projectile Collossion, Destroy, init New chain. 

function explodeProjectile(e, cell){   
  var x = e.offsetX;
  var y = e.offsetY;
  context.drawImage(gameImages.projectile, x,y, projectileW, projectileH);
}//Explode Popper on hit by projectile.

function getX(cell){
  return (cell%GRID_COL) * GRID_WIDTH;
} // to get offsetX.

function getY(cell){
  return Math.floor(cell/GRID_COL) * GRID_HEIGHT; 
} //to get offsetY.

function handlePopperChain(cell){
    for(var i=0; i <direction; i++){
      var obj = new CreateProjectile(cell, i);
      projectileList.push(obj);
    }
    animateAll();
}// createnew projectile object and delete once life over.

function setNewGameLevel(){
  gameLevel++;
  gameCounter = 0;
  gameInit(gameLevel);
} //Set or reset level on game finish/loss.

function trackLocation(x,y){
  var r = Math.floor(x/GRID_WIDTH);
  var c = Math.floor(y/GRID_HEIGHT) * GRID_COL;
  var col = r+c;
  return col; 
} 