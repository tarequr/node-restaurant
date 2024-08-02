const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategoryController, getAllCategoryController } = require('../controllers/categoryController');

const router = express.Router();

/* CREATE CATEGORY || POST */
router. post('/create', authMiddleware, createCategoryController);

/* GET ALL CATEGORIES || GET */
router.get('/getAll', getAllCategoryController);

// Export
module.exports = router