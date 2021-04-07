import { Router } from 'express'
import userRoutes from '@user/routes'
import swaggerUi from 'swagger-ui-express'
import docs from '../Docs/documentation.json'

const setRoutes = (app) => {
  const router = Router()
  userRoutes(router)
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(docs))
  app.use(router)
}

export default setRoutes
