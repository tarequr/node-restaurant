const mongoose = require('mongoose');

//Schema
const categorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'The title field is required.']
    },
    imageUrl: {
        type: String,
        default: 'https://static.vecteezy.com/system/resources/thumbnails/010/816/005/small/food-restaurant-logo-design-template-vector.jpg'
    }
},{timestamps: true});

// Export
module.exports = mongoose.model('Category', categorySchema);