const mysql = require('mysql');

const con = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:"root"
});

con.connect(()=>{
    if(err) console.error("Connection Error!");
    console.log("Connected!");
});