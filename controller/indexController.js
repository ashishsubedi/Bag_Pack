const indexController = {};

indexController.get = (req,res) =>{
    res.sendFile("views/index.html",{root:'./'});
};

indexController.getHome = (req,res) =>{
    res.status(200).end("HOME");
    //res.sendFile("views/home.html",{root:'./'});
};

module.exports = indexController;