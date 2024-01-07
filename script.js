var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;



  window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update,200);


    document.getElementById("toggleModeButton").addEventListener("click", toggleDarkMode);
    };
  
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var foodX ;
var foodY ;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var gameOver = false;

function update(){

  if(gameOver){
    return;
  }

  context.fillStyle="black";
  context.fillRect(0,0,board.width,board.height);

  context.fillStyle = "lime";
  context.fillRect(foodX,foodY,blockSize,blockSize);

  for(let i = snakeBody.length -1 ; i>0; i--){
    snakeBody[i] = snakeBody[i-1];
  }

  if(snakeBody.length){
    snakeBody[0] = [snakeX, snakeY];
  }

  if (snakeX == foodX && snakeY == foodY){
    snakeBody.push([foodX,foodY]);
    placeFood();
  }

  context.fillStyle = "red";
  snakeX+=velocityX *blockSize;
  snakeY+=velocityY *blockSize;
  context.fillRect(snakeX,snakeY,blockSize,blockSize)

  for(let i=0; i<snakeBody.length; i++){
    context.fillRect(snakeBody[i][0], snakeBody[i][1],blockSize,blockSize);
  }
 
  if(snakeX < 0 || snakeX > cols*blockSize || snakeY<0 || snakeY > rows*blockSize){
      gameOver = true;
      board.style.border = '10px solid red';
      setTimeout(function () {
        alert("Game Over");
      }, 1);
  }
  for(let i=0; i< snakeBody.length; i++) {
    if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
      gameOver = true;
      board.style.border = '10px solid red';
   
      setTimeout(function () {
        alert("Game Over");
      }, 1);
    }
  }
}

function changeDirection(e){
  if (e.code == "ArrowUp" && velocityY!= 1){
    velocityX = 0;
    velocityY = -1;
  }
  else if (e.code == "ArrowDown" && velocityY!=-1){
    velocityX = 0;
    velocityY = 1;
  }
  else if (e.code == "ArrowLeft" && velocityX!= 1){
    velocityX = -1;
    velocityY = 0;
  }
  else if(e.code == "ArrowRight" && velocityX!=-1){
    velocityX = 1;
    velocityY = 0;
  }

}

function placeFood(){
  foodX = Math.floor(Math.random()*cols)*blockSize;
  foodY = Math.floor(Math.random()*rows)*blockSize;
}

