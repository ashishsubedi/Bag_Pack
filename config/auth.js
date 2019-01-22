module.exports ={
    ensureAuthenticated : (req,res,next)=>{
        
        if(req.isAuthenticated()){
            return next();
        }
        else{
            res.redirect('/users/login');
        }
    },
    ensureGuest : (req,res,next)=>{
        console.log(req.isAuthenticated())
        if(req.isAuthenticated()){
            res.redirect('/home');
        }
        else{
            return next();
        }
    }
}