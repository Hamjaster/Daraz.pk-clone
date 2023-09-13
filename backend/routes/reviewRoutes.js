const express = require('express')
const { addReview, deleteReview, getAllReviews } = require('../controllers/productController')
const protect = require('../middlewares/authMiddleware')


const router = express.Router()


router.route('/add').post(protect, addReview)
router.route('/').delete(deleteReview).get(getAllReviews)


module.exports = router;
