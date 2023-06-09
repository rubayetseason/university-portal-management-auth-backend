import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorlogger, logger } from './shared/logger'

async function server() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('🗃️ database connection successful')

    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('failed to connect database', err)
  }
}

server()
