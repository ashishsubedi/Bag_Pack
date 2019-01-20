
const mysql = require('mysql');
const keys = require('./keys');


const con = mysql.createConnection({
    host: keys.mysql.host,
    user: keys.mysql.username,
    password: keys.mysql.password,
    database: keys.mysql.database
});

module.exports = con;
