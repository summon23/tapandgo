'use strict';
const ENDPOINT = '/list';
const METHODTYPE = 'GET';

const ProductRepo = require('../../repositories/product');
const Promise = require('bluebird');
const { verifyJWTMiddleware } = require('../../middleware/auth');

const getProduct = Promise.coroutine(function* (){
    return yield ProductRepo.findAll();
});

const MIDDLEWARE = function(req, res, next) {
    next();
};

module.exports = {
    ENDPOINT,
    METHODTYPE,
    MAINFUNCTION: getProduct,
    MIDDLEWARE: verifyJWTMiddleware
};
