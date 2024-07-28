const express = require('express');
const { getUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

//routes

/* GET USERS || GET */
router.get('/getUser', authMiddleware, getUserController);



// Export
module.exports = router