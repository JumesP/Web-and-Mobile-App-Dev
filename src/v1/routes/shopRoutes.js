const express = require("express");
const shopRouter = express.Router();
const dbURL = require("../config/dburi.json")
// const router = require("./products")
// const productController = require('../controllers/productsController')

const blogs = [
    {
        title: "My First Blog",
        subtitle: "This is the first blog that I have written",
        author: "Jon Doe",
        date: "21st October"
    },
    {
        title: "My Second Blog",
        subtitle: "This is the second blog that I have written",
        author: "Jon Doe",
        date: "22st October"
    },
    {
        title: "My Third Blog",
        subtitle: "This is the third blog that I have written",
        author: "Jon Doe",
        date: "23st October"
    },
]




// const products = router.get('/products', productController.getAllProducts)

// console.log(products)

shopRouter.route("/")
    .get(async function (req, res) {
        try {
            const promise = fetch("http://localhost:3001" + "/api/products").then((response) => {
                return response.json().then((data) => {
                    console.log(data.products[0].name)
                    res.render("store", {
                        nav: [
                            { link: "/shop", title: "Shop" },
                            { link: "/checkout", title: "Checkout" },
                        ],
                        title: "Blog List",
                        data
                    });
                })
            })
        } catch (e) { console.log(e) }
    });

shopRouter.route("/additem")
    .get((req, res) => {
        res.render("new_product")
    })



module.exports = shopRouter;