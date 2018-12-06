const input = require('./day6.input').split('\n');

const hash = {};
let maxX = 0;
let maxY = 0;

input.forEach((i) => {
  const p = i.split(', ');
  hash[i] = {
    count: 0,
    x: +p[0],
    y: +p[1],
    isInfinite: false
  };
  if (hash[i].x > maxX) maxX = hash[i].x;
  if (hash[i].y > maxX) maxY = hash[i].y;
});

const isEdge = (x, y) =>
  x === 0 || y === 0 || x === maxX - 1 || y === maxY - 1;

let safeCount = 0;

for (let x = 0; x < maxX; x++) {
  for (let y = 0; y < maxY; y++) {
    /** For Part 1 **/
    // Check each input point to see who's closest and increase count
    // If multiple, don't increase counts
    // If not multiple, but on the edge of our grid, the point's area is
    // infinite
    /** For Part 2 **/
    // All points which have a total distance to all marked coordinates
    // of less than 10000 are added to a safe region
    let closest = [];
    let minDist = Infinity;
    let totalDistance = 0;
    for (let i in hash) {
      // taxicab distance
      const dist = Math.abs(x - hash[i].x) + Math.abs(y - hash[i].y);
      totalDistance += dist;
      // found a new closest
      if (dist < minDist) {
        minDist = dist;
        closest = [hash[i]];
        // Same closest distance
      } else if (dist === minDist) {
        closest.push(hash[i]);
      }
    }
    // If we have multiple close, don't do anything
    // Increase the count otherwise
    if (closest.length === 1) {
      closest[0].count++;
      if (isEdge(x, y)) closest[0].isInfinite = true;
    }
    if (totalDistance < 10000) safeCount++;
  }
}

let largest = 0;
for (let i in hash) {
  if (!hash[i].isInfinite && hash[i].count > largest)
    largest = hash[i].count;
}

console.log('Part 1: ', largest);
console.log('Part 2: ', safeCount);
