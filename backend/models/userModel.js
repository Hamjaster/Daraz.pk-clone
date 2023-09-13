const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    pic: String,
})

const userModal = mongoose.model('User', userSchema)

module.exports = userModal