let input = require('./day8.input').split(' ');
input = input.map((i) => +i);
input2 = input.slice();

/** Part 1 **/

let sum = 0;

for (let i = 0; i < input.length; i+=2) {
  if (input[i] === 0) {
    input[i-2]--;
    input.splice(i, 1);
    let k = input.splice(i, 1)[0];
    for (let j = 0; j < k; j++) {
      sum += input.splice(i, 1)[0];
    }
    i -= 4;
  }
}

console.log('Part 1: ', sum);

/** Part 2 **/

let ans;

const attachToParent = (i, sum) => {
  if (typeof input2[i-2] === 'object') {
    input2[i-2].remain--;
    input2[i-2].children.push(sum);
  } else {
    input2[i-2] = {
      remain: input2[i-2] - 1,
      children: [sum]
    }
  }
};

while (!ans) {
  for (let i = 0; i < input2.length; i+=2) {
    // A node with no children
    if (input2[i] === 0) {
      // get the value of this node with 0
      // remove the 0
      input2.splice(i, 1);
      // get the number of metadata
      let k = input2.splice(i, 1)[0];
      let sum = 0;
      for (let j = 0; j < k; j++) {
        sum += +input2.splice(i, 1)[0];
      }
      // put it on the parent
      attachToParent(i, sum);
      break;
    }
    // A node with children ready to count
    if (typeof input2[i] === 'object' && !input2[i].remain) {
      let obj = input2.splice(i, 1)[0];
      let k = input2.splice(i, 1)[0];
      let sum = 0;
      for (let j = 0; j < k; j++) {
        // the metadata for parents is now index of child value
        sum += obj.children[input2.splice(i, 1)[0]-1]|0;
      }
      // Did we just calculate the root node?
      if (!input2.length) {
        ans = sum;
        break;
      }
      // If not the root, add this to its parent
      attachToParent(i, sum);
      break;
    }
  }
}

console.log('Part 2: ', ans);
