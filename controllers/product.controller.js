import Product from '../models/product.model.js'
import mongoose from 'mongoose'

export const getProducts = async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({sucess : true, data: products})
    } catch (error) {
        res.status(404).json({sucess: false, message: "Not found"})
    }
}

export const postProducts = async(req, res) => {
    const product = req.body // user data
    
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success : false, message: "Please provide all fields"})
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save()
        return res.status(201).json({success : true, data: newProduct})
    } catch(error) {
        console.error("Error in create product: ", error.message)
        res.status(500).json({success: false, message:"Server Error"})
    }
}

export const updateProducts = async(req, res) => {
    const {id} = req.params

    const product = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success : false, message: "Product not found"})
    }

    try {
        const updated = await Product.findByIdAndUpdate(id, product, {new : true})
        res.status(200).json({success : true, data : updated})
    } catch (error) {
        res.status(500).json({success : false, message: "Server error"})
    }
}

export const deleteProducts = async(req, res) => {
    const {id} = req.params

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success : true, message: "Product deleted"})
    } catch (error) {
        res.status(404).json({sucess: false, message: "Product not found"})
    }
}