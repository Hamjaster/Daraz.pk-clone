const express = require('express')
const protect = require('../middlewares/authMiddleware');
const { createOrder, getOrders, getSingleOrder } = require('../controllers/orderController');


const router = express.Router()


router.route('/new').post(protect, createOrder)
router.route('/find/:id').get(protect, getSingleOrder)
router.route('/myorders').get(protect, getOrders)

module.exports = router;