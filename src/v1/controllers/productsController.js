const Product = require('../models/productModel')
const mongoose = require('mongoose');

exports.createProducts = (req, res, next) => {

    console.log(req.body.name)

    const productName = req.body.name
    const productPrice = req.body.price;
    const productCate = req.body.category;
    const productDesc = req.body.description;
    // const productImg = req.files.image;

    const product = new Product({
        name: productName,
        price: productPrice,
        category: productCate,
        description: productDesc
        // image: productImg,
    })

    product
        .save()
        .then(productSaved => {
            res.status(201).json({
                message: "Product successfully added",
                product: productSaved
            })
        })
        .catch(err => console.log("err", err))
}


exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(foundProducts => {
            res.json({
                message: "All items",
                items: foundProducts
            })
        })
}