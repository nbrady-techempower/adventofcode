function intcode(program, input) {
    
    const p = program.slice();
    const output = [];

    function getVal(mode, idx) {
        return (!!+mode) ? p[idx] : p[p[idx]];
    }

    function start(idx = 0) {
        if (idx > p.length || p[idx] === "99") return;
        let opCode;
        let tmp = p[idx];
        if (tmp.length <= 2) {
            opCode = +tmp;
            tmp = [];
        } else {
            tmp = tmp.split('');
            opCode = tmp.pop();
            opCode = +(tmp.pop() + opCode);
            tmp.reverse();
        }

        // Addition Operation
        if (opCode === 1) {
            p[p[idx + 3]] = (+getVal(tmp[0], idx + 1) + +getVal(tmp[1], idx + 2)) + "";
            idx += 4;
        }

        // Multiplication Operation
        if (opCode === 2) {
            p[p[idx + 3]] = (+getVal(tmp[0], idx + 1) * +getVal(tmp[1], idx + 2)) + "";
            idx += 4;
        }

        // Input Operation
        if (opCode === 3) {
            p[p[idx + 1]] = input.shift();
            idx += 2;
        }

        // Output Operation
        if (opCode === 4) {
            output.push(getVal(tmp[0], idx + 1));
            idx += 2;
        }

        // Jump-if-true Operation
        if (opCode === 5) {
            let first = +getVal(tmp[0], idx + 1);
            let second = +getVal(tmp[1], idx + 2);
            if (first) {
                idx = second;
            } else {
                idx += 3;
            }
        }

        // Jump-if-false Operation
        if (opCode === 6) {
            let first = +getVal(tmp[0], idx + 1);
            let second = +getVal(tmp[1], idx + 2);
            if (!first) {
                idx = second;
            } else {
                idx += 3;
            }
        }

        // Is-less-than Operation
        if (opCode === 7) {
            let first = +getVal(tmp[0], idx + 1);
            let second = +getVal(tmp[1], idx + 2);
            p[p[idx + 3]] = (first < second) ? "1" : "0";
            idx += 4;
        }

        // Is-equal-to Operation
        if (opCode === 8) {
            let first = +getVal(tmp[0], idx + 1);
            let second = +getVal(tmp[1], idx + 2);
            p[p[idx + 3]] = (first === second) ? "1" : "0";
            idx += 4;
        }

        start(idx);
    }

    start(0);
    return output;
}

module.exports = intcode;
