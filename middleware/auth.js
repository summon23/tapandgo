const { verifyJWTToken } = require ('../auth/helper');

exports.verifyJWTMiddleware =  function verifyJWTMiddleware(req, res, next) {
    console.log("req", req.query);
    let token = (req.method === 'POST') ? req.body.token : req.query.token;
    // console.log("token", token);
    verifyJWTToken(token)
        .then((decodedToken) =>
        {
            req.user = decodedToken.data;
            next();
        })
        .catch((err) =>
        {
            res.status(400)
                .json({message: "Invalid auth token provided."})
        })
};

module.exports = exports;

