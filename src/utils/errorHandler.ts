import { Request, Response, RequestHandler, NextFunction } from 'express'
import { ServerError, ResponseBody } from './serverResponse'
import logger from './logger'

export const asyncCatch =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER = 500,
  NOT_AUTHORIZED = 401
}

class ErrorHandler {
  public async handleError(
    err: ServerError<unknown>,
    request: Request,
    response: Response
  ): Promise<Response<ResponseBody>> {
    // use internal logger to log error
    await logger.info(
      `Error message from the centralized error-handling component
      Method: - ${request.method}
      original url: - ${request.originalUrl}
      ip: - ${request.ip}
      Error:- ${err}`
    )
    // await sendMailToAdminIfCritical()
    // await sendEventsToSentry()
    if (err.additionalData == null) {
      return response.status(err.httpCode).json({
        message: err.message
      })
    }
    return response.status(err.httpCode).json({
      message: err.message,
      data: err.additionalData
    })
  }

  public isTrustedError(error: unknown): error is ServerError<unknown> {
    if (error instanceof ServerError) {
      return error.isOperational
    }
    return false
  }
}
export const errorHandler = new ErrorHandler()
