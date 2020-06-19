'use strict';
const ENDPOINT = '/list';
const METHODTYPE = 'GET';

const UserRepo = require('../../repositories/user');
const UserFeedRepo = require('../../repositories/userfeed');


const MAINFUNCTION = async (request, responseHandler) => {
    const data = await UserRepo.findAll();
    return responseHandler.response({
        data
    });
};

const { verifyJWTMiddleware } = require('../../middleware/auth');
const { async } = require('q');

const MIDDLEWARE = (req, res, next) => {
    next();
};

module.exports = {
    ENDPOINT,
    METHODTYPE,
    MAINFUNCTION,
    MIDDLEWARE: verifyJWTMiddleware
};
