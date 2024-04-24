const Product = require('../models/productModel')
const mongoose = require('mongoose');
const path = require('path')

exports.createProducts = (req, res, next) => {

    console.log(req.body.name)

    if (!req.body || Object.keys(req.files).length === 0) {
        return res.status(400).send("no files were uploaded")
    }

    const productName = req.body.name
    const productPrice = req.body.price;
    const productCate = req.body.category;
    const productDesc = req.body.description;
    const productImg = req.files.image;

    const product = new Product({
        name: productName,
        price: productPrice,
        category: productCate,
        description: productDesc
    })

    product
        .save()
        .then(productSaved => {

            const filePath = path.join(__dirname, `../../public/img/${productSaved._id}.png`)

            productImg.mv(filePath, err => {
                if (err) return console.log(err);
            })

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
                message: "All products",
                products: foundProducts
            })
        })
}