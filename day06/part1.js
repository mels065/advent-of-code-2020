const fs = require('fs');

fs.readFile(`${__dirname}/input.txt`, (err, buffer) => {
    if (err) throw err;

    const data = buffer.toString().split('\n\n');

    console.log(
        data.reduce(
            (sum, group) => (
                sum + Object.keys(
                    group.split('\n').reduce(
                        (found, member) => {
                            for (let i = 0; i < member.length; i++) {
                                if (!found.hasOwnProperty(member[i])) {
                                    found[member[i]] = true;
                                }
                            }
                            return found;
                        },
                        {}
                    )
                ).length
            ),
            0)
    );
});
