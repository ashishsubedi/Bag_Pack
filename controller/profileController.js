const connection = require('../config/connection');

const _ = require('lodash');


const profileController = {};


profileController.getProfile = (req,res,next)=>{
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        connection.query("SELECT * FROM `users` WHERE `Email` = ?",[req.user.email],(err,rows)=>{
            /* 
                Profile
                    Picture,
                    Name,
                    Address,
                    followers,
                    Total post,
                    Points,
                A Post contains
                    Date,
                    Thumbnail,
                    To,
                    From,
                    Budget,
                    Duration(Time ),
                    Level of difficulty,
                    Best time to travel,
                    Pictures,
                Post Page:
                    Name, 
                    Pp,
                    Created Date,
                    Post:
                        Previous Values,
                        Pictures,
                        Blog Content




            */
            console.log(rows);
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

profileController.getUserProfile = (req,res,next)=>{
     // User.findOne wont fire unless data is sent back
     process.nextTick(function() {

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

profileController.uploadProfilePic = (req,res,next)=>{
    var photosArray = [];
    _.forEach(req.files,(val)=>{
       photosArray.push(val.path);
    });
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