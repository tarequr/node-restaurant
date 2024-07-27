const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

/* REGISTER CONTROLLER */
const registerController = async(req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        /** Validation **/
        if (!name || !email || !password || !phone || !address) {
            return res.status(500).send({ 
                success: false,
                message: 'Please provide all required information'
            });
        }

        /** Check User **/
        const existing = await userModel.findOne({email});
        if (existing) {
            return res.status(500).send({ 
                success: false,
                message: 'Email already exists'
            });
        }

        /** Hashing password **/
        let salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        /** Create new user **/
        const user = await userModel.create({ name, email, password: hashedPassword, phone, address });
        res.status(201).send({
            success: true,
            message: 'User created successfully',
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error in Register API: ${error.message}`,
            error
        });
    }
}


/* LOGIN CONTROLLER */
const loginController = async(req, res) => {
    try {
        const { email, password } = req.body;

        /** Validation **/
        if (!email || !password) {
            return res.status(500).send({ 
                success: false,
                message: 'Please provide email or password'
            });
        }

        /** Check User **/
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(404).send({ 
                success: false,
                message: 'User Not Found'
            });
        }

        /** Check User Password | Compare Password  **/
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).send({ 
                success: false,
                message: 'Invalid Credentials'
            });
        }

        user.password = undefined;

        /** Token **/
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success: true,
            message: 'User login successfully',
            token,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error in Login API: ${error.message}`,
            error
        });
    }
}


module.exports = { registerController, loginController }