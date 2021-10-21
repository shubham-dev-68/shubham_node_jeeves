const express = require('express')
const router = new express.Router()
const postController = require("../controllers/post.controller");
const {authenticate} = require("../controllers/auth.controller");
const formidableMiddleware = require('express-formidable');
const path = require('path')

router.post('/create', formidableMiddleware({
  encoding: 'utf-8',
  uploadDir: path.resolve(__dirname, "../uploads"),
  multiples: true, // req.files to be arrays of files
}), authenticate, postController.createPost)
router.get('/list-posts', authenticate, postController.listPosts)

module.exports = router