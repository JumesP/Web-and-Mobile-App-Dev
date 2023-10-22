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

app.get("/", function(req, res){
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

// mongo db stuff
const uri = "mongodb+srv://<username>:<password>@cluster0.bt81lau.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
