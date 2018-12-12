const GRID_ROW = 5;
const GRID_COL = 10;
const GRID_WIDTH = 100;
const GRID_HEIGHT = 80;

var gameImages = [];
var imageCounter = 0;
var imgLoded = false


var path = 'app/assets/sound/';
var gameSound = new sound(path+'applauseShort.mp3');
var misSound = new sound(path + 'awh.mp3');
var gameBgsound = new sound(path + 'bgmusic.mp3');
//var gameMusic = new sound(path + '');

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}


function setMediaUrlStr(){
	var soundArr = [];
	var path = 'app/assets/sound/';
	soundArr.push(path +'applauseShort.mp3');
	soundArr.push(path +'awh.mp3');
	soundArr.push(path +'pop3.mp3');
	soundArr.push(path +'bgmusic.mp3');
	return soundArr;
}


function setImageUrlStr(){
	var imgPathlist = [];
	var path = 'app/assets/images/';
	imgPathlist.push('');
	imgPathlist.push(path +'popperYellow.png');
	imgPathlist.push(path +'popperPurple.png');
	imgPathlist.push(path +'popperBlue.png');
	imgPathlist.push(path +'popperRightEye.png');
	imgPathlist.push(path +'popperLeftEye.png');
	imgPathlist.push(path +'popperExplosion.png');
	imgPathlist.push(path +'swap.png');
	imgPathlist.push(path +'projectile.png');
	imgPathlist.push(path +'popperBackground.jpg');
	return imgPathlist;
}


function preloadImages(callback){
	var imgPathList = [];
	var soundList = [];
	var imgLen = 0;
	    imgPathList = setImageUrlStr();
	    imgLen = imgPathList.length;
	for(var i=0; i<imgLen; i++){
		var img = new Image();
		gameImages.push(img);
		img.src = imgPathList[i];
		img.onload = function(){
          imageCounter++;
          if(imageCounter === 9){
          	callback();
          }  
		}	
	}
    
	// for(var i=0; i <soundLen; i++){
	// 	var newSound = new sound();
	// 	sound.src = assetsPathList[i];
	// 	img.onload = function(){
 //          imageCounter++;
 //          if(imageCounter === 9){
 //          	callback();
 //          }  
	// 	}	
	// }
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