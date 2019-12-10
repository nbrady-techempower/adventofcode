let input = require('./day7.input.js').split(',');
const intcode = require('./intcode');

intcode(input, [1, 0]);

const perms = [];
for (let a = 0; a <= 4; a++) {
    for (let b = 0; b <= 4; b++) {
        if (b === a) continue;
        for (let c = 0; c <= 4; c++) {
            if (c === a || c === b) continue;
            for (let d = 0; d <= 4; d++) {
                if (d === a || d === b || d === c) continue;
                for (let e = 0; e <= 4; e++) {
                    if ( e === a || e === b || e === c || e === d) continue;
                    perms.push([a, b, c, d, e]);
                }
            }
        }
    }
}

console.log(perms.length);

let max = 0;

perms.forEach((vals) => {
    let curr = 0;
    vals.forEach((v) => {
        curr = intcode(input, [v, curr])[0];
    });
    if (curr > max) max = curr;
});

console.log("Part 1: ", max);
