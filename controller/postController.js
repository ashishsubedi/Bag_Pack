//const {mongoose} = require('../../config/mongoose-connect');
const connection = require('../config/connection');

var moment = require('moment');


const _ = require('lodash');



const postController = {};

postController.addPost = (req, res, next) => {
    try {
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
        console.log(values);
        connection.query(query, values, (err, result, fields) => {
            if (err) throw err;

            console.log("POST ADDED SUCCESSFULLY!!");

            query = "SELECT * FROM `post` WHERE id = ? ";
            connection.query(query, result.insertId, (err, row) => {
                if (err) throw err;

                //TODO: GET USER DATA AND DISPLAY POST PAGE
                console.log(row);
                query =
                    "select post.*, users.`firstName`, users.`lastName`, users.`profilePicture` from post inner join users on post.userId=users.id AND post.userId = ? order by post.dateCreated desc;";

                connection.query(query, [row[0].userId], (err, rows) => {
                    if (err) throw err;
                    console.log(rows[0]);
                    res.status(200).json({
                        post: rows[0],
                        moment
                    });
                })

            })

        });
    } catch (err) {
        next(err);
    }
};

postController.getEditPost = (req, res, next) => {
    query = "SELECT * FROM `post` WHERE id = ? ";
    connection.query(query, req.params.postId, (err, row) => {

        res.render("editPost", {
            post: rows[0],
            moment
        });
    });
}
postController.getAddPost = (req, res, next) => {
    res.render("addPost");
}

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
        if (err) throw err;

        console.log("POST EDITED SUCCESSFULLY!!");
        query = "SELECT * from post Where id = ?;";
        console.log(req.params.postId);
        connection.query(query, [req.params.postId], (err, row) => {
            if (err) throw err;

            //TODO: GET USER DATA AND DISPLAY POST PAGE
            console.log(row);

            query =
                "select post.*, users.`firstName`, users.`lastName`, users.`profilePicture` from post inner join users on post.userId=users.id AND post.userId = ? order by post.dateCreated desc;";

            connection.query(query, [row[0].userId], (err, rows) => {
                if (err) throw err;
                console.log(rows[0]);
                res.status(200).json({
                    post: rows[0],
                    moment
                });
            })

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
}

postController.deletePost = (req, res, next) => {

    connection.query("DELETE FROM `post` WHERE id = ?;", [req.params.postId], (err, result) => {
        if (err) throw err;

        res.redirect("/profile");
    });
}

postController.getAllPosts = (req, res, next) => {
    var query = "SELECT * FROM `post` ORDER BY `dateCreated` desc LIMIT 20";
    connection.query(query, (err, rows) => {
        if (err) throw err;
        res.json({ posts: rows, moment });

    });
}


postController.getPostById = (req, res, next) => {

    var query = "SELECT * FROM `post` WHERE id = ?";
    connection.query(query, [req.params.id], (err, result, fields) => {

        if (err) throw err;

        query =
            "select post.*, users.`firstName`, users.`lastName`, users.`profilePicture`  from post inner join users on post.userId=users.id AND post.userId = ? order by post.dateCreated desc;";

        connection.query(query, [result[0].userId], (err, rows) => {
            if (err) throw err;

            rows[0].dateCreated = moment(result.dateCreated).format("YYYY-MM-DD HH:mm:ss");
            res.status(200).json(rows[0]);
        })


    });
};

postController.upvote = (req, res, next) => {

    /* Click Upvote button then*/
    var query = "SELECT * FROM `post` WHERE id = ?";
    connection.query(query, [req.params.postId], (err, rows) => {
        if (err) throw err;
        query = "UPDATE `post` SET upvotes = ? WHERE id = ?";

        connection.query(query, [(rows[0].upvotes + 1), req.params.postId], (err, result) => {
            if (err) throw err;

            res.status(200).json({ upvotes: (rows[0].upvotes + 1) })

        })
    });

};

postController.addComment = (req, res, next) => {



    var query = "INSERT INTO `comment` SET ?";
    console.log(req.body);
    var values = {
        userId: req.user.id,
        comment: req.body.comment,
        postId: req.params.postId,
        dateCreated: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),

    }

    connection.query(query, values, (err, result, fields) => {
        if (err) next(err);

        console.log("COMMENT ADDED SUCCESSFULLY!!");


        query = "SELECT * FROM `comment` WHERE postId = ? ORDER BY dateCreated desc";
        connection.query(query, req.params.postId, (err, rows) => {
            if (err) next(err);

            //TODO: GET USER DATA AND DISPLAY POST PAGE
            res.status(200).json({ comments: rows , moment});


        })


    });


};

module.exports = postController;