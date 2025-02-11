const express = require('express')
const productController = require('../controllers/productsController')
const router = express.Router()

router.get('/products', productController.getAllProducts)
router.post('/products', productController.createProducts)
router.get('/products/:id', productController.getProduct)
router.delete('/products', productController.deleteProduct)

module.exports = router