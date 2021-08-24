import { RequestHandler } from 'express'
import CheckForErrors from './CheckForError'
import { ValidationChain } from 'express-validator'
import emptyBody from './emptyBody'
import CommonValidator from './CommonValidator'

/**
 * @class UserValidator
 * @classdesc Provides validation middlewares for login and signup route
 */
export default class TaskValidator {
  /**
   * string validator
   * @param {string} name
   * @returns {function} call to a Check API middleware
   * @memberof TodoValidator
   */
  static checkName(field: string): ValidationChain {
    return CommonValidator.genericCheck(`${field}`)
      .trim()
      .isLength({ min: 2, max: 40 })
      .withMessage(`${field} must be at least 2 characters, and maximum 40`)
  }
  /**
   * string validator
   * @param {string} name
   * @returns {function} call to a Check API middleware
   * @memberof TodoValidator
   */
  static checkNameOptional(field: string): ValidationChain {
    return CommonValidator.inputCheck(`${field}`)
      .trim()
      .isLength({ min: 2, max: 40 })
      .withMessage(`${field} must be at least 2 characters, and maximum 40`)
  }
  /**
   * string validator
   * @param {string} name
   * @returns {function} call to a Check API middleware
   * @memberof TodoValidator
   */
  static checkDescription(): ValidationChain {
    return CommonValidator.genericCheck('description')
      .trim()
      .isLength({ min: 10, max: 500 })
      .withMessage(
        'description must be at least 10 characters, and maximum 500'
      )
  }

  /**
   * string validator
   * @param {string} name
   * @returns {function} call to a Check API middleware
   * @memberof TodoValidator
   */
  static checkDescriptionOptional(): ValidationChain {
    return CommonValidator.inputCheck('description')
      .trim()
      .isLength({ min: 10, max: 500 })
      .withMessage(
        'description must be at least 10 characters, and maximum 500'
      )
  }
  /**
   * string validator
   * @param {string} name
   * @returns {function} call to a Check API middleware
   * @memberof TodoValidator
   */
  static checkDate(field: string): ValidationChain {
    return CommonValidator.genericCheck(field)
      .trim()
      .matches(
        /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/,
        'g'
      )
      .withMessage('date string should be of format 2015-1-11 13:57:24')
  }
  /**
   * string validator
   * @param {string} name
   * @returns {function} call to a Check API middleware
   * @memberof TodoValidator
   */
  static checkDateOptional(field: string): ValidationChain {
    return CommonValidator.inputCheck(field)
      .trim()
      .matches(
        /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/,
        'g'
      )
      .withMessage('date string should be of format 2015-1-11 13:57:24')
  }

  /**
   * todo create validation
   * @returns {array} an array of Check API middlewares
   * @memberof UserValidator
   */
  static TaskCreateValidation(): (RequestHandler | ValidationChain)[] {
    return [
      TaskValidator.checkName('title'),
      TaskValidator.checkDescription(),
      TaskValidator.checkDate('doneTime'),
      TaskValidator.checkDate('notificationTime'),
      CheckForErrors,
      emptyBody
    ]
  }

  /**
   * todo create validation
   * @returns {array} an array of Check API middlewares
   * @memberof UserValidator
   */
  static TaskUpdateValidation(): (RequestHandler | ValidationChain)[] {
    return [
      CommonValidator.checkId('id'),
      TaskValidator.checkNameOptional('title'),
      TaskValidator.checkDescriptionOptional(),
      TaskValidator.checkDateOptional('doneTime'),
      TaskValidator.checkDateOptional('notificationTime'),
      CheckForErrors,
      emptyBody
    ]
  }

  /**
   * todo create validation
   * @returns {array} an array of Check API middlewares
   * @memberof UserValidator
   */
  static TaskGetValidation(): (RequestHandler | ValidationChain)[] {
    return [CommonValidator.checkId('id'), CheckForErrors]
  }

  /**
   * todo create validation
   * @returns {array} an array of Check API middlewares
   * @memberof UserValidator
   */
  static DeleteValidation(): (RequestHandler | ValidationChain)[] {
    return [CommonValidator.checkId('id'), CheckForErrors]
  }
}
