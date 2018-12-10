const LinkedList = require('../helpers/LinkedList');

// const players = 9;
// const last = 25;
const players = 462;
const last = 71938;
const board = new LinkedList(0);
const scores = {};
let currIdx = 0;

let player;
let i;
for (i = 1; i <= last; i++) {
  if (i % 23 === 0) {
    player = i % players;
    if (!player) player = players;
    currIdx -= 7;
    if (currIdx < 0) currIdx = board.length + currIdx;
    scores[player] = (scores[player]|0) + i + board.removeAt(currIdx);
  } else {
    currIdx += 2;
    if (currIdx > board.length) currIdx = currIdx - board.length;

    if (currIdx === board.length) {
      board.push(i);
    } else {
      board.insert(i, currIdx);
    }
  }
  // console.log(board.toString('-'));
}

console.log('Part 1: ', Math.max(...Object.values(scores)));
