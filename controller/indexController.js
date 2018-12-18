const indexController = {};

indexController.get = (req,res) =>{
    res.sendFile("views/index.html",{root:'./'});
};
module.exports = indexController;