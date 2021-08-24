import express from 'express'
import UserValidator from '../middlewares/UserValidator'
import UserController from '../controllers/user'
const route = express.Router()

route.post('/', UserValidator.signUpValidation(), UserController.create)
route.post('/login', UserValidator.signInValidation(), UserController.Login)
export default route
