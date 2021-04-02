const express = require('express')
const app = express()
const port = 5000
const password = 'iXYS6zJhx$8PUCp'

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@raufuprezensinc.hztjo.mongodb.net/burjAlArab?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("burjAlArab").collection("bookings");
    console.log("Database Connected Successfully!")
    client.close();
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port)