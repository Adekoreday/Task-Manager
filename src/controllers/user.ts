import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { ServerResponse, ServerError } from '../utils/serverResponse'
import { DataStoredInToken, generateToken } from '../utils/generateToken'
import { HttpStatusCode } from '../utils/errorHandler'
import { UserModel, UserDocument } from '../database/User'
import { UserLoginResponse } from '../types/user'

/**
 * @export
 * @class Users
 */
export default class UserController {
  /**
   * @name create
   * @async
   * @static
   * @memberof Users
   * @param {Object} req express request object
   * @param {Object} res express response object
   * @returns {JSON} JSON object with details of new user
   */
  static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, password } = request.body
      const existingMail = await UserModel.findOne({ email })
      const hashedPassword = await bcrypt.hash(password, 10)
      if (existingMail) {
        throw new ServerError<null>(
          HttpStatusCode.CONFLICT,
          true,
          'user already exits',
          null
        )
      }

      //  send verification mail or verify handlers

      const user = new UserModel({
        name,
        email,
        password: hashedPassword
      })

      user.save((err) => {
        if (err) {
          throw new ServerError<null>(
            HttpStatusCode.INTERNAL_SERVER,
            true,
            'failed to create user',
            null
          )
        }
        user.password = ''
        return ServerResponse<UserDocument>(
          response,
          HttpStatusCode.CREATED,
          'user created successfully',
          user
        )
      })
    } catch (err) {
      next(err)
    }
  }
  static async Login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = request.body
      let verifyPassword = false
      const user = await UserModel.findOne({ email })
      if (user != null) {
        verifyPassword = bcrypt.compareSync(password, user.password)
      }

      if (user == null || !verifyPassword) {
        throw new ServerError<null>(
          HttpStatusCode.NOT_FOUND,
          true,
          'username or password is not correct',
          null
        )
      } else {
        const dataSoredInToken: DataStoredInToken = { id: user._id }
        const token = generateToken(dataSoredInToken, '24h')
        //check this out if you wanna delete it
        user.password = ''
        ServerResponse<UserLoginResponse>(
          response,
          HttpStatusCode.OK,
          'user loggedin successfully',
          { user, token }
        )
      }
    } catch (err) {
      next(err)
    }
  }
}
