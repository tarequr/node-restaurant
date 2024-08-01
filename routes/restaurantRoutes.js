const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createRestaurantController, getAllRestaurantController, getRestaurantByIdController } = require('../controllers/restaurantController');

const router = express.Router();

//routes

/* CREATE RESTAURANT || POST */
router.post('/create', authMiddleware, createRestaurantController);

/* GET ALL RESTAURANTS || GET */
router.get('/getAll', authMiddleware, getAllRestaurantController);

/* GET ALL RESTAURANT BY ID || GET */
router.get('/get/:id', authMiddleware, getRestaurantByIdController);

// Export
module.exports = router