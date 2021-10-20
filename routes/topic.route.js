const express = require('express')
const router = new express.Router()
const topicController = require("../controllers/topic.controller");

router.post('/create', topicController.createTopic)
router.get('/list-topics', topicController.listTopics)

module.exports = router