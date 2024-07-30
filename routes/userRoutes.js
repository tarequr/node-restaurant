const express = require('express');
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteUserController } = require('../controllers/userController');
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

/* DELETE USER || DELETE */
router.delete('/deleteUser/:id', authMiddleware, deleteUserController);

// Export
module.exports = router