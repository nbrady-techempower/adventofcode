const serial = 7315;

const grid = Array(301).fill().map(a => Array(301).fill(0));

// Fill the grid
for (let y = 1; y < 301; y++) {
  for (let x = 1; x < 301; x++) {
    const rackId = x + 10;
    let power = rackId * y + serial;
    power = power * rackId;
    power = (power > 99) ? +(power + '')[(power+'').length - 3] : 0;
    grid[y][x] = power - 5;
  }
}

let max = 0;
let maxCoord = '';

for (let y = 1; y < 298; y++) {
  for (let x = 1; x < 298; x++) {
    let num =
      grid[y][x] + grid[y][x+1] + grid[y][x+2] +
      grid[y+1][x] + grid[y+1][x+1] + grid[y+1][x+2] +
      grid[y+2][x] + grid[y+2][x+1] + grid[y+2][x+2];
    if (num > max) {
      max = num;
      maxCoord = `${x},${y}`;
    }
  }
}

console.log('Part 1: ', maxCoord);

max = 0;
maxCoord = '';
let maxSquare = 0;

for (let s = 1; s < 301; s++) {
  for (let y = 1; y < 301 - s; y++) {
    for (let x = 1; x < 301 - s; x++) {
      let num = 0;
      for (let i = 0; i < s; i++) {
        for (let j = 0; j < s; j++) {
          num += grid[y + j][x + i];
        }
      }
      if (num > max) {
        max = num;
        maxCoord = `${x},${y}`;
        maxSquare = s;
      }
    }
  }
}

console.log('Part 2: ', maxCoord, maxSquare);
