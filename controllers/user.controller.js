const {User} = require("../models");
const errorMessages = require("../constants/error_messages");


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
		res.status(err.code==400?400:500).send({message:err.message});
	}
}

module.exports.login = async (req, res)=>{
	
}