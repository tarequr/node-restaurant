const express = require('express');
const { getUserController, updateUserController, updatePasswordController, resetPasswordController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

//routes

/* GET USERS || GET */
router.get('/getUser', authMiddleware, getUserController);

/* UPDATE PROFILE || PUT */
router.put('/updateUser', authMiddleware, updateUserController);

/* PASSWORD CHANGE || POST */
router.post('/updatePassword', authMiddleware, updatePasswordController);

/* RESET PASSWORD || POST */
router.post('/resetPassword', authMiddleware, resetPasswordController);

// Export
module.exports = router