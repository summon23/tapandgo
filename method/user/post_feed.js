'use strict';
const ENDPOINT = '/post_feed';
const METHODTYPE = 'PUT';

const UserRepo = require('../../repositories/user');
const UserFeedRepo = require('../../repositories/userfeed');

const datetime = require('node-datetime');

const MAINFUNCTION = async (request, responseHandler) => {
    const { user_id, 
            content } = request.body;

    const dt = datetime.create();
    const post_time = dt.format('Y-m-d H:M:S');
    
    const checkDouble  = await UserFeedRepo.findAll({'user_id':user_id,'content':content});
    if (checkDouble.length > 0) {
        return responseHandler.BadRequest('Double post detected');
    }
    await UserFeedRepo.createOne(
        {
            user_id:user_id,
            content:content,
            post_time
        }
    );

    return responseHandler.response(
        {
            message:"Post feed success"
        }
    );
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
