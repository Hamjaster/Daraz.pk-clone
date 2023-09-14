const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {
    console.log('connecting to database', process.env);
    try {

        const connection = await mongoose.connect(process.env.MONGODB_URL)
        // const connection = await mongoose.connect('mongodb+srv://hamzashahdev:ecommerce@ecommerce.3jgrotg.mongodb.net/?retryWrites=true&w=majority')
        console.log('MongoDB connected', connection.connection.host);

    } catch (error) {
        console.log('MongoDB not connected', error);
    }
}




module.exports = connectDB;