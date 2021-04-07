import { Document, Model, model, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string,
  email: string,
  password: string,
  picture: string,
  rooms: Array<string>
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  picture: { type: String, required: false },
  rooms: { type: Array, required: false, ref: 'Room' }
})

export const User: Model<IUser> = model('User', UserSchema)
