class mainClass {
  constructor() {
    // All Variables/Objects
    this.canvas = document.querySelector('#canvas');
    this.ctx = this.canvas.getContext('2d');

    // Where we display the score
    this.scoreHolder = document.querySelector('#scored');

    // Snake Info
    this.snake = {
      X: 0,
      Y: 0,
      W: 20,
      H: 20,
    };

    // Fruit Info
    this.fruit = {
      X: Math.random() * (750 - 10) + 10,
      Y: Math.random() * (450 - 10) + 10,
      W: 20,
      H: 20,
    };

    // Snake Array
    this.snakeArr = [];
    this.snakeArr[0] = { X: this.canvas.width / 2, Y: this.canvas.height / 2 };

    // Diff between each snake tail
    this.box = 10;

    // Used to hold the x and y positions of the new head
    this.newHead;

    // Used to check key press
    this.keyPressed;

    // Used to hold the score
    this.score = 0;
  }

  // Used to draw the snake
  drawSnake() {
    // Display the snake by looping through its array
    for (let i = 0; i < this.snakeArr.length; i++) {
      this.ctx.beginPath();
      this.ctx.rect(
        this.snakeArr[i].X,
        this.snakeArr[i].Y,
        this.snake.W,
        this.snake.H
      );
      this.ctx.fillStyle = '#000';
      this.ctx.fill();
      this.ctx.closePath();
    }
  }

  // Used to draw the fruit
  drawFruit() {
    this.ctx.beginPath();
    this.ctx.rect(this.fruit.X, this.fruit.Y, this.fruit.W, this.fruit.H);
    this.ctx.fillStyle = '#000';
    this.ctx.fill();
    this.ctx.closePath();
  }

  // Used to move the snake
  moveSnake() {
    if (this.keyPressed === 'up') {
      this.snake.Y -= this.box;
    }
    if (this.keyPressed === 'down') {
      this.snake.Y += this.box;
    }
    if (this.keyPressed === 'right') {
      this.snake.X += this.box;
    }
    if (this.keyPressed === 'left') {
      this.snake.X -= this.box;
    }
  }

  // Detect fruit collision
  detectFruitCollision() {
    if (
      this.snake.X > this.fruit.X - this.fruit.W &&
      this.snake.X < this.fruit.X + this.fruit.W &&
      this.snake.Y > this.fruit.Y - this.fruit.H &&
      this.snake.Y < this.fruit.Y + this.fruit.H
    ) {
      // Inscrease the score
      this.score += 5;
      // Display the score
      this.scoreHolder.textContent = this.score;
      // Display the fruit again at a random position
      this.fruit.X = Math.random() * (750 - 10) + 10;
      this.fruit.Y = Math.random() * (450 - 10) + 10;
    } else {
      // If we don't collide with the snake then pop the last element
      this.snakeArr.pop();
    }
  }

  // Detect Tail Collision
  detectTailCollision() {
    this.snakeArr.forEach((tail) => {
      // If position of the snake head = to the positon of any of the tail
      if (this.snake.X === tail.X && this.snake.Y === tail.Y) {
        window.location.reload();
      }
    });
  }

  // Detect wall collision
  detectWallCollison() {
    // Top wall collision
    if (this.snakeArr[0].Y === -15) {
      // Snake comes out at the bottom wall
      this.snakeArr[0].Y = 445;
    }
    // bottom wall collision
    if (this.snakeArr[0].Y > 465) {
      // Snake comes out at the top wall
      this.snakeArr[0].Y = -5;
    }
    // Right wall collision
    if (this.snakeArr[0].X > 750) {
      // Snake comes out at the left wall
      this.snakeArr[0].X = -5;
    }
    // left wall collision
    if (this.snakeArr[0].X === -15) {
      // Snake comes out at the right wall
      this.snakeArr[0].X = 745;
    }
  }

  // Used to Draw Everything
  draw() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw the Snake
    this.drawSnake();
    // Draw the fruit
    this.drawFruit();
    // Detect Wall collision
    this.detectWallCollison();

    // X and Y positions of the snake head
    this.snake.X = this.snakeArr[0].X;
    this.snake.Y = this.snakeArr[0].Y;

    // Detect fruit collision
    this.detectFruitCollision();

    // Move the snake
    this.moveSnake();

    // New Snake head
    this.newHead = {
      X: this.snake.X,
      Y: this.snake.Y,
    };

    // Detect tail Collision
    this.detectTailCollision();

    // Put newHead at the start of the array
    this.snakeArr.unshift(this.newHead);
  }
}

// Object of the class
const gameClass = new mainClass();

// Redraw everythinh after every 40 miliseconds
setInterval(() => {
  gameClass.draw();
}, 40);

// Keydown event listener on the document
document.addEventListener('keydown', keyHandler);

// Handels the input
function keyHandler(e) {
  // If Up arrow key is pressed
  if (e.keyCode === 38) {
    if (gameClass.keyPressed !== 'down') {
      gameClass.keyPressed = 'up';
    }
    // If down arrow key is pressed
  } else if (e.keyCode === 40) {
    if (gameClass.keyPressed !== 'up') {
      gameClass.keyPressed = 'down';
    }
    // If right arrow key is pressed
  } else if (e.keyCode === 39) {
    if (gameClass.keyPressed !== 'left') {
      gameClass.keyPressed = 'right';
    }
    // If left arrow key is pressed
  } else if (e.keyCode === 37) {
    if (gameClass.keyPressed !== 'right') {
      gameClass.keyPressed = 'left';
    }
  }
}
