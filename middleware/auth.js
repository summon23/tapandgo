const { verifyJWTToken } = require ('../auth/helper');
const ResponseHandler = require('../utils/response_handler');

exports.verifyJWTMiddleware =  function verifyJWTMiddleware(req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    verifyJWTToken(token)
        .then((decodedToken) =>
        {
            req.user = decodedToken.data;
            next();
        })
        .catch((err) =>
        {   
            const msg = err.message == 'invalid signature' ? 'JWT Invalid' : 'JWT Expired';
            res.send(ResponseHandler.NotAuthorized(msg)); 
        })
};

module.exports = exports;

