function getVal(mode, idx) {
  if (!!+mode) {
    return input[idx];
  } else {
    return input[input[idx]];
  }
}
function process(idx, i) {
  if (idx > input.length || input[idx] === "99") return;
  let opCode;
  let tmp = input[idx];
  if (tmp.length <= 2) {
    opCode = +tmp;
    tmp = [];
  }
  else {
    tmp = tmp.split('');
    opCode = tmp.pop();
    opCode = +(tmp.pop() + opCode);
    tmp.reverse();
  }

  if (opCode === 1) {
    input[input[idx + 3]] = (+getVal(tmp[0], idx + 1) + +getVal(tmp[1], idx + 2)) + "";
    idx += 4;
  }
  if (opCode === 2) {
    input[input[idx + 3]] = (+getVal(tmp[0], idx + 1) * +getVal(tmp[1], idx + 2)) + "";
    idx += 4;
  }
  if (opCode === 3) {
    input[input[idx + 1]] = i + "";
    idx += 2;
  }
  if (opCode === 4) {
    console.log(getVal(tmp[0], idx + 1));
    idx += 2;
  }
  if (opCode === 5) {
    let first = +getVal(tmp[0], idx + 1);
    let second = +getVal(tmp[1], idx + 2);
    if (first) {
      idx = second;
    } else {
      idx += 3;
    }
  }
  if (opCode === 6) {
    let first = +getVal(tmp[0], idx + 1);
    let second = +getVal(tmp[1], idx + 2);
    if (!first) {
      idx = second;
    } else {
      idx += 3;
    }
  }
  if (opCode === 7) {
    let first = +getVal(tmp[0], idx + 1);
    let second = +getVal(tmp[1], idx + 2);
    input[input[idx + 3]] = (first < second) ? "1" : "0";
    idx += 4;
  }
  if (opCode === 8) {
    let first = +getVal(tmp[0], idx + 1);
    let second = +getVal(tmp[1], idx + 2);
    input[input[idx + 3]] = (first === second) ? "1" : "0";
    idx += 4;
  }
  process(idx);
}

let input = require('./day5.input.js').split(',');
console.log("Part 1: ");
process(0, 1);

input = require('./day5.input.js').split(',');
console.log("Part 2: ");
process(0, 5);
