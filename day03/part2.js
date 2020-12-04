const fs = require('fs');

fs.readFile(`${__dirname}/input.txt`, (err, buffer) => {
    if (err) throw err;

    const data = buffer.toString().split('\n')
    const slopes = [
        { slopeX: 1, slopeY: 1 },
        { slopeX: 3, slopeY: 1 },
        { slopeX: 5, slopeY: 1 },
        { slopeX: 7, slopeY: 1 },
        { slopeX: 1, slopeY: 2 },
    ];
    const slopeTotals = slopes.reduce(
        (product, { slopeX, slopeY }) => {
            let x = 0;
            let y = 0;
            let treeCount = 0;
            while (y < data.length) {
                if (data[y][x] === '#') treeCount += 1;
                x = (x + slopeX) % data[0].length;
                y += slopeY;
            }

            return treeCount * product
        },
        1
    );

    console.log(slopeTotals);
});
