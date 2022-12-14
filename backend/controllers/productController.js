const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');

//create new product => /api/v1/product/new
exports.newProduct = async(req,res,next) => {
    const product = await Product.create(req.body)

    res.status(201).json({
        success : true,
        product
    })
}

//Get all products => /api/v1/products

exports.getProducts = async (req,res, next) => {
    try {
        const products = await Product.find()
    
        res.status(200).json({
            success : true,
            count : products.length,
            products
        })
    } catch (error) {
        res.status(500).json(error.message)
    }    
    
}

//Get single product => /api/v1/product/:id

exports.getSingleProduct = async(req,res,next) => {
    try {
        const product = await Product.findById(req.params.id)
        
        if(product){
            res.status(200).json({
                success : true,
                product
            })

        }else{
            return next(new ErrorHandler('Product not found', 404))

        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//Update product => /api/v1/product/:id

exports.updateProduct = async(req,res,next) => {
    try {
        let product = await Product.findById(req.params.id)
        
        if(!product){
            res.status(404).json({
                success : false,
                message : 'Product not found'
            })
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            success : true,
            product
        })
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

//Delete product => /api/v1/admin/product/:id

exports.deleteProduct = async(req,res,next) => {
    try {
        let product = await Product.findById(req.params.id)
        
        if(!product){
            res.status(404).json({message : "Product not found"})
        }
        await Product.deleteOne(product)
        res.status(200).json({success : true,
            message: "Product deleted"
        })
    }
    catch (error) {
        res.status(500).json(error)
    }
}