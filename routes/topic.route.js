const express = require('express')
const router = new express.Router()
const topicController = require("../controllers/topic.controller");
const {authenticate} = require("../controllers/auth.controller");

router.post('/create', authenticate, topicController.createTopic)
// router.post('/create', authenticate, (req,res)=>{
// 	console.log("testing", req.user);
// })
router.get('/list-topics', topicController.listTopics)

module.exports = router