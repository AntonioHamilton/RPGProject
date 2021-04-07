import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const config = {
  db: {
    connection: process.env.MONGO_DB
  },
  app: {
    port: process.env.PORT
  },
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
}

export default config
