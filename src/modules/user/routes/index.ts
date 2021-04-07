import { createUser, getAllUsers } from '@user/controllers'
import { authenticate, isAuthenticated } from '@user/services/login'
import { celebrate, Joi, Segments } from 'celebrate'

const UserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    picture: Joi.string()
  })
})

const userRoutes = (routes) => {
  routes
    .route('/users')
    .get(isAuthenticated, getAllUsers)
    .post(UserValidation, createUser)

  routes
    .route('/login')
    .post(authenticate)
}

export default userRoutes
