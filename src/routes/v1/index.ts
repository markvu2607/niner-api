import express from "express"

import access from "./access/index.js"

const router = express.Router()

router.use("/auth", access)

export default router
