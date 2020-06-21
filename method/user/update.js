'use strict';

const ENDPOINT = '/update/:userid';
const METHODTYPE = 'PUT';


const bcrypt = require('bcryptjs');

const UserRepo = require('../../repositories/user');

const MAINFUNCTION = async (req, responseHandler) => {
    const {
        userid
    } = req.params;

    let { 
        username,
        email,
        password,
        confirm_password,
        first_name,
        last_name
    } = req.body;

    const userData = await UserRepo.findOne({
        id: userid
    });

    if (!userData) return responseHandler.NotFound('User Not Found');

    password = bcrypt.hashSync(password, process.env.SALT);

    await UserRepo.update({ 
        username,
        email,
        password,
        first_name,
        last_name
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
