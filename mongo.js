const {mongoClient, MongoClient} = require("mongodb");

async function main() {
    const uri = "mongodb+srv://jamesgprice08:qu79lVqZ5F5BFtYD@cluster0.bt81lau.mongodb.net/?retryWrites=true&w=majority"

    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client)
        await createListing(client, {
            name: "Lovely loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 2
        })

    } catch (error) {
        console.error(error);
    }   finally {
        await client.close();
    }
}

main().catch(console.error)

//create new airbnb listing
async function createListing(client, newListing){
    const result =  await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);

    // if i dont provide a _id, it creates one
    console.log(`new listing created with the following id: ${result.insertedId}`);
}



//read db headers
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`)
    })
}