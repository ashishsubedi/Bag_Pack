var express = require('express');
var router = express.Router();

const auth = require('../config/auth');


const profileController = require("../controller/profileController");
const postController = require("../controller/postController");

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
     fileFilter: fileFilter
  });


router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get('/', auth.ensureAuthenticated, profileController.getProfile);

router.get('/:userId', auth.ensureAuthenticated, profileController.getUserProfile);

//Handles Post

router.get('/post', postController.getAllPost);
router.post('/post', auth.ensureAuthenticated, upload.any('photos',10), postController.addPost);

router.get('/post/:id',postController.getPostById);


router.post('/upload', auth.ensureAuthenticated, upload.any('profilePic'), profileController.uploadProfilePic)


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});




module.exports = router;
