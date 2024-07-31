const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController } = require('../controllers/restaurantController');

const router = express.Router();

//routes

/* CREATE RESTURANT || POST */
router.post('/create', authMiddleware, createResturantController);

// Export
module.exports = router