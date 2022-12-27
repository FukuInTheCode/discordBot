//! bin/node.js

const { Result } = require('@sapphire/shapeshift');
const mysql = require('mysql');
const { resourceLimits } = require('worker_threads');
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

connection.query(`select * from user_info `, function (err, results, fields) {
    if (err) {
        console.log(err)
    };
    if (results) {
        console.log("results", results)
    };
    if (fields) {
        console.log(fields)
    };
})