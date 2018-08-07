'use strict';
const ENDPOINT = '/list';
const METHODTYPE = 'GET';

const UserRepo = require('../../repositories/user');
const UserFeedRepo = require('../../repositories/userfeed');
const Promise = require('bluebird');

const MAINFUNCTION = Promise.coroutine(function* (request, responseHandler) {
    const data = yield UserRepo.findAll();
    return responseHandler.response({
        data
    });
});

const { verifyJWTMiddleware } = require('../../middleware/auth');

const MIDDLEWARE = (req, res, next) => {
    next();
};

module.exports = {
    ENDPOINT,
    METHODTYPE,
    MAINFUNCTION,
    MIDDLEWARE: verifyJWTMiddleware
};
