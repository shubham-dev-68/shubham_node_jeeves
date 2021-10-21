const {Post, Image} = require("../models");
const errorMessages = require("../constants/error_messages")
const {sendSuccessResponse, sendErrorResponse} = require("../utils/response.types")

module.exports.createPost = async (req, res)=>{
	try{

		const {content, topic_id} = req.fields;
		const user = req.user;
		if(!content){
			throw({code:400, message:errorMessages.POST_CONTENT_REQUIRED})
		}
		if(!topic_id){
			throw({code:400, message:errorMessages.TOPIC_ID_REQUIRED})
		}
		const post = await Post.create({
	        "content": content,
	        "user_id" : user.id,
	        "topic_id" : topic_id
	    })

	    
		let files = req.files["images"];
		let imageFilenames = [];
		for(let i=0; i<files.length; i++){
			let filename = files[i].path.split("/").pop();
			imageFilenames.push({"url":filename, "post_id":post.id})
		}
		// if post created succesfully
        if (post) {
        	// if there are image files then make image entries
        	if(imageFilenames.length){
        		const imagesRes = await Image.bulkCreate(imageFilenames)
        		if(!imagesRes)
        			throw({code:500, message:errorMessages.ERROR_UPLOAD_IMAGES})
        		else{
        			console.log(imagesRes)
        		}
        	}
            sendSuccessResponse(res, {post});
        } else {
            throw(err.SOMETHING_WENT_WRONG);
        }
	}catch(err){
		sendErrorResponse(res, err)
	}
}

module.exports.listPosts = async (req, res)=>{
	try{
		let {page, limit} = req.query;
		if (!(page>0 && limit>0)){
			throw({"code":400, message:errorMessages.PAGE_AND_LIMIT_VALUE_ERROR});
		}

		const posts = await Post.findAndCountAll({
			include:["Comments", "Images"],
			"limit" : parseInt(limit),
			"offset" : (parseInt(page)-1)*parseInt(limit)
		})

        if (posts) {
            sendSuccessResponse(res, {posts});
        } else {
            throw({"code":500, message:errorMessages.SOMETHING_WENT_WRONG});
        }
	}catch(err){
		sendErrorResponse(res, err)
	}
}