'use strict';
const UserFeedRepo = require('../../repositories/userfeed');

const Joi = require('joi');

const { verifyJWTMiddleware } = require('../../middleware/auth');

const getAllFeed = async (request, responseHandler) => {
    const schema = Joi.object().keys({
        query: Joi.string().allow(''),
        category: Joi.number().allow(''),
        tag: Joi.string().allow('')
    });    

    const condition = {};
    if (query) Object.assign(condition, { 
        title: {
            '$regex': query,
            '$options': 'i'
        }
    });

    if (category) Object.assign(condition, { category });
    if (tag) Object.assign(condition, { tag });

    const allFeed = await UserFeedRepo.findAll(condition);

    return responseHandler.response({
        message: 'List Feed',
        data: allFeed
    });
};

module.exports = {
    ENDPOINT: '/list',
    METHODTYPE: 'GET',
    MAINFUNCTION: getAllFeed,
    MIDDLEWARE: verifyJWTMiddleware
};
