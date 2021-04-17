import Room from '@room/model/index'
const socketIo = require('socket.io')

const chatServer = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', (socket) => {
    socket.on('send chat', async (args) => {
      const { chat } = await Room.findById({ _id: args._id })
      io.emit(`chat ${args._id}`, chat)
    })
  })
}

export {
  chatServer
}
