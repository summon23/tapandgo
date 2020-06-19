'use strict';
const ENDPOINT = '/token';
const METHODTYPE = 'POST';


const jwt = require('jsonwebtoken');
const { createJWTToken }  = require('../../auth/index');
const Auth = require('../../auth');

const MAINFUNCTION = async (req, responseHandler) => {
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
        return responseHandler.response({
            token: token,
            refresh_token: refreshToken
        });
    } else {
        return responseHandler.BadRequest('Refresh Token Not Valid');
    }
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
