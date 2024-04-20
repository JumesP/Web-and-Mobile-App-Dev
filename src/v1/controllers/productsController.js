const mongoose = require('mongoose');
const model = require('../models/productModel')

exports.getAllProducts = (req, res, next) => {
    Product.find().then(foundProducts => {
        res.json({
            message: "All items",
            items: foundProducts
        })
    })
}