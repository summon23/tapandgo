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

app.use(function(req, res, next){
    console.log("[page not found]");
    res.status(404);
    res.send({ error: 'Not found' });

    // respond with html page
    // if (req.accepts('html')) {
    //     res.render('404', { url: req.url });
    //     return;
    // }

    // respond with json
    // if (req.accepts('json')) {
    //     res.send({ error: 'Not found' });
    //     return;
    // }

    // default to plain-text. send()
    // res.type('txt').send('Not found');
});

app.listen(PORT, () => {
   console.log(`running on ${PORT}`);
});
