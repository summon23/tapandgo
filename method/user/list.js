'use strict';
const ENDPOINT = '/list';
const METHODTYPE = 'GET';

const UserRepo = require('../../repositories/user');
const UserFeedRepo = require('../../repositories/userfeed');
const Promise = require('bluebird');

const MAINFUNCTION = Promise.coroutine(function* () {
    const feed = yield UserFeedRepo.findAll();
    const data = yield UserRepo.findAll();
    return data;
});

const { verifyJWTMiddleware } = require('../../middleware/auth');

const MIDDLEWARE = function(req, res, next) {
    next();
};

module.exports = {
    ENDPOINT,
    METHODTYPE,
    MAINFUNCTION,
    MIDDLEWARE: verifyJWTMiddleware
};
