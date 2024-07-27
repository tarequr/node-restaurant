const userModel = require("../models/userModel");

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

        /** Create new user **/
        const user = await userModel.create({ name, email, password, phone, address });
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
        const user = await userModel.findOne({ email: email, password: password });
        if (!user) {
            return res.status(404).send({ 
                success: false,
                message: 'User not found or password is incorrect'
            });
        }

        res.status(200).send({
            success: true,
            message: 'User login successfully',
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