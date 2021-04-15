const board_border = 'black';
    const board_background = 'lightgrey';
    const snake_col = 'red' ;
    const snake_border = 'solid black';
    
    let snake = [
      {x: 200, y: 200},
      {x: 180, y: 200},
      {x: 170, y: 200},
      {x: 160, y: 200}
    ]

    let score = 0;
    // True if changing direction
    let changing_direction = false;
    // Horizontal velocity
    let food_x;
    let food_y;
    let dx = 20;
    // Vertical velocity
    let dy = 0;
    
    
    // Get the canvas element
    const snakeGame = document.getElementById("snakeGame");
    // Return a two dimensional drawing context
    const ctx = snakeGame.getContext("2d");
    // Start game
    main();

    gen_food();

    document.addEventListener("keydown", change_direction);
    
    // main function called repeatedly to keep the game running
    function main() {

        if (has_game_ended()) return;
    
        changing_direction = false;
        setTimeout(function onTick() {
        clear_board();
        drawFood();
        move_snake();
        drawSnake();
        // Repeat
        main();
      }, 100)
    }
    
    // draw a border around the canvas
    function clear_board() {
      //  Select the colour to fill the drawing
      ctx.fillStyle = board_background;
      //  Select the colour for the border of the canvas
      ctx.strokestyle = board_border;
      // Draw a "filled" rectangle to cover the entire canvas
      ctx.fillRect(0, 0, snakeGame.width, snakeGame.height);
      // Draw a "border" around the entire canvas
      ctx.strokeRect(0, 0, snakeGame.width, snakeGame.height);
    }
    
    // Draw the snake on the canvas
    function drawSnake() {
      // Draw each part
      snake.forEach(drawSnakePart)
    }

    function drawFood() {
      ctx.fillStyle = 'darkgreen';
      ctx.strokestyle = 'darkgreen';
      ctx.fillRect(food_x, food_y, 20, 20);
      ctx.strokeRect(food_x, food_y, 20, 20);
    }
    
    // Draw one snake part
    function drawSnakePart(snakePart) {

      // Set snake insides color
      ctx.fillStyle =  snake_col;
      // Set snake border colour 
      ctx.strokestyle = snake_border;
      // the part is located
      ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
      // Border the snake part
      ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
    }

    function has_game_ended() {
      for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
         return true
      }


      const hitLeftWall = snake[0].x < 0;
      const hitRightWall = snake[0].x > snakeGame.width - 20;
      const hitToptWall = snake[0].y < 0;
      const hitBottomWall = snake[0].y > snakeGame.height - 20;
      
      return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
      
    }

    function random_food(min, max) {
      return Math.round((Math.random() * (max-min) + min) / 20) * 20;
    }

    function gen_food() {
      // Generate a random number for the food x-coordinate
      food_x = random_food(0, snakeGame.width - 20);
      // Generate a random number for the food y-coordinate
      food_y = random_food(0, snakeGame.height - 20);
      // if the new food location is where the snake currently is, generate a new food location
      snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
      });
    }

    function change_direction(event) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
      
    // Prevents reversing
    
      if (changing_direction) return;
      changing_direction = true;
      const keyPressed = event.keyCode;
      const goingUp = dy === -20;
      const goingDown = dy === 20;
      const goingRight = dx === 20;
      const goingLeft = dx === -20;
      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -20;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -20;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 20;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 20;
      }
    }

    function move_snake() {
      // Create new snake head
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      // Add the new head 
      snake.unshift(head);
      const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
      if (has_eaten_food) {
        // Increase score
        score += 10;
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        // Generate new food location
        gen_food();
      } else {
        // Remove the last part of snake body
        snake.pop();
      }
    }
    /* //not in use right now
    function getRandomColour(){
      var red = Math.floor(Math.random()* 255);
      var green = Math.floor(Math.random() * 255);
      var blue = Math.floor(Math.random() * 255);
    
      return "rgb("+red+","+green+"," +blue+" )";  
    }*/