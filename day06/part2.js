const fs = require('fs');

fs.readFile(`${__dirname}/input.txt`, (err, buffer) => {
    if (err) throw err;

    const data = buffer.toString().split('\n\n');

    const found = {};
    console.log(
        data.reduce(
            (sum, group) => {
                const splitGroup = group.split('\n');
                const found = splitGroup.reduce(
                    (found, member) => {
                        for (let i = 0; i < member.length; i++) {
                            if (!found.hasOwnProperty(member[i])) {
                                found[member[i]] = 1;
                            } else {
                                found[member[i]]++;
                            }
                        }
                        return found;
                    },
                    {}
                );

                return sum + Object.keys(found).reduce(
                    (sum, question) => (
                        found[question] === splitGroup.length ? sum + 1 : sum
                    ),
                    0
                );
            },
        0)
    );
});
