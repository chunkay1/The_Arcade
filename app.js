let board = document.querySelector('.grid');
let resetButton = document.getElementById('reset');
let currentScore = document.querySelector('#currentScore');
let highScore = document.getElementById('highScore');
let messages = document.getElementsByClassName('messages');

let width = 20;
let up = -width;
let down = width;
let right = 1;
let left = -1;

let snake = [2, 1, 0];
let direction = 1;

let score = 0;
let hiScore = 0;

function scoreCheck() {
    highScore.innerHTML = hiScore;
    if (score > hiScore) {
        hiScore = score;
    }
}

function boardMaker() {
    for (let i = 0; i < 400; ++i) {
        let spaces = document.createElement('div');
        board.appendChild(spaces);
    }
    let cells = document.querySelectorAll(".grid div");
    snake.forEach((i) => cells[i].classList.add('snake'));
    for (let i = 0; i < messages.length; ++i) {
        messages[i].style.display = 'none';
    }
}

function randomApple() {
    let cells = document.querySelectorAll(".grid div");
    let appleIndex = Math.floor(Math.random() * cells.length);
    do {
        appleIndex;
    } while (cells[appleIndex].classList.contains('snake'));
    cells[appleIndex].classList.add('apple');
}


function snakeControls(e) {
    if (e.keyCode == '38') {
        // up arrow
        direction = up;
        e.preventDefault()
    }
    else if (e.keyCode == '40') {
        // down arrow
        direction = down;
        e.preventDefault()
    }
    else if (e.keyCode == '37') {
        // left arrow
        direction = left
        e.preventDefault()
    }
    else if (e.keyCode == '39') {
        // right arrow
        direction = right
        e.preventDefault()
    }
}

document.addEventListener("keydown", snakeControls);

function moveSnake(direction) {
    let cells = document.querySelectorAll(".grid div");
    snake.unshift(((snake[0]) + direction));
    cells[snake[0]].classList.add('snake');
    cells[snake[snake.length - 1]].classList.remove('snake');
    eatApple();
    snake.pop();
    scoreCheck();
}

function eatApple() {
    let cells = document.querySelectorAll(".grid div");
    currentScore.innerHTML = score;
    let snakeHead = snake[0];
    let snakeTail = snake[snake.length - 1]
    apple = document.querySelector('.apple');
    if (cells[snakeHead].classList.contains('apple')) {
        cells[snakeHead].classList.remove('apple');
        score++;
        snake.push(snakeTail)
        cells[snake[snake.length - 1]].classList.add('snake');
        randomApple();
    }
}

function newSnake() {
    let cells = document.querySelectorAll(".grid div");
    snake.forEach((i) => cells[i].classList.add('snake'));
}

function startGame() {
    currentScore.innerHTML = score;
    highScore.innerHTML = hiScore;
    direction = right;
    snake = [2, 1, 0];
    for (let i = 0; i < messages.length; ++i) {
        messages[i].style.display = 'none';
    }
    randomApple();
    gameState();
}

function newGame() {
    currentScore.innerHTML = score;
    highScore.innerHTML = hiScore;
    for (let i = 0; i < messages.length; ++i) {
        messages[i].style.display = 'none';
    }
    direction = right;
    snake = [2, 1, 0];
    newSnake();
    randomApple();
    gameState();
}

function clearBoard(cells) {
    for (let i = 0; i < cells.length; ++i) {
        if (cells[i].classList.contains('apple')) {
            cells[i].classList.remove('apple');
        }
    }
}

function gameState() {
    let cells = document.querySelectorAll(".grid div");
    let gameInterval = setInterval(function () {
        moveSnake(direction)
        if (snake[0] + width > width * width && direction === down ||
            (snake[0] - width <= 0 && direction === up) ||
            (snake[0] % width === 0 && direction === right) ||
            (snake[0] % width === width - 1 && direction === left) ||
            cells[snake[0] + direction].classList.contains("snake")
        ) {
            snake.forEach((i) => cells[i].classList.remove('snake'));
            clearBoard(cells);
            clearInterval(gameInterval);
            score = 0;
            for (let i = 0; i < messages.length; ++i) {
                messages[i].style.display = 'unset';
            }
        }
    }, 250);
}

boardMaker();
startGame();
resetButton.addEventListener('click', newGame);