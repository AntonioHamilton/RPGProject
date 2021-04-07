import express from 'express'
import cors from 'cors'
import http from 'http'
import setRoutes from './routes'

const setApp = () => {
  const app = express()
  const server = http.createServer(app)
  app.use(cors())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  setRoutes(app)
  return server
}

export default setApp()
