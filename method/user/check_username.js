'use strict';

const Promise = require('bluebird');
const UserRepo = require('../../repositories/user');
const ENDPOINT = '/checkusername';
const METHODTYPE = 'GET';
const Joi = require('joi');

const checkAvailableUsername = Promise.coroutine(function* (req, res, next) {
    const {
        username
    } = req.query;

    const schema = Joi.object().keys({
        username: Joi.string().required()
    });

    try {
        yield Joi.validate(req.query, schema);
    } catch (err) {
        throw `Payload Not Valid ${err.message}`;
    }

    const isUserWithUsernameExists = yield UserRepo.findOne({
        username
    });

    const isUsernameAvailable = isUserWithUsernameExists ? true : false;
    res.status(200).send({
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

