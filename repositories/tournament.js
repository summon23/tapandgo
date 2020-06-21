'use strict';

const DB = require('../modules/Database');


exports.findAll = function (){
    const model = DB.getInstance();
    return model.Tournament.findAll();
};

exports.findAndCountAll = function (limit, page) {
    const model = DB.getInstance();
    const offset = page == 1 ? 0 : (limit * (page -1)); 
    console.log("OFFSET:" + offset)
    return model.Tournament.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset)
    })
}

exports.findOne = (where) => {
    const model = DB.getInstance();
    return model.Tournament.findOne({
       where
    });
};

exports.createOne = (data) => {
    const model = DB.getInstance();
    return model.Tournament.create(data);
}

exports.update = (data, where) => {
    const model = DB.getInstance();
    return model.Tournament.update( data, { where })
}

module.exports = exports;
