const fs = require('fs');

fs.readFile(`${__dirname}/input.txt`, (err, buffer) => {
    if (err) throw err;

    const data = buffer.toString().split('\n');

    const seatIds = data.map(code => {
        const rowCode = code.substr(0, 7).split('');
        const colCode = code.substr(7).split('');

        const row = rowCode.reduce((cur, ch) => {
            if (cur[1] - cur[0] === 1) {
                return ch === 'F' ? cur[0] : cur[1];
            }

            if (ch === 'F') keepLowerHalf(cur)
            else if (ch === 'B') keepUpperHalf(cur);

            return cur;
        }, [1, 126]);
        const col = colCode.reduce((cur, ch) => {
            if (cur[1] - cur[0] === 1) {
                return ch === 'L' ? cur[0] : cur[1];
            }

            if (ch === 'L') keepLowerHalf(cur);
            else if (ch === 'R') keepUpperHalf(cur);

            return cur;
        }, [0, 7]);

        return row * 8 + col;
    });

    for (let i = 0; i < seatIds.length; i++) {
        for (let j = i + 1; j < seatIds.length; j++) {
            if (Math.abs(seatIds[i] - seatIds[j]) === 2) {
                let id;
                if (seatIds[i] > seatIds[j]) id = seatIds[i] - 1;
                else if (seatIds[j] > seatIds[i]) id = seatIds[j] - 1;
                if (!seatIds.includes(id)) {
                    console.log(id);
                    return;
                }
            }
        }
    }
});

function keepLowerHalf(arr) {
    arr[1] = Math.floor((arr[0] + arr[1]) / 2);
}

function keepUpperHalf(arr) {
    arr[0] = Math.floor((arr[0] + arr[1]) / 2) + 1;
}
