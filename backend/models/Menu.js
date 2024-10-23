const mongoose = require('mongoose')
const menuItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['spicy', 'sour', 'sweet'],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    },
    image: {
        type:String,
        required: true
    }
}, { timeStamps: true });

const menuItem = mongoose.model("menuItem", menuItemSchema);
module.exports = menuItem;