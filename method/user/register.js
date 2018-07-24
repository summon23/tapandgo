'use strict';

const Promise = require('bluebird');
const UserRepo = require('../../repositories/user');
const ENDPOINT = '/register';
const METHODTYPE = 'POST';
const Joi = require('joi');

const registerNewUser = Promise.coroutine(function* (req, res, next) {
    const { 
        username,
        email,
        password,
        confirm_password,
        first_name,
        last_name
    } = req.body;

    const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        confirm_password: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required()
    });

    try {
        yield Joi.validate(req.body, schema);
    } catch (err) {
        throw `Payload Not Valid ${err.message}`;
    }

    const isEmailExist = yield UserRepo.findOne({
        email
    });

    if (isEmailExist) {
        return {
            data: false,
            message: 'Email Already Registered'
        }
    }

    if (String(password) !== String(confirm_password)) {
        return {
            data: false,
            message: 'Password Not Match'
        };
    }

    try {
        yield UserRepo.createOne({
            first_name,
            last_name,
            username,
            password,
            email
        });
        res.status(201).send({
            data: true,
            message: 'Register Complete'
        });
    } catch (err) {
        throw `Register failed ${err.message}`;
    }
});

const MIDDLEWARE = function(req, res, next) {
    next();
};

module.exports = {
    ENDPOINT,
    METHODTYPE,
    MAINFUNCTION: registerNewUser,
    MIDDLEWARE
};