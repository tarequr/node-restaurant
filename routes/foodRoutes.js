const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodController, getSingleFoodController, getByRestaurantController } = require('../controllers/foodController');


const router = express.Router();

/* CREATE FOOD || POST */
router. post('/create', authMiddleware, createFoodController);

/* GET ALL FOODS || GET */
router.get('/getAll', getAllFoodController);

/* GET SINGLE FOOD || GET */
router.get('/get/:id', getSingleFoodController);

/* GET SINGLE FOOD || GET */
router.get('/getByRestaurant/:id', getByRestaurantController);

// /* UPDATE FOOD || PUT */
// router.put('/update/:id', authMiddleware, updateCategoryController);

// /* DELETE FOOD || DELETE */
// router.delete('/delete/:id', authMiddleware, deleteCategoryController);

// Export
module.exports = router