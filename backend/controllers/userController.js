const userModal = require("../models/userModel")
const generateToken = require('../config/generateToken')

// Registering a user
const registerUser = async (req, res) => {
    const { name, email, password, pic } = req.body
    const user = await userModal.create({
        name,
        email,
        password,
        pic
    })
    console.log(user.id, await generateToken(user.id));

    res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        pic: user.password,
        token: await generateToken(user.id)
    })
}
// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await userModal.findOne({ email })
    if (user.password === password) {

        res.json(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: await generateToken(user.id)
            }
        )

    } else {
        res.send('Invalid password')
    }
}
// Updating user password
const upateUserPassword = async (req, res) => {



    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword


    if (oldPassword != req.user.password) {
        res.send('Wrong Password')
    } else {
        try {
            const newUser = await userModal.findByIdAndUpdate(req.user_id, {
                password: newPassword
            }, { new: true })
            newUser.save()
            res.send({
                success: true,
                newUser
            })

        } catch (error) {
            res.send(error)
        }
    }

}
// Updating user name and email
const updateUserProfile = async (req, res) => {

    const userData = req.body

    try {
        const data = await userModal.findByIdAndUpdate(req.user._id, userData, { new: true })
        res.send(data)

    } catch (error) {
        res.send(error)
    }

}


module.exports = { registerUser, loginUser, upateUserPassword, updateUserProfile }

