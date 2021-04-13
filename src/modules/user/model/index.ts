import { Document, model, Schema } from 'mongoose'
import { encryptPassword } from '@libs/encrypter'
import roles from '@constants/roles'

export interface IUser {
  name: string
  email: string
  password: string
  picture: string
  favoriteRooms: Array<string>
  myRooms: Array<string>
  role: string
}

interface IModelUser extends Document, IUser {
  getUpdate(): Record<string, any>
  methods: Record<string, Function>
}

const UserSchema: Schema<IModelUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  password: { type: String, required: true },
  picture: { type: String, required: false },
  role: { type: String, required: true, default: roles.member },
  favoriteRooms: [{ type: Schema.Types.ObjectId, required: false, ref: 'Room' }],
  myRooms: [{ type: Schema.Types.ObjectId, required: false, ref: 'Room' }]
}, {
  timestamps: {
    updatedAt: true,
    createdAt: true
  }
})

UserSchema.pre<IModelUser>('updateOne', function (next) {
  const data = this.getUpdate()
  if (data.password) {
    data.password = encryptPassword(data.password)
  }
  next()
})

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = encryptPassword(this.password)
  }
  next()
})

export default model<IModelUser>('User', UserSchema)
