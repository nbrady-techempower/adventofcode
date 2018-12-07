let input = require('./day7.input').split('\n');
input = input.map(i => i.replace(/^Step (.).+step (.).+$/, '$1$2'));
let chars = new Set(input.join('').split(''));

/** Part 1 **/

let hash = {};
let ans = '';

// Set up a hash of chars
chars.forEach((c) => {
  hash[c] = {
    requires: []
  }
});

// Fill with rules
input.forEach((i) => {
  hash[i[1]].requires.push(i[0]);
});

let completed = false;
while (!completed) {
  let found = 'zz';
  // Find the step that's ready alphabetically
  for (let i in hash) {
    if (!hash[i].requires.length && i < found) {
      found = i;
    }
  }
  // remove it from our hash
  delete hash[found];
  // Remove the found item from future requirements
  for (let i in hash) {
    hash[i].requires = hash[i].requires.filter((a) => a !== found);
  }
  // Add to our answer
  ans += found;
  // check if we're done
  if (Object.keys(hash).length === 0) completed = true;
}

console.log('Part 1: ', ans);

/** Part 2 **/

hash = {};
const secs = '_ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let totalSecs = -1;
let elves = Array(5).fill().map(() => ({ secs: 0, step: '' }));

const availElfIdx = () => elves.findIndex((e) => e.secs === 0 && !e.step);

// Set up a hash of chars
chars.forEach((c) => {
  hash[c] = {
    requires: []
  }
});

// Fill with rules
input.forEach((i) => {
  hash[i[1]].requires.push(i[0]);
});

completed = false;
while (!completed) {
  // Increase the amount of time we spent working
  totalSecs++;

  // Reduce all the elves time by 1 and see if any work is completed
  elves.map((e, idx) => {
    // finishing a step
    if (e.secs === 1 && e.step) {
      // Remove the finished item from future requirements
      for (let i in hash) {
        hash[i].requires = hash[i].requires.filter((a) => a !== e.step);
      }
      e.step = '';
    }
    // reduce time
    e.secs = (e.secs > 0) ? e.secs - 1 : 0;
  });
  // If we have an availElf, assign them the seconds it takes to
  // complete the first avail step
  while (availElfIdx() > -1) {
    let found = 'zz';
    // Find the step that's ready alphabetically
    for (let i in hash) {
      if (!hash[i].requires.length && i < found) {
        found = i;
      }
    }
    // if nothing is ready, let more time pass
    if (found === 'zz') break;
    // remove it from our hash
    delete hash[found];
    // Give it to an elf
    let availIdx = availElfIdx();
    elves[availIdx].secs = 60 + secs.indexOf(found);
    elves[availIdx].step = found;
  }

  // check if we're done
  if (!Object.keys(hash).length) completed = true;
}

console.log('Part 2: ', totalSecs + Math.max(...elves.map(e => e.secs)));
