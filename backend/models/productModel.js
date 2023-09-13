const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter the name of product']
    },
    desc: {
        type: String,
        required: [true, 'Enter the description of product']
    },
    price: {
        type: Number,
        required: [true, 'please enter the price']
    },
    rating: {
        type: Number,
        default: 0
    },
    category: {
        type: String
    },
    Images: [
        {
            publicId: String,
            url: String
        }
    ],
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
            name: {
                type: String,
                required: true
            },
            comment: String,
            rating: Number
        }
    ],
    NoOfReviews: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('Product', productSchema)