const jwt = require('jsonwebtoken')

const generateToken = async (id) => {
    return await jwt.sign(id, 'secretKey')
}

module.exports = generateToken;