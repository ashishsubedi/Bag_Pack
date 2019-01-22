const connection = require('../config/connection');

const _ = require('lodash');


const profileController = {};


profileController.getProfile = (req, res, next) => {
    // User.findOne wont fire unless data is sent back
    process.nextTick(function () {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists

        connection.query("SELECT * FROM `post` WHERE `userId` = ?", [req.user.id], (err, rows) => {
            if (err) throw err;
            const data = {
                user: req.user,
                posts: rows
            }
            res.status(200).json(data);
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
            if (err) throw err;

            const data = {
                user: rows[0],
            }
            connection.query("SELECT * FROM `post` WHERE `userId` = ?", [req.params.userId], (err, posts) => {
                if (err) throw err;

                data.posts = posts;
                res.status(200).json(data);
            });
            // res.status(200).json(data);
        });
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
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

profileController.uploadProfilePic = (req, res, next) => {
    var photoPath = req.file.path ;
    console.log(photoPath);
    
    var query = "UPDATE users SET `profilePicture`= ?  WHERE `id`=?;"
    connection.query(query,[photoPath,req.user.id],(err,rows)=>{
        if(err) throw err;
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