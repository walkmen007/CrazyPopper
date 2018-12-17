var proImage = new Image();

var speed = 5;

var projectileR;
var projectileL;

var projectileT;
var projectileB;


window.onload = function(){
	  canvas  = document.getElementById("myCanvas");
	  context = canvas.getContext('2d');

      image.src= './assets/images/popperBackground.jpg';
      proImage.src = './assets/images/projectile.png'
      //context.drawImage(image, 0,0, canvas.width, canvas.height);
      //context.proImage(image, 0,0, canvas.width, canvas.height);
      projectileR = new MoveObj(350,200);
      projectileL = new MoveObj(350,200);

      projectileT = new MoveObj(350,200);
      projectileB = new MoveObj(350,200);
}

image.onload = function(){
     context.drawImage(game, 0, 0, canvas.width, canvas.height);
     //context.drawImage(proImage, moveX,10, 20, 20);
     
}

function init(){
	context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

setInterval(function(){
  init();
  	 projectileR.moveRight(this.moveX, this.moveY);
     projectileL.moveLeft(this.moveX, this.moveY);
  
  	 projectileT.moveTop(this.moveX, this.moveY);
     projectileB.moveDown(this.moveX, this.moveY);
}, 20);


function MoveObj(x,y){
    
  this.moveX = x;
  this.moveY = y;
  this.w = 20;
  this.h = 20;
  this.img = proImage;
  
  this.moveRight = function(){
  	  console.log("moveX", this.moveX);
  	  if(this.moveX <=canvas.width){
  	  	this.moveX += speed;
  	  	this.drawImg(this.moveX, this.moveY);
  	  }else{
  	  	delete projectileR; 
  	  	console.log("delete projectile", projectileR);
  	  }   
  }
  this.moveLeft = function(){ 
  	  if(this.moveX > 0){
  	  	this.moveX -= speed;
  	  	this.drawImg(this.moveX, this.moveY);
  	  } 
  }
  this.moveTop = function(){
  	  if(this.moveY > 0){
  	  	this.moveY -= speed;
  	  	this.drawImg(this.moveX, this.moveY);
  	  }
  }
  this.moveDown = function(){
  	  if(this.moveY <= canvas.height){
  	  	this.moveY += speed;
  	  	this.drawImg(this.moveX, this.moveY);
  	  } 
  }

  this.drawImg = function(x, y){
  	console.log("Draw Image", x,y);
  	context.drawImage(this.img, x,y, this.w, this.h);
  }

}