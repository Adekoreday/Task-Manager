import { HttpStatusCode } from './errorHandler'
import { Response } from 'express'

interface ResponseBodyBase {
  message: string
}

export interface ResponseBody extends ResponseBodyBase {
  data: unknown
  message: string
}

export class ServerError<TAdditionalData> extends Error {
  public readonly httpCode: HttpStatusCode
  public readonly isOperational: boolean
  public readonly additionalData: TAdditionalData
  public readonly message: string
  constructor(
    httpCode: HttpStatusCode,
    isOperational: boolean,
    description: string,
    additionalData: TAdditionalData
  ) {
    super(description)
    this.httpCode = httpCode
    this.isOperational = isOperational
    this.additionalData = additionalData
    this.message = description
  }
}

export function ServerResponse<TResponse>(
  response: Response,
  status: HttpStatusCode,
  message: string,
  data: TResponse
): Response<ResponseBody> {
  if (data == null) {
    return response.status(status).json({
      message
    })
  }
  return response.status(status).json({
    message,
    data
  })
}
