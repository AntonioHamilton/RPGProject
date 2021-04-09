import { createRoom, getAllRooms } from '@room/controllers'
import { isAuthorizated } from '@user/services/login'
import { celebrate, Joi, Segments } from 'celebrate'

const RoomValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string()
  })
})

const roomRoutes = (routes) => {
  routes
    .route('/rooms')
    .get(isAuthorizated, getAllRooms)
    .post(isAuthorizated, RoomValidation, createRoom)
}

export default roomRoutes
