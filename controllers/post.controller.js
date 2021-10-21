const {Post} = require("../models");
const errorMessages = require("../constants/error_messages")
const {sendSuccessResponse, sendErrorResponse} = require("../utils/response.types")

module.exports.createPost = async (req, res)=>{
	try{
		console.log(req);
		const {content, topic_id} = req.fields;
		const user = req.user;
		if(!content){
			throw({code:400, message:errorMessages.POST_CONTENT_REQUIRED})
		}
		if(!topic_id){
			throw({code:400, message:errorMessages.TOPIC_ID_REQUIRED})
		}
		const topic = await Post.create({
	        "content": content,
	        "user_id" : user.id,
	        "topic_id" : topic_id
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

module.exports.listPosts = async (req, res)=>{
	try{
		const post = await Post.findAll({include:'Comments'})
        if (post) {
            sendSuccessResponse(res, {post});
        } else {
            throw(err.SOMETHING_WENT_WRONG);
        }
	}catch(err){
		sendErrorResponse(res, err)
	}
}