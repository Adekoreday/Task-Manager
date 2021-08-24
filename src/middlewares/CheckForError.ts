import { validationResult, ValidationError } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { ServerError } from '../utils/serverResponse'

type errorformat = { [key: string]: { [key: string]: string } }

/**
 * @name CheckForErrors
 * @param {Object} request express response object
 * @param {Object} response express response object
 * @param {Function} next next function to return
 * @returns {void} JSON response with status and response information
 */
export default function CheckForErrors(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const errors: errorformat = {}
  /**
   * @name errorFormatter
   * @param {Object} request express response object
   * @returns {void} JSON response with status and response information
   */
  const errorFormatter = (error: ValidationError): errorformat => {
    const { param, msg, location } = error
    if (location !== undefined && !Object.keys(errors).includes(location)) {
      errors[`${location}`] = {}
    }
    errors[`${location}`][`${param}`] = msg
    return errors
  }
  const validationResults = validationResult(request).array({
    onlyFirstError: true
  })
  validationResults.forEach((resultObject) => errorFormatter(resultObject))
  if (Object.keys(errors).length > 0) {
    throw new ServerError<errorformat>(400, true, 'invalid inputs', errors)
  } else {
    next()
  }
}
