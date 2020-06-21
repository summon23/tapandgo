'use strict';

const ENDPOINT = '/detail/:userid';
const METHODTYPE = 'GET';

const Repo = require('../../repositories/tournament');

const MAINFUNCTION = async (req, responseHandler) => {
    const {
        userid
    } = req.params;

    const userData = await Repo.findOne({
        id: userid
    });

    if (!userData) return responseHandler.NotFound('Tournament Not Found');

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
