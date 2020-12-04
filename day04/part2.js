const fs = require('fs');

const REQUIRED_FIELDS = [
    {
        label: 'byr',
        condition: (year) => year >= 1920 && year <= 2002,
    },
    {
        label: 'iyr',
        condition: year => year >= 2010 && year <= 2020,
    },
    {
        label: 'eyr',
        condition: year => year >= 2020 && year <= 2030,
    },
    {
        label: 'hgt',
        condition: height => {
            if (/^[0-9]{3}cm$/.test(height)) {
                const [cm] = height.split('cm');
                return cm >= 150 && cm <= 193;
            } else if (/^[0-9]{2}in$/.test(height)) {
                const [inch] = height.split('in');
                return inch >= 59 && inch <= 76;
            }
            return false;
        }
    },
    { 
        label: 'hcl',
        condition: color => /^#[0-9a-f]{6}$/.test(color),
    },
    {
        label: 'ecl',
        condition: color => (
            [
                'amb',
                'blu',
                'brn',
                'gry',
                'grn',
                'hzl',
                'oth',
            ]
                .some(code => color === code)
        ),
    },
    {
        label: 'pid',
        condition: id => /^[0-9]{9}$/.test(id)
    },
];

fs.readFile(`${__dirname}/input.txt`, (err, buffer) => {
    if (err) throw err;

    const data = buffer.toString().split('\n\n')
        .map((line) => {
            return {
                ...line.split(/\s/).reduce((result, item) => {
                    const [label, val] = item.split(':');
                    return { ...result, [label]: val };
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
    return REQUIRED_FIELDS.every(
        ({ label, condition }) => item.hasOwnProperty(label) && condition(item[label])
    );
}
