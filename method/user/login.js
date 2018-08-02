'use strict';
const ENDPOINT = '/login';
const METHODTYPE = 'POST';

const UserRepo = require('../../repositories/user');
const Promise = require('bluebird');
const { createJWTToken }  = require('../../auth/index');
const randtoken = require('rand-token');
const Auth = require('../../auth');
const config = require('../../config');
const bcrypt = require('bcryptjs');
// Load Env File
config.loadEnvironment();
const ERROR_CODE = process.env.ERROR_CODE;
const SUCCESS_CODE = process.env.SUCCESS_CODE;

const MAINFUNCTION = Promise.coroutine(function* (req, res) {
    let statLogin = false;
    const { username, 
            password } = req.body;
    const checkUsername = yield UserRepo.findOne({
        username
    });

    if(bcrypt.compareSync(password, checkUsername.dataValues.password)){
        statLogin = true;
    }
    //console.log(statusLogin);

    if(statLogin) {
        const refreshToken = randtoken.uid(50);
        const token = createJWTToken({
            sessionData: checkUsername.dataValues,
            maxAge: 3600
        });
        Auth.pushRefreshToken(token, refreshToken);
        return {
            status: 200,
            data:{
                token: token,
                refresh_token: refreshToken,
                message: 'Load Success',
                error_code: SUCCESS_CODE
            }
            
        };
    } else {
        return {
            status: 404,
            data:{
                token: null,
                message: 'Invalid Username and Password',
                error_code: ERROR_CODE
            }
            
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
