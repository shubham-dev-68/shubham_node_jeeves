const {Topic} = require("../models");
const {sendSuccessResponse, sendErrorResponse} = require("../utils/response.types")


module.exports.createTopic = async (req, res)=>{
	try{
		const {name} = req.body;
		const user = req.user;
		if(!name){
			throw({code:400, message:errorMessages.TOPIC_NAME_REQUIRED})
		}
		const topic = await Topic.create({
	        name: name,
	        user_id : user.id
	    })
        if (topic) {
            sendSuccessResponse(res, {topic});
        } else {
            throw(err.SOMETHING_WENT_WRONG);
        }
	}catch(err){
		sendErrorResponse(res, err)
	}
}

module.exports.listTopics = async (req, res)=>{
	try{
		let {page, limit} = req.query;
		const topics = await Topic.findAndCountAll({
			"limit" : parseInt(limit),
			"offset" : parseInt(page*limit)
		})
        if (topics) {
            sendSuccessResponse(res, {topics});
        } else {
            throw(err.SOMETHING_WENT_WRONG);
        }
	}catch(err){
		sendErrorResponse(res, err)
	}
}