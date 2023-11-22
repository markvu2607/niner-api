import app from "./src/app"
import logger from "./src/configs/logger"
import config from "./src/configs/config"

const server = app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`)
})

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed")
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: any) => {
  logger.error(error)
  exitHandler()
}

process.on("uncaughtException", unexpectedErrorHandler)
process.on("unhandledRejection", unexpectedErrorHandler)

process.on("SIGINT", () => {
  server.close(() => {
    logger.info("Exit server express")
    // notify when server crash
  })
})
