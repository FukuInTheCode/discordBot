//! bin/node.js

const mysql = require('mysql');
const { MySQL_PSSWRD } = require('../config.json');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: `${MySQL_PSSWRD}`,
    database: 'discord_test'
});

connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected as ' + connection.threadId);

});

connection.query(`SELECT * FROM user_info WHERE id = ${1};`, (err, results, fields) => {
    if (err) throw err;
    console.log(results);
});

module.exports = { connection }
