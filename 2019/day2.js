const input = require('./day2.input.js').split(',');

/** Part 1 **/
function getPos0(inp, rep1, rep2) {
  inp = inp.slice();
  inp[1] = rep1;
  inp[2] = rep2;
  for (let i = 0; i < inp.length && +inp[i] !== 99; i += 4) {
    let a = +inp[i];
    let b = +inp[i + 1];
    let c = +inp[i + 2];
    let d = +inp[i + 3];

    if (a === 1) {
      inp[d] = +inp[b] + +inp[c];
    } else if (a === 2) {
      inp[d] = +inp[b] * +inp[c];
    }
  }
  return inp[0];
}
console.log('Part 1: ', getPos0(input, 12, 2));

/** Part 2 **/
let found;
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    if (getPos0(input, i, j) === 19690720) {
      found = true;
      console.log('Part 2: ', 100 * i + j);
      break;
    }
  }
  if (found) break;
}
