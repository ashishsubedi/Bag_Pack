
const mysql = require('mysql');
const keys = require('./keys');


const con = mysql.createConnection({
    host: process.env.MySqlHost || keys.local.host,
    user: process.env.MySqlUsername || keys.local.username,
    password: process.env.MySqlPassword || keys.local.password,
    database: process.env.MySqlDatabaseName || keys.local.database
});


module.exports = con;
