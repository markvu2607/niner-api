import express, { Request, Response, NextFunction } from "express"
import { OkResponse } from "../core/success.response"

const router = express.Router()

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return new OkResponse({
    message: "Hello world!!!",
  }).send(res)
})

export default router
