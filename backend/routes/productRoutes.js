const express = require('express')
const { createProduct, getAllProducts, updateProduct, delProduct, getProduct } = require('../controllers/productController')
const protect = require('../middlewares/authMiddleware')


const router = express.Router()

router.route('/').get(getAllProducts)
router.route('/create').post(createProduct)
router.route('/:id').put(updateProduct).delete(delProduct).get(getProduct)

module.exports = router;
