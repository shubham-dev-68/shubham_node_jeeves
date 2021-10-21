const express = require('express')
const router = new express.Router()
const topicController = require("../controllers/topic.controller");
const {authenticate} = require("../controllers/auth.controller");

router.post('/create', authenticate, topicController.createTopic);
router.get('/list-topics', authenticate, topicController.listTopics);

module.exports = router