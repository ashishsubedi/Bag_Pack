const connection = require('../config/connection');
var moment = require('moment');

const indexController = {};


indexController.getHome = (req, res, next) => {


    var query = "select post.*, users.`firstName`, users.`lastName`, users.`profilePicture` from post inner join users on post.userId=users.id AND post.`status` = 1 order by post.upvotes desc LIMIT 10;";
    connection.query(query, (err, rows) => {
        // if (err) next(err);
        if (err) return next(err);

        connection.query("SELECT * from users ORDER BY points desc LIMIT 3;", (err, topUsers) => {
            // if (err) next(err);
            if (err) return next(err);
            if (rows.length === 0) {
                var error = new Error("Posts not Found!!!");
                error.status = 404;
                return next(err);
            }

            //var temp = new Array(1);
            console.log(req.user);
            res.render('index', {
                posts: rows,
                moment,
                topUsers: topUsers,
                user: req.user
            });
        })


    })
};



indexController.getPlace = (req, res, next) => {

    connection.query(
        "Select post.*, users.`firstName`, users.`lastName`, users.`profilePicture`  from post inner join users on post.userId=users.id AND (post.to = ? OR post.from = ?) AND post.`status` = 1 order by post.dateCreated desc;", [req.params.place, req.params.place], (err, rows) => {
            // if(err) next(err);
            if (err) return next(err);
            if (rows.length === 0) {
                var error = new Error("Place not Found!!!");
                error.status = 404;
                return next(err);
            } else {

                //if (err) throw err;

                res.render('place', {
                    place: req.params.place,
                    user: req.user,
                    posts: rows,
                    moment: moment,
                });
            }

        });
}

indexController.search = (req, res, next) => {
    connection.query("SELECT * FROM post WHERE post.to LIKE ? OR post.from LIKE ? AND `status` = 1 LIMIT 5;", ["%" + req.params.query + "%", "%" + req.params.query + "%"], (err, rows) => {
        // if(err) next(err);
        if (err) return next(err);

        console.log(rows);

        res.json({ places: rows });
    });
}

module.exports = indexController;