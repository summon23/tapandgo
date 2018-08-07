'use strict';

const Promise = require('bluebird');
const Joi = require('joi');
const mongodb = require('mongodb');

let configuration = null;
let mongoClient = null;

exports.ObjectID = mongodb.ObjectID;

exports.getContext = Promise.coroutine(function* getContext() {
    if (mongoClient) {
        return mongoClient;
    }
    mongoClient = mongodb.MongoClient.connect(process.env.MONGO_CONNECTION_STRING, (err ,db) => {
        if (err) throw 'Failed to connect mongo server';
        mongoClient = db;
    });
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
