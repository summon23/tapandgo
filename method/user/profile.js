'use strict';

const Promise = require('bluebird');
const UserRepo = require('../../repositories/user');
const ENDPOINT = '/profile';
const METHODTYPE = 'GET';
const { verifyJWTMiddleware } = require('../../middleware/auth');

const getUserProfile = Promise.coroutine(function* () {
    const data = yield UserRepo.findAll();
    return data;
});

module.exports = {
    ENDPOINT,
    METHODTYPE,
    MAINFUNCTION: getUserProfile,
    MIDDLEWARE: verifyJWTMiddleware
};