'use strict';
/*
 Use Coroutine here
 */

const DB = require('../modules/Database');
const Promise = require('bluebird');

exports.findAll = function(){
    const model = DB.getInstance();
    return new Promise((resolve, reject) => {
        try {
            resolve(model.Product.findAll({
                limit: 100
            }));
        } catch(err) {
            reject(err);
        }
    });
};

exports.createOne = function(data) {
    const model = DB.getInstance();
    return new Promise((resolve, reject) => {
        try {
            resolve(model.Product.create(data));
        } catch(err) {
            reject(err);
        }
    });
};

exports.update = function(id, data) {
    const model = DB.getInstance();
    return new Promise((resolve, reject) => {
        try {
            resolve(model.Product.update(data, {
                where: {
                    id: parseInt(id)
                }
            }));
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = exports;
