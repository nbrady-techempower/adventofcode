const input = require('./day3.input.js').split('\n').map(a => a.split(','));

const hash = [{}, {}];

function addToHash(x, y, hash, steps) {
  const pnt = x + "," + y;
  if (hash[pnt]) return;
  hash[pnt] = steps;
}

input.forEach((inp, idx) => {
  let x = 0, y = 0, steps = 0, h = hash[idx];
  inp.forEach(p => {
    const d = Math.abs(+p.replace(/[^\d]/g, ''));
    for (let i = 0; i < d; i++) {
      steps++;
      if (p[0] === "R") x++;
      if (p[0] === "U") y++;
      if (p[0] === "D") y--;
      if (p[0] === "L") x--;
      addToHash(x, y, h, steps);
    }
  });
});

let min = Infinity, minSteps = Infinity;
for (let h in hash[0]) {
  if (hash[0][h] && hash[1][h]) {
    const [x, y] = h.split(',');
    const steps = hash[0][h] + hash[1][h];
    const a = Math.abs(0 - +x) + Math.abs(0 - +y);
    if (steps < minSteps) minSteps = steps;
    if (a < min) min = a;
  }
}

console.log('Part 1: ', min);
console.log('Part 2: ', minSteps);
