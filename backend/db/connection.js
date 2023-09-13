const mongoose = require('mongoose')


const connectDB = async () => {
    console.log('connecting to database');
    try {

        const connection = await mongoose.connect('mongodb://127.0.0.1:27017/EcommerceStore')
        // const connection = await mongoose.connect('mongodb+srv://hamzashahdev:ecommerce@ecommerce.3jgrotg.mongodb.net/?retryWrites=true&w=majority')
        console.log('MongoDB connected', connection.connection.host);

    } catch (error) {
        console.log('MongoDB not connected', error);
    }
}




module.exports = connectDB;