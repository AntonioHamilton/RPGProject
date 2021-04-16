import { Router } from 'express'
import userRoutes from '@user/routes'
import roomRoutes from '@room/routes/room'
import swaggerUi from 'swagger-ui-express'
import docs from '../docs/documentation.json'
import chatRoutes from '@room/routes/chat'

const setRoutes = (app) => {
  const router = Router()
  userRoutes(router)
  roomRoutes(router)
  chatRoutes(router)
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(docs))
  app.use(router)
}

export default setRoutes
