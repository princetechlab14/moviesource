const express = require('express');
const router = express.Router();
const userController = require('../controller/api/userController');
const profileController = require('../controller/api/profileController');
const movieController = require('../controller/api/movieController');
const homeController = require('../controller/api/homeController');
const playerController = require('../controller/api/playerController');
const thankYouController = require('../controller/api/thankYouController');
const productController = require('../controller/api/productController');
const emojiController = require('../controller/api/emojiController');
const reactionController = require('../controller/api/reactionController');
const reportedContentController = require('../controller/api/reportedContentController');
const { upload } = require('../services/fileupload');
const { authenticateToken } = require('../middleware/auth.middleware');

router.get('/', function (req, res, next) { return res.json('respond with a resource'); });

// RegistrationService
router.post('/user/signup', userController.SignUp);
router.post('/user/signin', userController.SignIn);

// ProfileService
router.post('/profile/create', authenticateToken, profileController.create);
router.post('/profile/update', authenticateToken, profileController.update);
router.get('/profile/:creatorId', authenticateToken, profileController.getProfile);
router.post('/profile/upload/:id', upload.single('profileImageUrl'), authenticateToken, profileController.uploadPicture);

// UploadService
router.get('/movie/:userId', authenticateToken, movieController.getMyMovies);
router.post('/movie', authenticateToken, movieController.create);
router.delete('/movie/:id', authenticateToken, movieController.deleteMovieByParam);

router.get('/upload', authenticateToken, movieController.getAll);
router.put('/upload', authenticateToken, movieController.update);
router.post('/upload/:movieId', upload.single('movie'), authenticateToken, movieController.uploadMovie);
router.delete('/upload', authenticateToken, movieController.deleteMovieByQuery);
router.get('/upload/thankyou/:userId', authenticateToken, movieController.getThankYouMovie);

// CreatorsService
router.get('/creator/movies/:creatorId', authenticateToken, movieController.getAllMovies);
router.get('/creator/highlights/:creatorId', authenticateToken, movieController.getAllHighlights);

// Home2Service
router.get('/home', authenticateToken, homeController.getHome);
router.get('/player', authenticateToken, playerController.getPlayer);
router.get('/thankyou/:userId', authenticateToken, thankYouController.getThankYou);

// products
router.get('/product/:userId', authenticateToken, productController.getUserProducts);
router.post('/product', authenticateToken, productController.createProduct);

// ReactionService
router.post('/reaction', authenticateToken, reactionController.handlePostReaction);
router.put('/reaction', authenticateToken, reactionController.updateReaction);
router.delete('/reaction', authenticateToken, reactionController.deleteReaction);

// EmojiService
router.get('/emoji/:userId', authenticateToken, emojiController.getUserEmojis);

// ReportedContentService
router.post('/contentmoderation', authenticateToken, reportedContentController.reportContent);

module.exports = router;