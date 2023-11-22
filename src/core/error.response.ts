import { StatusCodes, ReasonPhrases } from "http-status-codes"

class ErrorResponse extends Error {
  statusCode: number
  isOperational: boolean

  constructor(
    statusCode: number,
    message: string,
    isOperational = true,
    stack = "",
  ) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

class ConflictError extends ErrorResponse {
  constructor(
    statusCode: number = StatusCodes.CONFLICT,
    message: string = ReasonPhrases.CONFLICT,
  ) {
    super(statusCode, message)
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    statusCode: number = StatusCodes.BAD_REQUEST,
    message: string = ReasonPhrases.BAD_REQUEST,
  ) {
    super(statusCode, message)
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(
    statusCode: number = StatusCodes.FORBIDDEN,
    message: string = ReasonPhrases.FORBIDDEN,
  ) {
    super(statusCode, message)
  }
}

class UnauthorizedError extends ErrorResponse {
  constructor(
    statusCode: number = StatusCodes.UNAUTHORIZED,
    message: string = ReasonPhrases.UNAUTHORIZED,
  ) {
    super(statusCode, message)
  }
}

class NotFoundError extends ErrorResponse {
  constructor(
    statusCode: number = StatusCodes.NOT_FOUND,
    message: string = ReasonPhrases.NOT_FOUND,
  ) {
    super(statusCode, message)
  }
}

export {
  ErrorResponse,
  ConflictError,
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
  NotFoundError,
}
