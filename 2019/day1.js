const input = require('./day1.input.js').split('\n');

/** Part 1 **/
const ans = input.reduce((a, b) => a + ~~(b / 3) - 2, 0);
console.log('Part 1: ', ans);

/** Part 2 **/
let sum = 0;
input.forEach((a) => {
  let b, c = a;
  while ((b = ~~(c / 3) - 2) > 0) {
    sum += b;
    c = b;
  }
});

console.log('Part 2: ', sum);