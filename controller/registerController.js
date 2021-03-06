const con = require('../config/connection');

const registerController = {};
const bcrypt = require('../config/bcrypt');
var moment = require('moment');


registerController.get = (req, res) => {
    //res.sendFile("views/register.html", { root: './' });
    res.render('register', {
        error_msg: req.flash('error_msg'),
        success_msg: req.flash('success_msg'),
        errors: ''
    });
};
registerController.post = (req, res, next) => {
    //var currentdate = new Date(); 
    // var datetime = currentdate.getDate() + "/"
    //             + (currentdate.getMonth()+1)  + "/" 
    //             + currentdate.getFullYear() + " @ "  
    //             + currentdate.getHours() + ":"  
    //             + currentdate.getMinutes() + ":" 
    //             + currentdate.getSeconds();

    var errors = [];
    if (req.body.password.length < 8)
        errors.push("Password must be minimum of length 8");

    if (!validateEmail(req.body.email)) {
        errors.push("Email is incorrect");
    }

    if (errors.length > 0) {
        res.render('register', {
            error_msg: req.flash('error_msg'),
            success_msg: req.flash('success_msg'),
            errors
        });
    } else {

        var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var dob = moment(req.body.birth, "MM-DD-YYYY").format("YYYY-MM-DD");
        let password = bcrypt.generateHash(req.body.password);
        con.query("SELECT * FROM `users` WHERE `Email` = ?", req.body.email, function (err, rows) {
            // if (err)throw err;
            if (err) return next(err);


            if (rows.length) {

                console.log("User Already Exist");
                req.flash('error-msg', "User Already Exist");

                res.redirect('/users/register');
                //errors.push("User already exists!");
            } else {
                con.query("INSERT INTO `users` (`firstName`, `lastName`, `Email`, `Password`, `dateCreated`,`dob`, `Gender`, `loggedIn`,`isAdmin`,`address`,`description`) VALUES (?, ?, ?, ?, ?,?,?, '0','0',?,?)",
                    [req.body.firstName, req.body.lastName, req.body.email, password, datetime, dob, req.body.gender, req.body.address, req.body.description], (err, rows, fields) => {

                        // if (err) throw err;
                        if (err) return next(err);


                        //TODO: Redirect to Login Page
                        req.flash('success_message', 'User successfully Registered.');
                        res.redirect("/users/login");

                    });
            }
        });
    }



};


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
module.exports = registerController;