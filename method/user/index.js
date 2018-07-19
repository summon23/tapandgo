'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const Promise = require('bluebird');

router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

// Read Directory and Register the Method
const files = fs.readdirSync(path.join(__dirname)).filter((file) => {
    return (file.indexOf('.') !== 0) && (path.extname(file) === '.js') && (file !== 'index.js');
});

for(let i=0; i < files.length; i++) {
    const method = require(path.join(__dirname, files[i]));

    switch (method.METHODTYPE) {
        case 'GET':
            router.get(method.ENDPOINT, method.MIDDLEWARE, Promise.coroutine(function* (req, res) {
                const response = yield method.MAINFUNCTION(req, res);
                res.status(200).send(response);
            }));
            break;
        case 'POST':
            router.post(method.ENDPOINT, method.MIDDLEWARE, Promise.coroutine(function* (req, res) {
                const response = yield method.MAINFUNCTION(req, res);
                res.status(200).send(response);
            }));
            break;
        case 'PUT':
            router.put(method.ENDPOINT, method.MIDDLEWARE, Promise.coroutine(function* (req, res) {
                const response = yield method.MAINFUNCTION(req, res);
                res.status(200).send(response);
            }));
            break;
        case 'DELETE':
            router.delete(method.ENDPOINT, method.MIDDLEWARE, Promise.coroutine(function* (req, res) {
                const response = yield method.MAINFUNCTION(req, res);
                res.status(200).send(response);
            }));
            break;
        default:
            break;
    }
}

module.exports = router;
