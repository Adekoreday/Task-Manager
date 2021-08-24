import express from 'express'
import TaskController from '../controllers/task'
import TaskValidator from '../middlewares/TaskValidator'
import verifyToken from '../middlewares/verifyToken'
const route = express.Router()

route.get('/', verifyToken, TaskController.GetAll)

route.post(
  '/',
  verifyToken,
  TaskValidator.TaskCreateValidation(),
  TaskController.Create
)
route.patch(
  '/:id',
  verifyToken,
  TaskValidator.TaskUpdateValidation(),
  TaskController.Update
)
route.get(
  '/:id',
  verifyToken,
  TaskValidator.TaskGetValidation(),
  TaskController.Get
)

route.delete(
  '/:id',
  verifyToken,
  TaskValidator.DeleteValidation(),
  TaskController.Delete
)
export default route
