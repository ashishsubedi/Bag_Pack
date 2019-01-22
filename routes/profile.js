var express = require('express');
var router = express.Router();

const auth = require('../config/auth');


const profileController = require("../controller/profileController");
const postController = require("../controller/postController");

const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/uploads/');
	},
	filename: function (req, file, cb) {
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
		fileSize: 1024 * 1024 * 10
	},
	fileFilter: fileFilter
});


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', auth.ensureAuthenticated, profileController.getProfile); //Handled

//Handles Post (All handled)

router.get("/post", postController.getAllPosts);

router.post('/post', auth.ensureAuthenticated, upload.array('photos',10),postController.addPost);

router.get('/post/:id', postController.getPostById);

//Handles Index (Remaining)


router.get('/id/:userId', auth.ensureAuthenticated, profileController.getUserProfile); //Handled


router.post('/upload', auth.ensureAuthenticated, upload.single('avatar'), profileController.uploadProfilePic) //Handled

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});  //Handled

module.exports = router;
