import { Request, Response, NextFunction } from 'express'
import { ServerError } from '../utils/serverResponse'
/**
 * @name emptyBody
 * @param {Object} request express response object
 * @param {Object} response express response object
 * @param {Function} next next function to return
 * @returns {JSON} JSON response with status and response information
 */
const emptyBody = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const { body } = request
  if (Object.keys(body).length === 0) {
    throw new ServerError<null>(400, true, 'empty request body', null)
  } else {
    next()
  }
}

export default emptyBody
