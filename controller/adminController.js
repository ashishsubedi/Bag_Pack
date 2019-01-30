const connection = require('../config/connection');
var moment = require('moment');


const adminController = {};


adminController.getDashboard = (req, res, next) => {

    console.log("CALLING GET DASHBOARD");
    //var query = "select post.*, users.* from post inner join users on post.userId=users.id;";
    var query = "SELECT post.*, users.`firstName`, users.`lastName` from post join users on post.userId = users.id ORDER BY post.`dateCreated` desc";


    /* 
        WHY THE FUCK IS THIS QUERY GIVING DIFFERENT RESULT THAN EXPECTED?????????
        IT WORKS ON WORKBENCH
    
    */
    connection.query(query, (err, rows) => {
        // if (err) throw err;
        console.log(err);
        // if (err) next(err);
        if (err) return next(err);


        console.log("Admin Posts: ", rows);

        res.render('admindashboard', {
            posts: rows,
            user: req.user
        });

        // console.log("Pictures: ",picturesPath);
        //res.status(200).json(rows[0]);
    });
}

adminController.approvePost = (req, res, next) => {
    query =
        "SELECT post.*, users.`firstName`, users.`lastName` from post join users on post.userId = users.id and post.id = ? ";
    connection.query(query, [req.params.postId], (err, post) => {
        // if (err) throw err;
        // if (err) next(err);
        if (err) return next(err);


        if (post.length > 0) {
            post[0].status = 1;
        }
        connection.query("Update post SET status = 1 WHERE id = ?", [req.params.postId], (err, result) => {
            // if (err) throw err;
            // if (err) next(err);
            if (err) return next(err);



            res.status(200).json({
                post: post[0]
            });
        })
    })
}
adminController.disapprovePost = (req, res, next) => {
    console.log("CALLED DISAPROVE");
    query =
        "SELECT post.*, users.`firstName`, users.`lastName` from post join users on post.userId = users.id and post.id = ? ";
    connection.query(query, [req.params.postId], (err, post) => {
        // if (err) throw err;
        // if (err) next(err);
        if (err) return next(err);


        if (post.length > 0) {
            post[0].status = 2;
        }
        connection.query("Update post SET status = 2 WHERE id = ?", [req.params.postId], (err, result) => {
            // if (err) throw err;
            // if (err) next(err);
            if (err) return next(err);


            console.log("SENDING JSON");
            res.status(200).json({
                post: post[0]
            });
        })

    })
}
adminController.sendToModeration = (req, res, next) => {
    query =
        "SELECT post.*, users.`firstName`, users.`lastName` from post join users on post.userId = users.id and post.id = ? ";
    connection.query(query, [req.params.postId], (err, post) => {
        // if (err) throw err;
        console.log(err);
        // if (err) next(err);
        if (err) return next(err);


        if (post.length > 0) {
            post[0].status = 0;
        }
        connection.query("Update post SET status = 0 WHERE id = ?", [req.params.postId], (err, result) => {
            // if (err) throw err;
            // if (err) next(err);
            if (err) return next(err);



            res.status(200).json({
                post: post[0]
            });
        })
    })
}
module.exports = adminController;

module.exports.isAdmin = (req, res, next) => {


    if (req.isAuthenticated()) {
        if (req.user.isAdmin === 1)
            return next();
        else
            res.redirect('/');

    }
    else {
        res.redirect('/users/login');

    }
};