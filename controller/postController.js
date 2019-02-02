//const {mongoose} = require('../../config/mongoose-connect');
const connection = require('../config/connection');

var moment = require('moment');


const _ = require('lodash');



const postController = {};

postController.addPost = (req, res, next) => {

    var photosPath = '';
    _.forEach(req.files, (val) => {
        photosPath += val.path + ',';

    });

    var query = "INSERT INTO `post` SET ?";
    var values = {
        userId: req.user.id,
        content: req.body.content,
        dateCreated: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        to: req.body.to,
        from: req.body.from,
        budget: req.body.budget,
        duration: req.body.duration,
        bestTime: req.body.bestTime,
        pictures: photosPath,
        levelOfDifficulty: req.body.levelOfDifficulty,
        title: req.body.title,
    }

    connection.query(query, values, (err, postInfo, fields) => {
        // if (err) throw err;
        if (err) return next(err);


        console.log("POST ADDED SUCCESSFULLY!!", postInfo);


        /* query = "SELECT * FROM `post` WHERE id = ? ";
        connection.query(query, result.insertId, (err, row) => {
            if (err) throw err;

            //TODO: GET USER DATA AND DISPLAY POST PAGE
            console.log(row);
            query =
                "select post.*, users.`firstName`, users.`lastName`, users.`profilePicture` from post inner join users on post.userId=users.id AND post.userId = ? order by post.dateCreated desc;";

            connection.query(query, [row[0].userId], (err, rows) => {
                if (err) throw err;
                console.log(rows[0]);
                
            })
            
        }) */

        var query = "SELECT * FROM `post` WHERE id = ?;";
        connection.query(query, [postInfo.insertId], (err, result, fields) => {
            // if (err) throw err;
            if (err) return next(err);



            query =
                "select post.*, users.`firstName`, users.`lastName`, users.`profilePicture`  from post inner join users on post.userId=users.id AND post.userId = ? order by post.dateCreated desc;";

            connection.query(query, [result[0].userId], (err, rows) => {


                // if (err) throw err;
                if (err) return next(err);



                rows[0].dateCreated = moment(result[0].dateCreated).format("YYYY-MM-DD HH:mm:ss");
                var picturesPath = rows[0].pictures.split(',');
                var pictures = []
                for (var i = 0; i < picturesPath.length - 1; i++) {
                    pictures.push(picturesPath[i]);
                }

                connection.query("SELECT comment.*, users.firstName, users.lastName, users.profilePicture FROM comment INNER JOIN users ON users.id=comment.userId AND comment.postId=? ORDER BY id DESC", [rows[0].id], (err, comments) => {
                    // if (err) throw err;
                    if (err) return next(err);



                    connection.query("SELECT COUNT(*) as num FROM upvotes WHERE postId=? GROUP BY postId", [rows[0].id], (err, rows3) => {
                        // if (err) throw err;
                        if (err) return next(err);



                        if (rows3.length > 0 && rows3[0].num) {
                            rows[0].upvotes = rows3[0].num;
                        } else {
                            rows[0].upvotes = 0;
                        }
                        connection.query("UPDATE users SET points = (points + 5) WHERE id = ?;", [req.user.id], (err, doneInsert) => {
                            res.status(200).render('post', {
                                post: rows[0],
                                pictures,
                                user: req.user,
                                moment: moment,
                                comments: comments
                            });
                        });
                    });
                });
                // console.log("Pictures: ",picturesPath);
                //res.status(200).json(rows[0]);
            });


        });


        /* res.status(200).json({
            post: rows[0],
            moment
        }); */
    });

};

postController.getEditPost = (req, res, next) => {
    query = "SELECT * FROM `post` WHERE id = ? ";
    connection.query(query, req.params.postId, (err, row) => {
        if (err) return next(err);



        res.render("editPost", {
            post: rows[0],
            moment
        });
    });
};
postController.getAddPost = (req, res, next) => {
    res.render("addPost");
};

postController.editPost = (req, res, next) => {
    var photosPath = '';
    _.forEach(req.files, (val) => {
        photosPath += val.path + ',';
    });
    console.log(req.params.postId);

    var query = "UPDATE `post` SET ? WHERE id = ?";
    var values = {
        content: req.body.content,
        to: req.body.to,
        from: req.body.from,
        budget: req.body.budget,
        duration: req.body.duration,
        bestTime: req.body.bestTime,
        pictures: photosPath,
        levelOfDifficulty: req.body.levelOfDifficulty,
        title: req.body.title
    }
    console.log(values);
    connection.query(query, [values, req.params.postId], (err, result, fields) => {
        // if (err) throw err;
        if (err) return next(err);



        console.log("POST EDITED SUCCESSFULLY!!");
        query = "SELECT * from post Where id = ? AND `status` = 1;";
        console.log(req.params.postId);
        connection.query(query, [req.params.postId], (err, row) => {
            // if (err) throw err;
            if (err) return next(err);



            //TODO: GET USER DATA AND DISPLAY POST PAGE
            console.log(row);
            if (row.length > 0) {


                query =
                    "select post.*, users.`firstName`, users.`lastName`, users.`profilePicture` from post inner join users on post.userId=users.id AND post.userId = ? order by post.dateCreated desc;";

                connection.query(query, [row[0].userId], (err, rows) => {
                    // if (err) throw err;
                    if (err) return next(err);


                    console.log(rows[0]);
                    res.status(200).json({
                        post: rows[0],
                        moment
                    });
                })
            } else {
                res.status(200).json({
                    post: undefined,
                    message: "No post found",
                    moment
                });
            }


        })

    });
    /*  Story.findOne({
         _id: req.params.id
     })
         .then(story => {
             let allowComments;
 
             if (req.body.allowComments) {
                 allowComments = true;
             } else {
                 allowComments = false;
             }
 
 
             story.title = req.body.title;
             story.body = req.body.body;
             story.status = req.body.status;
             story.allowComments = allowComments;
 
 
             story.save()
                 .then(story => {
                     res.redirect('/dashboard');
                 });
 
 
         })
         .catch(err => { throw err }); */
};

postController.deletePost = (req, res, next) => {

    connection.query("DELETE FROM `post` WHERE id = ?;", [req.params.postId], (err, result) => {
        if (err) return next(err);

        console.log("DELETED");

        res.redirect("/profile");
    });
};

postController.getAllPosts = (req, res, next) => {
    var query = "SELECT * FROM `post` ORDER BY `dateCreated` WHERE `status` = 1 desc LIMIT 20";
    connection.query(query, (err, rows) => {
        // if (err) throw err;
        if (err) return next(err);

        res.json({ posts: rows, moment });

    });
};


postController.getPostById = (req, res, next) => {
    var query = "SELECT * FROM `post` WHERE id = ? AND `status` = 1;";
    if (req.user) {
        if (req.user.isAdmin === 1) {
            query = "SELECT * FROM `post` WHERE id = ?;";
        }
    }

    connection.query(query, [req.params.id], (err, result, fields) => {
        // if (err) throw err;
        if (err) return next(err);
        if (result.length === 0) {
            var error = new Error("Posts not Found!!!");
            error.status = 404;
            return next(err);
        }


        query =
            "select post.*, users.`firstName`, users.`lastName`, users.`profilePicture`  from post inner join users on post.userId=users.id AND post.id = ? order by post.dateCreated desc;";

        connection.query(query, [result[0].id], (err, rows) => {

            if (err) return next(err);

            // if (err) throw err;

            rows[0].dateCreated = moment(result[0].dateCreated).format("YYYY-MM-DD HH:mm:ss");
            var picturesPath = rows[0].pictures.split(',');
            var pictures = []
            for (var i = 0; i < picturesPath.length - 1; i++) {
                pictures.push(picturesPath[i]);
            }

            connection.query("SELECT comment.*, users.firstName, users.lastName, users.profilePicture FROM comment INNER JOIN users ON users.id=comment.userId AND comment.postId=? ORDER BY id DESC", [rows[0].id], (err, comments) => {
                // if (err) throw err;
                if (err) return next(err);


                connection.query("SELECT COUNT(*) as num FROM upvotes WHERE postId=? GROUP BY postId", [rows[0].id], (err, rows3) => {
                    // if (err) throw err;
                    if (err) return next(err);


                    if (rows3.length > 0 && rows3[0].num) {
                        rows[0].upvotes = rows3[0].num;
                    } else {
                        rows[0].upvotes = 0;
                    }

                    res.status(200).render('post', {
                        post: rows[0],
                        pictures,
                        user: req.user,
                        moment: moment,
                        comments: comments
                    })

                })
            })
            // console.log("Pictures: ",picturesPath);
            //res.status(200).json(rows[0]);
        })


    });
};

postController.upvote = (req, res, next) => {

    /* Click Upvote button then*/
    connection.query("SELECT id FROM upvotes WHERE postId=? AND userId=?", [req.params.postId, req.user.id], (err, rows) => {
        // if (err) throw err;
        if (err) return next(err);


        if (rows.length > 0) {
            res.json({
                message: "Already upvoted."
            })
        } else {
            connection.query("INSERT INTO upvotes (userId, postId) VALUES (?,?)", [req.user.id, req.params.postId], (err, rows) => {
                // if (err) throw err;
                if (err) return next(err);


                connection.query("UPDATE post SET post.upvotes = (post.upvotes + 1) WHERE post.id = ?;", [req.params.postId], (err, rows) => {
                    // if (err) throw err;
                    if (err) return next(err);

                    res.json({
                        message: "Upvoted"
                    });
                });

            });
        }
    })

};

postController.addComment = (req, res, next) => {



    var query = "INSERT INTO `comment` SET ?";
    var values = {
        userId: req.user.id,
        comment: req.body.comment,
        postId: req.params.postId,
        dateCreated: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),

    }

    connection.query(query, values, (err, result, fields) => {
        // if (err) next(err);
        if (err) return next(err);


        console.log("COMMENT ADDED SUCCESSFULLY!!");


        query = "select comment.*, users.`firstName`, users.`lastName`, users.`profilePicture` from comment inner join users on comment.userId=users.id AND comment.postId = ? order by comment.dateCreated desc LIMIT 20;";
        connection.query(query, req.params.postId, (err, rows) => {
            // if (err) next(err);
            if (err) return next(err);
            connection.query("UPDATE users SET points = (points + 1) WHERE id = ?;", [req.user.id], (err, doneInsert) => {
                //TODO: GET USER DATA AND DISPLAY POST PAGEc
                res.status(200).json({ comments: rows, moment });
            });




        })


    });


};

module.exports = postController;