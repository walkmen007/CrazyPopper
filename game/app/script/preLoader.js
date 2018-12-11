const GRID_ROW = 5;
const GRID_COL = 10;
const GRID_WIDTH = 100;
const GRID_HEIGHT = 80;

var gameImages = [];
var imageCounter = 0;
var imgLoded = false
var imageUrlList = [];

var bgImage = new Image();
    bgImage.src='app/assets/images/popperBackground.jpg';

function setImageUrlStr(){
	imageUrlList.push('');
	imageUrlList.push('app/assets/images/popperYellow.png');
	imageUrlList.push('app/assets/images/popperPurple.png');
	imageUrlList.push('app/assets/images/popperBlue.png');
	imageUrlList.push('app/assets/images/popperRightEye.png');
	imageUrlList.push('app/assets/images/popperLeftEye.png');
	imageUrlList.push('app/assets/images/popperExplosion.png');
	imageUrlList.push('app/assets/images/swap.png');
	imageUrlList.push('app/assets/images/projectile.png');
	imageUrlList.push('app/assets/images/popperBackground.jpg');
}


function preloadImages(callback){
	setImageUrlStr();
	for(var i=0; i <imageUrlList.length; i++){
		var img = new Image();
		gameImages.push(img);
		img.src = imageUrlList[i];
		img.onload = function(){
          imageCounter++;
          if(imageCounter === 9){
          	callback();
          }  
		}
		
	}
}



// var generateRandomCell = function(){  
// 	var maxcell = GRID_COL*GRID_ROW;
// 	for(var i=0;i<maxcell;i++){ 
// 	   var obj = {isActive: true}
// 	   var randomNum = Math.floor(Math.random()*10) ;
// 	   obj.isActive = true;
// 	   if(randomNum <=2){
// 	   	obj.level = 0;
// 	   	obj.isActive = false;
// 	   }else if(randomNum>2 && randomNum <=4){
// 	   	obj.level = 1;
// 	   }else if(randomNum>4 && randomNum <=8){
// 	   	obj.level = 2;
// 	   }else{
// 	   	obj.level = 3;
// 	   }
//      obj.imageUrl = gameImages[obj.level];
//      grid.push(obj);	
// 	}
// }