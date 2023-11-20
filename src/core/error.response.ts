import { StatusCodes, ReasonPhrases } from "http-status-codes"

class ErrorResponse extends Error {
  private status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

class ConflictError extends ErrorResponse {
  constructor(
    message: string = ReasonPhrases.CONFLICT,
    status: number = StatusCodes.CONFLICT,
  ) {
    super(message, status)
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message: string = ReasonPhrases.BAD_REQUEST,
    status: number = StatusCodes.BAD_REQUEST,
  ) {
    super(message, status)
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(
    message: string = ReasonPhrases.FORBIDDEN,
    status: number = StatusCodes.FORBIDDEN,
  ) {
    super(message, status)
  }
}

class UnauthorizedError extends ErrorResponse {
  constructor(
    message: string = ReasonPhrases.UNAUTHORIZED,
    status: number = StatusCodes.UNAUTHORIZED,
  ) {
    super(message, status)
  }
}

class NotFoundError extends ErrorResponse {
  constructor(
    message: string = ReasonPhrases.NOT_FOUND,
    status: number = StatusCodes.NOT_FOUND,
  ) {
    super(message, status)
  }
}

export {
  ConflictError,
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
  NotFoundError,
}
