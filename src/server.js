//! bin/node.js

const mysql = require('mysql');
const { MySQL_PSSWRD } = require('../config.json');


const connect_usersdb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: `${MySQL_PSSWRD}`,
    database: `fubot_users`
});

connect_usersdb.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected as ' + connect_usersdb.threadId);

});



module.exports = { connect_usersdb: connect_usersdb }
