import { connect } from 'mongoose'
import { config } from 'dotenv'
import logger from '../utils/logger'
config()

export function ConnectDb(): void {
  const uri = process.env.MONGODB_URL || ''
  connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
    .then(() => {
      logger.info('database connected')
    })
    .catch((err) => {
      logger.error('database failed to connect', err)
    })
}
