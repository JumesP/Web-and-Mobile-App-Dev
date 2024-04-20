const express = require('express')
const productController = require('../controllers/')
const router = express.Router()

router.get('/product', productController.getAllProduct)

module.exports = router