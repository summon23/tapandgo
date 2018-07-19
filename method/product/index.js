'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const Promise = require('bluebird');

// Read Directory and Register the Method
const files = fs.readdirSync(path.join(__dirname)).filter((file) => {
    return (file.indexOf('.') !== 0) && (path.extname(file) === '.js') && (file !== 'index.js');
});

for(let i=0; i < files.length; i++) {
    const method = require(path.join(__dirname, files[i]));

    switch (method.METHODTYPE) {
        case 'GET':
            router.get(method.ENDPOINT, method.MIDDLEWARE, Promise.coroutine(function* (req, res) {
                const response = yield method.MAINFUNCTION(req, res);
                res.status(200).send(response);
            }));
            break;
        case 'POST':
            router.post(method.ENDPOINT, method.MIDDLEWARE, Promise.coroutine(function* (req, res) {
                const response = yield method.MAINFUNCTION(req, res);
                res.status(200).send(response);
            }));
            break;
        case 'PUT':
            router.put(method.ENDPOINT, method.MIDDLEWARE, Promise.coroutine(function* (req, res) {
                const response = yield method.MAINFUNCTION(req, res);
                res.status(200).send(response);
            }));
            break;
        case 'DELETE':
            router.delete(method.ENDPOINT, method.MIDDLEWARE, Promise.coroutine(function* (req, res) {
                const response = yield method.MAINFUNCTION(req, res);
                res.status(200).send(response);
            }));
            break;
        default:
            break;
    }
}

//
// router.get('/list', Promise.coroutine(function* (req, res) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//
//     try {
//         const response = yield productList.getProduct();
//         res.status(200).send(response);
//     }catch (err) {
//         res.status(400).send(err);
//     }
// }));
//
// router.post('/create', Promise.coroutine(function* (req, res) {
//     const { product_name, product_price ,qty} = req.body;
//     const dataToInsert = {
//         product_name,
//         product_price,
//         qty
//     };
//
//     try {
//         const response = yield productCreate.createOneProduct(dataToInsert);
//         res.status(200).send(response);
//     }catch (err) {
//         res.status(400).send(err);
//     }
// }));
//
// router.post('/update', Promise.coroutine(function* (req, res) {
//     const { product_name, product_price, qty} = req.body.dataToUpdate;
//     const id = req.body.id;
//     const dataToUpdate = {
//         product_name,
//         product_price: Number(product_price),
//         qty: Number(qty)
//     };
//
//     try {
//         const response = yield productUpdate.updateProduct(id, dataToUpdate);
//         res.status(200).send(response);
//     }catch (err) {
//         res.status(400).send(err);
//     }
// }));

module.exports = router;
