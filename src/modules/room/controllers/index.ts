import Room from '@room/model/index'
import User from '@user/model/index'

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
    return res.status(200).json(rooms)
  } catch (err) {
    return res.status(500).send("Something's going wrong")
  }
}

export const createRoom = async (req, res) => {
  try {
    const { _id } = req.payload
    const { name, password } = req.body
    const room = await Room.create({
      name,
      owner: _id,
      password
    })
    const rooms = (await User.findById({ _id })).rooms
    await User.findByIdAndUpdate({ _id }, {
      rooms: [...rooms, room._id]
    })
    res.status(201).send('room created')
  } catch (err) {
    if (err.code === 11000) {
      res.status(404).send('this room already exists')
    }
    res.status(500).send("Something's going wrong")
  }
}
