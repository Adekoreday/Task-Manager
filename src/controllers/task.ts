import { NextFunction, Request, Response } from 'express'
import { TaskModel, TaskDocument } from '../database/Task'
import { ServerResponse, ServerError } from '../utils/serverResponse'
import { HttpStatusCode } from '../utils/errorHandler'
import { ITask, KeysOfType } from '../types/task'

export default class TaskController {
  /**
   * @name Create
   * @async
   * @static
   * @memberof TaskController
   * @param {Object} req express request object
   * @param {Object} res express response object
   * @returns {JSON} JSON object with details of new user
   */
  static async Create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskData: ITask = request.body
      const task = new TaskModel({
        title: taskData.title,
        description: taskData.description,
        doneTime: new Date(taskData.doneTime),
        isCompleted: taskData.isCompleted,
        notificationTime: new Date(taskData.notificationTime)
      })

      task.save((err) => {
        if (err) {
          throw new ServerError<null>(
            HttpStatusCode.INTERNAL_SERVER,
            true,
            'failed to create task',
            null
          )
        }
        return ServerResponse<TaskDocument>(
          response,
          HttpStatusCode.CREATED,
          'task created successfully',
          task
        )
      })
    } catch (err) {
      next(err)
    }
  }
  /**
   * @name Update
   * @async
   * @static
   * @memberof TaskController
   * @param {Object} req express request object
   * @param {Object} res express response object
   * @returns {JSON} JSON object with details of new user
   */
  static async Update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = request.params
      const task = await TaskModel.findById(id)
      if (task == null) {
        throw new ServerError<null>(
          HttpStatusCode.NOT_FOUND,
          true,
          'failed to update task that does not exits',
          null
        )
      }

      Object.keys(request.body).forEach((item) => {
        const key: KeysOfType<TaskDocument, boolean> = item as KeysOfType<
          TaskDocument,
          boolean
        >
        task[key] = request.body[key]
      })

      task.save((err) => {
        if (err) {
          throw new ServerError<null>(
            HttpStatusCode.INTERNAL_SERVER,
            true,
            'failed to update task',
            null
          )
        }
        return ServerResponse<TaskDocument>(
          response,
          HttpStatusCode.OK,
          'task updated successfully',
          task
        )
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * @name Get
   * @async
   * @static
   * @memberof TaskController
   * @param {Object} req express request object
   * @param {Object} res express response object
   * @returns {JSON} JSON object with details of new user
   */
  static async Get(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = request.params
      const task = await TaskModel.findById(id)
      if (task == null) {
        throw new ServerError<null>(
          HttpStatusCode.NOT_FOUND,
          true,
          'failed to get task that does not exits',
          null
        )
      }
      ServerResponse<TaskDocument>(
        response,
        HttpStatusCode.OK,
        'task retrieved successfully',
        task
      )
    } catch (err) {
      next(err)
    }
  }

  /**
   * @name GetAll
   * @async
   * @static
   * @memberof TaskController
   * @param {Object} req express request object
   * @param {Object} res express response object
   * @returns {JSON} JSON object with details of new user
   */
  static async GetAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const task = await TaskModel.find()
      if (task == null) {
        throw new ServerError<null>(
          HttpStatusCode.NOT_FOUND,
          true,
          'failed to get task that does not exits',
          null
        )
      }
      ServerResponse<TaskDocument[]>(
        response,
        HttpStatusCode.OK,
        'all task retrieved successfully',
        task
      )
    } catch (err) {
      next(err)
    }
  }

  /**
   * @name Delete
   * @async
   * @static
   * @memberof TaskController
   * @param {Object} req express request object
   * @param {Object} res express response object
   * @returns {JSON} JSON object with details of new user
   */
  static async Delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = request.params
      const task = await TaskModel.findOneAndDelete(
        { _id: id },
        { useFindAndModify: false }
      )
      if (task == null) {
        throw new ServerError<null>(
          HttpStatusCode.NOT_FOUND,
          true,
          'task has been previously deleted ',
          null
        )
      }
      ServerResponse<null>(
        response,
        HttpStatusCode.OK,
        'task deleted successfully',
        null
      )
    } catch (err) {
      next(err)
    }
  }
}
