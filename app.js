const port = 3000;

const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')

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

app.post('/registered',(req,res)=>{
    res.end("User Registered! Welcome, "+ req.body.fullName);
});


app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
});