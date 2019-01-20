
const mysql = require('mysql');
const keys = require('./keys');


const con = mysql.createConnection({
    host: process.env.HOST || keys.mysql.host,
    user: process.env.USERNAME || keys.mysql.username,
    password: process.env.PASSWORD || keys.mysql.password,
    database: process.env.DATABASE || keys.mysql.database
});

module.exports = con;
