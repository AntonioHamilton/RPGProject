import dotenv from 'dotenv'
import mongoose from 'mongoose'
import config from '@constants/configs'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

export const openConnection = () => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise
    mongoose.connection.on('error', (error) => reject(error)).once('open', () => resolve(mongoose.connections[0]))

    mongoose.connect(config.db.connection, config.options)
  })
}

export const closeConnection = () => {
  mongoose.connection.close()
}
