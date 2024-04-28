const express = require("express");
const fileUpload = require('express-fileupload')
const chalk = require("chalk");
const path = require("path");
const debug = require("debug")("app");
const morgan = require("morgan");
const mongoose = require("mongoose")
const dburi = require("./src/v1/config/dburi.json")
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 3001;
app.use(morgan("tiny"));

app.use(express.static(__dirname + '/public'));
app.set("views", "./src/v1/views");
app.set("view engine", "ejs");



app.use(fileUpload());
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/jquery/dist")));

const shopRouter = require("./src/v1/routes/shopRoutes")
const productsRouter = require("./src/v1/routes/products")
app.use("/shop", shopRouter);
app.use("/api", productsRouter)

app.get("/", function (req, res) {
    res.render("landing",
        {
            nav: [
                { link: "/shop", title: "Store" },
                { link: "/checkout", title: "Checkout" },
            ],
            title: "My Online Store"
        })
});

mongoose.set('strictQuery', false);
mongoose
    .connect(dburi["dburi"])
    .then(run => {
        // run node
        app.listen(port, function () {
            debug(`Listening on port ${chalk.green(port)}`);
        })
    })
    .catch(e => {
        console.error(e)
    })


