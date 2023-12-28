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
        });
        await findOneListingByName(client, "Lovely loft");
        await findListingWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
            minimumNumberOfBedrooms: 4,
            minimumNumberOfBathrooms: 2,
            maximumNumberOfResults: 5
        });

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

// read listings
async function findListingWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}){

    const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find({
        bedrooms: {$gte: minimumNumberOfBedrooms},
        bathrooms: {$gte: minimumNumberOfBathrooms}, // for functions on mongodbs docs
    }).sort({ last_review: -1 })
        .limit(maximumNumberOfResults);
    const results = await cursor.toArray();

    if (results.length > 0) {
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms: `)
        results.forEach((result, i) => {
            let date = new Date(result.last_review).toDateString();
            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   bedrooms: ${result.bedrooms}`);
            console.log(`   bathrooms: ${result.bathrooms}`);
            console.log(`   most recent review date: ${new Date(result.last_review)}`);

        })
    }
}

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({
        name: nameOfListing
    })

    if (result) {
        console.log(`found a listing in the collection with the name "${nameOfListing}"`)
        console.log(result)
    } else {
        console.log(`No listings found with that name`)
    }
}



//read db headers
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`)
    })
}