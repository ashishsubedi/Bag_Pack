const port = 3000;
//Importing/Including required module 

const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

//TEST
const mysql = require('mysql');

//Initializing express function
const app = express();

//Serving static files
app.use('/css-mat',express.static(__dirname+'/node_modules/materialize-css/dist/css'));
app.use('/js-mat',express.static(__dirname+'/node_modules/materialize-css/dist/js'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(path.join(__dirname,'public')));

//Using bodyParser Parser; required for parsing request data
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//GET: localhost:port/
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,"/views/index.html"));
});

//GET: localhost:port/register

app.get('/register', (req,res) =>{
    res.sendFile(path.join(__dirname,"/views/register.html"));
});

//GET: localhost:port/login

app.get('/login', (req,res) =>{
    res.sendFile(path.join(__dirname,"/views/register.html"));
});

//POST: localhost:post/registered
//Handles registration
app.post('/registered',(req,res)=>{
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    

    con.query("INSERT INTO `users` (`First Name`, `Last Name`, `Email`, `Password`, `Date Created`, `Logged In`) VALUES (?, ?, ?, ?, ?, '0')",
        [req.body.firstName,req.body.lastName,req.body.email,req.body.password,datetime],(err,rows,fields)=>{

            if(err) {console.log(err); return;}
            //TODO: Redirect to Login Page
            res.send("Welcome to the site, "+ req.body.firstName);
    });
});





//listen on port and running the server
app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
});

//Connecting to MySQL Database
//TEST CODE.
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