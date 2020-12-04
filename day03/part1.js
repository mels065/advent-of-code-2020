const fs = require('fs');

fs.readFile(`${__dirname}/input.txt`, (err, buffer) => {
    if (err) throw err;

    const data = buffer.toString().split('\n')
    
    let x = 0;
    let y = 0;
    let treeCount = 0;
    while (y < data.length) {
        if (data[y][x] === '#') treeCount += 1;
        x = (x + 3) % data[0].length;
        y += 1;
    }

    console.log(treeCount);
});
