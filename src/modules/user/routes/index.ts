import { createUser, deleteUser, getAllUsers, getMyProfile, recoveryPassword, resetPassword, updateUser } from '@user/controllers'
import { authorization, isAuthorizated } from '@user/services/login'
import { celebrate, Joi, Segments } from 'celebrate'

const UserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    picture: Joi.string(),
    phone: Joi.string()
  })
})

const UserUpdateFields = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    picture: Joi.string(),
    phone: Joi.string()
  })
})

const ResetPasswordValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required().min(8)
  })
})

const userRoutes = (routes) => {
  routes
    .route('/users')
    .get(isAuthorizated, getAllUsers)
    .post(UserValidation, createUser)
    .delete(isAuthorizated, deleteUser)
    .put(UserUpdateFields, isAuthorizated, updateUser)

  routes
    .route('/users/resetPassword')
    .put(ResetPasswordValidation, isAuthorizated, resetPassword)

  routes
    .route('/users/profile')
    .get(isAuthorizated, getMyProfile)

  routes
    .route('/login')
    .post(authorization)

  routes.route('/recoverypassword').post(recoveryPassword)
}

export default userRoutes
