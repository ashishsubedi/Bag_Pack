const connection = require('../config/connection');
var moment = require('moment');

const indexController = {};


indexController.get = (req, res) => {
  

    var query = "select post.*, users.`firstName`, users.`lastName`, users.`profilePicture` from post inner join users on post.userId=users.id order by post.upvotes desc LIMIT 10;";
    connection.query(query,(err,rows)=>{
        
        connection.query("SELECT * from users ORDER BY points desc LIMIT 3;",(err,topUsers)=>{
            console.log(rows);
        
            res.render('index',{
                posts: rows,
                moment,
                topUsers
            });
        })
        
        
    })
};

indexController.getHome = (req, res) => {
    res.render('index', {
        user: req.user
    });

    //res.sendFile("views/home.html",{root:'./'});
};

module.exports = indexController;