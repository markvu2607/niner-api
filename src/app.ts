import compression from "compression"
import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express"
import helmet from "helmet"
import morgan from "./configs/morgan"
import cors from "cors"

import routes from "./routes"
import { NotFoundError } from "./core/error.response"
import config from "./configs/config"
import { errorConverter, errorHandler } from "./middlewares/error"

const app: Express = express()

if (config.environment !== "test") {
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
// require("./dbs/init.mongodb")

// Routes
app.use("", routes)

// Handling not found
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new NotFoundError()
  next(error)
})

app.use(errorConverter as unknown as ErrorRequestHandler)

app.use(errorHandler as unknown as ErrorRequestHandler)

export default app
