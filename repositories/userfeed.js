'use strict';

const MongoContext = require('../modules/MongoContext');
const COLLECTION = 'userfeed';

exports.findAll = function (wheres, offset = 0, limit = 20, sort = {}) {
    const db = MongoContext.getInstance();
    console.log("[OKOK]", db);
    return db.collection(COLLECTION).find(wheres)
        .skip(offset)
        .limit(parseInt(limit))
        .sort(sort)
        .toArray();
};

module.exports = exports;
