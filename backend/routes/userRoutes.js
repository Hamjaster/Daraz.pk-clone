const express = require('express');
const { registerUser, loginUser, upateUserPassword, updateUserProfile } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/update').post(protect, upateUserPassword)
router.route('/updateProfile').post(protect, updateUserProfile)

module.exports = router;