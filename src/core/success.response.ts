import { Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

type TSuccessResponse = {
  message: string
  statusCode?: number
  reasonPhrases?: string
  metadata?: any
}

class SuccessResponse {
  message: string
  statusCode: number
  metadata: any

  constructor({
    message,
    statusCode = StatusCodes.OK,
    reasonPhrases = ReasonPhrases.OK,
    metadata = {},
  }: TSuccessResponse) {
    this.message = !message ? reasonPhrases : message
    this.statusCode = statusCode
    this.metadata = metadata
  }

  send(res: Response, headers = {}) {
    return res.status(this.statusCode).json(this)
  }
}

class OkResponse extends SuccessResponse {
  constructor({ message, metadata }: TSuccessResponse) {
    super({ message, metadata })
  }
}

class CreatedResponse extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.CREATED,
    reasonPhrases = ReasonPhrases.CREATED,
    metadata,
  }: TSuccessResponse) {
    super({ message, statusCode, reasonPhrases, metadata })
  }
}

export { OkResponse, CreatedResponse }
