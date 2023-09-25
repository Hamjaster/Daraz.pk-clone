const Product = require('../models/productModel')
const { ApiFeautres } = require('../utils/apiFeautures')



// Get all products
const getAllProducts = async (req, res) => {
    let resultPerPage = 100
    const apiFeautres = new ApiFeautres(Product.find(), req.query).search().searchByPrice().searchByCategory().pagination(resultPerPage)

    try {
        const results = await apiFeautres.query;
        res.send(results)

    } catch (error) {
        res.send(error)
    }

}

// Creating a product
const createProduct = async (req, res) => {
    console.log(req.body.Images, 'image array from frontend')
    try {
        const product = await Product.create({
            name: req.body.name,
            desc: req.body.desc,
            stock: req.body.stock,
            price: req.body.price,
            category: req.body.category,
            Images: req.body.Images
        })
        res.send({
            success: true,
            product
        })
    } catch (er) {
        res.send(("error --> ", er))
    }
}

//Updating a product
const updateProduct = async (req, res) => {
    try {
        let product = await Product.findById({ _id: req.params.id })
        if (!product) {
            res.send({
                success: false,
                message: 'No Product found'
            })
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.send({
            success: true,
            product
        })
    } catch (error) {
        res.send(error)
    }
}

//Deleting a product
const delProduct = async (req, res) => {

    const product = await Product.findById(req.params.id)
    console.log(product);
    if (!product) {
        res.send({
            success: false,
            message: 'no product'
        })
    }
    await Product.deleteOne({ _id: req.params.id })
    res.send({
        success: true,
        message: 'product deleted successfully'
    })
}

//Getting single product
const getProduct = async (req, res, next) => {


    let product = await Product.findById(req.params.id)
    // console.log(product, 'product')
    if (!product) {
        res.send({
            success: false,
            message: 'no product'
        })
        // return next(new Error('no product found'))
    }
    res.send({
        success: true,
        product
    })



}

// Adding a review to product
const addReview = async (req, res) => {
    console.log(req.user, 'user')
    const { productId, comment, rating } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        comment,
        rating
    }
    try {
        const product = await Product.findById(productId)

        const isReviewed = product.reviews.filter((rev) => {
            console.log(req.user._id)
            return rev.user.toString() === req.user._id.toString()
        })

        if (!(isReviewed.length === 0)) {

            isReviewed[0].comment = comment
            isReviewed[0].rating = rating

        } else {
            await product.reviews.push(review)
            product.NoOfReviews = product.reviews.length

        }
        let avg = 0;
        product.reviews.forEach(rev => {
            avg += rev.rating
        })
        avg = avg / product.NoOfReviews;
        product.rating = avg;
        product.save()
        res.send(product)
    } catch (err) {
        res.send(err)
    }

}

// Deleting a review
const deleteReview = async (req, res, next) => {
    const { productId, reviewId } = req.body;

    try {
        const product = await Product.findById(productId)

        const reviews = product.reviews.filter((rev) => {
            return rev._id.toString() !== reviewId.toString()
        })

        product.reviews = reviews;
        product.NoOfReviews = product.reviews.length

        let avg = 0;
        product.reviews.forEach(rev => {
            avg += rev.rating
        })
        avg = avg / product.NoOfReviews;
        product.rating = avg;

        product.save()
        res.send({
            success: true,
            product
        })

    } catch (error) {
        res.send({
            success: false,
            error
        })

    }



};

// Getting all reviews of product
const getAllReviews = async (req, res) => {
    const { productId } = req.body
    try {

        const product = await Product.findById(productId)

        res.send({
            success: true,
            reviews: product.reviews,
        })
    } catch (error) {

        res.send({
            success: false,
            error,
        })
    }

}

module.exports = { createProduct, getAllProducts, getProduct, updateProduct, delProduct, addReview, deleteReview, getAllReviews }