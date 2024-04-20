const express = require("express");
const chalk = require("Chalk");
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

app.use(express.static(path.join(__dirname, "/public")));
app.use("/css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/jquery/dist")));

const shopRouter = require("./src/v1/routes/shopRoutes")
app.use("/shop", shopRouter);

console.log(process.env.DATABASE_URL)

app.get("/", function (req, res) {
    res.render("homepage",
        {
            nav: [
                { link: "/store", title: "Store" },
                { link: "/checkout", title: "Checkout" },
            ],
            title: "My Online Store"
        })
});

// run node
app.listen(port, function () {
    debug(`Listening on port ${chalk.green(port)}`);
});