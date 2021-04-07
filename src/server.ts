import express from 'express'
import UserController from '@user/controllers/index'

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: UserController() })
})

app.listen(3333)