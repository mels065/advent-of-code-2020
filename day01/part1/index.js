const fs = require('fs');

fs.readFile(`${__dirname}/input.txt`, (err, buffer) => {
    if (err) {
        throw err;
    }

    const data = buffer.toString().split('\n').map(Number);
    
    for (let i = 0; i < data.length; i++) {
        for (let j = i; j < data.length; j++) {
            if ((data[i] + data[j]) === 2020) {
                console.log(data[i] * data[j]);
                return;
            }
        }
    }
})
