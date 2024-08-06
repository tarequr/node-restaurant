const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { createFoodController, getAllFoodController, getSingleFoodController, getByRestaurantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controllers/foodController');


const router = express.Router();

/* CREATE FOOD || POST */
router. post('/create', authMiddleware, createFoodController);

/* GET ALL FOODS || GET */
router.get('/getAll', getAllFoodController);

/* GET SINGLE FOOD || GET */
router.get('/get/:id', getSingleFoodController);

/* GET SINGLE FOOD || GET */
router.get('/getByRestaurant/:id', getByRestaurantController);

/* UPDATE FOOD || PUT */
router.put('/update/:id', authMiddleware, updateFoodController);

/* DELETE FOOD || DELETE */
router.delete('/delete/:id', authMiddleware, deleteFoodController);

/* PLACEORDER || DELETE */
router.post('/placeorder', authMiddleware, placeOrderController);

/* ORDER STATUS || POST */
router.post('/orderStatus/:id', authMiddleware, adminMiddleware, orderStatusController);

// Export
module.exports = router