"use strict";

import {
  APPLE_ATTRIBUTE,
  APPLE_CLASS,
  BOARD_SIZE,
  SNAKE_LENGTH,
  SNAKE_LENGTH_ATTRIBUTE,
  STARTING_DIRECTION,
  STARTING_POSITION,
  SNAKE_CLASS
} from './constants.js';

import { createBoard, getRandomCoordinate } from './utilities.js';

let app = null,
    board = null,
    direction = Object.assign({}, STARTING_DIRECTION),
    snakeLength = SNAKE_LENGTH,
    snakePosition = Object.assign({}, STARTING_POSITION),
    moveInterval = null;

const initBoard = () => {
  app = document.getElementById('App');
  app.appendChild(createBoard());
  board = document.getElementById('board');
}

const initSnake = () => {
  setSnakePosition(STARTING_POSITION.x, STARTING_POSITION.y);
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

  direction = {
    x,
    y
  };
}

const setSnakePosition = (x, y) => {
  let head,
      snakeHitsSides = x === BOARD_SIZE || y === BOARD_SIZE || x < 0 || y < 0,
      blockHasSnake,
      blockHasApple;

  if (snakeHitsSides) {
    setGameOver();
    return;
  }

  head = board.children[x].children[y];

  blockHasSnake = head.getAttribute(SNAKE_LENGTH_ATTRIBUTE) > 0;
  blockHasApple = head.getAttribute(APPLE_ATTRIBUTE) === 'true';

  if (blockHasSnake) {
    setGameOver();
    return;
  }

  if (blockHasApple) {
    increaseSnakeCounts();
    removeApple(head);
    setApple();
    snakeLength++;
  }

  head.classList.add(SNAKE_CLASS);
  head.setAttribute(SNAKE_LENGTH_ATTRIBUTE, snakeLength);

  snakePosition = {
    x,
    y
  };
}

const changeSnakeCounts = count => {
  let blockArr = [...board.getElementsByClassName('block')];

  blockArr = blockArr.filter(block => block.getAttribute(SNAKE_LENGTH_ATTRIBUTE) > 0);

  blockArr.forEach(block => {
    let snakeCount = parseInt(block.getAttribute(SNAKE_LENGTH_ATTRIBUTE));

    block.setAttribute(SNAKE_LENGTH_ATTRIBUTE, snakeCount + count);

    snakeCount = block.getAttribute(SNAKE_LENGTH_ATTRIBUTE);

    if (snakeCount < 1) {
      block.classList.remove(SNAKE_CLASS);
    }
  });
}

const reduceSnakeCounts = () => {
  changeSnakeCounts(-1);
}

const increaseSnakeCounts = () => {
  changeSnakeCounts(1);
}

const moveSnake = () => {
  reduceSnakeCounts();
  setSnakePosition(snakePosition.x + direction.x, snakePosition.y + direction.y);
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
