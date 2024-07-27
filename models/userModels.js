const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'The name field is required.']
    },
    email: {
        type: String,
        required: [true, 'The email field is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password field is required']
    },
    address: {
        type: Array,
    },
    phone: {
        type: String,
        required: [true, 'The phone field is required']
    },
    userType: {
        type: String,
        required: [true, 'The user type field is required'],
        default: 'client',
        enum: ['admin', 'client', 'vendor', 'driver']
    },
    profile: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png'
    }
},{timestamps: true});

// Export
module.exports = mongoose.model('User', userSchema);