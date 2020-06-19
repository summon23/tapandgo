'use strict';


const Joi = require('joi');
const mongodb = require('mongodb');

let configuration = null;
let mongoClient = null;

exports.ObjectID = mongodb.ObjectID;

exports.getContext = async () => {
    if (mongoClient) {
        return mongoClient;
    }
    mongoClient = mongodb.MongoClient.connect(process.env.MONGO_CONNECTION_STRING, (err ,db) => {
        if (err) {
            console.log(err);
            throw 'Failed to connect mongo server'
        };
        mongoClient = db;
    });
    return mongoClient;
};

exports.getInstance = () => mongoClient;

exports.closeContext = async () => {
    if (mongoClient) {
        const result = await mongoClient.close();
        mongoClient = null;
        return result;
    }
    return null;
};

module.exports = exports;
