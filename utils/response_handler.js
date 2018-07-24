'use strict';

const errors = [
    { name: 'BadRequest', statusCode: 400, message: 'Bad Request' },
    { name: 'NotAuthorized', statusCode: 401, message: 'Not Authorized' },
    { name: 'Forbidden', statusCode: 403, message: 'Forbidden' },
    { name: 'NotFound', statusCode: 404, message: 'Not Found' },
    { name: 'UnprocessableEntity', statusCode: 422, message: 'Unprocessable Entity' },
    { name: 'InternalServerError', statusCode: 500, message: 'Internal Server Error' },
    { name: 'NotImplemented', statusCode: 501, message: 'Not Implemented' },
    { name: 'ServiceUnavailable', statusCode: 503, message: 'Service Unavailable' }
];

const errorProcessor = function (error) {
    return function (message) {
        return {
            status: error.statusCode,
            data: {
                name: error.message,
                message: message || error.message
            }
        };
    };
};

exports.response = function (data) {
    return {
        status: 200,
        data
    };
};

errors.forEach((e) => {
    exports[e.name] = errorProcessor(e);
});


module.exports = exports;
