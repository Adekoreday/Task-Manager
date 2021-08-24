import { check, ValidationChain } from 'express-validator'

/**
 * @class CommonValidator
 * @classdesc Provides validation middlewares
 */
export default class CommonValidator {
  /**
   * Generic validator to be used by all others
   * @param {string} field
   * @returns {function} call to a Check API middleware
   * @memberof Validation
   */
  static genericCheck(field: string): ValidationChain {
    return check(`${field}`)
      .exists()
      .withMessage(`${field} is missing`)
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage(`${field} cannot be blank`)
  }

  /**
   * input validator to be used by all others
   * @param {string} field
   * @returns {function} call to a Check API middleware
   * @memberof Validation
   */
  static inputCheck(field: string): ValidationChain {
    return check(`${field}`)
      .optional()
      .trim()
      .not()
      .isEmpty({ ignore_whitespace: true })
  }

  /**
   * Generic Number validator
   * @param {string} item
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static checkNumber(item: string): ValidationChain {
    return CommonValidator.genericCheck(item)
      .trim()
      .isInt({ min: 1 })
      .withMessage(`${item} value must be at least 1 and an integer`)
  }

  /**
   * Optional Number validator
   * @param {string} item
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static checkNumberOptional(item: string): ValidationChain {
    return CommonValidator.inputCheck(item)
      .trim()
      .isInt({ min: 1 })
      .withMessage(`${item} value must be at least 1 and an integer`)
  }

  static ObjectId(id: string): boolean {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      return true
    } else {
      throw new Error('id not valid ')
    }
  }
  /**
   * id validator
   * @param {string} name
   * @returns {function} call to a Check API middleware
   * @memberof TodoValidator
   */
  static checkId(item: string): ValidationChain {
    return check(`${item}`).custom((value) => {
      if (!this.ObjectId(value)) {
        throw new Error(`${item} is not valid`)
      }
      return true
    })
  }
  /**
   * input validator to ensure that a field should not exist
   * @param {string} field
   * @returns {function} call to a Check API middleware
   * @memberof Validation
   */
  static shouldNotExistCheck(field: string): ValidationChain {
    return CommonValidator.genericCheck(field)
      .optional()
      .not()
      .exists()
      .withMessage(`${field} should not exist in the request body`)
  }
}
