'use strict';
const ENDPOINT = '/get_feed/:user_id';
const METHODTYPE = 'GET';

const UserRepo = require('../../repositories/user');
const UserFeedRepo = require('../../repositories/userfeed');

const datetime = require('node-datetime');

const MAINFUNCTION = async (request, responseHandler) => {
    const { user_id } = request.params;
    const checkDouble  = await UserFeedRepo.findAll({'user_id':user_id});
    if (checkDouble.length > 0) {
        return responseHandler.response(
            {
                message:"Load Success",
                data:checkDouble
            }
        );
    }else{
        return responseHandler.NotFound();
    }

    
};

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
