const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    shippingInfo: {
        Country: { type: String, default: 'Pakistan' },
        State: String,
        City: String,
    },
    orderDetails: [{
        name: String,
        img: String,
        quantity: String,
        price: Number,
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'product'
        },
    }],
    orderedAt: {
        type: Date,
        default: Date.now()
    },
    shippingPrice: {
        type: String,
        default: 110
    },
    totalPrice: {
        type: String
    },
    orderStatus: {
        type: String, default: 'processing'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }

})

const orderModal = mongoose.model('Order', orderSchema)



module.exports = orderModal