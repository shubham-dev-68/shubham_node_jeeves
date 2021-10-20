const express = require('express')
const router = new express.Router()
const commentController = require("../controllers/comment.controller");

router.post('/create', commentController.createComment)

module.exports = router