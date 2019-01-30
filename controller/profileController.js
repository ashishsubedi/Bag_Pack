const connection = require('../config/connection');

const _ = require('lodash');

const moment = require('moment');
const ejsLint = require('ejs-lint');

const profileController = {};


profileController.getProfile = (req, res, next) => {
    // User.findOne wont fire unless data is sent back
    process.nextTick(function () {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists

        connection.query("SELECT * FROM `post` WHERE `userId` = ? AND `status` = 1", [req.user.id], (err, rows) => {
            // if (err) throw err;
            if (err) return next(err);

            /* const data = {
                user: req.user,
                posts: rows
            } */
        
        
             res.render('profile', {
                user: req.user,
                posts: rows,
                moment: moment,
                profileUser: req.user

            }) 
            //res.status(200).json(data);
        });

        /*  LocalUser.findOne({ email : req.user.email })
         .populate('posts')
         .exec(function(err, user) {
             // if there are any errors, return the error
             if (err)
                 return next(err);
 
             // check to see if theres already a user with that email
             if (user) {
                // var email    = user.email;
                 var points = user.points;
                 var level = user.level;
                 var fullName = user.firstName + " " + user.lastName;
                 var address = user.address;
                
                 var about = user.about;
                 var posts = user.posts;
                 ;
             
                 
                 res.render("profile",{
                     about: about,
                     points: points,
                     level: level,
                     fullName: fullName,
                     profilePic : (user.profilePic[0])? user.profilePic[0]: "/views/img/travel.jpg",
                     posts: posts,
                     upvote : posts.upvote,
                     address: address
               
                 });
             }
 
         });     */


    });


};

profileController.getUserProfile = (req, res, next) => {
    // User.findOne wont fire unless data is sent back
    process.nextTick(function () {

        connection.query("SELECT * FROM `users` WHERE `id` = ?", [req.params.userId], (err, rows) => {
            // if (err) throw err;
            if (err) return next(err);


            /*  const data = {
                 user: rows[0],
             } */
            connection.query("SELECT * FROM `post` WHERE `userId` = ?  AND `status` = 1", [req.params.userId], (err, posts) => {
                // if (err) throw err;
                if (err) return next(err);


                res.render('profile', {
                    user: req.user,
                    profileUser: rows[0],
                    posts: posts,
                    moment: moment

                })
                // res.status(200).json(data);
            });
            // res.status(200).json(data);
        });
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login a lready exists
        /*  LocalUser.findOne({ _id : req.body.userId }, function(err, user) {
             // if there are any errors, return the error
             if (err)
                 return next(err);
 
             // check to see if theres already a user with that email
             if (user) {
                // var email    = user.email;
                 var points = user.points;
                 var level = user.level;
                 var firstName = user.firstName;
                 var lastName = user.lastName;
                 var address = user.address;
                 var about = user.about;
                 var posts = user.posts;
                 var gender = user.gender;
 
                 console.log(user);
                 
                 res.render("profile",{
                     about: about,
                     points: points,
                     level: level,
                     firstName: firstName,
                     lastName: lastName,
                     gender: gender,
                     posts: posts,
                     address: address,
                 });
                 
                 
             }
 
         });     */


    });


};
profileController.editUserProfile = (req, res, next) => {

    console.log("HERE");
    var values = {};
    console.log(req.file);
    if (req.file) {
        var photoPath = req.file.path;
        values = {
            firstName: req.body.firstName.trim(),
            lastName: req.body.lastName.trim(),
            address: req.body.address.trim(),
            profilePicture: photoPath,
            description: req.body.description.trim()
        }
    }

    else {
        //connection.query("SELECT profilePicture FROM users WHERE users.id = ?",[req.user.id],(err,picLocation))
        values = {
            firstName: req.body.firstName.trim(),
            lastName: req.body.lastName.trim(),
            address: req.body.address.trim(),
            description: req.body.description.trim()
        }
    }
    console.log(values);

    var query = "UPDATE `users` SET ? WHERE id = ?;";


    connection.query(query, [values, req.params.userId], (err, result) => {
        if (err) return next(err);

        res.redirect("/profile");
    });
};

profileController.uploadProfilePic = (req, res, next) => {
    var photoPath = req.file.path;


    var query = "UPDATE users SET `profilePicture`= ?  WHERE `id`=?;"
    connection.query(query, [photoPath, req.user.id], (err, rows) => {
        // if (err) throw err;
        if (err) return next(err);

        res.redirect('/profile');
    })
    /* LocalUser.findById(req.user._id,(err,user)=>{
        if(err) next(err);

        if(user){
            user.profilePic = photosArray;
            user.save(err=>{
                if(err) throw err;
               res.redirect('/profile');
            });
        }
    }) */
}



module.exports = profileController;