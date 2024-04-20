const mongoose = require("mongoose")
const express = require("express")

const server = express()


mongoose.connect(process.env.DATABASE_URL,
    () => {
        console.log("connected")
    },
    e => console.error(e)
)

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log("connected to db"))


server.use(express.json)

const productsRouter = require ("./routes/products")
server.use('/products', productsRouter)

server.listen(3000, () => console.log("server started"))