import compression from "compression"
import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } from "express"
import helmet from "helmet"
import morgan from "morgan"
// require("dotenv").config()
import routes from "./routes";

import {NotFoundError} from "./core/error.response"

const app: Express = express()

// Middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// DB
// require("./dbs/init.mongodb")

// Routes
app.use("", routes)

// Handling not found
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new NotFoundError("Not found route")
  next(error)
})

// Handling error
app.use(((error, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500

  return res.status(status).json({
    status,
    message: error.message || "Internal Server Error",
    // stack: error.stack,
  })
}) as ErrorRequestHandler)

export default app
