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



module.exports = { connection }
