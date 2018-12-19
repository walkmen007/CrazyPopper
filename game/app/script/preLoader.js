var canvas, context;
var grid = []; //col*row matrix Array.
var gameLevel = 0; //For Track current Game level.
var maxClick = 0; //Max Click allowed in game.
 
var gameImages = {}; //Game image object.

var levelComplete;
var missSound; // Miss Hit Sound.
var gameBgsound;
var popperBurstSound;

var speed = 1; // Default speed for projectile in any direction.
var projectileList = []; //Array for projectile.
var stopId; // variable to track animationFrame.

function Sound(src) {
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
}// Sound Class.

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
}//Set default path for images.

function preloadImages(callback){
	var imgPathObj = setImageUrlStr();
	var imgLen = Object.keys(imgPathObj).length || 0;
	var loadedImages = 0;   
   for(var src in imgPathObj){
   	   gameImages[src] = new Image();
       gameImages[src].onload = function(){
   	    if(++loadedImages >= 9) {
          callback();
        }
       }
       gameImages[src].src = imgPathObj[src];
   }
}//Preload images.

function loadSound(){
	 var soundPath = 'app/assets/sound/';
	 levelComplete = new Sound(soundPath +'applauseShort.mp3');
	 missSound = new Sound(soundPath + 'awh.mp3');
	 gameBgsound = new Sound(soundPath + 'bgmusic.mp3');
	 popperBurstSound = new Sound(soundPath + 'pop3.mp3');
}//Load sound.

