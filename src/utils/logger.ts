import * as winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { config } from 'dotenv'
import appRoot from 'app-root-path'
config()

const transport: DailyRotateFile = new DailyRotateFile({
  dirname: `${appRoot}/logs/`,
  level: 'info',
  handleExceptions: true,
  json: false,
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
})

const logger: winston.Logger = winston.createLogger({
  transports: [transport]
})

if (process.env.NODE_ENV != 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      level: 'debug'
    })
  )
}

export default logger
