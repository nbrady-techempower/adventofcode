const input = require('./day4.input').split('\n');

/** Part 1 **/

const getDate = (str) => new Date(str.match(/(\d+-)+\d+ \d+:\d+/)[0]);
const d = input.sort((a, b) => getDate(a) - getDate(b));

let currGuard;
let hash = {};
let maxTotal = 0;
let maxGuard = {};

d.forEach((b, idx) => {
  if (b.includes('Guard')) {
    currGuard = b.match(/Guard #\d+/)[0];
    if (!hash[currGuard]) {
      hash[currGuard] = {
        totalMins: 0,
        title: currGuard
      }
    }
  }

  if (b.includes('falls asleep')) {
    let currMin = getDate(b).getMinutes();
    let wakeMin = getDate(d[idx+1]).getMinutes();
    for (let i = currMin; i < wakeMin; i++) {
      hash[currGuard].totalMins++;
      hash[currGuard][i+''] = (hash[currGuard][i+'']|0) + 1;
    }
  }
  if (hash[currGuard].totalMins > maxTotal) {
    maxGuard = hash[currGuard];
    maxTotal = hash[currGuard].totalMins;
  }
});

console.log('Part 1: ',
  Object.keys(maxGuard).sort((a, b) => maxGuard[b] - maxGuard[a])[1] * maxGuard.title.match(/\d+/)[0]);

let max = 0;
let guard;
let min;
for (let g in hash) {
  for (let k in hash[g]) {
    if (k !== 'totalMins') {
      if (hash[g][k] > max) {
        max = hash[g][k];
        guard = g;
        min = k;
      }
    }
  }
}

console.log('Part 2: ', min * guard.match(/\d+/)[0]);
