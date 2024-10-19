const express = require('express');
const ideaController = require('../controllers/ideaController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', requireAuth, ideaController.submitIdea);
router.get('/', requireAuth, ideaController.getIdeas);

module.exports = router;
