//const {mongoose} = require('../../config/mongoose-connect');
const connection = require('../config/connection');

var moment = require('moment');


const _ = require('lodash');



const postController = {};

postController.addPost = (req, res, next) => {

    var photosArray = [];
    _.forEach(req.files, (val) => {
        photosArray.push(val.path);
    });

    var query = "INSERT INTO `post` SET ?";
    var values = {
        userId: req.user.id,
        content: req.body.content,
        dateCreated: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
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
                "select post.*, users.`First Name`, users.`Last Name` from post inner join users on post.userId=users.id AND post.userId = ? order by post.dateCreated desc;";

            connection.query(query, [row[0].userId], (err, rows) => {
                if (err) throw err;

                res.status(200).json(rows[0]);
            })

        })

    });
};

postController.getAllPost = (req, res, next) => {
    
    console.log("BLAH BLAh");
    var query = "SELECT * FROM `post` ORDER BY `dateCreated` desc";
    connection.query(query,(err, rows)=>{
        if (err) throw err;
        
        console.log(rows);
    })

    //res.render("post");
};

postController.getPostById = (req, res, next) => {

    var query = "SELECT * FROM `post` WHERE id = ?";
    connection.query(query, [req.params.id], (err, result, fields) => {

        if (err) throw err;

        query =
            "select post.*, users.`First Name`, users.`Last Name` from post inner join users on post.userId=users.id AND post.userId = ? order by post.dateCreated desc;";

        connection.query(query, [result[0].userId], (err, rows) => {
            if (err) throw err;

            rows[0].dateCreated = moment(result.dateCreated).format("YYYY-MM-DD HH:mm:ss");
            res.status(200).json(rows[0]);
        })


    });
};

module.exports = postController;