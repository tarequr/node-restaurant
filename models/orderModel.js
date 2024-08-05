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
    },
    status: {
        type: String,
        enum: ["preparing","prepare","on the way","delivered"],
        default: "preparing"
    }
},{timestamps: true});

// Export
module.exports = mongoose.model('Order', orderSchema);