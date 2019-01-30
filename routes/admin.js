const express = require('express');
const router = express.Router();

const passport = require('passport');
const auth = require('../config/auth');


const adminController = require('../controller/adminController');



router.get('/dashboard',adminController.isAdmin,adminController.getDashboard);

router.post('/approve/:postId',adminController.isAdmin,adminController.approvePost);
router.post('/disapprove/:postId',adminController.isAdmin,adminController.disapprovePost);
router.post('/moderate/:postId',adminController.isAdmin,adminController.sendToModeration);




module.exports = router;    

