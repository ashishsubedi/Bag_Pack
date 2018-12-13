const port = 3000;

const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

const app = express();

app.use('/css-mat',express.static(__dirname+'/node_modules/materialize-css/dist/css'));
app.use('/js-mat',express.static(__dirname+'/node_modules/materialize-css/dist/js'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(path.join(__dirname,'public')));


app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,"/views/index.html"));
});

app.get('/register', (req,res) =>{
    res.sendFile(path.join(__dirname,"/views/register.html"));
});
app.get('/login', (req,res) =>{
    res.sendFile(path.join(__dirname,"/views/register.html"));
});

app.get('/signin', (req,res) =>{
    res.sendFile(path.join(__dirname,"/views/signin.html"));
});
app.post('/registered',(req,res)=>{
    res.end("User Registered! Welcome, "+ req.body.fullName);
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
app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
});