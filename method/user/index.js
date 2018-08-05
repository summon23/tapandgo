'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const ResponseHandler = require('../../utils/response_handler');

router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

// Read Directory and Register the Method
const files = fs.readdirSync(
                path.join(__dirname))
                    .filter((file) => {
                        return (file.indexOf('.') !== 0) && (path.extname(file) === '.js') && (file !== 'index.js');
                    });

for(let i=0; i < files.length; i++) {
    const method = require(path.join(__dirname, files[i]));
    const MIDDLEWARE = method.MIDDLEWARE || function(req, res, next) { next(); };   

    const func = Promise.coroutine(
        function* (request, response) {
        const result = yield method.MAINFUNCTION(request, ResponseHandler);
        response.status(result.status).json(result.data);
    });

    switch (method.METHODTYPE) {
        case 'GET':
            router.get(method.ENDPOINT, MIDDLEWARE, func);
            break;
        case 'POST':
            router.post(method.ENDPOINT, MIDDLEWARE, func);
            break;
        case 'PUT':
            router.put(method.ENDPOINT, MIDDLEWARE, func);
            break;
        case 'DELETE':
            router.delete(method.ENDPOINT, MIDDLEWARE, func);
            break;
        default:
            break;
    }
}

module.exports = router;
