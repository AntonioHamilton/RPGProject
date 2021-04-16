import { createRoom, deleteRoom, getAllRooms, updateRoom } from '@room/controllers/room'
import { isTheOwner } from '@room/services/roomOwner'
import { isAuthorizated } from '@user/services/login'
import { celebrate, Joi, Segments } from 'celebrate'

const RoomValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string(),
    picture: Joi.string()
  })
})

const RoomUpdateFields = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    password: Joi.string(),
    description: Joi.string(),
    picture: Joi.string()
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
})

const roomRoutes = (routes) => {
  routes
    .route('/rooms')
    .get(isAuthorizated, getAllRooms)
    .post(isAuthorizated, RoomValidation, createRoom)

  routes
    .route('/rooms/:id')
    .put(RoomUpdateFields, isAuthorizated, isTheOwner, updateRoom)
    .delete(isAuthorizated, isTheOwner, deleteRoom)
}

export default roomRoutes
