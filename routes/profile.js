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

router.get('/post/add', auth.ensureAuthenticated, postController.getAddPost);

router.post('/post/add', auth.ensureAuthenticated, upload.array('photos',10),postController.addPost);

router.get('/post/:id', postController.getPostById);

router.post('/post/upvote/:postId',auth.ensureAuthenticated,postController.upvote);

router.post('/post/comment/:postId', auth.ensureAuthenticated, postController.addComment);

router.get('/post/edit', auth.ensureAuthenticated, postController.getEditPost);
//PUT: Update 
router.put('/post/edit/:postId', auth.ensureAuthenticated, postController.editPost);

//DELETE: Delete
router.delete('/post/:postId', auth.ensureAuthenticated, postController.deletePost);

//Handles Index (Remaining)


router.get('/id/:userId', profileController.getUserProfile); //Handled

router.put("/id/:userId",auth.ensureAuthenticated, upload.any('avatar'), profileController.editUserProfile); //Handled



router.post('/upload', auth.ensureAuthenticated, upload.single('avatar'), profileController.uploadProfilePic) //Handled

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});  //Handled

module.exports = router;
