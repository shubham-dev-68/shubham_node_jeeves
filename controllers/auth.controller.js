const jwt = require("jsonwebtoken");
const constants = require("../constants")
const errorMessages = require("../constants/error_messages")
const {sendSuccessResponse, sendErrorResponse} = require("../utils/response.types")

module.exports.authenticate = async(req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(constants.SPACE)[0] === constants.BEARER) {
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (!err) {
                // Succefully verified the token
                req.user = decoded;
                next(); // pass the request to nect handler
            } else {
                console.log("err", err);
                sendErrorResponse({"code":401, "message":errorMessages.TOKEN_INVALID})
            }
        });

    } else {
        sendErrorResponse({"code":401, "message":errorMessages.TOKEN_MISSING})
    }
}