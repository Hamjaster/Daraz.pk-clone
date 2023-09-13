const express = require('express')
const protect = require('../middlewares/authMiddleware')
const { processPayment, sendApiKey } = require('../controllers/paymentController')
const router = express.Router()

router.route('/').post(processPayment)
router.route('/apikey').get(sendApiKey)

module.exports = router