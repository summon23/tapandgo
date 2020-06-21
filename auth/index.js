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
                return reject(err)
            }

            resolve(true)
        })
    })
}

exports.pushRefreshToken = (token, refreshToken) => {
    refreshTokenList[refreshToken] = token;
};

exports.verifyRefreshToken = (refreshToken) => {
    return refreshToken in refreshTokenList;
};

exports.updateRefreshToken = (token, refreshToken) => {
    refreshTokenList[refreshToken] = token;
};

exports.createJWTToken = (details) => {
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
        // 1m
        algorithm: 'HS256'
    });
    const verify = verifyJWTToken(token);

    return token
};

module.exports = exports;
