let input = require('./day12.input').replace('initial state: ', '').replace(/\./g, '0').replace(/#/g, '1').split('\n');
let strategy = input.slice(2);

console.log(strategy);

// initial generation
let gens = ['00000000000000000000' + input[0] + '00000000000000000000000'];

// 20 generations
for (let i = 0; i < 50000000000; i++) {
  let lastGen = gens[i];
  let newGen = '';
  // the strategy
  for (let s = 0; s < strategy.length; s++) {
    // Do we have to prepend any plants?
    if (!+strategy[s][0] && !+strategy[s][1] && !+strategy[s][2] && s[3] === lastGen[0] && s[4] === lastGen[1]) {
      newGen += '1';
      break;
    }
  }
  // Go through the last generation and start adding new plants
  for (let p = 0; p < lastGen.length; p++) {
    let found;
    for (let s = 0; s < strategy.length; s++) {
      if (
        +(lastGen[p-2]|0) === +strategy[s][0] &&
        +(lastGen[p-1]|0) === +strategy[s][1] &&
        +(lastGen[p]|0) === +strategy[s][2] &&
        +(lastGen[p+1]|0) === +strategy[s][3] &&
        +(lastGen[p+2]|0) === +strategy[s][4]
      ) {
        newGen += +strategy[s][9];
        found = true;
        break;
      }
    }
    if (!found) {
      newGen += 0
    }
  }
  gens.push(newGen);
}

let sum = gens[gens.length - 1]
  .split('')
  .map((a, idx) => +a ? idx - 20 : 0)
  .reduce((a, b) => a + b, 0);

console.log('Part 1: ', sum);
