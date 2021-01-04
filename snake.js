function init() {
  canvas = document.getElementById("mycanvas");
  W = canvas.width = H = canvas.height = 600 ;
  pen = canvas.getContext("2d");
  cs = 30;
  game_over = false;
  score = 0;

  //image for food
  food_img = new Image();
  food_img.src = "assets/mouse.jpg";

  //image for trophy
  trophy_img = new Image();
  trophy_img.src = "assets/trophy.png";

  food = getRandomfood();
  //snake is json object
  snake = {
    init_len: 5,
    color: "#808080",
    cells: [],
    direction: "right",

    createSnake: function () {
      for (var i = this.init_len; i > 0; i--) {
        this.cells.push({ x: i, y: 0 });
      }
    },
    drawSnake: function () {
      for (var i = 0; i < this.cells.length; i++) {
        pen.fillStyle = this.color;
        pen.fillRect(
          this.cells[i].x * cs,
          this.cells[i].y * cs,
          cs - 3,
          cs - 3
        );
      }
    },

    updateSnake: function () {
      //if food is eaten by snake, increase length of snake and generate new food object
      var headX = this.cells[0].x;
      var headY = this.cells[0].y;
      if (headX == food.x && headY == food.y) {
        //food eaten
        food = getRandomfood();
        score++;
      } else {
        this.cells.pop();
      }

      //console.log("updating snake according to direction property");
      var nextX, nextY;

      if (this.direction == "right") {
        nextX = headX + 1;
        nextY = headY;
      } else if (this.direction == "left") {
        nextX = headX - 1;
        nextY = headY;
      } else if (this.direction == "down") {
        nextX = headX;
        nextY = headY + 1;
      } else {
        nextX = headX;
        nextY = headY - 1;
      }
      this.cells.unshift({ x: nextX, y: nextY });

      var last_x = Math.round(W / cs);
      var last_y = Math.round(H / cs);

      if (
        this.cells[0].y < 0 ||
        this.cells[0].x < 0 ||
        this.cells[0].x > last_x ||
        this.cells[0].y > last_y
      ) {
        game_over = true;
      }
    },
  };

  snake.createSnake();

  //event listener in Document Object

  function keyPressed(e) {
    if (e.key == "ArrowRight") {
      snake.direction = "right";
    } else if (e.key == "ArrowLeft") {
      snake.direction = "left";
    } else if (e.key == "ArrowDown") {
      snake.direction = "down";
    } else{
      snake.direction = "up";
    }
  }

  document.addEventListener("keydown", keyPressed);
}

function draw() {
  pen.clearRect(0, 0, W, H);
  snake.drawSnake();

  pen.fillStyle = food.color;
  pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
  
  pen.drawImage(trophy_img,18,20,42,40)
  pen.fillStyle = "blue"
  pen.font = "20px Roboto"
  pen.fillText(score,30,40);
}

function update() {
  snake.updateSnake();
}

function getRandomfood(){
    var foodX = Math.round(Math.random() * (W-cs)/cs);
    var foodY = Math.round(Math.random() * (H - cs) / cs);

    var food = {
        x:foodX,
        y:foodY,
        color:"red",
    }

    return food
}

function gameloop() {
    if(game_over == true)
    {
        clearInterval(f);
        alert("Game Over");
        return;
    }
  draw();
  update();
}

init();
var f = setInterval(gameloop, 100);
