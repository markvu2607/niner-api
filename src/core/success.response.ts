import { Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

type TSuccessResponse = {
  message: string
  status?: number
  reasonPhrases?: string
  metadata?: any
}

class SuccessResponse {
  private message: string
  private status: number
  private metadata: any

  constructor({
    message,
    status = StatusCodes.OK,
    reasonPhrases = ReasonPhrases.OK,
    metadata = {},
  }: TSuccessResponse) {
    this.message = !message ? reasonPhrases : message
    this.status = status
    this.metadata = metadata
  }

  send(res: Response, headers = {}) {
    return res.status(this.status).json(this)
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }: TSuccessResponse) {
    super({ message, metadata })
  }
}

class CREATED extends SuccessResponse {
  constructor({
    message,
    status = StatusCodes.CREATED,
    reasonPhrases = ReasonPhrases.CREATED,
    metadata,
  }: TSuccessResponse) {
    super({ message, status, reasonPhrases, metadata })
  }
}

export { OK, CREATED }
