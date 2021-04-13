
import Room from '@room/model/index'

export const isTheOwner = async (req, res, next) => {
  try {
    const { _id: userID } = req.payload
    const { id: roomID } = req.params
    const room = await Room.findById({ _id: roomID })
    if (String(room.owner) !== userID) {
      return res.status(401).send("you can't update this room, because you're not the owner")
    }
    req.payload.roomID = roomID
    next()
  } catch (err) {
    res.status(500).send("Something's going wrong on owner of the room auth")
  }
}
