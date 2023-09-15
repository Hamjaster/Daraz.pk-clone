const jwt = require('jsonwebtoken')
const userModal = require('../models/userModel')

const protect = async (req, res, next) => {

    if (req.headers.authorization) {
        // console.log('headers -->', req.headers);
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.send("No token", token)
        }
        const user = await jwt.verify(token, 'secretKey')
        const full_user = await userModal.findById(user)
        console.log(full_user, 'user got from authmiddle');
        req.user = full_user;

        next()
    } else {
        res.send('No token')
    }
}

module.exports = protect;