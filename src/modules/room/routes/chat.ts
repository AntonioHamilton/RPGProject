import { updateRoomChat } from '@room/controllers/chat'
import { isAuthorizated } from '@user/services/login'
import { celebrate, Joi, Segments } from 'celebrate'

const RoomChatValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    message: Joi.string().required(),
    picture: Joi.string().required()
  }),
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string().required()
  })
})

const chatRoutes = (routes) => {
  routes
    .route('/chat/:_id')
    .post(RoomChatValidation, isAuthorizated, updateRoomChat)
}

export default chatRoutes
