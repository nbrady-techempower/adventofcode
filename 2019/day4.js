const start = 183565;
const end = 657474;

function getAns(part1, ans = 0) {
  for (let i = start, j = i + ''; i <= end; i++, j = i + "")
    ans += +!!((j.split('').sort().join('') === j) &&
      ((part1 && j.match(/(\d)\1/g)) || (!part1 && j.match(/(\d)\1(?<!\1\1\1)(?!\1)/g))));
  return ans;
}

console.log('Part 1: ', getAns(true));
console.log('Part 2: ', getAns(false));
