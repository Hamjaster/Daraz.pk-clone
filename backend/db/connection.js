const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL)

        console.log('MongoDB connected', connection.connection.host);

    } catch (error) {
        console.log('MongoDB not connected', error);
    }
}




module.exports = connectDB;