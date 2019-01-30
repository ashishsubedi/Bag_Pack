const loginController = {};

const connection = require('../config/connection');



loginController.get = (req, res) => {
    //res.sendFile("views/login.html", { root: './' });
    res.render('login', {
        error_msg: req.flash('error_msg'),
        success_msg: req.flash('success_msg')
    });
};
loginController.post = (req, res, next) => {
    //Login User
    connection.query("UPDATE `users` SET `loggedIn` = 1 WHERE `id`= ?", req.user.id, (err, rows) => {
        // if(err) throw err;
        // if (err) next(err);
        if (err) return next(err);



        req.flash('success_msg', 'Successfully Logged In');
        console.log("User Logged In");
    });
    res.status(200).redirect('/');

};
loginController.logout = (req, res, next) => {
    connection.query("UPDATE `users` SET `loggedIn` = 0 WHERE `id`= ?", req.user.id, (err, rows) => {
        // if(err) throw err;
        // if (err) next(err);
        if (err) return next(err);



        req.flash('success_msg', 'Successfully Logged Oun');
        console.log("User Logged Out");
    });
    req.logOut();
    res.redirect('/');
};
module.exports = loginController;