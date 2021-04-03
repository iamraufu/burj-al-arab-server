const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const port = 5000

var serviceAccount = require("./burj-al-arab-raufu-firebase-adminsdk-cwafk-ea88430cac.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

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

    app.get('/bookings', (req, res) => {
        const bearer = req.headers.authorization

        if (bearer && bearer.startsWith('Bearer ')) {
            const idToken = bearer.split(' ')[1];

            console.log({ idToken })

            admin.auth().verifyIdToken(idToken)
                .then((decodedToken) => {

                    const tokenEmail = decodedToken.email;

                    const queryEmail = req.query.email;

                    if (tokenEmail === queryEmail) {

                        bookings.find({ email: queryEmail })
                            .toArray((error, documents) => {
                                res.status(200).send(documents)
                            })
                    } else {
                        res.status(401).send('Unauthorized Access!')
                    }
                })
                .catch((error) => {
                    res.status(401).send('Unauthorized Access!')
                });
        } else {
            res.status(401).send('Unauthorized Access!')
        }
    })
});

app.listen(port)