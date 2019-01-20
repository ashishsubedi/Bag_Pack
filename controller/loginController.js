const loginController = {};

const connection = require('../config/connection');



loginController.get = (req,res) =>{
    res.sendFile("views/login.html",{root:'./'});
};
loginController.post = (req,res)=>{
   //Login User
   connection.query("UPDATE `users` SET `Logged In` = 1 WHERE `id`= ?", req.user.id, (err, rows) => {
    console.log("User Logged In");
});
   res.status(200).redirect('/home');
   
};
loginController.logout = (req,res)=>{
    connection.query("UPDATE `users` SET `Logged In` = 0 WHERE `id`= ?", req.user.id, (err, rows) => {
        console.log("User Logged Out");
    });
    req.logOut();
};
module.exports = loginController;