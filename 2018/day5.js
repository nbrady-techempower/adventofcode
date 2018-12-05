const input = require('./day5.input');

/** Part 1 **/

let input1 = input;
let memo = {};

const replace = (x) => {
  if (memo[x]) return memo[x];
  let ans = '';
  for (let i = 0; i < x.length; i++) {
    if (x[i] === x[i+1] || !x[i+1]) {
      ans += x[i];
    } else {
      i++;
    }
  }
  memo[x] = ans;
  return ans;
};

let ans1 = input1.replace(/(.)\1+/gi, replace);
while (input1 !== ans1) {
  input1 = ans1;
  ans1 = input1.replace(/(.)\1+/gi, replace);
}

console.log('Part 1: ', ans1.length);

/** Part 2 **/

// Forgive me.
const a = 'abcdefghijklmnopqrstuvwxyz';

let minLength = input.length;

for (let i = 0; i < a.length; i++) {
  let input2 = input.replace(new RegExp(`${a[i]}`, 'gi'), '');
  let ans2 = input2.replace(/(.)\1+/gi, replace);
  while (input2 !== ans2) {
    input2 = ans2;
    ans2 = input2.replace(/(.)\1+/gi, replace);
  }
  if (input2.length < minLength) minLength = input2.length;
}

console.log('Part 2: ', minLength);
