import { RequestHandler } from 'express'
import CheckForErrors from './CheckForError'
import { ValidationChain } from 'express-validator'
import emptyBody from './emptyBody'
import CommonValidator from './CommonValidator'

/**
 * @class UserValidator
 * @classdesc Provides validation middlewares for login and signup route
 */
export default class UserValidator {
  /**
   * Email validator
   * @returns {function} call to a Check API middleware
   * @memberof UserValidator
   */
  static checkEmail(): ValidationChain {
    return CommonValidator.genericCheck('email')
      .trim()
      .isEmail()
      .withMessage('email is not valid')
  }

  /**
   * Firstname and lastname validator
   * @param {string} name
   * @returns {function} call to a Check API middleware
   * @memberof UserValidator
   */
  static checkName(name: string): ValidationChain {
    return CommonValidator.genericCheck(`${name}`)
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage(`${name} must be at least 2 characters, and maximum 20`)
      .not()
      .matches(/^[A-Za-z]+[-]{1}[A-Za-z]+([-]{1}[A-Za-z]+)+$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .not()
      .matches(/^[A-Za-z]+[']+[A-Za-z]+[']+[A-Za-z]+$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .matches(
        /^[A-Za-z]+(['-]?[A-Za-z]+)?([ -]?[A-Za-z]+)?(['-]?[A-Za-z]+)?$/,
        'g'
      )
      .withMessage(`invalid input for ${name}`)
  }

  /**
   * Password validator
   * @returns {function} call to a Check API middleware
   * @memberof UserValidator
   */
  static checkPassword(): ValidationChain {
    return CommonValidator.genericCheck('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('password must be at least 6 characters')
      .not()
      .matches(/\s/, 'g')
      .withMessage('password cannot contain whitespace')
  }

  /**
   * Password validator
   * @returns {function} call to a Check API middleware
   * @memberof UserValidator
   */
  static refusePassword(): ValidationChain {
    return CommonValidator.shouldNotExistCheck('password').trim()
  }

  /**
   * Signup validation
   * @returns {array} an array of Check API middlewares
   * @memberof UserValidator
   */
  static signUpValidation(): (RequestHandler | ValidationChain)[] {
    return [
      UserValidator.checkEmail(),
      UserValidator.checkName('name'),
      UserValidator.checkPassword(),
      CheckForErrors,
      emptyBody
    ]
  }

  /**
   * Signup validation
   * @returns {array} an array of Check API middlewares
   * @memberof UserValidator
   */
  static signInValidation(): (RequestHandler | ValidationChain)[] {
    return [
      UserValidator.checkEmail(),
      UserValidator.checkPassword(),
      CheckForErrors,
      emptyBody
    ]
  }
}
