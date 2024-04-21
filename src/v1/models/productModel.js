const mongoose = require('mongoose')
const Schema = mongoose.Schema

const product = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('product', product)


// {
//     name: "Apple",
//     price: 0.99,
//     category: "Fruit",
//     description: "A sweet fruit"
// }

    // "start": "DEBUG=app nodemon app.js"