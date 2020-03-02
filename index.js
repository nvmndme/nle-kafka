const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const cors = require('cors');

// create express app
const app = express();

app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// Require Notes routes
require('./route.js')(app);

// define a simple route
app.get('/', (req, res) => {
    res.json({
        "message": "DOCUMENTATION PAGE"
    });
});

// listen for requests
app.listen(config.port, () => {
    console.log("Server is listening on port 3000");
});