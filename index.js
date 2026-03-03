import express from 'express';
import { MongoClient } from 'mongodb';

//Initialize Express app
const app = express();
const port = 3000;

// MongoDB connection URI 
const url = "mongodb://localhost:27017";
const dbName = "studentDB";

// Connect a new MongoClient
const client = new MongoClient(url);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse JSON 
app.use(express.json());
app.get("/",async (req, res)=>{
    console.log("pong")
    res.send("pong")
})

// Route
app.get('/Data',async (req, res) => {
    console.log("Received request for /Data");
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected correctly to server");
        
        const db = client.db(dbName);
        const collection = db.collection('students');
        
        // Fetch data document
        const data = await collection.find({}).toArray();
        
        //sent data to ejs template
        res.render('index', { students: data });

    }catch (err) {
        console.error(err);
        res.status(500).send({ error: 'An error occurred' });
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});