import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorlogger, logger } from './shared/logger'

process.on('uncaughtException', error => {
  errorlogger.error('Uncaught exception error', error)
  process.exit(1)
})

let server: Server
async function serverFunction() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('🗃️ database connection successful')

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('failed to connect database', err)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error('Unhandled error ~ ', error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

serverFunction()

process.on('SIGTERM', () => {
  logger.info('sigterm is received')
  if (server) {
    server.close()
  }
})
