const express = require('express');
const { testUserController } = require('../controllers/testController');

// Route object
const router = express.Router();


// routes GET | POST | PUT | DELETE
router.get('/test-user', testUserController);

// Export
module.exports = router