const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

/* GET USER CONTROLLER */
const getUserController = async(req, res) => {
    try {
        /* Find User */
        const user = await userModel.findById({ _id:req.body.id }, { _id:0 });

        /* Validation */
        if (!user) {
            return res.status(404).send({ 
                success: false,
                message: 'User Not Found'
            });
        }

        /* Hide User Password */
        user.password = undefined;

        /* Response */
        res.status(200).send({
            success: true,
            message: 'User get successfully',
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error in Get User API: ${error.message}`,
            error
        });
    }
}

/* UPDATE USER CONTROLLER */
const updateUserController = async(req, res) => {
    try {
        /* Find User */
        const user = await userModel.findById({ _id:req.body.id });

        /* Validation */
        if (!user) {
            return res.status(404).send({ 
                success: false,
                message: 'User Not Found'
            });
        }

        /* Update */
        const { name, address, phone } = req.body

        if (name) user.name = name;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        await user.save();

        user.password = undefined;
        
        res.status(200).send({
            success: true,
            message: 'User update successfully',
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error in Update User API: ${error.message}`,
            error
        });
    }
}

module.exports = { getUserController, updateUserController }