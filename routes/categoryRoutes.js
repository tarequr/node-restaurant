const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryController');

const router = express.Router();

/* CREATE CATEGORY || POST */
router. post('/create', authMiddleware, createCategoryController);

/* GET ALL CATEGORIES || GET */
router.get('/getAll', getAllCategoryController);

/* UPDATE CATEGORY || PUT */
router.put('/update/:id', authMiddleware, updateCategoryController);

/* DELETE CATEGORY || DELETE */
router.delete('/delete/:id', authMiddleware, deleteCategoryController);

// Export
module.exports = router