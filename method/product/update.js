'use strict';
const ENDPOINT = '/update';
const METHODTYPE = 'PUT';

const ProductRepo = require('../../repositories/product');
const Promise = require('bluebird');
const { verifyJWTMiddleware } = require('../../middleware/auth');

const updateProduct = Promise.coroutine(function* (req, res, next){
    const { product_name, product_price, qty} = req.body.dataToUpdate;
    const id = req.body.id;
    const dataToUpdate = {
        product_name,
        product_price: Number(product_price),
        qty: Number(qty)
    };

    try {
        yield ProductRepo.update(id, dataToUpdate);
        return {
            status: true,
            message: 'Product Updated'
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
    MAINFUNCTION: updateProduct,
    MIDDLEWARE: verifyJWTMiddleware
};
