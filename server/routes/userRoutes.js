const express = require('express');
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/webhook/clerk', userController.handleClerkWebhook);
router.get('/profile', requireAuth, userController.getUserProfile);
router.put('/profile', requireAuth, userController.updateUserProfile);
router.post('/daily-login', requireAuth, userController.dailyLogin);
router.post('/token', userController.getToken);

module.exports = router;
