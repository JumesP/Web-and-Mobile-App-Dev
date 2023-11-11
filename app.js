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
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public")));
app.use("/css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/jquery/dist")));

const shopRouter = require("./src/v1/routes/shopRoutes")
app.use("/shop", shopRouter);


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

// Mongodb connection
async function main() {
    const uri = dburi.dburi

    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client)
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error)

// mongodb read listing
// async function readListing(client{
//     _id = 1
// } = {}) {
//     const cursor = client.db("webstore").collection("Keyboards").find({
//
//     })
// }

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`)
    })
}

// run node
app.listen(port, function () {
    debug(`Listening on port ${chalk.green(port)}`);
});