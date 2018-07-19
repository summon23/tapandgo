'use strict';

const Promise = require('bluebird');
const Joi = require('joi');
const mongodb = require('mongodb');

let configuration = null;
let mongoClient = null;

exports.ObjectID = mongodb.ObjectID;

// exports.configure = (config) => {
//     const configurationSchema = Joi.object().keys({
//         connection_string_key: Joi.string().required()
//     });

//     const validation = Joi.validate(config, configurationSchema);

//     if (validation.error) {
//         throw validation.error;
//     } else {
//         configuration = validation.value;
//     }

//     configuration = config;
// };

exports.getContext = Promise.coroutine(function* getContext() {
    if (mongoClient) {
        // console.log("auto return");
        return mongoClient;
    }
    // console.log(process.env.MONGO_CONNECTION_STRING);
    mongoClient = mongodb.MongoClient.connect(process.env.MONGO_CONNECTION_STRING, (err ,db) => {
        if (err) throw 'Failed to connect mongo server';
        mongoClient = db;

        const b = mongoClient.collection('userfeed').find();
        console.log(b);
    });
    // console.log("BB", mongoClient);
    return mongoClient;
});

exports.getInstance = () => mongoClient;

exports.closeContext = Promise.coroutine(function* closeContext() {
    if (mongoClient) {
        const result = yield mongoClient.close();
        mongoClient = null;
        return result;
    }

    return null;
});

module.exports = exports;
