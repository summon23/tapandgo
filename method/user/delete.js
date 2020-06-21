'use strict';

const ENDPOINT = '/delete/:userid';
const METHODTYPE = 'DELETE';

const UserRepo = require('../../repositories/user');

const MAINFUNCTION = async (req, responseHandler) => {
    const {
        userid
    } = req.params;

    const userData = await UserRepo.findOne({
        id: userid
    });

    if (!userData) return responseHandler.NotFound('User Not Found');

    await UserRepo.update({ 
        status:2
    }, {
        id: userid
    })

    return responseHandler.SuccessDelete()
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
