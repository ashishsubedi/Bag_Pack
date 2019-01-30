const express = require('express');
const router = express.Router();

const passport = require('passport');
const auth = require('../config/auth');


const indexController = require('../controller/indexController');



router.get('/',indexController.getHome);


router.get('/places/:place',indexController.getPlace);

router.get('/search/:query',indexController.search);


module.exports = router;    