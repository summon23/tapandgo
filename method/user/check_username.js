'use strict';

const Promise = require('bluebird');
const UserRepo = require('../../repositories/user');
const ENDPOINT = '/checkusername';
const METHODTYPE = 'GET';
const Joi = require('joi');

const checkAvailableUsername = Promise.coroutine(function* (request, responseHandler, next) {
    const {
        username
    } = request.query;

    const schema = Joi.object().keys({
        username: Joi.string().required()
    });

    try {
        yield Joi.validate(request.query, schema);
    } catch (err) {
        return responseHandler.BadRequest(`Payload Not Valid ${err.message}`);
    }

    const isUserWithUsernameExists = yield UserRepo.findOne({
        username
    });

    const isUsernameAvailable = !isUserWithUsernameExists ? true : false;
    return responseHandler.response({
        success: true,
        username_available: isUsernameAvailable
    });
});

module.exports = {
    ENDPOINT,
    METHODTYPE,
    MAINFUNCTION: checkAvailableUsername,
    MIDDLEWARE: null
};

