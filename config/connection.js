
const mysql = require('mysql');
const keys = require('./keys');


const con = mysql.createConnection({
    host: process.env.MySqlHost || keys.remotesql.host,
    user: process.env.MySqlUsername || keys.remotesql.username,
    password: process.env.MySqlPassword || keys.remotesql.password,
    database: process.env.MySqlDatabaseName || keys.remotesql.database
});

module.exports = con;
