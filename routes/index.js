// routes/index.js
const express = require('express');
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const bidRoutes = require('./bidRoutes');
const notificationRoutes = require('./notificationRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/items', itemRoutes);
router.use('/bids', bidRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;
