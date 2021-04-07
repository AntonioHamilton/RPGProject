import dotenv from 'dotenv'
import server from '@config/app'
import connectToDB from '@config/database'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const port = process.env.PORT || 3001;

(async () => {
  connectToDB()
  await server.listen(port)
  console.log(`Server started on port: ${port}`)
})()
