import { BOARD_SIZE } from './constants.js'

const createBoard = () => {
  let board = document.createElement('div');

  board.className = 'board';
  board.setAttribute('id', 'board');

  for (var i = 0; i < BOARD_SIZE; i++) {
    let row = document.createElement('div'),
        square;

    row.className = 'row';

    for (var j = 0; j < BOARD_SIZE; j++) {
      square = document.createElement('div');
      square.className = 'block';
      row.appendChild(square);
    }

    board.appendChild(row)
  }

  return board;
}

const getRandomCoordinate = () => Math.round(Math.random() * (BOARD_SIZE - 1))

export { createBoard, getRandomCoordinate }