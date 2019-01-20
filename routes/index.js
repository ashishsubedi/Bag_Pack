const express = require('express');
const router = express.Router();

const passport = require('passport');
const auth = require('../config/auth');


const indexController = require('../controller/indexController');



router.get('/',auth.ensureGuest,indexController.get);

router.get('/home',auth.ensureAuthenticated,indexController.getHome);

module.exports = router;