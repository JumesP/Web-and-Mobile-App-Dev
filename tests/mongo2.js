const {mongoClient, MongoClient} = require("mongodb");

async function main() {
    const uri = "mongodb+srv://jamesgprice08:qu79lVqZ5F5BFtYD@cluster0.bt81lau.mongodb.net/?retryWrites=true&w=majority"

    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client)
    } catch (e) {
        console.error(e);
    }   finally {
        await client.close();
    }
}

main().catch(console.error)

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`)
    })
}