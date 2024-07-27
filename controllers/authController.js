const userModel = require("../models/userModel");

//REGISTER
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


module.exports = { registerController }