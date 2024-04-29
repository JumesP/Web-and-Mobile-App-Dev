const Product = require('../models/productModel')
const mongoose = require('mongoose');
const path = require('path')
const fs = require('fs')

exports.createProducts = (req, res, next) => {

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

            const filePath = path.join(__dirname, `../../../public/img/${productSaved._id}.png`)

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

exports.getProduct = (req, res, next) => {
    const validIDBool = mongoose.Types.ObjectId.isValid(req.params.id)

    if (validIDBool) {
        Product.findById(req.params.id).then(foundProduct => {
            res.json({
                message: "Product found",
                product: foundProduct
            })
        })
    } else {
        return res.status(404).send({ message: "Couldnt find product" })
    }
}

exports.deleteProduct = (req, res, next) => {

    filePath = path.join(__dirname, `../../../public/img/${req.body.id}.png`)

    Product.findByIdAndDelete(req.body.id).then(deletedProduct => {
        res.json({
            message: "Deleted product!",
            product: deletedProduct
        })
        fs.rmSync(filePath, {
            force: true
        })
    })

}