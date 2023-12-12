import { NextFunction, Request, Response } from "express"
import { StatusCodes, ReasonPhrases } from "http-status-codes"

import config from "@/configs/config.js"
import logger from "@/configs/logger.js"
import { ErrorResponse } from "@/core/error.response.js"

export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err
  if (!(error instanceof ErrorResponse)) {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    const message = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    error = new ErrorResponse(statusCode, message, false, err.stack)
  }
  next(error)
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.locals.errorMessage = err.message

  const statusCode: number = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  const message: string = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR

  const response = {
    statusCode,
    message,
    // ...(config.nodeEnv === "development" && { stack: err.stack }),
  }

  if (config.nodeEnv === "development") {
    logger.error(err)
  }

  return res.status(statusCode).json(response)
}
