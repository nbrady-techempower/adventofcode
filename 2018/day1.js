const input = require('./day1.input.js').split('\n');

/** Part 1 **/
const ans = input.reduce((a, b) => +a + +b, 0);
console.log('Part 1: ', ans);

/** Part 2 **/
const hash = {};
let sum = 0;
let found;

while (!found) {
  for (let i = 0; i < input.length; i++) {
    sum += +input[i];
    if (hash[sum] === true) {
      found = true;
      console.log('Part 2: ', sum);
      break;
    }
    hash[sum+''] = true;
  }
}
