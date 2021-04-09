import bcrypt from 'bcrypt'

const salt = 8

export const authenticate = (password: string, plainTextPassword: string): string => {
  return bcrypt.compareSync(plainTextPassword, password)
}

export const encryptPassword = (password: string): string => {
  return bcrypt.hashSync(password, salt)
}
