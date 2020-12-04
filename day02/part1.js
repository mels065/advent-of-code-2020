const fs = require('fs');

fs.readFile(`${__dirname}/input.txt`, (err, buffer) => {
    if (err) throw err;

    const data = buffer.toString().split('\n').map(
        (line) => {
            const lineData = line.split(' ');
            return {
                min: Number(lineData[0].split('-')[0]),
                max: Number(lineData[0].split('-')[1]),
                letter: lineData[1][0],
                password: lineData[2],
            }
        }
    );
    
    console.log(
        data.reduce((validCount, el) => {
            const chCount = el.password.split('').reduce(
                (total, ch) => ch === el.letter ? total + 1 : total,
                0
            );
            if (chCount >= el.min && chCount <= el.max) {
                return validCount + 1;
            }
            return validCount;
        }, 0)
    );
});