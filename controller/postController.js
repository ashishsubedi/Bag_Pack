//const {mongoose} = require('../../config/mongoose-connect');
const connection = require('../config/connection');
const formatDate = require('../config/formateDate');


const _ = require('lodash');



const postController = {};

postController.addPost = (req, res, next) => {

    var photosArray = [];
    _.forEach(req.files, (val) => {
        photosArray.push(val.path);
    });
   
    var query = "INSERT INTO `post` SET ?";
    var values = {
        userId : req.user.id,
        content: req.body.content,
        dateCreated: formatDate.formatDate(Date.now())
    }
    connection.query(query, values, (err,result,fields) => {

        console.log("POST ADDED SUCCESSFULLY!!");
        console.log(result);
        query = "SELECT * FROM `post` WHERE id = ? ";
        connection.query(query, result.insertId, (err,row)=>{
            //TODO: GET USER DATA AND DISPLAY POST PAGE
            console.log(row);
        })
       // let postId = rows[0]
       

    });

    /* 
        LocalUser.findById(req.user._id,(err,user)=>{
            if(err) next(err);
    
            if(user){ 
                Post.create({
                    destination : req.body.destination,
                    photos : photosArray,
                    description : req.body.description,
                    budget : req.body.budget
                },(err,post)=>{
                    user.posts.push(
                        post._id
                    );
                     
                    user.save(function(err){
                        if (err) throw err;
                        res.redirect('/profile')
                    })
                })
                
    
            }
        }); */

};

postController.getAllPost = (req, res, next) => {
    res.render("post");
};

postController.getPostById = (req, res, next) => {

    /*  LocalUser.findById(req.user._id)
     .populate('posts')
     .exec((err,user)=>{
         if(err)
             throw err;
         
         _.forEach(user.posts,val =>{
       
             if(val._id == req.params.id ){
                 res.render("post",{
                     post : val
                 });
             }
             
         });
         const error = new Error("Post Not Found");
         error.status = 404;
         next(error);
     }); */

    /* console.log(req.params.id);
    Post.findOne({_id :req.params.id})
    .exec((err,post)=>{
        if(err) throw err;
        res.render("post",{
            post : post
        });

    }); */




};

module.exports = postController;