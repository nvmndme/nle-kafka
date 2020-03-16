const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config.js');
const cors = require('cors');

const app = express();

app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse requests of content-type - application/json
app.use(bodyParser.json());

require('./router/route.js')(app);

app.get('/', (req, res) => {
    res.json({
        "message": "DOCUMENTATION PAGE"
    });
});

app.listen(config.port, () => {
    console.log("Server is listening on port 3000");
});