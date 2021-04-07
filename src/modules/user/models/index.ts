import { Document, model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import roles from '@constants/roles'

export interface IUser {
  name: string
  email: string
  password: string
  picture: string
  rooms: Array<string>,
  role: string
}

interface IModelUser extends Document, IUser {
  encryptPassword(string): string
  authenticate(string): string
}

const UserSchema: Schema<IModelUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: { type: String, required: false },
  role: { type: String, required: true, default: roles.member },
  rooms: { type: Array, required: false, ref: 'Room' }
}, {
  timestamps: {
    updatedAt: true,
    createdAt: true
  }
})

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password)
  }
  next()
})

const salt = 8

UserSchema.methods = {
  authenticate(plainTextPassword: string): string {
    return bcrypt.compareSync(plainTextPassword, this.password)
  },
  encryptPassword(password: string): string {
    return bcrypt.hashSync(password, salt)
  }
}

export default model<IModelUser>('User', UserSchema)
