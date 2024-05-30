// routes/itemRoutes.js
const express = require('express');
const {
  getItems, getItemById, createItem, updateItem, deleteItem
} = require('../controllers/itemController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', authenticate, upload.single('image'), createItem);
router.put('/:id', authenticate, authorize('admin', 'owner'), updateItem);
router.delete('/:id', authenticate, authorize('admin', 'owner'), deleteItem);

module.exports = router;
