const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@doctorportal.haegp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    const serviceCollection = client.db("doctor_portal").collection("services");

    // query for movies that have a runtime less than 15 minutes

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = await serviceCollection.find(query);
      const result = await cursor.toArray()
      res.send(result);
    });

    // replace console.dir with your callback to access individual elements

  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Doctor is coming");
});

app.listen(port, () => {
  console.log(`Doctor Portal is server listening on port ${port}`);
});
