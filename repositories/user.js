'use strict';

const DB = require('../modules/Database');


exports.findAll = function (){
    const model = DB.getInstance();
    return new Promise((resolve, reject) => {
        try {
            resolve(model.User.findAll({
                limit: 2
            }));
        } catch(err) {
            reject(err);
        }
    });
};

exports.findOne = (where) => {
    const model = DB.getInstance();
    return model.User.findOne({
       where
    });
};

exports.createOne = (data) => {
    const model = DB.getInstance();
    return model.User.create(data);
}

module.exports = exports;
