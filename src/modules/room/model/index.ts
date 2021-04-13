import { Document, model, Schema } from 'mongoose'
import { encryptPassword } from '@libs/encrypter'

export interface IRoom {
  owner: Schema.Types.ObjectId
  name: string
  chat: Array<Record<string, string>>
  password: string
  archives: Array<Record<string, string>>,
  description: String
}

export interface IArchive {
  name: string
  link: string
  permissions: Array<Schema.Types.ObjectId>
}

export interface ISession {
  members: Schema.Types.ObjectId,
  schedule: Array<Date>,
  Message: string
}

interface IModelRoom extends Document, IRoom { }

const RoomSchema: Schema<IModelRoom> = new Schema({
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true, unique: true },
  password: { type: String, default: '' },
  chat: { type: Array, default: [] },
  archives: { type: Array, default: [] },
  description: { type: String },
  sessions: { type: Array, default: [] },
  picture: { type: String }
}, {
  timestamps: {
    updatedAt: true,
    createdAt: true
  }
})

RoomSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = encryptPassword(this.password)
  }
  next()
})

export default model<IModelRoom>('Room', RoomSchema)
