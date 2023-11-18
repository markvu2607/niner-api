import express, { Request, Response, NextFunction } from "express"
import { OK } from "../core/success.response"

const router = express.Router()

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return new OK({
    message: "Hello world!!!"
  }).send(res)
})

export default router
