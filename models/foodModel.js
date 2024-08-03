const mongoose = require('mongoose');

//Schema
const foodSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'The title field is required.']
    },
    description:{
        type: String,
        required: [true, 'The description field is required.']
    },
    price:{
        type: String,
        required: [true, 'The price field is required.']
    },
    imageUrl:{
        type: String,
        default: 'https://static.vecteezy.com/system/resources/thumbnails/010/816/005/small/food-restaurant-logo-design-template-vector.jpg'
    },
    foodTags: {
        type: String,
    },
    category: {
        type: String,
    },
    code: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: String
    }
},{timestamps: true});

// Export
module.exports = mongoose.model('Category', foodSchema);