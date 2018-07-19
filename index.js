'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;
const cors = require('cors');
const core = require('./method');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(cors({
   origin: 'http://localhost:8080',
   credentials: true
}));

// Register Method
core.registerMethod(app);

app.listen(PORT, () => {
   console.log(`running on ${PORT}`);
});
