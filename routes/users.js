const express = require('express');
const router = express.Router();
const passport = require('passport');


const registerController = require('../controller/registerController');
const loginController = require('../controller/loginController');
const googleController = require('../controller/googleController');


router
    .get('/register', registerController.get)
    .post('/register', registerController.post);

router
    .get('/login', loginController.get)
    .post('/login', passport.authenticate('local-login', {
        failureFlash: "You Failed",
        failureRedirect: '/users/login'
    }), loginController.post);

router
    .get('/g-login', googleController.get)
    .post('/g-login', googleController.post);


//THESE ARE JUST HERE BECAUSE I DIDN'T KNOW WHERE TO PUT THEM.. HANDLE THEM
router.post('/onSignIn', (req, res) => {
    console.log("HERE");
    console.log(req.body);
    onSignIn(req.body.googleUser);
});
router.post('/signOut', (req, res) => {
    res.end("signed out");
});

router.get('/logout',loginController.logout);



module.exports = router;