const {Comment} = require("../models");
const errorMessages = require("../constants/error_messages")
const {sendSuccessResponse, sendErrorResponse} = require("../utils/response.types")

module.exports.createComment = async (req, res)=>{
	try{
		const {text, post_id} = req.body;
		const user = req.user;
		if(!text){
			throw({code:400, message:errorMessages.COMMNET_CONTENT_REQUIRED})
		}
		if(!post_id){
			throw({code:400, message:errorMessages.POST_ID_REQUIRED})
		}
		const topic = await Comment.create({
	        "text": text,
	        "user_id" : user.id,
	        "post_id" : post_id
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
