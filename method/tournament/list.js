'use strict';
const ENDPOINT = '/list';
const METHODTYPE = 'GET';

const Repo = require('../../repositories//tournament');

const bcrypt = require('bcryptjs');

const MAINFUNCTION = async (request, responseHandler) => {
    const { query } = request
    const { 
        limit,
        page
    } = query
    if (!limit) limit = 10
    if (!page) page = 1
    const data = await Repo.findAndCountAll(limit, page)
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
