const express = require('express')
const router = new express.Router()
const postController = require("../controllers/post.controller");
const {authenticate} = require("../controllers/auth.controller");
const formidableMiddleware = require('express-formidable');
const path = require('path');

function getFilenameSuffix(){
  return "test.jpg"
}

router.post('/create', formidableMiddleware({
  encoding: 'utf-8',
  uploadDir: path.resolve(__dirname, "../uploads"),
  multiples: true, // req.files to be arrays of files
  keepExtensions : true,
  filter: function ({name, originalFilename, mimetype}) {
    // keep only images
    return mimetype && mimetype.includes("image");
  }
}), authenticate, postController.createPost)

router.get('/list-posts', authenticate, postController.listPosts)

module.exports = router