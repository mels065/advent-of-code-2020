const fs = require('fs');

fs.readFile(`${__dirname}/input.txt`, (err, buf) => {
    if (err) throw err;

    let accumulator = 0;
    const data = buf.toString().split('\n')
        .map(line => ({ op: line.split(' ')[0], arg: Number(line.split(' ')[1]) }));
    
    let currentLine = 0;
    let visitedLines = [];
    while (!visitedLines.includes(currentLine)) {
        visitedLines = [...visitedLines, currentLine];
        const line = data[currentLine];
        switch (line.op) {
            case 'acc': {
                accumulator += line.arg;
                break;
            }
            case 'jmp': {
                currentLine += line.arg;
                break
            }
        }

        if (line.op !== 'jmp') currentLine++;
    }

    console.log(accumulator);
})
