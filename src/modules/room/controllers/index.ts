import Room from '@room/model/index'
import User from '@user/model/index'

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().select({ description: 1, name: 1, picture: 1, password: 1, createdAt: 1, owner: 1 }).populate('owner', { name: 1, _id: 0 })
    return res.status(200).json(rooms)
  } catch (err) {
    return res.status(500).send("Something's going wrong on getAllRooms")
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
    const rooms = (await User.findById({ _id })).myRooms
    await User.updateOne({ _id }, {
      myRooms: [...rooms, room._id]
    })
    res.status(201).send('room created')
  } catch (err) {
    if (err.code === 11000) {
      return res.status(404).send('this room already exists')
    }
    return res.status(500).send("Something's going wrong on createRoom")
  }
}

export const updateRoom = async (req, res) => {
  try {
    const { roomID } = req.payload
    const body = req.body
    await Room.updateOne({ _id: roomID }, {
      $set: body
    })
    return res.status(201).send('room updated')
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send('This room name is already in use')
    }
    return res.status(500).send("Something's going wrong on updateRoom")
  }
}

export const deleteRoom = async (req, res) => {
  try {
    const { roomID } = req.payload
    await Room.deleteOne({ _id: roomID })
    return res.status(200).send('room deleted')
  } catch (err) {
    return res.status(500).send("Something's going wrong on deleteRoom")
  }
}
