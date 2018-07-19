'use strict';
const ENDPOINT = '/login';
const METHODTYPE = 'POST';

const UserRepo = require('../../repositories/user');
const Promise = require('bluebird');
const { createJWTToken }  = require('../../auth/index');
const randtoken = require('rand-token');
const Auth = require('../../auth');

const MAINFUNCTION = Promise.coroutine(function* (req, res) {
    const { username, password } = req.body;
    const statusLogin = yield UserRepo.findOne({
        username,
        password
    });

    if(statusLogin) {
        const refreshToken = randtoken.uid(50);
        const token = createJWTToken({
            sessionData: statusLogin.dataValues,
            maxAge: 3600
        });
        Auth.pushRefreshToken(token, refreshToken);
        return {
            status: true,
            token: token,
            refresh_token: refreshToken
        };
    } else {
        return {
            status: false,
            token: null
        };
    }
});

const MIDDLEWARE = function(req, res, next) {
    next();
};

module.exports = {
    ENDPOINT,
    METHODTYPE,
    MAINFUNCTION,
    MIDDLEWARE
};
