const express = require('express')
const app = express()
const port = 5000
const connectDB = require('./db/connection')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


app.use(cors());
connectDB()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())


// Uncaught exception error handling
process.on('uncaughtException', (err) => {
    console.log("Error :", err.message)
    console.log('Shutting server as uncaught exception error')
    process.exit(1)
})


app.get('/', (req, res) => {
    res.send('Api is running!')
})
app.get('/test', (req, res) => {
    res.send('Api is testing!')
})

app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/review', reviewRoutes)
app.use('/order', orderRoutes)
app.use('/payment', paymentRoutes)


app.listen(port)


// Unhandled Reject error handling
// process.on('unhandledRejection', err => {
//     console.log("Error: ", err.message)
//     console.log('Shutting server as Unhandled Rejection error')
//     server.close(() => {
//         process.exit(1)
//     })
// })