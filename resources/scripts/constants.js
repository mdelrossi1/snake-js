"use strict";

const BOARD_SIZE = 25;

const STARTING_POSITION = {
  x: 0,
  y: 0
};

const STARTING_DIRECTION = {
  x: 1,
  y: 0
};

const SNAKE_CLASS = 'block--has-snake';

const SNAKE_LENGTH = 1;

const SNAKE_LENGTH_ATTRIBUTE = 'snake-length';

const APPLE_CLASS = 'block--has-apple';

const APPLE_ATTRIBUTE = 'has-apple';

export { APPLE_ATTRIBUTE, APPLE_CLASS, BOARD_SIZE, SNAKE_CLASS, SNAKE_LENGTH_ATTRIBUTE, SNAKE_LENGTH, STARTING_DIRECTION, STARTING_POSITION };
