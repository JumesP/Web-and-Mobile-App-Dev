const express = require('express')
const productController = require('../controllers/productsController')
const router = express.Router()

//  get all products
router.get('/products', productController.getAllProducts)

//  create product
router.post('/products', productController.createProducts)

//  get product by id
router.get('/products/:id', productController.getProduct)

//  delete product
// router.delete('/products', productController.deleteProduct)

module.exports = router