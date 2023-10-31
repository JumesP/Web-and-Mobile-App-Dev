const express = require("express");
const chalk = require("Chalk");
const path = require("path");
const debug = require("debug")("app");
const morgan = require("morgan");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 3001;
app.use(morgan("tiny"));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public")));
app.use("/css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/jquery/dist")));

const blogRouter = require("./src/routes/blogRoutes")
app.use("/posts", blogRouter);

app.get("/", function(req, res) {
    res.render("index",
        {
            nav: [
                {link: "/posts", title: "Posts"},
                {link: "/about", title: "About"},
            ],
            title: "My Blog Project"
        })
});

app.listen(port, function (){
    debug(`Listening on port ${chalk.green(port)}`);
});