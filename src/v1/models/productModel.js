const mongoose = require('mongoose')
const schema = mongoose.Schema

const product = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    catagory: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

})