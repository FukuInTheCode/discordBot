const { connect_usersdb } = require('../server.js');

module.exports = {
    name: 'sqltest',
    description: 'test for the sql command',
    aliases: ['sqltest'],
    execute(message, args) {
        connect_usersdb.query("CALL get_user(0, 'fu');", (err, results, fields) => {
            if (err) throw err;

            console.log(results[0]);
        });

    }
};