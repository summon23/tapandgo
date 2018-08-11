'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const ResponseHandler = require('./response_handler');

// Read Directory and Register the Method
exports.genRoute = function (dirName){
    const files = fs.readdirSync(
                    path.join(dirName))
                        .filter((file) => {
                            return (file.indexOf('.') !== 0) && (path.extname(file) === '.js') && (file !== 'index.js');
                        });
    for(let i=0; i < files.length; i++) {
        const method = require(path.join(dirName, files[i]));
        const MIDDLEWARE = method.MIDDLEWARE || function(req, res, next){ next(); };   
        const func = Promise.coroutine(
            function* (request, response) {
                const result = yield method.MAINFUNCTION(request, ResponseHandler);
                response.status(result.status).json(result.data);
            }
        );

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

    return router;
}

module.exports = exports;
