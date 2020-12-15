const fs = require('fs');

fs.readFile(`${__dirname}/input.txt`, (err, buf) => {
    if (err) throw err;
    const data = buf.toString().split('\n')
        .map(line => ({ op: line.split(' ')[0], arg: Number(line.split(' ')[1]) }));
    
    let accumulator;
    for (let i = 0; i < data.length; i++) {
        if (data[i].op === 'acc') continue;

        const testData = [
            ...data.slice(0, i),
            data[i].op === 'jmp' ? 
                { ...data[i], op: 'nop' } : 
                { ...data[i], op: 'jmp' },
            ...data.slice(i+1),
        ];

        accumulator = runOperations(testData);
        if (accumulator !== null) break;
    }

    console.log(accumulator);

    function runOperations(testData) {
        let accumulator = 0;
        let currentLine = 0;
        let visitedLines = [];
        while (currentLine < testData.length) {
            if (visitedLines.includes(currentLine)) {
                return null;
            }
            visitedLines = [...visitedLines, currentLine];
            const line = testData[currentLine];
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

        return accumulator;
    }
});
