import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD
  }
})

export interface IOptions {
  to: string
  subject: string
  html: string
}

const sendEmail = async (options: IOptions): Promise<boolean> => {
  return await transporter.sendMail(options, (error, info): boolean => {
    if (error) {
      console.log({ err: error })
      return false
    } else {
      console.log('Email sent to: ' + info.response)
      return true
    }
  })
}

export default sendEmail
