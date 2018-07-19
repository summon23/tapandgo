'use strict';
const ENDPOINT = '/token';
const METHODTYPE = 'POST';

const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const { createJWTToken }  = require('../../auth/index');
const Auth = require('../../auth');

const MAINFUNCTION = Promise.coroutine(function* (req, res) {
    const {
        refresh_token: refreshToken,
        token
    } = req.body;

    const decoded = jwt.decode(token);
    if(refreshToken && Auth.verifyRefreshToken(refreshToken)) {
        const token = createJWTToken({
            sessionData: decoded,
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
            message: 'Refresh Token Not Valid'
        }
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
