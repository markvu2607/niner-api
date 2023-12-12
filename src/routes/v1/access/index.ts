import express from "express"

import { OkResponse } from "@/core/success.response.js"
import catchAsync from "@/utils/catchAsync.js"

const router = express.Router()

router.post(
  "/sign-up",
  catchAsync((req, res, next) => {
    return new OkResponse({
      message: "Welcome to Niner!",
      metadata: {
        user: "fs23kj32k",
      },
    }).send(res)
  }),
)

export default router
