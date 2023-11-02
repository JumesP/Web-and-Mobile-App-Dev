const express = require("express");
const shopRouter = express.Router();

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

shopRouter.route("/")
    .get((req, res) => {
        res.render("store", {
            nav: [
                {link: "/shop", title: "Shop"},
                {link: "/checkout", title: "Checkout"},
            ],
            title: "Blog List",
            blogs
        });
    });

module.exports = shopRouter;