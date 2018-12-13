
var setDelay = null;
var isSetNewLevel = true;
function checkForCell(index, isFound, value){
    if(grid[index].isActive){
  	  grid[index].level--;
	  grid[index].isActive = grid[index].level>0 ? true : false;
    grid[index].imageUrl = grid[index].level;
	  isFound = true;
    popperBurst.play();
    }else{
    	index = index + value;
    } 
    return {isFound, index};
}

function checkRight(cell){
  var maxRightCell = Math.ceil(cell/GRID_COL) * 10;
  if(maxRightCell === cell){
  	maxRightCell = cell+10;
  }
  var index = cell+1;
  //console.log("checkRight",cell, maxRightCell, index, grid[index]);
  var isFound = false;
  while(!isFound && index < maxRightCell){ 
  	var temp = checkForCell(index, isFound, 1);
  	isFound = temp.isFound;
    index = temp.index;  
  }
  if(index === maxRightCell){
  	index = null;
  }
  return index;
}

function checkLeft(cell){
  var maxLeftCell = Math.floor(cell/GRID_COL) * GRID_COL;
  --cell;
  var index = cell;
  var isFound = false;
  //console.log("checkRight",cell, maxLeftCell, index, grid[index]);
  while(!isFound && index >= maxLeftCell){
    var temp = checkForCell(index, isFound, -1);
  	isFound = temp.isFound;
    index = temp.index; 
  }
  if(index < maxLeftCell){
  	index = null;
  }
  return index;
}

function checkTop(cell){
  var maxTopCell = cell%GRID_COL;
  cell -= GRID_COL;
  var index = cell < 0 ? null : cell;
  var isFound = false;
  //console.log("checkTop",cell, index, grid[index]);	
  while(!isFound && index >= maxTopCell){
    var temp = checkForCell(index, isFound, -GRID_COL);
  	isFound = temp.isFound;
    index = temp.index; 
  }
  if(index < maxTopCell){
  	index = null;
  }
  return index;
}

function checkBottom(cell){
  var maxBottomCell = GRID_COL*(GRID_ROW-1) + (cell%GRID_COL);
  cell += GRID_COL;
  var index = cell;
  var isFound = false;
  //console.log("checkBottom",cell, index, maxBottomCell, grid[index]);	
  while(!isFound && index <= maxBottomCell){
    var temp = checkForCell(index, isFound, GRID_COL);
  	isFound = temp.isFound;
    index = temp.index; 
  }
  if(index > maxBottomCell){
  	index = null;
  }
  return index;
}


function trackLocation(eve){
  var x = Math.floor(eve.offsetX/GRID_WIDTH);
  var y = Math.floor(eve.offsetY/GRID_HEIGHT) * GRID_COL;
  var col = x+y;
  return col; 
}

function setNewGameLevel(){
  gameLevel++;
  clearTimeout(setDelay);
  gameInit(gameLevel);
}

function handlePopperChain(cell){
  //console.log("handlePopperChain---",cell, grid[cell]);
   var topCell, rightCell, bottomCell, leftCell; 
       setDelay = setTimeout(function(){
       var rightX = checkRight(cell);
       var leftX = checkLeft(cell);
       var topY = checkTop(cell);
       var bottomY = checkBottom(cell);
       if(rightX && popperLeft >0){
          popperLeft--;
          handlePopperChain(rightX)
       }
       if(leftX && popperLeft >0){
          popperLeft--;
          handlePopperChain(leftX)
       }
       if(topY && popperLeft >0){
          popperLeft--;
          handlePopperChain(topY)
       }
       if(bottomY && popperLeft >0){
          popperLeft--;
          handlePopperChain(bottomY)
       }
       console.log("popperLeft",popperLeft);
       if(popperLeft <1 && isSetNewLevel){
          gameBgsound.stop();
          levelComplete.play();
          isSetNewLevel = false;
          drawRect(0,0, canvas.width, canvas.height, '#a1c2e8');
          colorText("Level Change", canvas.width/2, canvas.height/2, 'white');
          var timeout = setTimeout(function(){
            setNewGameLevel(gameLevel)
            clearTimeout(timeout);
          }, 2000);  
       }
       //clearTimeout(setDelay);
    }, 2000);
    createGrid();
}

