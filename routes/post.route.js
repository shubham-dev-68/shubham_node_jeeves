const express = require('express')
const router = new express.Router()
const userController = require("../controllers/post.controller");

router.post('/create', userController.createPost)
router.post('/list-posts', userController.listPosts)

module.exports = router