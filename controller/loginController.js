const loginController = {};


loginController.get = (req,res) =>{
    res.sendFile("views/login.html",{root:'./'});
};
loginController.post = (req,res)=>{
   //Login User
};
module.exports = loginController;