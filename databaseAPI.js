const mongoose = require("mongoose")
const dburi = require("./dburi.json")

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(dburi.dburi)
    console.log("Connected to MongoDB")

    const productSchema = new mongoose.Schema({
        name: String,
        price: Number
    })

    const Product = mongoose.model("Product", productSchema)

    const keyboard = new Product({
        name: "Keyboard",
        price: 100
    })

    console.log(keyboard.name)

    productSchema.methods.logName = function () {
        const name = this.name
        console.log(name)
    }

    const products = await Product.find();
    console.log(products)

    await product.find({ name: /^keyboard/ })
}