const express = require('express')
const router = new express.Router()
const userController = require("../controllers/user.controller");

router.post('/signup', userController.createUser)
router.post('/login', userController.login)

module.exports = router