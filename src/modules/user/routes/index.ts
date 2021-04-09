import { createUser, getAllUsers, recoveryPassword } from '@user/controllers'
import { authorization, isAuthorizated } from '@user/services/login'
import { celebrate, Joi, Segments } from 'celebrate'

const UserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    picture: Joi.string(),
    phone: Joi.string()
  })
})

const userRoutes = (routes) => {
  routes
    .route('/users')
    .get(isAuthorizated, getAllUsers)
    .post(UserValidation, createUser)

  routes
    .route('/login')
    .post(authorization)

  routes.route('/recoverypassword').post(recoveryPassword)
}

export default userRoutes
