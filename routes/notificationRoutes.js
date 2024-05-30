// routes/notificationRoutes.js
const express = require('express');
const { getNotifications, markRead } = require('../controllers/notificationController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/send', authenticate, getNotifications);
router.post('/mark-read', authenticate, markRead);

module.exports = router;
