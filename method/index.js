'use strict';

/*
    Not ready to implement
 */

const DB = require('../modules/Database');
const Mongo = require('../modules/MongoContext');
const path = require('path');

// Initialize The ORM
DB.getContext();
Mongo.getContext();

exports.registerMethod = function(app) {
    const methodName = [
        {
            uri: '/user',
            path: 'user'
        },
        {
            uri: '/product',
            path: 'product'
        }
    ];

    /*** To Register new Method use this pattern
    {
        uri: '/new url slug',
        path: 'directory name for the folder'
    }
    ***/

    for (let i=0; i < methodName.length;i++) {
        const method = methodName[i];
        app.use(method.uri, require(path.join(__dirname, './',method.path)));
    }
};


module.exports = exports;
