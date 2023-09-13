const jwt = require("jsonwebtoken");
const generateToken = require("../config/generateToken");

const protect = async (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        const user_id = await jwt.verify(token, 'secretkey')
        req.user_id = user_id;
        next()
    } else {
        res.send('no token')
    }

}