'use strict';

const jwt = require('jsonwebtoken');
const _ = require('lodash');
const refreshTokenList = {};

const verifyJWTToken = function(token) {
    return new Promise((resolve, reject) =>
    {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) =>
        {
            if (err || !decodedToken)
            {
                return reject(false)
            }

            resolve(true)
        })
    })
}

exports.pushRefreshToken = function(token, refreshToken) {
    refreshTokenList[refreshToken] = token;
};

exports.verifyRefreshToken = function(refreshToken) {
    return refreshToken in refreshTokenList;
};

exports.updateRefreshToken = function (token, refreshToken) {
    refreshTokenList[refreshToken] = token;
};

exports.createJWTToken = function(details) {
    if (typeof details !== 'object') {
        details = {}
    }

    if (!details.maxAge || typeof details.maxAge !== 'number') {
        details.maxAge = 3600
    }

    details.sessionData = _.reduce(details.sessionData || {}, (memo, val, key) => {
        if (typeof val !== "function" && key !== "password")
        {
            memo[key] = val
        }
        return memo
    }, {});

    let token = jwt.sign({
        data: details.sessionData
    }, process.env.JWT_SECRET, {
        expiresIn: details.maxAge,
        algorithm: 'HS256'
    });


    const verify = verifyJWTToken(token);
    console.log("verify", verify);

    return token
};

module.exports = exports;
