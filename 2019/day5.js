const intcode = require('./intcode');

let input = require('./day5.input.js').split(',');
console.log("Part 1: ");
console.log(intcode(input, [1]));

input = require('./day5.input.js').split(',');
console.log("Part 2: ");
console.log(intcode(input, [5]));
