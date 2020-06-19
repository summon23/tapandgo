'use strict';


const UserRepo = require('../../repositories/user');
const ENDPOINT = '/checkusername';
const METHODTYPE = 'GET';
const Joi = require('joi');

const checkAvailableUsername = async (request, responseHandler, next) => {
    const {
        username
    } = request.query;

    const schema = Joi.object().keys({
        username: Joi.string().required()
    });

    try {
        await Joi.validate(request.query, schema);
    } catch (err) {
        return responseHandler.BadRequest(`Payload Not Valid ${err.message}`);
    }

    const isUserWithUsernameExists = await UserRepo.findOne({
        username
    });

    const isUsernameAvailable = !isUserWithUsernameExists ? true : false;
    return responseHandler.response({
        success: true,
        username_available: isUsernameAvailable
    });
};

module.exports = {
    ENDPOINT,
    METHODTYPE,
    MAINFUNCTION: checkAvailableUsername,
    MIDDLEWARE: null
};

