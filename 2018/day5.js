const input = require('./day5.input');

/** Part 1 **/

const polymerize = (input) => {
  for (let i = 0; i < input.length; i++) {
    if (input[i + 1] && input[i].toLowerCase() === input[i + 1].toLowerCase()) {
      if (input[i] !== input[i + 1]) {
        input = input.substring(0, i) + input.substring(i + 2);
        i = i ? i - 2 : i - 1;
      }
    }
  }
  return input.length;
};

console.log('Part 1: ', polymerize(input));

/** Part 2 **/

const a = 'abcdefghijklmnopqrstuvwxyz';
let minLength = input.length;

for (let i = 0; i < a.length; i++) {
  let len = polymerize(input.replace(new RegExp(`${a[i]}`, 'gi'), ''));
  if (len < minLength) minLength = len;
}

console.log('Part 2: ', minLength);
