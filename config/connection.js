
const mysql = require('mysql');
const keys = require('./keys');


const con = mysql.createConnection({
    host: keys.phpmyadmin.host,
    user: keys.phpmyadmin.username,
    password: keys.phpmyadmin.password,
    database: keys.phpmyadmin.database
});

module.exports = con;
