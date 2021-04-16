import Room from '@room/model/index'

export const updateRoomChat = async (req, res) => {
  try {
    const { _id } = req.params
    const newChat = req.body
    const { chat } = (await Room.findById({ _id }))
    await Room.updateOne({ _id }, {
      chat: [...chat, newChat]
    })
    res.status(200).send('chat updated')
  } catch (err) {
    res.status(500).send("Something's going wrong on updateRoomChat")
  }
}
