const GRID_ROW = 5;
const GRID_COL = 10;
const GRID_WIDTH = 100;
const GRID_HEIGHT = 80;

var gameImages = [];
var imageCounter = 0;
var imgLoded = false;

var levelComplete;
var missSound;
var gameBgsound;
var popperBurst;


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
}

function loadSound(){
	 var soundPath = 'app/assets/sound/';
	 levelComplete = new sound(soundPath +'applauseShort.mp3');
	 missSound = new sound(soundPath + 'awh.mp3');
	 gameBgsound = new sound(soundPath + 'bgmusic.mp3');
	 popperBurst = new sound(soundPath + 'pop3.mp3');
}

