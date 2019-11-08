const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/getNotablePlaces/:lat/:lng',
    (req, res) =>{
        const { lat, lng } = req.params;
        const url = `https://api.ebird.org/v2/ref/hotspot/geo?lat=${lat}&lng=${lng}&fmt=json`;
        request(url, {
            headers: {
                'response-type': 'application/json'
            }
        })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
    }
);

app.listen(
    5000,
    () => console.log(`Example app listening on port 5000!`)
);