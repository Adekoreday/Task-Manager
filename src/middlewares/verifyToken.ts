import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { config } from 'dotenv'
import { DataStoredInToken } from '../utils/generateToken'
import { ServerError } from '../utils/serverResponse'
import { HttpStatusCode } from '../utils/errorHandler'
import { UserModel } from '../database/User'
config()
/**
 * @name verifyToken
 * @param {object} request
 * @param {object} response
 * @param {object} next
 * @return {string} object
 */
const verifyToken = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = request.headers.authorization || request.query.token
    if (typeof token !== 'string') {
      return next(
        new ServerError<null>(
          HttpStatusCode.NOT_AUTHORIZED,
          true,
          'kindly login to proceed',
          null
        )
      )
    }
    const decoded = (await jwt.verify(
      token,
      process.env.JWT_KEY || ''
    )) as DataStoredInToken
    const { id } = decoded
    const user = await UserModel.findById(id)
    if (user == null) {
      return next(
        new ServerError<null>(
          HttpStatusCode.NOT_FOUND,
          true,
          'kindly sign up to proceed',
          null
        )
      )
    }
    next()
  } catch (err) {
    if (err.message === 'jwt expired') {
      return next(
        new ServerError<null>(
          HttpStatusCode.NOT_AUTHORIZED,
          true,
          'kindly re authenticate token expired',
          null
        )
      )
    }
    return next(
      new ServerError<null>(
        HttpStatusCode.INTERNAL_SERVER,
        true,
        'failed to authorize user',
        null
      )
    )
  }
}

export default verifyToken
