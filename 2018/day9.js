const players = 462;
const last = 7193800;
// const players = 10;
// const last = 1618;
const board = [0];
const scores = {};
let currIdx = 0;

// I'm just being silly
Number.prototype.forEach = function(func) {
  for (let i = 1; i <= this; i++) func(i);
};

last.forEach((i) => {
  if (i % 23 === 0) {
    let player = i % players;
    if (!player) player = players;
    (7).forEach(() => {
      currIdx--;
      if (currIdx < 0) currIdx = board.length - 1;
    });
    scores[player] = (scores[player]|0) + i + board.splice(currIdx, 1)[0]
  } else {
    (2).forEach(() => {
      if (currIdx === board.length) {
        currIdx = 0;
      }
      currIdx++;
    });

    if (currIdx === board.length) {
      board.push(i);
    } else {
      board.splice(currIdx, 0, i);
    }
  }
});

console.log('Part 1: ', Math.max(...Object.values(scores)));
