"use strict";

import {
  APPLE_ATTRIBUTE,
  APPLE_CLASS,
  BOARD_SIZE,
  SNAKE_LENGTH,
  STARTING_DIRECTION,
  STARTING_POSITION,
  SNAKE_CLASS
} from './constants.js';

import { createBoard, getRandomCoordinate } from './utilities.js';

let app = null,
    board = null,
    direction = Object.assign({}, STARTING_DIRECTION),
    snake = {
      head: {},
      length: SNAKE_LENGTH,
      occupiedBlocks: []
    },
    moveInterval = null;

const initBoard = () => {
  app = document.getElementById('App');
  app.appendChild(createBoard());
  board = document.getElementById('board');
}

const initSnake = () => {
  let {
    x,
    y,
  } = Object.assign({}, STARTING_POSITION);

  snake.head.x = x;
  snake.head.y = y;
  snake.occupiedBlocks[`${x}-${y}`] = {x, y};
}

const initApple = () => {
  setApple();
}

const initControls = () => {
  window.onkeyup = keyupHandler;
}

const setApple = () => {
  let x = getRandomCoordinate(),
      y = getRandomCoordinate(),
      apple = board.children[x].children[y];

  addApple(apple);
}

const addApple = apple => {
  apple.classList.add(APPLE_CLASS);
  apple.setAttribute(APPLE_ATTRIBUTE, true);
}

const removeApple = apple => {
  apple.classList.remove(APPLE_CLASS);
  apple.setAttribute(APPLE_ATTRIBUTE, false);
}

const keyupHandler = e => {
  switch (e.key) {
    case 'ArrowUp':
      setDirection(-1, 0);
      break;

    case 'ArrowRight':
      setDirection(0, 1);
      break;

    case 'ArrowDown':
      setDirection(1, 0);
      break;

    case 'ArrowLeft':
      setDirection(0, -1);
      break;

    // no default
  }
}

const setDirection = (x, y) => {
  let shouldChangeDirection = (x + direction.x !== 0) && (y + direction.y !== 0);

  if (!shouldChangeDirection) {
    return;
  }

  direction.x = x;
  direction.y = y;
}

const removeSnakeTail = () => {
  let {
      occupiedBlocks
    } = snake,
    snakeTailId = Object.keys(occupiedBlocks)[0],
    snakeEndPosition = occupiedBlocks[snakeTailId],
    snakeEnd = board.children[snakeEndPosition.x].children[snakeEndPosition.y];

  snakeEnd.classList.remove(SNAKE_CLASS);

  delete occupiedBlocks[snakeTailId];
}

const setSnakePosition = (x, y) => {
  let head,
      snakeHitsSides = x === BOARD_SIZE || y === BOARD_SIZE || x < 0 || y < 0,
      blockHasSnake = typeof snake.occupiedBlocks[`${x}-${y}`] !== 'undefined',
      blockHasApple;

  if (snakeHitsSides || blockHasSnake) {
    setGameOver();
    return;
  }

  head = board.children[x].children[y];
  blockHasApple = head.getAttribute(APPLE_ATTRIBUTE) === 'true';

  if (blockHasApple) {
    removeApple(head);
    setApple();
  } else {
    removeSnakeTail();
  }

  head.classList.add(SNAKE_CLASS);

  snake.head = {x, y}
  snake.occupiedBlocks[`${x}-${y}`] = {x, y};
}

const moveSnake = () => {
  setSnakePosition(snake.head.x + direction.x, snake.head.y + direction.y);
}

const setGameOver = () => {
  clearInterval(moveInterval);
}

const startGame = () => {
  moveInterval = setInterval(() => {
    moveSnake();
  }, 100)
}

const initApp = () => {
  initBoard();
  initSnake();
  initApple();
  initControls();

  startGame();
}

window.onload = initApp;
