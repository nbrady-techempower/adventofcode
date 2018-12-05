const input = require('./day3.input').split('\n');

let count = 0;
// Creates the grid
const grid = Array(1000).fill('').map(x => Array(1000).fill(0));
// Sanitize the input to just the numbers we need
const s = input.map(b => b.replace(/^.*@ |:/g, '').replace(/,|x/g, ' '));

/** Part 1 **/

s.forEach((g, idx) => {
  g = g.split(' ').map(y => +y);
  for (let w = 0; w < g[2]; w++) {
    for (let h = 0; h < g[3]; h++) {
      // count how many times we've landed on this grid spot
      grid[g[0]+w][g[1]+h]++;
      if (grid[g[0]+w][g[1]+h] === 2) {
        count++;
      }
    }
  }
});

console.log('Part 1: ', count);

/** Part 2 **/

s.forEach((g, idx) => {
  g = g.split(' ').map(y => +y);
  for (let w = 0; w < g[2]; w++) {
    for (let h = 0; h < g[3]; h++) {
      if (grid[g[0]+w][g[1]+h] > 1) {
        // If we've been here more than once, we're done with this entry
        return;
      }
    }
  }

  console.log('Part 2: ', input[idx].match(/\d+/)[0]);
});

