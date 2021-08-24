/* eslint-disable no-console */
import { NextFunction, Request, Response } from 'express'
import { TaskModel, TaskDocument } from '../database/Task'
import { ServerResponse, ServerError } from '../utils/serverResponse'
import { HttpStatusCode } from '../utils/errorHandler'
import { ITask, ITaskUpdate } from '../types/task'

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
        return next(
          new ServerError<null>(
            HttpStatusCode.INTERNAL_SERVER,
            true,
            'failed to create task',
            null
          )
        )
      }
      return ServerResponse<TaskDocument>(
        response,
        HttpStatusCode.CREATED,
        'task created successfully',
        task
      )
    })
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
    const { id } = request.params
    const taskInput: ITask = request.body
    const task = await TaskModel.findById(id)
    if (task == null) {
      return next(
        new ServerError<null>(
          HttpStatusCode.NOT_FOUND,
          true,
          'failed to update task that does not exits',
          null
        )
      )
    }

    const taskUpdate: ITaskUpdate = {
      title: taskInput.title ?? task.title,
      description: taskInput.description ?? task.description,
      isCompleted: taskInput.isCompleted ?? task.isCompleted,
      doneTime: taskInput.doneTime
        ? new Date(taskInput.doneTime)
        : task.doneTime,
      notificationTime: taskInput.notificationTime
        ? new Date(taskInput.notificationTime)
        : task.notificationTime
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(id, taskUpdate, {
      new: true,
      useFindAndModify: false
    })

    if (updatedTask != null) {
      ServerResponse<TaskDocument>(
        response,
        HttpStatusCode.OK,
        'task updated successfully',
        updatedTask
      )
    } else {
      return next(
        new ServerError<null>(
          HttpStatusCode.INTERNAL_SERVER,
          true,
          'failed to update task ',
          null
        )
      )
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
    const { id } = request.params
    const task = await TaskModel.findById(id)
    if (task == null) {
      return next(
        new ServerError<null>(
          HttpStatusCode.NOT_FOUND,
          true,
          'failed to get task that does not exits',
          null
        )
      )
    }
    ServerResponse<TaskDocument>(
      response,
      HttpStatusCode.OK,
      'task retrieved successfully',
      task
    )
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
    const task = await TaskModel.find()
    if (task == null) {
      return next(
        new ServerError<null>(
          HttpStatusCode.NOT_FOUND,
          true,
          'failed to get task that does not exits',
          null
        )
      )
    }
    ServerResponse<TaskDocument[]>(
      response,
      HttpStatusCode.OK,
      'all task retrieved successfully',
      task
    )
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
    const { id } = request.params
    const task = await TaskModel.findOneAndDelete(
      { _id: id },
      { useFindAndModify: false }
    )
    if (task == null) {
      return next(
        new ServerError<null>(
          HttpStatusCode.NOT_FOUND,
          true,
          'task has been previously deleted ',
          null
        )
      )
    }
    ServerResponse<null>(
      response,
      HttpStatusCode.OK,
      'task deleted successfully',
      null
    )
  }
}
