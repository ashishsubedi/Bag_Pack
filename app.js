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
app.use('/css-boot',express.static(__dirname+'/node_modules/bootstrap/dist/css'));
app.use('/js-boot',express.static(__dirname+'/node_modules/bootstrap/dist/js'));
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
    res.sendFile(path.join(__dirname,"/views/register.1.html"));
});

//GET: localhost:port/login

app.get('/login', (req,res) =>{
    //SEND Login page
});
app.get('/signin', (req,res) =>{
    res.sendFile(path.join(__dirname,"/views/signin.html"));
});
app.post('/onSignIn',(req,res)=>{
   res.onSignIn(req.body.googleUser);
});
app.post('/signOut',(req,res)=>{
    res.end("signed out");
 });


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var fullName = document.getElementById("fullName");
    fullName = profile.getName();
    var submit = document.getElementsByClassName("btn waves-effect waves-light");

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    console.log(auth2);
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
  }
//POST: localhost:post/registered
//Handles registration
app.post('/registered',(req,res)=>{
    //var currentdate = new Date(); 
    // var datetime = currentdate.getDate() + "/"
    //             + (currentdate.getMonth()+1)  + "/" 
    //             + currentdate.getFullYear() + " @ "  
    //             + currentdate.getHours() + ":"  
    //             + currentdate.getMinutes() + ":" 
    //             + currentdate.getSeconds();
    var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var dob = formatDate(req.body.birth);

    con.query("INSERT INTO `users` (`First Name`, `Last Name`, `Email`, `Password`, `Date Created`,`Date of Birth`, `Gender`, `Logged In`) VALUES (?, ?, ?, ?, ?,?,?, '0')",
        [req.body.firstName,req.body.lastName,req.body.email,req.body.password,datetime,dob,req.body.gender],(err,rows,fields)=>{

            if(err) {console.log(err); return;}
            //TODO: Redirect to Login Page
            res.redirect("/");
        
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
    else
        console.log("Connected!");
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}