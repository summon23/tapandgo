'use strict';

exports.parseDataObject = object => JSON.parse(JSON.stringify(object));

exports.offsetPagination = (page, limit) => {
    const newPage = page ? parseInt(page) : 1;
    const newLimit = parseInt(limit);
    return ((newPage - 1) * newLimit);
};

exports.lowerTrim = function (string) {
    return string.toLowerCase().trim();
};

exports.generateRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = exports;
