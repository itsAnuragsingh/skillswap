const express = require('express');
const noteController = require('../controllers/noteController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', requireAuth, noteController.createNote);
router.get('/', requireAuth, noteController.getNotes);

module.exports = router;
