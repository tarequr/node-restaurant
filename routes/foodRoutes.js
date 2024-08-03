const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodController } = require('../controllers/foodController');


const router = express.Router();

/* CREATE FOOD || POST */
router. post('/create', authMiddleware, createFoodController);

/* GET ALL FOODS || GET */
router.get('/getAll', getAllFoodController);

// /* UPDATE FOOD || PUT */
// router.put('/update/:id', authMiddleware, updateCategoryController);

// /* DELETE FOOD || DELETE */
// router.delete('/delete/:id', authMiddleware, deleteCategoryController);

// Export
module.exports = router