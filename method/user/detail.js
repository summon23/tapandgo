'use strict';

const ENDPOINT = '/detail/:userid';
const METHODTYPE = 'GET';

const UserRepo = require('../../repositories/user');

const MAINFUNCTION = async (req, responseHandler) => {
    const {
        userid
    } = req.params;

    const userData = await UserRepo.findOne({
        id: userid
    });

    if (!userData) return responseHandler.NotFound('User Not Found');

    return responseHandler.response({
        data: userData
    })
};


const MIDDLEWARE = (req, res, next) => {
    next();
};

module.exports = {
    ENDPOINT,
    METHODTYPE,
    MAINFUNCTION,
    MIDDLEWARE
};
