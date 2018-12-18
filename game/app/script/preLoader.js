const GRID_ROW = 5;
const GRID_COL = 10;
const GRID_WIDTH = 100;
const GRID_HEIGHT = 80;

var gameImages = {};
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
	var imageObj = {};
	var path = 'app/assets/images/';
	 imageObj = {
		    'popperPurple': path +'popperPurple.png',
		    'popperBlue': path +'popperBlue.png',
		    'popperYellow': path +'popperYellow.png',
		    'rightEye': path +'popperRightEye.png',
		    'leftEye': path +'popperLeftEye.png',
		    'popperExplosion': path +'popperExplosion.png',
		    'swap': path +'swap.png',
		    'projectile' : path +'projectile.png',
		    'bgImage' : path +'popperBackground.jpg',
		    'blankImg': '',
	 }
    
	 return imageObj;
}

function preloadImages(callback){
	var imgLen = 0;
	var imgPathObj = setImageUrlStr();
	    imgLen = Object.keys(imgPathObj).length;
	var loadedImages = 0;   
   console.log("image load");
   for(var src in imgPathObj){
   	   gameImages[src] = new Image();
       gameImages[src].onload = function(){
       console.log("image loaded",gameImages);
   	    if(++loadedImages >= 9) {
   		  console.log("image loaded",gameImages);
          callback();
        }
       }
       gameImages[src].src = imgPathObj[src];
   }
}

function loadSound(){
	 var soundPath = 'app/assets/sound/';
	 levelComplete = new sound(soundPath +'applauseShort.mp3');
	 missSound = new sound(soundPath + 'awh.mp3');
	 gameBgsound = new sound(soundPath + 'bgmusic.mp3');
	 popperBurst = new sound(soundPath + 'pop3.mp3');
}

