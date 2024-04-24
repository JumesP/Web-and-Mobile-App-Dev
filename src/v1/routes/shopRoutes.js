const express = require("express");
const router = express.Router();
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

router.route("/")
    .get(async function (req, res) {
        try {
            const promise = fetch(dbURL.webpage + "/api/products").then((response) => {
                return response.json().then((data) => {
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

router.route("/add_product")
    .get((req, res) => {
        res.render("new_product")
    })


router.route("/:id", function (req, res) {
    // .get((req, res) => {
    //     res.render("item_page")
    // })
    try {
        const promise = fetch(dbURL.webpage + "/api/products/" + req.params.id).then((response) => {
            if (response.status === 404) {
                res.status(404).send({ message: "Unable to find product" })
            }
            return response.json().then((data) => {
                res.render("item_page", data)
            })
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;