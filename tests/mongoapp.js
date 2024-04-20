const dburi = require("./src/v1/config/dburi.json")

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