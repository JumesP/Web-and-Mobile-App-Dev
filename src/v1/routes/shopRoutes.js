const express = require("express");
const router = express.Router();
const dbURL = require("../config/dburi.json");

router.route("/")
    .get(function (req, res) {
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
        } catch (e) {
            console.log(e)
        }
    });

router.route("/add_product")
    .get((req, res) => {
        res.render("new_product")
    })


router.route("/:id")
    .get(function (req, res) {
        try {
            const promise = fetch(dbURL.webpage + "/api/products/" + req.params.id).then((response) => {
                if (response.status === 404) {
                    res.status(404).send({ message: "Unable to find product" })
                }
                return response.json().then((data) => {
                    console.log(data)
                    res.render("item_page", { data })
                })
            })
        } catch (e) {
            console.log(e)
        }
    })

module.exports = router;