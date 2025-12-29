const userRoute = require('express').Router()
const userSchema = require('../validators/user.schema')
const validate = require('../middlewares/validate')
const userController = require('../controllers/user.controller')

userRoute.post('/',validate(userSchema), userController.postUserInfo)
userRoute.get('/', userController.getAllUserInfo)

module.exports = userRoute