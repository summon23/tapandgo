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

exports.registerMethod = (app) => {
    const methodName = [
        {
            uri: '/user',
            path: 'user'
        },
        {
            uri: '/feed',
            path: 'feed'
        },
        {
            uri: '/tournament',
            path: 'tournament'
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
        const dirname = path.join(__dirname, './',method.path);
        const allMethod = routes.genRoute(path.join(__dirname, './',method.path));
        app.use(method.uri, (req, res, next) => {
            console.log("REQUEST FROM:" + req);
            next();
        }, allMethod);
    }
};

module.exports = exports;
