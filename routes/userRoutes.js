const express = require('express');
const { getUserController, updateUserController, updatePasswordController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

//routes

/* GET USERS || GET */
router.get('/getUser', authMiddleware, getUserController);

/* UPDATE PROFILE || PUT */
router.put('/updateUser', authMiddleware, updateUserController);

/* PASSWORD CHANGE || POST */
router.post('/updatePassword', authMiddleware, updatePasswordController);
// Export
module.exports = router