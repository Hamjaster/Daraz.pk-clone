require('dotenv').config();
const stripe = require('stripe')(process.env.CLIENT_SECRET_KEY)

console.log(process.env.STRIPE_API_KEY)

exports.processPayment = async (req, res) => {
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'inr',
            metadata: {
                company: 'Daraz clone'
            }
        })

        res.send({
            success: true,
            client_secret: myPayment.client_secret
        })

    } catch (err) {
        res.send(err)
    }
}

exports.sendApiKey = async (req, res) => {
    res.send({
        StripeApiKey: process.env.STRIPE_API_KEY
    })
}