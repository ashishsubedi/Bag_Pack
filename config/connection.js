
const mysql = require('mysql');
const keys = require('./keys');


const con = mysql.createConnection({
    host: process.env.MySqlHost || keys.mysql.host,
    user: process.env.MySqlUsername || keys.mysql.username,
    password: process.env.MySqlPassword || keys.mysql.password,
    database: process.env.MySqlDatabaseName || keys.mysql.database
});

module.exports = con;
