const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategoryController, getAllCategoryController, updateCategoryController } = require('../controllers/categoryController');

const router = express.Router();

/* CREATE CATEGORY || POST */
router. post('/create', authMiddleware, createCategoryController);

/* GET ALL CATEGORIES || GET */
router.get('/getAll', getAllCategoryController);

/* UPDATE CATEGORIES || PUT */
router.put('/update/:id', authMiddleware, updateCategoryController);


// Export
module.exports = router