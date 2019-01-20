const port = process.env.PORT||3000;
//const host = "localhost";

//Importing/Including required module 

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash    = require('connect-flash');
const passport = require('passport');
const ejs = require('ejs');


//TEST
const con = require('./config/connection');



const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');




con.connect((err)=>{
    if(err) console.log(err);
    else
        console.log("Connected!");
});
//Initializing express function
const app = express();


app.use(helmet());
app.use(cookieParser());
//Using bodyParser Parser; required for parsing request data
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine', 'ejs');
//Serving static files
app.use('/css-boot',express.static(__dirname+'/node_modules/bootstrap/dist/css'));
app.use('/js-boot',express.static(__dirname+'/node_modules/bootstrap/dist/js'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(path.join(__dirname,'public')));


app.use(session({ secret: 'secret' ,
    resave: true, 
    saveUninitialized: false,
})); // session secret
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

require('./config/passport')(passport);

//GET: localhost:port/

app.use('/',indexRoute);
app.use('/users',userRoute);




//listen on port and running the server
app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
});


