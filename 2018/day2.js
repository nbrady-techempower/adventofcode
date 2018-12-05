const input = require('./day2.input').split('\n');

/** Part 1 **/
let twoTimes = 0, threeTimes = 0;

for (let i = 0; i < input.length; i++) {
  const hash = {};
  input[i].split('').forEach(c => hash[c] = (hash[c]|0) + 1);

  for (let c in hash) {
    if (hash[c] === 2) {
      twoTimes++;
      break;
    }
  }

  for (let c in hash) {
    if (hash[c] === 3) {
      threeTimes++;
      break;
    }
  }
}

console.log('Part 1: ', twoTimes * threeTimes);

/** Part 2 **/
input.forEach((q, idx, arr) => {
  for (let i = 0; i < arr.length; i++) {
    let count = 0, ans = '';
    if (i === idx) return false;
    for (let j = 0; j < q.length; j++) {
      if (q[j] === arr[i][j]) {
        count++;
        ans += q[j];
      }
    }
    if (count === 25) {
      console.log('Part 2: ', ans);
    }
  }
});
