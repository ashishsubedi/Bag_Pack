const port = 3000;
//Importing/Including required module 

const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

//TEST
const con = require('./config/connection');


const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');
const homeRoute = require('./routes/home');



con.connect((err)=>{
    if(err) console.log(err);
    else
        console.log("Connected!");
});
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

app.use('/',indexRoute);
app.use('/users',userRoute);




//listen on port and running the server
app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
});


