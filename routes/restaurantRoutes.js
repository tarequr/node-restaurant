const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController } = require('../controllers/restaurantController');

const router = express.Router();

//routes

/* CREATE RESTAURANT || POST */
router.post('/create', authMiddleware, createRestaurantController);

/* GET ALL RESTAURANTS || GET */
router.get('/getAll', getAllRestaurantController);

/* GET ALL RESTAURANT BY ID || GET */
router.get('/get/:id', getRestaurantByIdController);

/* DELETE RESTAURANT || GET */
router.get('/delete/:id', authMiddleware, deleteRestaurantController);

// Export
module.exports = router