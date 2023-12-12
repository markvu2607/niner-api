import compression from "compression"
import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express"
import helmet from "helmet"
import cors from "cors"

import morgan from "@/configs/morgan.js"
import routes from "@/routes/v1/index.js"
import { NotFoundError } from "@/core/error.response.js"
import config from "@/configs/config.js"
import { errorConverter, errorHandler } from "@/middlewares/error.js"
import checkConnections from "@/helpers/checkConnections.js"

const app: Express = express()

if (config.nodeEnv !== "test") {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}
app.use(helmet())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(compression())
app.use(cors())
app.options("*", cors())

// DB
checkConnections()

app.use("/api/v1", routes)

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new NotFoundError()
  next(error)
})

app.use(errorConverter as unknown as ErrorRequestHandler)

app.use(errorHandler as unknown as ErrorRequestHandler)

export default app
