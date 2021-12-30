var canvas = document.getElementById("gameCanvas");
var canvasContext;
var x = 50;
var y = 0;
var tailSize = 1;
var direction = "";
var snakeArray = [];
var score = 0;
var speed = 125;
var interval;
var highScore = localStorage.getItem("highscore");

var positionx = 200;
var positiony = 200;
var xFruit = Math.floor(Math.random() * 16) * 50;
var yFruit = Math.floor(Math.random() * 16) * 50;

var xDegrowFruit = Math.floor(Math.random() * 16) * 50;
var yDegrowFruit = Math.floor(Math.random() * 16) * 50;


window.onload = function() {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0,0,canvas.width, canvas.height);
  canvasContext.fillStyle = 'blue';
  canvasContext.fillRect(positionx,positiony,50,50);

  spawnFruit();
  interval = setInterval(gameLoop, 125);
}

function spawnFruit() {
  if (xFruit == positionx && yFruit == positiony) {
  xFruit = Math.floor(Math.random() * 16) * 50;
  yFruit = Math.floor(Math.random() * 16) * 50;
  tailSize++;
  score++;
  speed -= 5;
  clearInterval(interval);
  interval = setInterval(gameLoop, speed);
  }
  
  canvasContext.fillStyle = 'red';
  canvasContext.fillRect(xFruit,yFruit,50,50);
}

function spawnDegrowFruit() {
  if (xDegrowFruit == positionx && yDegrowFruit == positiony) {
  xDegrowFruit = Math.floor(Math.random() * 16) * 50;
  yDegrowFruit = Math.floor(Math.random() * 16) * 50;
  tailSize--;
  }
  
  canvasContext.fillStyle = 'green';
  canvasContext.fillRect(xDegrowFruit,yDegrowFruit,50,50);
}

function gameLoop() {
  document.getElementById("highscore").innerHTML = "Highscore: "+highScore;
  canvasContext.fillStyle='black';
  canvasContext.fillRect(0,0,canvas.width,canvas.height);

  spawnFruit(xFruit,yFruit);

  if (score > 4) {
    spawnDegrowFruit();
  }

  positionx += x;
  positiony += y;


  if (positionx >= canvas.width) {
    positionx = 0;
  }
  if (positiony >= canvas.height) {
    positiony = 0;
  }
  if (positionx < 0) {
    positionx = canvas.width;
  }
  if (positiony < 0) {
    positiony = canvas.height;
  }


  //death handler
  for (let i = 1; i < snakeArray.length; i++) {
    if (snakeArray[0][0] == snakeArray[i][0] && snakeArray[0][1] == snakeArray[i][1]) {
      tailSize = 1;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highscore", score);

      }
      score = 0;
      speed = 125;
      positionx = positiony = 200;
      xFruit = Math.floor(Math.random() * 16) * 50;
      yFruit = Math.floor(Math.random() * 16) * 50;
      clearInterval(interval);
      interval = setInterval(gameLoop, speed);
    }
  }
  

  snakeStart = [positionx, positiony];
  snakeArray.push(snakeStart);

  for (let i = 0; i < snakeArray.length; i++) {
  if (snakeArray.length > tailSize) {
    snakeArray.shift();
  
    }
  }



  makeSnake(snakeArray);

  document.getElementById("score").innerHTML = "Score: "+score;

  //console.log(positionx, positiony);
}


function makeSnake(snakeArray) {

  for (let i = 0; i < snakeArray.length; i++) {
    canvasContext.fillStyle='blue';
    canvasContext.fillRect(snakeArray[i][0],snakeArray[i][1],50,50);
  };

}

document.addEventListener('keypress', pressHandler);

function pressHandler(e) {
  var k = e.code;

  if (k == "KeyS") {
    x = 0;
    y = 50;
    direction = "south";
  }
  if (k == "KeyW") {
    y= -50;
    x = 0;
    direction = "north";
  }
  if (k == "KeyA") {
    x= -50;
    y = 0;
    direction = "west";

  }
  if (k == "KeyD") {
    x = 50;
    y = 0;
    direction = "east";
  }
}