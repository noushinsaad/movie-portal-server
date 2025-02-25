const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;



// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gmmth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.gmmth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
        // await client.connect();

        const movieCollection = client.db("moviesDB").collection("movies");

        app.get('/movies', async (req, res) => {
            const cursor = movieCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/movies/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await movieCollection.findOne(query);
            res.send(result);
        })

        app.put('/movies/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedMovie = req.body;

            const movie = {
                $set: {
                    posterURL: updatedMovie.posterURL,
                    title: updatedMovie.title,
                    genre: updatedMovie.genre,
                    duration: updatedMovie.duration,
                    releasingYear: updatedMovie.releasingYear,
                    rating: updatedMovie.ratings,
                    summary: updatedMovie.summary,
                    updaterName: updatedMovie.updaterName
                }
            }

            const result = await movieCollection.updateOne(query, movie, options);
            res.send(result)
        })

        app.post('/movies', async (req, res) => {
            const newMovie = req.body;
            console.log(newMovie);
            const result = await movieCollection.insertOne(newMovie);
            res.send(result);
        })


        app.patch('/movies/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const { likedBy } = req.body;

            const updatedMovie = {
                $set: {
                    likedBy
                }
            }

            const result = await movieCollection.updateOne(query, updatedMovie);
            res.send(result)
        })

        app.patch('/movies/:id/unlike', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const { email } = req.body;

            const updatedMovie = {
                $pull: {
                    likedBy: email
                }
            }

            const result = await movieCollection.updateOne(query, updatedMovie);
            res.send(result)
        })


        app.delete('/movies/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await movieCollection.deleteOne(query);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Movie Portal Server is running")
})

app.listen(port, () => {
    console.log(`System server is running on PORT :${port}`)
})