'use strict';

/*
    Not ready to implement
 */

const DB = require('../modules/Database');
const Mongo = require('../modules/MongoContext');
const path = require('path');
const routes = require('../utils/routes');

// Initialize The ORM
DB.getContext();
Mongo.getContext();

exports.registerMethod = function(app) {
    const methodName = [
        {
            uri: '/user',
            path: 'user'
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
        const allMethod = routes.genRoute(path.join(__dirname, './',method.path));
        app.use(method.uri, allMethod);
    }
};

module.exports = exports;
