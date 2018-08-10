'use strict';
const ENDPOINT = '/post_feed';
const METHODTYPE = 'POST';

const UserRepo = require('../../repositories/user');
const UserFeedRepo = require('../../repositories/userfeed');
const Promise = require('bluebird');

const MAINFUNCTION = Promise.coroutine(function* (request, responseHandler) {
    const { user_id, 
            content } = request.body;

    yield UserFeedRepo.createOne({user_id:user_id,content:content});

    return responseHandler.response({
                message:"Post feed success"
            }
        );
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
