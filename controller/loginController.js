const loginController = {};

const connection = require('../config/connection');



loginController.get = (req, res) => {
    //res.sendFile("views/login.html", { root: './' });
    res.render('login', {
        error_msg: req.flash('error_msg'),
        success_msg: req.flash('success_msg')
    });
};
loginController.post = (req, res) => {
    //Login User
    connection.query("UPDATE `users` SET `Logged In` = 1 WHERE `id`= ?", req.user.id, (err, rows) => {
        req.flash('success_msg', 'Successfully Logged In');
        console.log("User Logged In");
    });
    res.status(200).redirect('/home');

};
loginController.logout = (req, res) => {
    connection.query("UPDATE `users` SET `Logged In` = 0 WHERE `id`= ?", req.user.id, (err, rows) => {
        req.flash('success_msg', 'Successfully Logged In');
        console.log("User Logged Out");
    });
    req.logOut();
};
module.exports = loginController;