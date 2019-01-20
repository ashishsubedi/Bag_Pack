const indexController = {};

indexController.get = (req, res) => {
    // res.sendFile("views/homepage.html",{root:'./'});
    res.render('homepage');
};

indexController.getHome = (req, res) => {
    res.status(200).end("HOME");
    //res.sendFile("views/home.html",{root:'./'});
};

module.exports = indexController;