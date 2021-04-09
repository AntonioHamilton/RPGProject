import { Router } from 'express'
import userRoutes from '@user/routes'
import roomRoutes from '@room/routes'
import swaggerUi from 'swagger-ui-express'
import docs from '../Docs/documentation.json'

const setRoutes = (app) => {
  const router = Router()
  userRoutes(router)
  roomRoutes(router)
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(docs))
  app.use(router)
}

export default setRoutes
