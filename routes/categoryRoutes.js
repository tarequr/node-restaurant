const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/* CREATE CATEGORY || POST */
router. post('/create', authMiddleware, createCategoryController);

// Export
module.exports = router