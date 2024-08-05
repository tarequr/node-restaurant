const mongoose = require('mongoose');

//Schema
const orderSchema = new mongoose.Schema({
    foods:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
        }
    ],
    payment: {

    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true});

// Export
module.exports = mongoose.model('Order', orderSchema);