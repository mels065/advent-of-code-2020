const fs = require('fs');

fs.readFile(`${__dirname}/input.txt`, (err, buffer) => {
    if (err) throw err;

    const data = buffer.toString().split('\n').map(
        (line) => {
            const lineData = line.split(' ');
            return {
                min: Number(lineData[0].split('-')[0]) - 1,
                max: Number(lineData[0].split('-')[1]) - 1,
                letter: lineData[1][0],
                password: lineData[2],
            }
        }
    );
    
    console.log(
        data.reduce((validCount, { min, max, password, letter }) => {
            if (password[min] === letter || password[max] === letter) {
                if (password[min] === letter && password[max] === letter) {
                    return validCount;
                }
                return validCount + 1;
            }
            return validCount;
        }, 0)
    );
});