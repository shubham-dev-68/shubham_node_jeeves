const {User} = require("../models");
const errorMessages = require("../constants/error_messages");
const jwt = require("jsonwebtoken");


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
            res.json(user);
        } else {
            throw(err.SOMETHING_WENT_WRONG);
        }
	}catch(err){
		res.status(err.code===400?400: err.code===401?401 :500).send({message:err.message});
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
            res.json({
                "user": user,
                "token": token
            })
        } else {
        	throw({code:401, message:errorMessages.INVALID_PASSWORD})
        }
    } catch (err) {
        res.status(err.code===400?400: err.code===401?401 :500).send({message:err.message});
    }
}