const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 5000

const password = 'iXYS6zJhx$8PUCp'

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://alarab:iXYS6zJhx$8PUCp@raufuprezensinc.hztjo.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express()

app.use(cors())
app.use(bodyParser.json())

client.connect(err => {
    const bookings = client.db("burjAlArab").collection("bookings");
    console.log("Database Connected Successfully!")

    app.post('/addBooking', (req, res) => {
        const newBooking = req.body;
        bookings.insertOne(newBooking)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
        console.log(newBooking)
    })
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port)