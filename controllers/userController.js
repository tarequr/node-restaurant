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

/* UPDATE PASSWORD CONTROLLER */
const updatePasswordController = async(req, res) => {
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

        /* Get data from user */
        const { oldPassword, newPassword } = req.body;
        
        if (!oldPassword || !newPassword) {
            return res.status(500).send({ 
                success: false,
                message: 'Please provide old password or new password'
            });
        }

        /** Check User Password | Compare Old Password  **/
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(500).send({ 
                success: false,
                message: 'Invalid Old Password'
            });
        }

        /** Hashing password **/
        let salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();

        res.status(200).send({
            success: true,
            message: 'User password update successfully',
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Password Update API: ${error.message}`,
            error
        });
    }
}

/* RESET PASSWORD CONTROLLER */
const resetPasswordController = async(req, res) => {
    try {
        /* Get data from user */
        const { email, newPassword, answer } = req.body;
    
        if (!email || !newPassword || !answer) {
            return res.status(500).send({ 
                success: false,
                message: 'Please provide all required information'
            });
        }

        const user = await userModel.findOne({ email, answer});
        if (!user) {
            return res.status(500).send({ 
                success: false,
                message: 'User not found or invalid answer'
            });
        }

        /** Hashing password **/
        let salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        await user.save();
        res.status(200).send({
            success: true,
            message: 'Password reset successfully',
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error In Password Reset API: ${error.message}`,
            error
        });
    }
}

/* DELETE CONTROLLER */
const deleteUserController = async(req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success: true,
            message: 'Your account has been deleted successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error Delete Profile API: ${error.message}`,
            error
        });
    }
}

module.exports = { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteUserController }