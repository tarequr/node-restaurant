const express = require('express');
const { getUserController, updateUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

//routes

/* GET USERS || GET */
router.get('/getUser', authMiddleware, getUserController);

/* UPDATE PROFILE || PUT */
router.put('/udateUser', authMiddleware, updateUserController);

// Export
module.exports = router