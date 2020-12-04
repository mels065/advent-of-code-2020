const fs = require('fs');

const REQUIRED_FIELDS = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
];

fs.readFile(`${__dirname}/input.txt`, (err, buffer) => {
    if (err) throw err;

    const data = buffer.toString().split('\n\n')
        .map((line) => {
            return {
                ...line.split(/\s/).reduce((result, item) => {
                    const itemSplit = item.split(':');
                    return { ...result, [itemSplit[0]]: itemSplit[1] };
                }, {})
            }
        });
    
    console.log(
        data.reduce((sum, item) => (
            isValid(item) ? sum + 1 : sum
        ), 0)
    );
});

function isValid(item) {
    return REQUIRED_FIELDS.every(field => item.hasOwnProperty(field));
}
