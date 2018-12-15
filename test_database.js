const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = 3000;
const host = "localhost";

const con = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:"",
    database:"test"
});

con.connect((err)=>{
    if(err) console.log(err);
    console.log("Connected!");
});

app.get('/',(req,res)=>{
    res.end("Hello World");
});

app.get('/users',(req,res)=>{
    
    con.query('SELECT * FROM users',(err,rows,fields)=>{
        if(err) console.log(err);
        res.send(rows);
    });
});
app.get('/users/:_id',(req,res)=>{

    con.query("SELECT * FROM users where id = ?",[req.params._id],(err,rows)=>{
        if(err) console.log(err);
        res.send(rows);
    });

});

app.listen(port,host,()=>{
    console.log("Server running on port "+ port);
});