'use strict';
const ENDPOINT = '/list';
const METHODTYPE = 'GET';

const UserRepo = require('../../repositories/user');
const UserFeedRepo = require('../../repositories/userfeed');

const bcrypt = require('bcryptjs');

const MAINFUNCTION = async (request, responseHandler) => {
    const { query } = request
    let { 
        limit,
        page
    } = query
    if (!limit) limit = 10
    if (!page) page = 1
    const data = await UserRepo.findAndCountAll(limit, page)
    return responseHandler.response({
        data: data.rows,
        total_pages: Math.round(data.count / limit)
    });
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
