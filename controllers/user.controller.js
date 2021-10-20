const {User} = require("../models");
const errorMessages = require("../constants/error_messages");
const jwt = require("jsonwebtoken");
const {sendSuccessResponse, sendErrorResponse} = require("../utils/response.types")


module.exports.createUser = async (req, res)=>{
	try{
		const {name, password, email} = req.body;
		if(!(name && password && email)){
			throw({code:400, message:errorMessages.SIGNUP_FIELD_REQUIRED})
		}
		const user = await User.create({
	        name: name,
	        password: password,
	        email: email
	    })
        if (user) {
            sendSuccessResponse(res, {user});
        } else {
            throw(err.SOMETHING_WENT_WRONG);
        }
	}catch(err){
		sendErrorResponse(res, err)
	}
}

module.exports.login = async (req, res)=>{
    try {
        const { password, email } = req.body;

        const user = await User.findOne({
            where: { "email": email.toLowerCase() }
        })

        if(!user){
        	throw({code:401, message:errorMessages.USER_NOT_REGISTERED})
        }
        const isValid = await User.validatePassword(password, user.password);

        if (isValid) {
            const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY })
            sendSuccessResponse(res, {user, token});
        } else {
        	throw({code:401, message:errorMessages.INVALID_PASSWORD})
        }
    } catch (err) {
        sendErrorResponse(res, err)
    }
}