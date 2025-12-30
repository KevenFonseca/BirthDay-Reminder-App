const userRoute = require('express').Router()
const userSchema = require('../validators/userSchema')
const validate = require('../middlewares/validate')
const userController = require('../controllers/userController')

userRoute.post('/', validate(userSchema), userController.postUserInfo)
userRoute.get('/', userController.getAllUserInfo)

module.exports = userRoute