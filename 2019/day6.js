let input = require('./day6.input.js').split('\n');

function findOrbit(val) {
  let a = input.find((a) => a.substr(4) === val);
  return a.substr(0, 3);
}

let total = 0;

input.forEach((obj) => {
  let val = obj.substr(4);
  while (val !== "COM") {
    val = findOrbit(val);
    total++;
  }
});

console.log("Part 1: ", total);

let youTotal = 0;
let santaVals = [];
let sharedVal = -1;

let val = "SAN";
while (val !== "COM") {
  val = findOrbit(val);
  santaVals.push(val);
}

val = "YOU";
while (sharedVal === -1) {
  val = findOrbit(val);
  youTotal++;
  sharedVal = santaVals.indexOf(val);
}
console.log("Part 2: ", youTotal + sharedVal - 1);
