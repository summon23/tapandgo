'use strict';


const UserRepo = require('../../repositories/user');
const ENDPOINT = '/profile';
const METHODTYPE = 'GET';
const { verifyJWTMiddleware } = require('../../middleware/auth');
const { async } = require('q');

const getUserProfile = async () =>  {
    const data = await UserRepo.findAll();
    return data;
};

module.exports = {
    ENDPOINT,
    METHODTYPE,
    MAINFUNCTION: getUserProfile,
    MIDDLEWARE: verifyJWTMiddleware
};