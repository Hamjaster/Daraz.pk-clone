const jwt = require('jsonwebtoken')
const userModal = require('../models/userModel')

const protect = async (req, res, next) => {

    if (req.headers.authorization) {
        // console.log('headers -->', req.headers);
        const token = req.headers.authorization.split(' ')[1]
        // console.log("token --> ", token);
        const user = await jwt.verify(token, 'secretKey')
        // console.log(user, 'user got from authmiddle');
        const full_user = await userModal.findById(user)
        req.user = full_user;

        next()
    } else {
        res.send('No token')
    }
}

module.exports = protect;