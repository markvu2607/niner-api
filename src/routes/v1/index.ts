import dayjs from "dayjs"
import express, { Request, Response } from "express"

import { OkResponse } from "@/core/success.response.js"
import catchAsync from "@/utils/catchAsync.js"
import access from "./access/index.js"

const router = express.Router()

router.get(
  "/ping",
  catchAsync((req: Request, res: Response) => {
    return new OkResponse({
      message: "Welcome to Niner!",
      metadata: {
        timestamp: dayjs().unix(),
      },
    }).send(res)
  }),
)

router.use("/auth", access)

export default router
