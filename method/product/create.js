'use strict';
const ENDPOINT = '/create';
const METHODTYPE = 'POST';

const ProductRepo = require('../../repositories/product');
const Promise = require('bluebird');
const { verifyJWTMiddleware } = require('../../middleware/auth');

const createOneProduct = Promise.coroutine(function* (req, res, next){
    const { product_name, product_price ,qty} = req.body;
    const dataToInsert = {
        product_name,
        product_price,
        qty
    };

    try {
        yield ProductRepo.createOne(dataToInsert);
        return {
            status: true,
            message: 'Product Inserted'
        }
    } catch (err) {
        return {
            data: false,
            message: err
        }
    }
});

const MIDDLEWARE = function(req, res, next) {
    next();
};

module.exports = {
    ENDPOINT,
    METHODTYPE,
    MAINFUNCTION: createOneProduct,
    MIDDLEWARE: verifyJWTMiddleware
};
