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
        failureFlash: true,
        failureRedirect: '/users/login'
    }), loginController.post);

router.get('/logout', loginController.logout);  //Handled




module.exports = router;