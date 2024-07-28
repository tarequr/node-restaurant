const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

/* GET USER CONTROLLER */
const getUserController = async(req, res) => {
    res.status(200).send("User Data");
}

module.exports = { getUserController }