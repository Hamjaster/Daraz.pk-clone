const Order = require('../models/orderModal')

// creating an order
exports.createOrder = async (req, res) => {
    const { shippingInfo,
        orderDetails,
        orderedAt,
        shippingPrice,
        totalPrice,
        orderStatus,
    } = req.body

    try {
        const order = await Order.create({
            shippingInfo,
            orderDetails,
            orderedAt,
            shippingPrice,
            totalPrice,
            orderStatus,
            user: req.user._id
        })
        res.send({
            success: true,
            order
        })
    } catch (error) {
        res.send({
            success: false,
            error
        })

    }
}

// getting order
exports.getSingleOrder = async (req, res) => {
    const Id = req.params.id
    try {
        const order = await Order.findById(Id)
        res.send({
            success: true,
            order
        })
    } catch (error) {
        res.send({
            success: false,
            error
        })

    }
}

// getting logined user orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
        res.send({
            success: true,
            orders
        })
    } catch (error) {
        res.send({
            success: false,
            error
        })

    }
}