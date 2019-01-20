const con = require('../config/connection');

const registerController = {};
const bcrypt = require('../config/bcrypt');

registerController.get = (req, res) => {
    res.sendFile("views/register.html", { root: './' });
};
registerController.post = (req, res) => {
    //var currentdate = new Date(); 
    // var datetime = currentdate.getDate() + "/"
    //             + (currentdate.getMonth()+1)  + "/" 
    //             + currentdate.getFullYear() + " @ "  
    //             + currentdate.getHours() + ":"  
    //             + currentdate.getMinutes() + ":" 
    //             + currentdate.getSeconds();
    var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var dob = formatDate(req.body.birth);
    let password = bcrypt.generateHash(req.body.password);
    connection.query("SELECT * FROM `users` WHERE `Email` = ?", email, function (err, rows) {
        if (err)
            throw err;

        if (!rows.length) {
            const err = new Error("User Already Exist");
            console.log("User Already Exist");
            err.status = 403;
            throw err;
        }
    });

    con.query("INSERT INTO `users` (`First Name`, `Last Name`, `Email`, `Password`, `Date Created`,`Date of Birth`, `Gender`, `Logged In`,`isAdmin`) VALUES (?, ?, ?, ?, ?,?,?, '0','0')",
        [req.body.firstName, req.body.lastName, req.body.email, password, datetime, dob, req.body.gender], (err, rows, fields) => {

            if (err) { console.log(err); return; }
            //TODO: Redirect to Login Page
            res.redirect("/users/login");

        });
};

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = registerController;